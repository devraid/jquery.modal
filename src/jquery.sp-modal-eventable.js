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
     * This class represents any object able to capture or throw events.
     * 
     * @param {jQuery.<HTMLElement>} Target object
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
     */
    $.spModalEventable.prototype.trigger = function (eventType) {
        var args = Array.prototype.slice.call(arguments);
        
        this._target.trigger.apply(this._target, args);
    };
})(jQuery);
