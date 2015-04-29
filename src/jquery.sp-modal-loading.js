(function ($) {
    
    /**
     * Modal loading dialog.
     * 
     * See the example included in /demos/modal-loading for more info.
     * 
     * Example:
     * ```JavaScript
     * var loading = new $.spModalLoading('This process may take several minutes...');
     * loading.addButton('Cancel', function () {
     *      // canceling process...
     *      loading.close();
     * });
     * ```
     * 
     * @param {String} message Message (not required)
     * 
     * @extends {$.spModalDialog}
     */
    $.spModalLoading = function (message) {
        if (message === undefined) {
            message = 'Please wait...';
        }
        
        // makes the loading
        var target = $(
            '<div class="sp-modal-ui sp-modal-loading">' +
                '<div class="sp-modal-icon"></div>' +
                '<div class="sp-modal-text"></div>' +
                '<div class="sp-modal-footer"></div>' +
            '</div>'
        );
        $('.sp-modal-text', target).text(message);
        
        // makes the container
        var modalWindow = $('<div class="sp-modal-window" />');
        modalWindow.appendTo('body');
        modalWindow.append(target);
        
        // calls the parent constructor
        $.spModalDialog.call(this, target, modalWindow);
    };
    $.spModalLoading.prototype = Object.create($.spModalDialog.prototype);
})(jQuery);
