$(function() {

    var ctx = document.getElementById("canvas").getContext("2d"),
        depth = 3,
        fieldSize = 1024,
        color = 0,
        type = 1,
        fillColor = 1,
        startY = 512;

    function reset() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, fieldSize, fieldSize);
        ctx.lineWidth = 1;
    }


    function drawSection(x1,y1,x2,y2,depth) {
        var direction,
            size;
        if (x1 == x2) {
            direction = 'vert';
            size = y2 - y1;

        } else {
            direction = 'hor';
            size = x2 - x1;
        }

        var vector = (size > 0) ? 'down' : 'up';
        var fourth = Math.abs(size/4);

        if (depth > 0) {
            depth--;

            if (direction == 'hor') {
                if (vector == 'down') {
                    drawSection(x1,y1,x1+fourth,y1,depth);

                    drawSection(x1+fourth,y1,x1+fourth,y1-fourth,depth);
                    drawSection(x1+fourth,y1-fourth,x1+2*fourth,y1-fourth,depth);

                    drawSection(x1+2*fourth,y1-fourth,x1+2*fourth,y1,depth);
                    drawSection(x1+2*fourth,y1,x1+2*fourth,y1+fourth,depth);

                    drawSection(x1+2*fourth,y1+fourth,x1+3*fourth,y1+fourth,depth);
                    drawSection(x1+3*fourth,y1+fourth,x1+3*fourth,y1,depth);
                    drawSection(x1+3*fourth,y1,x2,y2,depth);
                } else {
                    drawSection(x1,y1,x1-fourth,y1,depth);

                    drawSection(x1-fourth,y1,x1-fourth,y1+fourth,depth);
                    drawSection(x1-fourth,y1+fourth,x1-2*fourth,y1+fourth,depth);

                    drawSection(x1-2*fourth,y1+fourth,x1-2*fourth,y1,depth);
                    drawSection(x1-2*fourth,y1,x1-2*fourth,y1-fourth,depth);

                    drawSection(x1-2*fourth,y1-fourth,x1-3*fourth,y1-fourth,depth);
                    drawSection(x1-3*fourth,y1-fourth,x1-3*fourth,y1,depth);
                    drawSection(x1-3*fourth,y1,x1-4*fourth,y1,depth);
                }
            }
            else {
                if (vector == 'down') {
                    drawSection(x1,y1,x1,y1+fourth,depth);
                    drawSection(x1,y1+fourth,x1+fourth,y1+fourth,depth);
                    drawSection(x1+fourth,y1+fourth,x1+fourth,y1+2*fourth,depth);

                    drawSection(x1+fourth,y1+2*fourth,x1,y1+2*fourth,depth);
                    drawSection(x1,y1+2*fourth,x1-fourth,y1+2*fourth,depth);

                    drawSection(x1-fourth,y1+2*fourth,x1-fourth,y1+3*fourth,depth);
                    drawSection(x1-fourth,y1+3*fourth,x1,y1+3*fourth,depth);
                    drawSection(x1,y1+3*fourth,x1,y1+4*fourth,depth);
                } else {
                    drawSection(x1,y1,x1,y1-fourth,depth);
                    drawSection(x1,y1-fourth,x1-fourth,y1-fourth,depth);
                    drawSection(x1-fourth,y1-fourth,x1-fourth,y1-2*fourth,depth);

                    drawSection(x1-fourth,y1-2*fourth,x1,y1-2*fourth,depth);
                    drawSection(x1,y1-2*fourth,x1+fourth,y1-2*fourth,depth);

                    drawSection(x1+fourth,y1-2*fourth,x1+fourth,y1-3*fourth,depth);
                    drawSection(x1+fourth,y1-3*fourth,x1,y1-3*fourth,depth);
                    drawSection(x1,y1-3*fourth,x1,y1-4*fourth,depth);
                }
            }
        } else {
            if (color >= 255) { color = 0; }

            if (fillColor == 0) {
               ctx.strokeStyle = '#0000ff';
            } else {
               ctx.strokeStyle = 'hsl(' + color +',90%,40%)';
            }

            ctx.beginPath();
            if (direction == 'hor') {
                ctx.moveTo(x1,y1);
                ctx.lineTo(x2,y2);
            }
            else {
                ctx.moveTo(x1,y1);
                ctx.lineTo(x2,y2);

            }
            ctx.stroke();
            color++;
        }

    }


    reset();

    function drawLine(depth) {
        drawSection(0,startY,fieldSize,startY,depth);
        console.log(depth);
    }

    function drawSquare(depth) {
        drawSection(256,256,768,256,depth);
        drawSection(768,256,768,768,depth);
        drawSection(768,768,256,768,depth);
        drawSection(256,768,256,256,depth);
        console.log('build2');
    }


    function build() {
        reset();
                    console.log(type);
        if (type == 1) {
            drawSquare(depth);
        } else {
            drawLine(depth);
        }

    }

    build();


    $('input[name="depth"]').change(function(e){
        depth = $(e.target).val();
        build();
    });

    $('input[name="color"]').change(function(e){
        fillColor = $(e.target).val();
        build();
    });

    $('input[name="type"]').change(function(e){
        type = $(e.target).val();
        build();
    });

});
