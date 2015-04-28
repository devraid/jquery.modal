(function ($) {
    var methods = {
        /**
         * Opens a modal window.
         * 
         * @param {String} url    URL to the User Interface.
         * @param {Object} params Parameters (not required)
         * 
         * @return {$.spModalWindow}
         */
        'window': function (url, params) {
            return new $.spModalWindow(url, params);
        },
        
        /**
         * User Interface.
         * 
         * @param {jQuery.<HTMLElement>} target      User Interface
         * @param {jQuery.<HTMLElement>} modalWindow Modal Window (not required)
         * 
         * @return {$.spModalUi}
         */
        'ui': function (target, modalWindow) {
            return new $.spModalUi(target, modalWindow);
        },
        
        /**
         * Modal message dialog.
         * 
         * @param {String} title   title
         * @param {String} message Message (not required)
         * 
         * @return {$.spModalMessage}
         */
        'message': function (title, message) {
            return new $.spModalMessage(title, message);
        },
        
        /**
         * Modal loading dialog.
         * 
         * @param {String} message Message (not required)
         * 
         * @return {$.spModalDialog}
         */
        'loading': function (message) {
            return new $.spModalDialog(message);
        }
    };
    
    /**
     * Registers plugin.
     * 
     * @param {String} methodName Method name
     * @param {Mixed}  args,...   Additional arguments (not required)
     * 
     * @return {Mixed}
     */
    $.spModal = function (methodName, args) {
        var method = methods[methodName];
        var args = Array.prototype.slice.call(arguments, 1);
        
        if (method === undefined) {
            $.error('Method not found: ' + methodName);
        }
        
        return method.apply(this, args);
    };
})(jQuery);
