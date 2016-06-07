/**
 * Author:      Tao-Quixote
 * CreateTime:  16/5/31 14:33
 * Description: 该方法通过扩展CanvasRenderingContext2D来绘制虚线
 */

function addDashedLineTo(context) {
    var methodName = 'dashedLineTo';

    // 检测是否允许添加新的方法
    if (!window.CanvasRenderingContext2D || !window.CanvasRenderingContext2D.prototype) {
        console.log('CanvasRenderingContext2D or CanvasRenderingContext2D.prototype is not exists.');
        return false;
    } else if (window.CanvasRenderingContext2D.prototype[ methodName ]) {
        console.log('The method ' + methodName + 'is already exist.');
        return false;
    }

    var moveToFunction = CanvasRenderingContext2D.prototype.moveTo;
    CanvasRenderingContext2D.prototype.lastMoveToLocation = {
        x : 0,
        y : 0
    };

    // 扩展原生的moveTo方法,使其可以记住上次的起点
    CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
        if (context) {
            moveToFunction.apply(context, [ x,
                                            y ]);
        } else {
            moveToFunction.apply(document.querySelector('canvas').getContext('2d'), [ x,
                                                                                      y ]);
        }
        this.lastMoveToLocation.x = x;
        this.lastMoveToLocation.y = y;
    };

    // 向CanvasRenderingContext2D添加dashedLineTo方法并实现
    /**
     * 向CanvasRenderingContext2D中添加画虚线的方法,该方法可通过context直接调用
     * context.dashedLineTo(x, y, [dashedLength, ...]),用法大致同context.lineTo(x, y)
     * x: 终止点的x坐标
     * y: 终止点的y坐标
     * dashedLength: 虚线中子虚线的长度,可选值,默认为5
     *
     * 该方法内部使用moveTo方法和lineTo方法实现,所以同样需要stroke方法显示虚线
     * 该方法参考自《HTML5 canvas核心技术》
     *
     * @param context 可选参数,如果不填写则默认选中页面中的第一个canvas愿随的context
     * @return {boolean} 扩展成功返回true,如果有同名方法则返回false
     */
    CanvasRenderingContext2D.prototype[ methodName ] = function (x, y, dashedLength) {
        dashedLength = dashedLength === undefined ? 5 : dashedLength;

        var startX = this.lastMoveToLocation.x;
        var startY = this.lastMoveToLocation.y;

        var deltaX = x - startX;
        var deltaY = y - startY;
        var numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY));

        for (var i = 0; i < numDashes; i += dashedLength) {
            this[ i % 2 === 0 ? 'moveTo' : 'lineTo' ](startX + (deltaX / numDashes
                                                               ) * i, startY + (deltaY / numDashes
                                                                               ) * i);
        }

        this.moveTo(x, y);
    };

    return true;
}
