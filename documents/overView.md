## Overview

### 1、Global variable －－ CE

This variable contains all method, you can add a certain method to the canvas's API by ```CE.methodName()```, and you can also add all of the methods in the CE to canvas's API by ```CE.all()```.

This variable will returned by a IIFE, it is written in the CE.js file.

### 2、Project's architecture

```architecture
|- CanvasExtension
	|- documents
		|- this folder contains all the documents of CE.js.
	|- html
		|- this folder contains some page for test.
	|- modules
		|- this folder contains all the mothod provided by CE.js, and all of them
			are seperated into divded functions. You can see the details of each
			method.
	|- CE.js this file can be used in product, it will add a global variable CE.
	|- README.md