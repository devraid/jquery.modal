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
     * User Interface class.
     * 
     * See the example included in /demos/modal-window for more info.
     * 
     * Example:
     * ```JavaScript
     * var target = $('#my-user-interface');
     * var ui = new $.spModalUi(target);
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
     * @extends {$.spModalEventable}
     */
    $.spModalUi = function (target, modalWindow) {
        this._target = target;
        this._modalWindow = modalWindow === undefined? this._searchModalWindow(): modalWindow;
        
        // makes the UI draggable
        if ($.ui === undefined) {
            $.error('jQuery.ui >= 1.11.4 is required');
        }
        this._target.draggable({handle: '.sp-modal-draggable'});
        
        this._update();
        
        // calls the parent constructor
        $.spModalEventable.call(this, this._target);
    };
    $.spModalUi.prototype = Object.create($.spModalEventable.prototype);
    
    /**
     * Modal window Container.
     * @var {jQuery.<HTMLElement>}
     */
    $.spModalUi.prototype._modalWindow = null;
    
    /**
     * User Interface.
     * @var {jQuery.<HTMLElement>}
     */
    $.spModalUi.prototype._target = null;
    
    /**
     * X coordinate.
     * @var {Number|null}
     */
    $.spModalUi.prototype._x = null;
    
    /**
     * Y coordinate.
     * @var {Number|null}
     */
    $.spModalUi.prototype._y = null;
    
    /**
     * Gets the modal window container.
     * 
     * @return {jQuery.<HTMLElement>}
     */
    $.spModalUi.prototype.getModalWindow = function () {
        return this._modalWindow;
    };
    
    /**
     * Gets the User Interface.
     * 
     * @return {jQuery.<HTMLElement>}
     */
    $.spModalUi.prototype.getTarget = function () {
        return this._target;
    };
    
    /**
     * Gets a parameter from the modal window container.
     * 
     * @return {Mixed}
     */
    $.spModalUi.prototype.getParam = function (name) {
        return this._modalWindow.data(name);
    };
    
    /**
     * Gets the X coordinate.
     * 
     * @return {Number|null}
     */
    $.spModalUi.prototype.getX = function () {
        return this._x;
    };
    
    /**
     * Sets the X coordinate.
     * 
     * The interface is center-aligned if the X coordinate is null.
     * 
     * @param {Number|null} value X coordinate
     * 
     * @return {Void}
     */
    $.spModalUi.prototype.setX = function (value) {
        this._x = value;
        this._update();
    };
    
    /**
     * Gets the Y coordinate.
     * 
     * @return {Number|null}
     */
    $.spModalUi.prototype.getY = function () {
        return this._y;
    };
    
    /**
     * Sets the Y coordinate.
     * 
     * The interface is top-aligned if the Y coordinate is null.
     * 
     * @param {Number|null} value Y coordinate
     * 
     * @return {Void}
     */
    $.spModalUi.prototype.setY = function (value) {
        this._y = value;
        this._update();
    };
    
    /**
     * Removes an event handler.
     * 
     * More info: https://api.jquery.com/off/
     * This function overrides $.spModalEventable::off()
     * 
     * @return {jQuery}
     */
    $.spModalUi.prototype.off = function () {
        var args = Array.prototype.slice.call(arguments);
        
        // removes the trigger from the modal window if it is not a child of the current document
        if ($(document).has(this._modalWindow).length == 0) {
            this._modalWindow.off.apply(this._modalWindow, args);
        }
        
        return this._target.off.apply(this._target, args);
    }
    
    /**
     * Triggers an event.
     * 
     * More info: https://api.jquery.com/trigger/
     * This function overrides $.spModalEventable::trigger()
     * 
     * @return {jQuery}
     */
    $.spModalUi.prototype.trigger = function (eventType) {
        var self = this;
        var args = Array.prototype.slice.call(arguments);
        
        // if the modal window is not a child of the current document, re-throw the trigger
        if ($(document).has(this._modalWindow).length == 0) {
            this._target.one(eventType, function () {
                self._modalWindow.trigger.apply(self._modalWindow, args);
            });
        }
        
        this._target.trigger.apply(this._target, args);
    };
    
    /**
     * Closes the modal window container.
     * 
     * @return {Void}
     */
    $.spModalUi.prototype.close = function () {
        this._modalWindow.remove();
    };
    
    
    /**
     * Searches the modal window container.
     * 
     * This function may return the iframe container or the current window.
     * 
     * @return {jQuery.<Window|HTMLIFrameElement>}
     */
    $.spModalUi.prototype._searchModalWindow = function () {
        var ret = $(window);
        
        // searches the parent iframe
        window.parent.$('iframe').each(function () {
            if (this.contentWindow === window) {
                ret = window.parent.$(this);
                return false;
            }
        });
        
        return ret;
    };
    
    /**
     * Updates the current interface.
     * 
     * @return {Void}
     */
    $.spModalUi.prototype._update = function () {
        // sets UI position
        var x = this.getX() === null
            ? Math.max(0, $(window).width() / 2 - this._target.width() / 2)
            : this.getX();
        var y = this.getY() === null
            ? Math.max(0, $(window).height() / 5 - this._target.height() / 2)
            : this.getY();
        this._target.css({left: x, top: y});
    };
})(jQuery);
