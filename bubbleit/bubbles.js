function BubbleIt(params) {
    var svgSize = params.svgSize,
        minShape = 2,
        minScale = svgSize/minShape,
        svg,
        g,
        _this = this,
        imageScaledPixels = {}; //object for all scales. contains all pixel colors in hex

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function init() {
        // Create svg Node
        svg =  document.createElementNS('http://www.w3.org/2000/svg','svg');

        svg.setAttribute('id','svg_canvas');
        svg.height = svgSize;
        svg.width = svgSize;
        $(params.placeHolder).append(svg);
    }

    function calculateScales(imageSrc) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            img = new Image();


            canvas.height = svgSize;
            canvas.width = svgSize;

        img.onload = function() {

            for (var k = minShape; k <= svgSize; k *= 2 ) {
                calculateOneScale(k,img,ctx);
            }

            console.log(imageScaledPixels);

            reset(svgSize);
        };

        img.src = imageSrc;
    }

    function calculateOneScale(scale,img,ctx) {

        var imageSize = svgSize/scale,
            hexImage = [];

        ctx.drawImage(img, 0, 0, imageSize, imageSize);

        var imageData = ctx.getImageData(0, 0, imageSize, imageSize),
            pixels = imageData.data;

        for (var i = 0; i < pixels.length; i += 4) {
            hexImage.push(rgbToHex(pixels[i], pixels[i+1], pixels[i+2]));
        }

        imageScaledPixels['scale' + scale] = hexImage;
    }

    function drawSvgImage(hexImage,scale) {
        var fieldSize = svgSize/scale;

        g = document.createElementNS('http://www.w3.org/2000/svg','g');


        for (var i = 0; i < hexImage.length; i++) {

            var column = (i % fieldSize),
                row = Math.floor(i/fieldSize);
                circle = document.createElementNS('http://www.w3.org/2000/svg','circle');

            circle.setAttribute("cx", (column*scale)+(scale/2) );
            circle.setAttribute("cy", (row*scale)+(scale/2) );
            circle.setAttribute("r", scale/2 );
            circle.setAttribute("fill", hexImage[i]);

            $(circle).on('mouseover',onBublles);

            g.appendChild(circle);
        }

        svg.appendChild(g);
    }

    function drawSvgImageRect(hexImage,scale) {
        var fieldSize = svgSize/scale;

        for (var i = 0; i < hexImage.length; i++) {

            var column = (i % fieldSize),
                row = Math.floor(i/fieldSize),
                rect = document.createElementNS('http://www.w3.org/2000/svg','rect');

            rect.setAttribute("rx", '2');
            rect.setAttribute("ry", '2');
            rect.setAttribute("x", (column*scale) );
            rect.setAttribute("y", (row*scale) );
            rect.setAttribute("width", scale );
            rect.setAttribute("height", scale );
            rect.setAttribute("fill", hexImage[i]);

            svg.appendChild(rect);
        }
    }

    function calcPosition(x,y,size) {
        x -= 1;
        y -= 1;

        return ((y*size/2)+x);
    }

    this.newCircles = function(x, y, size, self) {
        var newSize = size/ 2;

        var colors = imageScaledPixels['scale'+size];

        if (newSize < minShape) return;

        for (var i= 0; i < 4; i++) {

            var circle = document.createElementNS('http://www.w3.org/2000/svg','circle'),
                newX,
                newY;

            switch (i)
            {
                case 0: {
                    newX = x-newSize;
                    newY = y-newSize;
                    break;
                }
                case 1: {
                    newX = x+newSize;
                    newY = y-newSize;
                    break;
                }
                case 2: {
                    newX = x-newSize;
                    newY = y+newSize;
                    break;
                }
                case 3: {
                    newX = x+newSize;
                    newY = y+newSize;
                    break;
                }
            }

            var newXIndex = ((newX/newSize)+1)/2,
                newYIndex= ((newY/newSize)+1)/2;
            var fill = calcPosition(newXIndex,newYIndex,svgSize/newSize);

            circle.setAttribute("cx", newX );
            circle.setAttribute("cy", newY );
            circle.setAttribute("r", newSize );
            circle.setAttribute("fill", colors[fill]);

            $(circle).on('mouseover',onBublles);
            $(self).off('mouseover',onBublles);

            g.appendChild(circle);
        }


        g.removeChild(self);
    }

    this.newRects = function(x, y, size, self) {
        var newSize = size/ 2;

        var colors = imageScaledPixels['scale'+size];

        if (newSize < minShape) return;

        for (var i= 0; i < 4; i++) {

            var rect = document.createElementNS('http://www.w3.org/2000/svg','rect'),
                newX,
                newY;

            switch (i) {
                case 0: {
                    newX = x;
                    newY = y;
                    break;
                }
                case 1: {
                    newX = x+newSize;
                    newY = y;
                    break;
                }
                case 2: {
                    newX = x;
                    newY = y+newSize;
                    break;
                }
                case 3: {
                    newX = x+newSize;
                    newY = y+newSize;
                    break;
                }
            }

            var newXIndex = ((newX/newSize)),
                newYIndex= ((newY/newSize)),
                fill = calcPosition(newXIndex,newYIndex,svgSize/newSize);

            rect.setAttribute("rx", '2');
            rect.setAttribute("ry", '2');
            rect.setAttribute("x", newX );
            rect.setAttribute("y", newY );
            rect.setAttribute("width", newSize );
            rect.setAttribute("height", newSize );
            rect.setAttribute("fill", colors[fill]);

            svg.appendChild(rect);
        }

        svg.removeChild(self);
    }

    function reset(scale) {
        $('#svg_canvas circle').remove();
        drawSvgImage(imageScaledPixels['scale'+scale],scale);
    }

    function reset1() {
        $('#svg_canvas rect').remove();
        drawSvgImageRect(imageScaledPixels['scale'+svgSize],svgSize);
    }

    this.reset = reset;

    init();

    //calculateScales('images/mona-lisa.jpg');
    calculateScales('images/timon.jpg');

}

var bubbles = new BubbleIt({
    placeHolder: '.b-content-i', //JQuery selector
    svgSize: 512, // Width of Svg
    shape: 'circle' // TODO
});

function onBublles(e) {
    var self = e.target,
        size = parseInt(self.getAttribute('r')),
        x = parseInt(self.getAttribute('cx')),
        y = parseInt(self.getAttribute('cy'));

    bubbles.newCircles(x, y, size, self);
}

$(document).on('mouseover','#svg_canvas rect',function(e){
    var self = e.target,
        size = parseInt(self.getAttribute('width')),
        x = parseInt(self.getAttribute('x')),
        y = parseInt(self.getAttribute('y'));

    bubbles.newRects(x, y, size, self);
});

$('.reset').bind('click',function(){bubbles.reset(4)});

