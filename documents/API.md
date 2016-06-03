## API document

If you include the CE.js file into your page, you will get a global variable 'CE' in your browser, and all the following functions can be find in 'CE'.

### 1、all

This function will add all the methods contained in 'CE' to canvas's API, you can use this function by the following codes:

```javascript
CE.all();
```

### 2、addDashedLineTo

This function will add a method 'dashedLineTo' which can draw dashed to canvas's API, you can use this function by the following codes:

```javascript
/**
 *	context: the context of the canvas that you want to add the method 
 * 'dashedLineTo', if it is missing, addDashedLineTo will get the first
 * canvas's context and make it the one who will excute the method
 * 'dashedLineTo'
 */
CE.addDashedLineTo(context);
```

The usage of 'dashedLineTo' is the same as lineTo method. But it has a optional param to declare the length of subdashed. If the optional method is missing, it will be replaced by number 5.

```javascript
/**
 * [x, y] is the end of the dashed
 * dashedLength: the length of the subdashed
 */
context.dashedLineTo(x, y, dashedLength);
```

### 3、addWindowToCanvas()

This method will add a method 'windowToCanvas' which can get the coordinate of the mouse to canvas's API, you can use this function by the following codes:

```javascript
CE.addWindowToCanvas();
```

The usage of 'windowToCanvas' is as follows:

```javascript
/**
 *	[x,y] is the coordinate of the mouse
 *  return object = {x: float, y: float} the value of return is the coordinate
 *  of the mouse in the canvas.
 */
context.windowToCanvas(x, y);
```

### 4、 addDrawPolygon()

This method will add a method 'drawPolygon' which can draw polygon lines, you can use this function by the following codes:

```javascript
CE.addDrawPolygon();
```

The usage of 'drawPolygon' is as follows:

```javascript
/**
 * [centerX, centerY] is the coordinate of the polygon's 
 */
context.drawPolygon(centerX, centerY, radius, sides, startAngle);
```