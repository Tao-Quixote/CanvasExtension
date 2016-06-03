/**
 * Author:      Tao-Quixote
 * CreateTime:  16/6/2 18:51
 * Description: 该方法用来在指定位置画多边形
 */

function addDrawPolygon() {
    var methodName = 'drawPolygon';

    // 检测是否允许添加新的方法
    if (!window.CanvasRenderingContext2D || !window.CanvasRenderingContext2D.prototype) {
        console.log('CanvasRenderingContext2D or CanvasRenderingContext2D.prototype is not exists.');
        return false;
    } else if (window.CanvasRenderingContext2D.prototype[ methodName ]) {
        console.log('The method ' + methodName + 'is already exist.');
        return false;
    }

    window.CanvasRenderingContext2D.prototype[ methodName ] = function (centerX, centerY, radius, sides, startAngle) {

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
            this.beginPath();
            this.moveTo(points[ 0 ].x, points[ 0 ].y);

            for (var j = 1; j < sides; j++) {
                this.lineTo(points[ j ].x, points[ j ].y);
            }

            this.closePath();
        }

        return true;
    }
}
