# jQuery.spModal

A Modal Window System plugin for jQuery.

## Installation
Copy the [dist](dist) files in your preferred location. See [demos](demos) for more info.

## Examples

Creates a modal loading dialog (see [demos/modal-loading](demos/modal-loading) for a complete example):
```JavaScript
var loading = $.spModal('loading');
loading.addButton('Cancel', function () {
    loading.close();
});
```
Creates a modal message dialog (see [demos/modal-message](demos/modal-message) for a complete example):
```JavaScript
var msg = new $.spModal('message', 'This is a test', 'And this is a message...');

// adds 'Accept' button
var acceptBtn = msg.addButton('Accept');
acceptBtn.on('click', function () {
    msg.close();
});

// adds 'Cancel' button
var cancelBtn = msg.addButton('Cancel');
cancelBtn.on('click', function () {
    msg.close();
});
```

[dist]:/soloproyectos/jquery.modal/tree/master/dist
[demos]:/soloproyectos/jquery.modal/tree/master/demos
[demos/modal-loading]:/soloproyectos/jquery.modal/tree/master/demos/modal-loading
[demos/modal-message]:/soloproyectos/jquery.modal/tree/master/demos/modal-message
