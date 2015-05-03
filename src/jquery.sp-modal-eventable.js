/**
 * jQuery.spModalEventable - An 'eventable' object.
 *
 * This plugin requires jQuery >= 1.7
 *
 * @namespace
 * @name      spModalEventable
 * @author    Gonzalo Chumillas <gchumillas@email.com>
 * @license   https://github.com/soloproyectos/jquery.modal/blob/master/LICENSE MIT License
 * @link      https://github.com/soloproyectos/jquery.modal
 */
(function ($) {
    /**
     * This class represents any object able to capture or throw events.
     * 
     * @param {jQuery.<HTMLElement} Target object
     * 
     * @name spModalEventable#__constructor__
     * @function
     */
    $.spModalEventable = function (target) {
        this._target = target;
    };
    
    /**
     * Target object.
     * @var {jQuery.<HTMLElement>}
     */
    $.spModalEventable.prototype._target = null;
    
    /**
     * Gets the target object.
     * 
     * @return {jQuery.<HTMLElement>}
     * @name spModalEventable#getTarget
     * @function
     */
    $.spModalEventable.prototype.getTarget = function () {
        return this._target;
    };
    
    /**
     * Attaches an event handler.
     * 
     * More info: https://api.jquery.com/on/
     * 
     * @return {jQuery}
     * @name spModalEventable#on
     * @function
     */
    $.spModalEventable.prototype.on = function () {
        var args = Array.prototype.slice.call(arguments);
        
        return this._target.on.apply(this._target, args);
    };
    
    /**
     * Removes an event handler.
     * 
     * More info: https://api.jquery.com/off/
     * 
     * @return {jQuery}
     * @name spModalEventable#off
     * @function
     */
    $.spModalEventable.prototype.off = function () {
        var args = Array.prototype.slice.call(arguments);
        
        return this._target.off.apply(this._target, args);
    }
    
    /**
     * Triggers an event.
     * 
     * More info: https://api.jquery.com/trigger/
     * 
     * @return {jQuery}
     * @name spModalEventable#trigger
     * @function
     */
    $.spModalEventable.prototype.trigger = function (eventType) {
        var args = Array.prototype.slice.call(arguments);
        
        this._target.trigger.apply(this._target, args);
    };
})(jQuery);
