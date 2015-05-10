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
     * Modal progress dialog.
     * 
     * See the example included in /demos/modal-loading for more info.
     * 
     * Example:
     * ```JavaScript
     * var progress = new $.spModalProgress('Uploading File');
     * progress.addButton('Cancel', function () {
     *     progress.close();
     * });
     * progress.setValue(0.7);
     * ```
     * 
     * @param {String} title   Title
     * @param {String} message Message (not required)
     * 
     * @extends {$.spModalDialog}
     */
    $.spModalProgress = function (title, message) {
        if (message === undefined) {
            message = 'Please wait...';
        }
        
        // makes the loading
        var target = $(
            '<div class="sp-modal-ui sp-modal-message sp-modal-progress">' +
                '<div class="sp-modal-header sp-modal-draggable"></div>' +
                '<div class="sp-modal-body">' +
                    '<div class="sp-modal-text"></div>' +
                    '<div class="sp-modal-progress-bar">' +
                        '<div class="sp-modal-indicator">&nbsp;</div>' +
                        '<div class="sp-modal-percent">0%</div>' +
                    '</div>' +
                '</div>' +
                '<div class="sp-modal-footer"></div>' +
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
    $.spModalProgress.prototype = Object.create($.spModalDialog.prototype);
    
    /**
     * Progress value.
     * The progress value is a number between 0 and 1.
     * @var {Number}
     */
    $.spModalProgress.prototype._value = 0;
    
    /**
     * Gets the progress value.
     * 
     * This function returns a number between 0 and 1.
     * 
     * @return {Number}
     */
    $.spModalProgress.prototype.getValue = function () {
        return this._value;
    };
    
    /**
     * Sets the progress value.
     *
     * @param {Number} value A number between 0 and 1
     *
     * @return {Void}
     */
    $.spModalProgress.prototype.setValue = function (value) {
        this._value = Math.max(0, Math.min(value, 1));
        this.update();
    };
    
    /**
     * Updates the user interface.
     * 
     * This function overrides $.spModalUi::update().
     * 
     * @return {Void}
     */
    $.spModalProgress.prototype.update = function () {
        var target = this.getTarget();
        
        // updates the progress bar status
        var percent = 100 * this._value;
        $('.sp-modal-indicator', target).css('width', percent + '%');
        $('.sp-modal-percent', target).text(Math.floor(percent) + '%');
        
        // calls the parent update
        $.spModalDialog.prototype.update.call(this);
    };
})(jQuery);
