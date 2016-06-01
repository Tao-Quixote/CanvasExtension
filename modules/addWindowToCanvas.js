/**
 * Author:      Tao-Quixote
 * CreateTime:  16/6/1 13:28
 * Description: 该方法用来获取鼠标在canvas中坐标
 */

function addWindowToCanvas() {
    var methodName = 'windowToCanvas';

    // 检测是否允许添加新的方法
    if (!window.CanvasRenderingContext2D || !window.CanvasRenderingContext2D.prototype) {
        console.log('CanvasRenderingContext2D or CanvasRenderingContext2D.prototype is not exists.');
        return false;
    } else if (window.CanvasRenderingContext2D.prototype[ methodName ]) {
        console.log('The method ' + methodName + 'is already exist.');
        return false;
    }

    // 向CanvasRenderingContext2D添加widowToCanvas方法并实现
    /**
     * 将鼠标在window中的绝对坐标转换为在canvas中相对canvas边界的坐标
     *
     * @param x 鼠标在window中的坐标x
     * @param y 鼠标在window中的坐标y
     * 
     * @returns {{x: number, y: number}}
     */
    CanvasRenderingContext2D.prototype[ methodName ] = function (x, y) {
        var canvas = this.canvas;
        var bbox = canvas.getBoundingClientRect();

        return {
            x : (x - bbox.left
                ) * (canvas.width / bbox.width
                ),
            y : (y - bbox.top
                ) * (canvas.height / bbox.height
                )
        };
    }
}
