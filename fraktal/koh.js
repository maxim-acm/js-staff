$(function() {
    var ctx = document.getElementById("canvas").getContext("2d"),
        depth = 0,
        fieldSize = 243,
        startY = 100;

    function reset() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, fieldSize, fieldSize);
        ctx.save();
        ctx.strokeStyle = "#000";
    }

    function drawSection(x1,y1,x2,y2,size) {
        var third = size/3;
        var height = Math.round(Math.sqrt(3)/2*third);
        var half = Math.round(third/2);

        console.log(height);

        ctx.moveTo(x1,y1);
        ctx.lineTo(x1+third,y1);
        ctx.lineTo(x1+third+half,y1+height);
        ctx.lineTo(x1+2*third,y1);
        ctx.lineTo(x1+3*third,y1);
        ctx.stroke();
    }

    reset();
    drawSection(0,startY,fieldSize,startY,fieldSize);


});