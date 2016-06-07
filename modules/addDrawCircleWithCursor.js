/**
 * Author:      Tao-Quixote
 * CreateTime:  16/5/31 14:33
 * Description: 该方法通过扩展CanvasRenderingContext2D来绘制一个跟随光标的圆
 */

function addDrawCircleWithCursor() {
    var methodName = 'drawCircleWithCursor';

    // 检测是否允许添加新的方法
    if (!window.CanvasRenderingContext2D || !window.CanvasRenderingContext2D.prototype) {
        console.log('CanvasRenderingContext2D or CanvasRenderingContext2D.prototype is not exists.');
        return false;
    } else if (window.CanvasRenderingContext2D.prototype[methodName]) {
        console.log('The method ' + methodName + 'is already exist.');
        return false;
    }
    // 向CanvasRenderingContext2D添加drawCircleWithCursor方法并实现
    /**
     * 该方法用于向CanvasRenderingContext2D添加一个跟随光标的圆方法
     *
     * @param radius 圆的半径，要求为number类型
     * @param fillStyle 填充样式，要求同canvas.context.fillStyle
     * @param strokeStyle 描线样式，要求同canvas.context.strokeStyle
     * @param globalCompositeOperation 图形合成的方式，要求同canvas.context.globalCompositeOperation
     *
     * @returns {boolean}
     */
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