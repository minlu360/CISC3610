"use strict";

var Scene = {
	canvas: undefined,
	canvasContext: undefined,
	sprite: undefined
};

Scene.start = function () {
	// Get the canvas and it's context.
	Scene.canvas = document.getElementById("myCanvas");
	Scene.canvasContext = Scene.canvas.getContext("2d");

	// Setup the number to be displayed.
	Scene.sprite = number;

	// Attach the image to be used for the sprite.
	Scene.sprite.img = new Image();
	Scene.sprite.img.src = Scene.sprite.src;

	// Set width of canvas to twice width of each number with same height
	Scene.canvas.width = Scene.sprite.frames[Scene.sprite.frame].frame.w *2;
	Scene.canvas.height = Scene.sprite.frames[Scene.sprite.frame].frame.h ;
	// Set background color to be yellow
	Scene.canvasContext.fillStyle = "yellow";
	Scene.canvasContext.fillRect(0, 0, Scene.canvas.width , Scene.canvas.height);


	// Wait till the number image is loaded before starting the animation.
	Scene.sprite.img.onload = function () {
		// Activate the button after images are ready.
		document.getElementById("myBtn").disabled = false;

		// Display 0 number image
		Scene.sprite.frame = 0;
		//img, x start, y start, w, h, x, y, w image use, h image use
		Scene.canvasContext.drawImage(Scene.sprite.img, Scene.sprite.frames[Scene.sprite.frame].frame.x, Scene.sprite.frames[Scene.sprite.frame].frame.y, Scene.sprite.frames[Scene.sprite.frame].frame.w, Scene.sprite.frames[Scene.sprite.frame].frame.h, Scene.sprite.frames[Scene.sprite.frame].frame.w *0.5, 0, Scene.sprite.frames[Scene.sprite.frame].frame.w, Scene.sprite.frames[Scene.sprite.frame].frame.h);

		// Once user click the button, check if the button shows start - start change number images
		// if button shows others, reset image to number 0 and start change number images
		document.getElementById("myBtn").addEventListener("click", function(){
			if(document.getElementById("myBtn").value == "Start") {
				Scene.mainLoop();
			}	
			else {
				Scene.sprite.frame = 0;
				Scene.clearCanvas();
			} 
				
		});


	}
};

// Once the basic HTML document is loaded and its parsing has taken place, start the scene.
document.addEventListener('DOMContentLoaded', Scene.start);

// Clear canvas with yellow color
Scene.clearCanvas = function () {
	Scene.canvasContext.fillStyle = "yellow";
	Scene.canvasContext.fillRect(0, 0, Scene.canvas.width, Scene.canvas.height);
};

Scene.mainLoop = function () {
	// Once image got change, disable button
	document.getElementById("myBtn").disabled = true;
	Scene.clearCanvas();
	Scene.draw();

	// Animate at 2 frames a second.
	window.setTimeout(Scene.mainLoop, 1000 / 2);
};


Scene.draw = function () {

	// At the end of the sprite sheet, Display 10 with "1" and "0"
	if (Scene.sprite.frame < Scene.sprite.frames.length) {
		Scene.canvasContext.drawImage(Scene.sprite.img, Scene.sprite.frames[Scene.sprite.frame].frame.x, Scene.sprite.frames[Scene.sprite.frame].frame.y, Scene.sprite.frames[Scene.sprite.frame].frame.w, Scene.sprite.frames[Scene.sprite.frame].frame.h, Scene.sprite.frames[Scene.sprite.frame].frame.w *0.5, 0, Scene.sprite.frames[Scene.sprite.frame].frame.w, Scene.sprite.frames[Scene.sprite.frame].frame.h);
		// Advance to the next frame.
		Scene.sprite.frame++;

	}
	else {
		Scene.canvasContext.drawImage(Scene.sprite.img, Scene.sprite.frames[1].frame.x, Scene.sprite.frames[1].frame.y, Scene.sprite.frames[1].frame.w, Scene.sprite.frames[1].frame.h, 0, 0, Scene.sprite.frames[1].frame.w, Scene.sprite.frames[1].frame.h);
		Scene.canvasContext.drawImage(Scene.sprite.img, Scene.sprite.frames[0].frame.x, Scene.sprite.frames[0].frame.y, Scene.sprite.frames[0].frame.w, Scene.sprite.frames[0].frame.h, Scene.sprite.frames[0].frame.w-10, 0, Scene.sprite.frames[0].frame.w, Scene.sprite.frames[0].frame.h);
		document.getElementById("myBtn").value="Restart";
		document.getElementById("myBtn").disabled = false;
	}
	

};

