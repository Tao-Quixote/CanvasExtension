/**!
 * Author:      Tao-Quixote
 * CreateTime:  16/5/31 18:06
 * Description: This is the EC.js file,
 * please honer the author and keep the head of the js file.
 * If there is any problem or error or suggestion, please concat by web.taox@gmail.com
 */

var CE = (function() {
    var toolsKit = {
        /**
         * 检测当前浏览器是否支持canvas、prototype以及要添加的方法是否存在
         * 当浏览器不支持canvas、prototype或者要添加的方法已经存在时,
         * 该方法会返回false, 当可以添加时返回true
         *
         * @param methodName
         * @returns {boolean}
         */
        ifCanvasRenderingContext2D: function(methodName) {
            if (!window.CanvasRenderingContext2D
                || !window.CanvasRenderingContext2D.prototype) {
                console.log(
                    'Please check if your browser support CanvasRenderingContext2D or CanvasRenderingContext2D.prototype');
                return false;
            } else if (window.CanvasRenderingContext2D[methodName]) {
                console.log('The method ' + methodName + 'is already exists in CanvasRenderingContext2D.prototype');
                return false;
            } else {
                return true;
            }
        }
    };

    return {
        /**
         * 执行所有的add方法, 将CE.js扩展的所有功能添加到canvas's API中
         *
         * @returns {boolean}
         */
        all:                     function() {
            var keys = Object.keys(this);
            keys.shift();
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                this[keys[i]]();
            }

            return true;
        },
        addDashedLineTo:         function(context) {
            var methodName = 'dashedLineTo';

            // 检测是否可以添加dashedLineTo方法到context
            if (!toolsKit.ifCanvasRenderingContext2D(methodName)) {
                return false;
            }

            var moveToFunction = CanvasRenderingContext2D.prototype.moveTo;
            CanvasRenderingContext2D.prototype.lastMoveToLocation = {
                x: 0,
                y: 0
            };

            // 扩展原生的moveTo方法,使其可以记住上次的起点
            CanvasRenderingContext2D.prototype.moveTo = function(x, y) {
                if (context) {
                    moveToFunction.apply(context, [
                        x,
                        y
                    ]);
                } else {
                    moveToFunction.apply(document.querySelector('canvas').getContext('2d'), [
                        x,
                        y
                    ]);
                }
                this.lastMoveToLocation.x = x;
                this.lastMoveToLocation.y = y;
            };

            // 向CanvasRenderingContext2D添加dashedLineTo方法并实现
            CanvasRenderingContext2D.prototype[methodName] = function(x, y, dashedLength) {
                dashedLength = dashedLength === undefined ? 5 : dashedLength;

                var startX = this.lastMoveToLocation.x;
                var startY = this.lastMoveToLocation.y;

                var deltaX = x - startX;
                var deltaY = y - startY;
                var numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY));

                for (var i = 0; i < numDashes; i += dashedLength) {
                    this[i % 2 === 0 ? 'moveTo' : 'lineTo'](startX + (deltaX / numDashes
                                                                     ) * i, startY + (deltaY / numDashes
                                                                                     ) * i);
                }

                this.moveTo(x, y);
            };

            return true;
        },
        addWindowToCanvas:       function() {
            var methodName = 'windowToCanvas';

            // 检测是否可以添加方法
            if (!toolsKit.ifCanvasRenderingContext2D(methodName)) {
                return false;
            }

            // 向CanvasRenderingContext2D添加widowToCanvas方法并实现
            CanvasRenderingContext2D.prototype[methodName] = function(x, y) {
                var canvas = this.canvas;
                var bbox = canvas.getBoundingClientRect();

                return {
                    x: (x - bbox.left
                       ) * (canvas.width / bbox.width
                       ),
                    y: (y - bbox.top
                       ) * (canvas.height / bbox.height
                       )
                };
            }
        },
        addDrawPolygon:          function() {
            var methodName = 'drawPolygon';

            // 检测是否允许添加新的方法
            if (!toolsKit.ifCanvasRenderingContext2D(methodName)) {
                return false;
            }
            window.CanvasRenderingContext2D.prototype[methodName] = function(centerX, centerY, radius, sides, startAngle) {

                // 获取多边形所有点
                {
                    function Point(x, y) {
                        this.x = x;
                        this.y = y;
                    }

                    var points = [];
                    var angle = startAngle || 0;

                    for (var i = 0; i < sides; i++) {
                        points.push(new Point(centerX + radius * Math.sin(angle),
                            centerY - radius * Math.cos(angle)));

                        angle += 2 * Math.PI / sides;
                    }
                }

                // 画多边形
                {
                    this.moveTo(points[0].x, points[0].y);

                    for (var j = 1; j < sides; j++) {
                        this.lineTo(points[j].x, points[j].y);
                    }

                    this.closePath();
                }

                return true;
            }
        },
        addDrawCircleWithCursor: function() {
            var methodName = 'drawCircleWithCursor';

            // 检测是否可以添加drawCircleWithCursor方法
            if (!toolsKit.ifCanvasRenderingContext2D(methodName)) {
                return false;
            }

            window.CanvasRenderingContext2D.prototype[methodName] = function(radius, fillStyle, strokeStyle, globalCompositeOperation) {
                // 检查是否传入了radius参数
                if (!radius || !parseFloat(radius)) {
                    console.log('error: the value of radius is not correct.');
                    return false;
                }

                // 默认值
                if (!fillStyle) {
                    fillStyle = 'orange';
                }
                if (!strokeStyle) {
                    strokeStyle = '#333';
                }
                if (!globalCompositeOperation) {
                    globalCompositeOperation = 'source-over';
                }

                // 检查是否添加了windowToCanvas方法
                if (!this.windowToCanvas) {
                    console.log('error: this method rely on windowToCanvas, please add windowToCanvas first.');
                    return false;
                }

                this.canvas.onmousemove = function(e) {
                    e.preventDefault();

                    var context = this.getContext('2d');

                    var loc = context.windowToCanvas(e.clientX, e.clientY);
                    context.clearRect(0, 0, this.width, this.height);

                    context.save();
                    context.globalCompositeOperation = globalCompositeOperation;
                    context.beginPath();
                    context.arc(loc.x, loc.y, 80, 0, Math.PI * 2, false);
                    context.strokeStyle = strokeStyle;
                    context.fillStyle = fillStyle;
                    context.stroke();
                    context.fill();

                    context.restore();
                }
            }
        }
    };
})();
