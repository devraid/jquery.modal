/**
 * jQuery.spModal - A Modal Window System.
 *
 * This plugin requires: 
 *      1. jQuery >= 2.1.3
 *      2. jQuery.ui >= 1.11.4
 *
 * @author    Gonzalo Chumillas <gchumillas@email.com>
 * @license   https://github.com/soloproyectos/jquery.modal/blob/master/LICENSE MIT License
 * @link      https://github.com/soloproyectos/jquery.modal
 */
(function ($) {
    
    /**
     * Abstract dialog class.
     * 
     * @param {jQuery.<HTMLElement>} target      User Interface
     * @param {jQuery.<HTMLElement>} modalWindow Modal window container (not required)
     * 
     * @abstract
     */
    $.spModalDialog = function (target, modalWindow) {
        // calls the parent constructor
        $.spModalUi.call(this, target, modalWindow);
    };
    $.spModalDialog.prototype = Object.create($.spModalUi.prototype);
    
    /**
     * Adds a new button.
     * 
     * This function returns the added button.
     * 
     * @param {String}   title   Button title
     * @param {Function} onClick Callback function (not required)
     * 
     * @return {jQuery}
     */
    $.spModalDialog.prototype.addButton = function (title, onClick) {
        var target = this.getTarget();
        var footer = $('.sp-modal-footer', target);
        
        // appends the button
        var button = $('<input type="button" />')
            .val(title)
            .appendTo(footer)
            .focus();
        
        // registers the 'click' event
        if (onClick !== undefined) {
            button.on('click', $.proxy(onClick, this));
        }
        
        return button;
    };
})(jQuery);
