$(function() {
    var ctx = document.getElementById("canvas").getContext("2d"),
        color = 0,
        fillColor = 0,
        depth = 0,
        fieldSize = 729;
//        fieldSize = 2187;


    function reset() {
        ctx.fillStyle = '#5F6D67';
        ctx.fillRect(0, 0, fieldSize, fieldSize);
        ctx.save();
    }

    function drawBlock(x, y, scale) {
        var size = scale/3;
        var params = [x+size, y+size, size, size];

        if (color >= 255) { color = 0; }

        if (fillColor == 0) {
           ctx.fillStyle = '#ffffff';
        } else {
           ctx.fillStyle = 'hsl(' + color +',90%,40%)';
        }

        ctx.fillRect.apply(ctx, params);

        color++;
    }

    function drawLayer(x,y,scale,depth) {

        if (depth == 0) return;

        var square = scale/3;

        for (var j = 0; j <= 2; j++ ) {
            for (var k = 0; k <= 2; k++) {
                if (!(j == 1 && k == 1)) {
                    drawBlock(x+j*square,y+k*square,square);
                    drawLayer(x+j*square,y+k*square,square,depth-1);
                }
            }
        }
    }

    function init() {
        reset();
        drawBlock(0,0,fieldSize);
        drawLayer(0,0,fieldSize,0);
    }

    init();

    $('input[name="depth"]').change(function(e){
        reset();
        drawBlock(0,0,fieldSize);
        drawLayer(0,0,fieldSize,$(e.target).val());
    });

    $('input[name="color"]').change(function(e){
        var currentDepth = $('input:checked[name="depth"]').val();
        console.log(currentDepth);
        fillColor = $(e.target).val();

        reset();
        drawBlock(0,0,fieldSize);
        drawLayer(0,0,fieldSize,currentDepth);
    });

});