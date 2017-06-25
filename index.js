window.onload = ()=>{
  var app = new PIXI.Application(800, 600, {backgroundColor : 0});
  document.body.appendChild(app.view);
  var canvas = app.view;

  ////
	// Resize the canvas to the size of the window
	window.onresize = function(event) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		app.renderer.resize(canvas.width, canvas.height);
	};
	window.onresize();

  ////
  var container = new PIXI.Container();
  app.stage.addChild(container);

  var emitter = createEmitter(container);

	// Center on the stage
	emitter.updateOwnerPos(window.innerWidth / 2, window.innerHeight / 2);

	// Click on the canvas to trigger
	window.addEventListener('touchmove', function(e){

			// イベント名を出力
			// console.log("type:" + e.type);

			// TouchList オブジェクトを取得
			var touch_list = e.changedTouches;

			// 中身に順番にアクセス
			var i;
			var num = touch_list.length;
			for(i=0;i < num;i++){

				// Touch オブジェクトを取得
				var touch = touch_list[i];

				// // 識別番号を取得
				// console.log("id:" + touch.identifier);
        //
				// // モニタのスクリーン領域の左上を原点とした座標を取得
				// console.log("screenX:" + touch.screenX);
				// console.log("screenY:" + touch.screenY);
        //
				// // ブラウザのクライアント領域の左上を原点とした座標を取得
				// console.log("clientX:" + touch.clientX);
				// console.log("clientY:" + touch.clientY);
        //
				// // HTML 全体の左上を原点とした座標を取得
				// console.log("pageX:" + touch.pageX);
				// console.log("pageY:" + touch.pageY);
        //
				// console.log(" ----- ");

    		if(!emitter) return;
    		// emitter.emit = true;
    		emitter.resetPositionTracking();
    		emitter.updateOwnerPos(touch.pageX, touch.pageY);
			}

			// キャンセルに対応している
			if(e.cancelable){
				// デフォルトのタッチ操作を無効化する
				e.preventDefault();
			}
	});

  // Calculate the current time
  var elapsed = Date.now();

  // Start emitting
  emitter.emit = true;

  // Listen for animate update
  app.ticker.add(function(delta) {

    	// Update the next frame
    	// requestAnimationFrame(update);

    	var now = Date.now();

    	// The emitter requires the elapsed
    	// number of seconds since the last update
    	emitter.update((now - elapsed) * 0.001);
    	elapsed = now;

    	// Should re-render the PIXI Stage
    	// renderer.render(stage);
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent tranformation
      // bunny.rotation += 0.1 * delta;
  });

  document.querySelector('.fullscreen-button').addEventListener('click',function(){
    ElementRequestFullscreen(document.body);
    document.querySelector('.fullscreen-button').style.display='none';
  });
};

// http://hakuhin.jp/js/fullscreen.html
function DocumentIsEnabledFullscreen(document_obj){
	return (
		document_obj.fullscreenEnabled ||
		document_obj.webkitFullscreenEnabled ||
		document_obj.mozFullScreenEnabled ||
		document_obj.msFullscreenEnabled ||
		false
	);
}

// http://hakuhin.jp/js/fullscreen.html
function ElementRequestFullscreen(element){
	var list = [
		"requestFullscreen",
		"webkitRequestFullScreen",
		"mozRequestFullScreen",
		"msRequestFullscreen"
	];
	var i;
	var num = list.length;
	for(i=0;i < num;i++){
		if(element[list[i]]){
			element[list[i]]();
			return true;
		}
	}
	return false;
}

// window.onload = () => {
//     var app = new PIXI.Application(window.innerWidtn, window.innerHeight, {
//         backgroundColor: 0
//     });
//     document.body.appendChild(app.view);
//
//     var container = new PIXI.Container();
//
//     app.stage.addChild(container);
//
//     // Create a new emitter
//     var emitter = new PIXI.particles.Emitter(
//
//         // The PIXI.Container to put the emitter in
//         // if using blend modes, it's important to put this
//         // on top of a bitmap, and not use the root stage Container
//         container,
//
//         // The collection of particle images to use
//         ['particle.png'],
//
//         // Emitter configuration, edit this to change the look
//         // of the emitter
//         {
//         	"alpha": {
//         		"start": 1,
//         		"end": 1
//         	},
//         	"scale": {
//         		"start": 1,
//         		"end": 0.001,
//         		"minimumScaleMultiplier": 1
//         	},
//         	"color": {
//         		"start": "#fb1010",
//         		"end": "#f5b830"
//         	},
//         	"speed": {
//         		"start": 200,
//         		"end": 100,
//         		"minimumSpeedMultiplier": 1
//         	},
//         	"acceleration": {
//         		"x": 0,
//         		"y": 0
//         	},
//         	"maxSpeed": 0,
//         	"startRotation": {
//         		"min": 0,
//         		"max": 360
//         	},
//         	"noRotation": true,
//         	"rotationSpeed": {
//         		"min": 0,
//         		"max": 0
//         	},
//         	"lifetime": {
//         		"min": 0.5,
//         		"max": 1
//         	},
//         	"blendMode": "add",
//         	"frequency": 0.001,
//         	"emitterLifetime": -1,
//         	"maxParticles": 1000,
//         	"pos": {
//         		"x": 0,
//         		"y": 0
//         	},
//         	"addAtBack": false,
//         	"spawnType": "circle",
//         	"spawnCircle": {
//         		"x": 0,
//         		"y": 0,
//         		"r": 10
//         	}
//         }
//     );
//
//     // Calculate the current time
//     var elapsed = Date.now();
//
//     // Update function every frame
//     var update = function() {
//
//         // Update the next frame
//         requestAnimationFrame(update);
//
//         var now = Date.now();
//
//         // The emitter requires the elapsed
//         // number of seconds since the last update
//         emitter.update((now - elapsed) * 0.001);
//         elapsed = now;
//
//         // Should re-render the PIXI Stage
//         renderer.render(stage);
//     };
//
//     // // Start emitting
//     // emitter.emit = true;
//     //
//     // // Start the update
//     // // update();
//     //
//     //
//     // // Listen for animate update
//     // app.ticker.add(function(delta) {
//     //
//     //   var now = Date.now();
//     //
//     //   emitter.update((now - elapsed) * 0.001);
//     //   elapsed = now;
//     // });
// };

function createEmitter(container){


  // Create a new emitter
  var emitter = new PIXI.particles.Emitter(

  	// The PIXI.Container to put the emitter in
  	// if using blend modes, it's important to put this
  	// on top of a bitmap, and not use the root stage Container
  	container,

  	// The collection of particle images to use
  	[PIXI.Texture.fromImage('particle.png')],

  	// Emitter configuration, edit this to change the look
  	// of the emitter
    {
    	"alpha": {
    		"start": 1,
    		"end": 1
    	},
    	"scale": {
    		"start": 1,
    		"end": 0.001,
    		"minimumScaleMultiplier": 1
    	},
    	"color": {
    		// "start": "#fb1010",
    		"start": "#ffffff",
    		// "end": "#f5b830"
    		"end": "#ffffff"
    	},
    	"speed": {
    		"start": 200,
    		"end": 100,
    		"minimumSpeedMultiplier": 1
    	},
    	"acceleration": {
    		"x": 0,
    		"y": 0
    	},
    	"maxSpeed": 0,
    	"startRotation": {
    		"min": 0,
    		"max": 360
    	},
    	"noRotation": true,
    	"rotationSpeed": {
    		"min": 0,
    		"max": 0
    	},
    	"lifetime": {
    		"min": 0.5,
    		"max": 1
    	},
    	"blendMode": "add",
    	"frequency": 0.0001,
    	"emitterLifetime": -1,
    	"maxParticles": 1000,
    	"pos": {
    		"x": 0,
    		"y": 0
    	},
    	"addAtBack": false,
    	"spawnType": "circle",
    	"spawnCircle": {
    		"x": 0,
    		"y": 0,
    		"r": 10
    	}
    }
  );

  return emitter;
}
