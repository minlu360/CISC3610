function draw() {
    // Locate the element "mycanvas" in the document.
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    //Wall Color
    context.fillStyle = "rgb(255, 230, 255)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    //Decorations on the wall
    context.fillStyle = "rgb(204, 255, 204)";
    wallPaper(context, canvas.width, canvas.height);

    //Curtain rod
    context.fillStyle = "rgb(255, 255, 153)";
    drawRod(context, canvas.width * 0.1, canvas.height * 0.03, canvas.width * 0.8, canvas.height * 0.02);

    //Sky
    context.fillStyle = "rgb(204, 255, 255)";
    context.fillRect(canvas.width * 0.16, canvas.height * 0.1, canvas.width * 0.68, canvas.height * 0.6);
    //Draw clouds and birds in the sky
    drawCloudsAndBirds(context, canvas.width * 0.2, canvas.width * 0.5, canvas.height * 0.12, canvas.height * 0.55);

    //Draw Sun 
    context.fillStyle = "rgb(255, 255, 0, 0.2)";
    drawCircle(context, canvas.width * 0.6, canvas.height * 0.2, canvas.height * 0.1);
    context.fillStyle = "rgb(255, 255, 0)";
    drawCircle(context, canvas.width * 0.6, canvas.height * 0.2, canvas.height * 0.05);
    context.stroke();

    //Windowsill - button of window
    drawRect(context, "white", canvas.width * 0.16, canvas.height * 0.7, canvas.width * 0.68, canvas.height * 0.1);
    drawRect(context, "rgb(255, 153, 51, 0.6)", canvas.width * 0.16, canvas.height * 0.7, canvas.width * 0.68, canvas.height * 0.1);
    //Wood by the window - 4 side of window /top - button - left - right
    drawRect(context, "rgb(255, 153, 51)", canvas.width * 0.13, canvas.height * 0.06, canvas.width * 0.74, canvas.height * 0.04);
    drawRect(context, "rgb(255, 153, 51)", canvas.width * 0.13, canvas.height * 0.8, canvas.width * 0.74, canvas.height * 0.04);
    drawRect(context, "rgb(255, 153, 51)", canvas.width * 0.13, canvas.height * 0.1, canvas.height * 0.04, canvas.height * 0.7);
    drawRect(context, "rgb(255, 153, 51)", canvas.width * 0.84, canvas.height * 0.1, canvas.height * 0.04, canvas.height * 0.7);

    //Window door - Left & Right
    drawWindowDoor(context, canvas.width * 0.16, canvas.height * 0.8, canvas.height * 0.1, canvas.width * 0.35, canvas.height * 0.2, canvas.height * 0.65);
    drawWindowDoor(context, canvas.width * 0.84, canvas.height * 0.8, canvas.height * 0.1, canvas.width * 0.65, canvas.height * 0.2, canvas.height * 0.65);
    context.fillStyle = "rgb(204, 102, 0)";
    drawWindowDoor(context, canvas.width * 0.2, canvas.height * 0.7, canvas.height * 0.18, canvas.width * 0.32, canvas.height * 0.23, canvas.height * 0.62);
    drawWindowDoor(context, canvas.width * 0.8, canvas.height * 0.7, canvas.height * 0.18, canvas.width * 0.68, canvas.height * 0.23, canvas.height * 0.62);

    //Cloud behind the glass of window
    drawCloudsBehind(context);

    //Glass on window door 
    context.fillStyle = "rgb(204, 255, 255, 0.8)";
    drawWindowDoor(context, canvas.width * 0.2, canvas.height * 0.69, canvas.height * 0.19, canvas.width * 0.31, canvas.height * 0.24, canvas.height * 0.61);
    drawWindowDoor(context, canvas.width * 0.8, canvas.height * 0.69, canvas.height * 0.19, canvas.width * 0.69, canvas.height * 0.24, canvas.height * 0.61);

    //Curtain
    context.fillStyle = "rgb(255, 204, 204, 0.5)";
    drawCurtain(context, canvas.width * 0.1, canvas.height * 0.03 - 10, canvas.width * 0.8, canvas.height * 0.85);

    //Text
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.fillText("Window Sill", canvas.width * 0.75, canvas.height * 0.95);


}
//Draw curtain 
function drawCurtain(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + h);
    for (var i = 40; (x + w - i) > x; i += 80) {
        ctx.arc(x + w - i, y + h, 40, 0, Math.PI);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
//Draws Bird
function drawBird(ctx, x, y, r) {
    ctx.beginPath();
    ctx.lineWidth = r * 0.2;
    ctx.moveTo(x - r, y);
    ctx.arc(x, y, r, Math.PI, Math.PI * 2);
    ctx.arc(x + 2 * r, y, r, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = 1;
}
//Draw clouds behind the window
function drawCloudsBehind(ctx) {
    for (var i = 0; i < 5; i++) {
        //draw on left window 
        drawCloud(ctx,
            (Math.floor(Math.random() * 25) + 190),  // x = 190 ~ 215
            (Math.floor(Math.random() * 200) + 160),  // y = 160 ~ 360
            (Math.floor(Math.random() * 10) + 1));    // r = 1 ~ 10 
        //draw on right window 
        drawCloud(ctx,
            (Math.floor(Math.random() * 25) + 585),  // x = 585 ~ 610
            (Math.floor(Math.random() * 200) + 160),  // y = 160 ~ 360
            (Math.floor(Math.random() * 10) + 1));    // r = 1 ~ 10 
    }
}
//Draw Clouds in the sky
function drawCloudsAndBirds(ctx, x, xr, y, yr) {
    for (var i = 0; i < 15; i++) {
        //draw on sky
        drawCloud(ctx,
            (Math.floor(Math.random() * xr) + x),
            (Math.floor(Math.random() * yr) + y),
            (Math.floor(Math.random() * 10) + 1));    // r = 1 ~ 10 
        drawBird(ctx,
            (Math.floor(Math.random() * xr) + x),
            (Math.floor(Math.random() * yr) + y),
            (Math.floor(Math.random() * 10) + 1));    // r = 1 ~ 10  
    }
}
//Draw single cloud
function drawCloud(ctx, x, y, r) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arc(x, y, r, 0, Math.PI);
    ctx.arc(x - 2 * r, y, r, 0, Math.PI * 1.6);
    ctx.arc(x - r * 2 / 3, y - r * 2 / 3, r, Math.PI * 1.1, Math.PI * 1.65);
    ctx.arc(x + r * 2 / 3, y - r, r, Math.PI * 1.2, 0);
    ctx.arc(x + 2 * r, y, r, Math.PI * 1.4, Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    /* sample cloud
    drawCircle(context, 30, 30, 15, 0, 2 * Math.PI);
    drawCircle(context, 40, 20, 15, 0, 2 * Math.PI);
    drawCircle(context, 60, 15, 15, 0, 2 * Math.PI);
    drawCircle(context, 70, 30, 15, 0, 2 * Math.PI);
    drawCircle(context, 50, 30, 15, 0, 2 * Math.PI); 
    */
}
//Draw shapes on the wall
function wallPaper(ctx, w, h) {

    for (var x = 0; x <= w; x = x + 25) {
        for (var y = 12; y <= h + 25; y += 25) {
            wallPaperHelper(ctx, x, y);
        }
    }
}
//Draw single shape on the wall
function wallPaperHelper(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 10, y - 15);
    ctx.lineTo(x - 2, y - 9);
    ctx.lineTo(x, y - 20);
    ctx.lineTo(x + 2, y - 9);
    ctx.lineTo(x + 10, y - 15);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgb(204, 204, 255, 0.7)";
    ctx.stroke();
    ctx.strokeStyle = "black";

}
//Draw rectangle with color
function drawRect(ctx, color, x, y, w, h) {
    ctx.fillStyle = color;
    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, w, h);
}
//Draw door on the window
function drawWindowDoor(ctx, x0, y0, y1, x2, y2, y3) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2, y3);
    ctx.lineTo(x0, y0);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
}
//Draw rod on the top
function drawRod(ctx, x, y, w, h) {
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
    //Circle at left
    drawCircle(ctx, x, y + (h * 0.5), w * 0.02);
    ctx.stroke();
    //Circle at Right
    drawCircle(ctx, x + w, y + (h * 0.5), w * 0.02);
    ctx.stroke();

}
//Draw circle
function drawCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}
// Once the HTML document has finished loading and has been parsed, call the changeCanvasColor function.
document.addEventListener('DOMContentLoaded', draw);