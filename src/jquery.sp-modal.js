/**
 * jQuery.spModal - A modal window.
 *
 * This plugin requires jQuery >= 1.7
 *
 * @namespace
 * @name      spModal
 * @author    Gonzalo Chumillas <gchumillas@email.com>
 * @license   https://github.com/soloproyectos/jquery.modal/blob/master/LICENSE MIT License
 * @link      https://github.com/soloproyectos/jquery.modal
 */
(function ($) {
    var methods = {
        /**
         * Creates a modal window.
         * 
         * A modal window is an iFrame covering all the available window. See the example included in
         * /demos/modal-window for more info.
         * 
         * Example:
         * ```JavaScript
         * var mw = $.spModal('window', 'user-interface.html', {param1: 'one', param2: 'two'});
         * mw.on('event', function () {
         *      // Performs some actions and close the modal window
         *      mw.close();
         * });
         * ```
         * 
         * @param {String} url    URL to the user interface
         * @param {Object} params Parameters (not required)
         * 
         * @return {$.spModalWindow}
         * @name spModal#window
         * @function
         */
        'window': function (url, params) {
            return new $.spModalWindow(url, params);
        },
        
        /**
         * User Interface class.
         * 
         * See the example included in /demos/modal-window for more info.
         * 
         * Example:
         * ```JavaScript
         * var target = $('#my-user-interface');
         * var ui = $.spModal('ui', target);
         * 
         * // populates data
         * $('#title').text(ui.getParam('title'));
         * $('#message').text(ui.getParam('message'));
         * 
         * $('#button1').on('click', function () {
         *      // tells the parent window to perform the action-1
         *      // the event will be captured by the parent window
         *      ui.trigger('action-1');
         * });
         * ```
         * 
         * @param {jQuery.<HTMLElement>} target      User Interface
         * @param {jQuery.<HTMLElement>} modalWindow Modal window container (not required)
         * 
         * @return {$.spModalUi}
         * @name spModal#ui
         * @function
         */
        'ui': function (target, modalWindow) {
            return new $.spModalUi(target, modalWindow);
        },
        
        /**
         * Modal message dialog.
         * 
         * See the example included in /demos/modal-message for more info.
         * 
         * Example:
         * ```JavaScript
         * var msg = $.spModal('message', 'My Title', 'This is a message...');
         * msg.setX(100);
         * msg.setY(50);
         * ```
         * 
         * @param {String} title   Title
         * @param {String} message Message (not required)
         * 
         * @return {$.spModalMessage}
         * @name spModal#message
         * @function
         */
        'message': function (title, message) {
            return new $.spModalMessage(title, message);
        },
        
        /**
         * Modal loading dialog.
         * 
         * See the example included in /demos/modal-loading for more info.
         * 
         * Example:
         * ```JavaScript
         * var loading = $.spModal('loading', 'This process may take several minutes...');
         * loading.addButton('Cancel', function () {
         *      // canceling process...
         *      loading.close();
         * });
         * ```
         * 
         * @param {String} message Message (not required)
         * 
         * @return {$.spModalLoading}
         * @name spModal#loading
         * @function
         */
        'loading': function (message) {
            return new $.spModalLoading(message);
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
