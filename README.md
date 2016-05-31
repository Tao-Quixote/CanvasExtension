# CanvasExtension
This project's goal is to create a javascript plugin to extend canvas. It will add some functions to make canvas's API more powerful.

This project contains two parts: 

* The first part is a series a javascript files, each one will contain a method that canvas's API doesn't included. Each method of the first part will be showed as a function, so it will be easier for developers to read and understand.
* The second part is only one javascript file, it will be written as a IIFE, the function will excuted by itself as soon as it is download by the browser. It will return a subject which contain all the methods that implemented in the first part. When you want to add a certain method to extend the canvas's API, you can excute the function from the subject which is returned from the IIFE. And also, the subject also include a method to add all the functions to canvas's API. PS: the file is named CE.js.

# The usage of the CE.js is as follows:

### 1、The usage in your page.
You can use the CE.js just include the following line code in your html file.

```html
<script rel="stylesheet" type="text/javascript" src="EC.js"></script>
```

When the IIFE is excuted, it will add a "CE" to the window, so you can get all the functions provided by the CE.js.

### 2、Add a certain method to canvas's API

The following codes will add a certain method to canvas's API.

```javascript
CE.functionName();
```

### 3、Add all the method to canvas's API

The following codes will add all the methods contained in CE.js to canvas's API.

```javascript
CE.all();
```


# Something else

Some methods may draw lessons from books、websites or blogs, if there is any problem, please concat me by E-mail```web.taox@gmail.com```. I will reply you as soon as i receive your letter.