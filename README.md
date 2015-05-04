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
var msg = $.spModal('message', 'This is a test', 'And this is a message...');

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

Creates a modal window (see [demos/modal-window](demos/modal-window) for a complete example):
```JavaScript
var mw = $.spModal(
    'window',
    'user-interface.html',
    {
        title: 'User Interface Example',
        message: 'This is an example of custom User Interface.<br />' +
            'Please close the interface or press any button below.'
    }
);

mw.on('action-1', function () {
    mw.close();
});

mw.on('action-2', function () {
    mw.close();
});

mw.on('action-3', function () {
    mw.close();
});
```

[dist]:/soloproyectos/jquery.modal/tree/master/dist
[demos]:/soloproyectos/jquery.modal/tree/master/demos
[demos/modal-loading]:/soloproyectos/jquery.modal/tree/master/demos/modal-loading
[demos/modal-message]:/soloproyectos/jquery.modal/tree/master/demos/modal-message
[demos/modal-window]:/soloproyectos/jquery.modal/tree/master/demos/modal-window
