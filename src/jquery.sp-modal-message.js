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
     * Modal message dialog.
     * 
     * See the example included in /demos/modal-message for more info.
     * 
     * Example:
     * ```JavaScript
     * var msg = new $.spModalMessage('My Title', 'This is a message...');
     * msg.setX(100);
     * msg.setY(50);
     * ```
     * 
     * @param {String} title   Title
     * @param {String} message Message (not required)
     * 
     * @extends {$.spModalDialog}
     */
    $.spModalMessage = function (title, message) {
        // makes the message dialog
        var target = $(
            '<div class="sp-modal-ui sp-modal-message">' +
                '<div class="sp-modal-header sp-modal-draggable"></div>' +
                '<div class="sp-modal-body">' +
                    '<div class="sp-modal-text"></div>' +
                '</div>' +
                '<div class="sp-modal-footer">' +
                    // buttons here
                '</div>' +
            '</div>'
        );
        $('.sp-modal-header', target).text(title);
        $('.sp-modal-text', target).text(message);
        
        // makes the container
        var modalWindow = $('<div class="sp-modal-window" />');
        modalWindow.appendTo('body');
        modalWindow.append(target);
        
        // calls the parent constructor
        $.spModalDialog.call(this, target, modalWindow);
    };
    $.spModalMessage.prototype = Object.create($.spModalDialog.prototype);
    
    /**
     * Available text alignments.
     * See: http://www.w3schools.com/cssref/pr_text_text-align.asp
     * @var {String[]}
     */
    $.spModalMessage.prototype._availTextAlign = [
        'left', 'right', 'center', 'justify', 'initial', 'inherit'
    ];
    
    /**
     * Text alignment.
     * See: http://www.w3schools.com/cssref/pr_text_text-align.asp
     * @var {String}
     */
    $.spModalMessage.prototype._textAlign = 'center';
    
    /**
     * Gets the text.
     * 
     * @return {String}
     */
    $.spModalMessage.prototype.getText = function () {
        var target = this.getTarget();
        
        return $('.sp-modal-text', target).text();
    };
    
    /**
     * Sets the text.
     * 
     * @param {String} value A text
     * 
     * @return {Void}
     */
    $.spModalMessage.prototype.setText = function (value) {
        var target = this.getTarget();
        
        $('.sp-modal-text', target).text(value);
    };
    
    /**
     * Gets the HTML text.
     * 
     * @return {String}
     */
    $.spModalMessage.prototype.getHtmlText = function () {
        var target = this.getTarget();
        
        return $('.sp-modal-text', target).html();
    };
    
    /**
     * Gets the HTML text.
     * 
     * @param {String|jQuery} value An HTML or a jQuery fragment
     * 
     * @return {Void}
     */
    $.spModalMessage.prototype.setHtmlText = function (value) {
        var target = this.getTarget();
        
        $('.sp-modal-text', target).html(value);
    };
    
    /**
     * Gets the text alignment.
     * 
     * See: http://www.w3schools.com/cssref/pr_text_text-align.asp
     * 
     * @return {String}
     */
    $.spModalMessage.prototype.getTextAlign = function () {
        return this._textAlign;
    };
    
    /**
     * Sets the text alignment.
     * 
     * See: http://www.w3schools.com/cssref/pr_text_text-align.asp
     * 
     * @param {String} value Alignment
     * 
     * @return {Void}
     */
    $.spModalMessage.prototype.setTextAlign = function (value) {
        if ($.inArray(value, this._availTextAlign) < 0) {
            $.error('Invalid alignment. Valid alignments are: ' + this._availTextAlign.join(', '));
        }
        
        this._textAlign = value;
        this._update();
    };
    
    /**
     * Updates the user interface.
     * 
     * This function overrides $.spModalUi::_update.
     * 
     * @return {Void}
     */
    $.spModalMessage.prototype._update = function () {
        var target = this.getTarget();
        
        $('.sp-modal-text', target).css('text-align', this._textAlign);
        
        // calls the parent _update
        $.spModalDialog.prototype._update.call(this);
    };
})(jQuery);
