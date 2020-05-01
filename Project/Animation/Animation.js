"use strict";

// images 
var img = new Image();
img.src = 'images/rolling.png';

var tableImgObj = new Image();
tableImgObj.src = 'images/table.jpg';

var tvImgObj = new Image();
tvImgObj.src = 'images/TV.png';

var tvBubble = new Image();
tvBubble.src = 'images/tvTalkBubble.png';

var snowFlake = new Image();
snowFlake.src = 'images/switch.jpg';

var canvas = document.getElementById('table');
var ctx = canvas.getContext('2d');

img.onload = function () {
	init();
};

// variables for tv character
const scale = 0.7;
const width = 498;
const height = 334;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

// variables for rolling the tv character
const cycleLoop = [0, 1, 2, 3];	// 4 in col and 2 in row for the spritesheet
var row = 0; 
let currentLoopIndex = 0;
let frameCount = 0;

// serve as a timer
var timer = -2;

// drawing for tv character
function drawFrame(frameX, frameY) {
	ctx.drawImage(img,
		frameX * width, frameY * height, width, height,
		(canvas.width - tvImgObj.width) * 1.2, canvas.height * 0.3, scaledWidth, scaledHeight);
}

function step() {

	frameCount++;
	if (frameCount < 6) {
		window.requestAnimationFrame(step);
		return;
	}

	// draw backgtimer image
	ctx.drawImage(tableImgObj, 0, 0, canvas.width, canvas.height);

	// tv character rolling
	rolling();

	window.requestAnimationFrame(step);

	// talk bubbles
	callBubble();

	// draw TV
	ctx.drawImage(tvImgObj, (canvas.width - tvImgObj.width), canvas.height * 0.25, tvImgObj.width * 0.7, tvImgObj.height * 0.7);

}

// show bubble based on the value of timer
function callBubble() {
	ctx.font = "22px Arial";
	if (timer < 0) {
		ctx.drawImage(snowFlake, (canvas.width - tvImgObj.width) * 1.2, canvas.height * 0.3, snowFlake.width * 0.7, snowFlake.height * 0.7);
	}
	else if (timer < 15) {
		ctx.drawImage(tvBubble, (canvas.width - tvImgObj.width) * 1.3, canvas.height * 0.3, tvBubble.width * 0.13, tvBubble.height * 0.1);
		ctx.fillText("  O M G ", (canvas.width - tvImgObj.width) * 1.36, canvas.height * 0.38);
	}
	else if (timer < 40) {
		ctx.drawImage(tvBubble, -10, canvas.height * 0.5, tvBubble.width * 0.3 - 10, tvBubble.height * 0.3);
		ctx.fillText("   . . . is you again?", canvas.width * 0.03, canvas.height * 0.72);
	}
	else if (timer < 80) {
		ctx.drawImage(tvBubble, -10, canvas.height * 0.5, tvBubble.width * 0.3 - 10, tvBubble.height * 0.3);
		solutionText();
	}
	else if (timer < 100) {
		ctx.drawImage(tvBubble, (canvas.width - tvImgObj.width) * 1.3, canvas.height * 0.3, tvBubble.width * 0.15, tvBubble.height * 0.1);
		ctx.fillText(" Thank You! ", (canvas.width - tvImgObj.width) * 1.36, canvas.height * 0.38);
	}
	else if (timer < 120) {
		ctx.drawImage(tvBubble, -10, canvas.height * 0.5, tvBubble.width * 0.3, tvBubble.height * 0.3);
		ctx.fillText("      You Welcome! ", canvas.width * 0.03, canvas.height * 0.72);
		if(timer > 110) {
			ctx.drawImage(snowFlake, (canvas.width - tvImgObj.width) * 1.2, canvas.height * 0.3, snowFlake.width * 0.7, snowFlake.height * 0.7);
		}
	}
	else if (timer < 130 ) {
		ctx.drawImage(snowFlake, (canvas.width - tvImgObj.width) * 1.2, canvas.height * 0.3, snowFlake.width * 0.7, snowFlake.height * 0.7);
	}
	else if (timer == 130) {
		timer = -2;
		ctx.drawImage(snowFlake, (canvas.width - tvImgObj.width) * 1.2, canvas.height * 0.3, snowFlake.width * 0.7, snowFlake.height * 0.7);
	}
	timer++;


}

// long text for one of talk bubble
function solutionText() {
	ctx.font = "18px Arial";
	ctx.fillText(" I will change channels now ", canvas.width * 0.025, canvas.height * 0.68);
	ctx.fillText("and hope to make you less ", canvas.width * 0.03, canvas.height * 0.68 + 25);
	ctx.fillText("          embarrassed.", canvas.width * 0.03, canvas.height * 0.68 + 25 * 2);
}

// making character rolling
function rolling() {
	frameCount = 0;
	drawFrame(cycleLoop[currentLoopIndex], row);
	currentLoopIndex++;
	// if index meet the index bound of cycleLoop, reset and row one(0) switch row two(1), row two(1) back to row one(0)
	if (currentLoopIndex >= cycleLoop.length) {
		currentLoopIndex = 0;
		if (row == 1) {
			row = 0;
		}
		else {
			row = 1;
		}
	}

}

function init() {
	window.requestAnimationFrame(step);
}