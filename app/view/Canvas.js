Ext.define('SenchaDraw.view.Canvas', {
    extend: 'Ext.Component',
    xtype: 'canvas',
    
    template: [
        {
            tag: 'canvas', //this will create a <canvas> in html
            reference: 'canvas', //this will be use in the initialize
            className: Ext.baseCSSPrefix + 'canvas'
        }
    ],

    initialize: function() {
        this.canvas.on({
            tap: 'onTap',
            touchstart: 'onTouchStart',
            touchend: 'onTouchEnd',
            touchmove: 'onTouchMove',
            scope: this
        });
    },

    onTap:function(e) {
        this.fireEvent('tap',this,e);
    },
    onTouchStart:function(e) {
        this.fireEvent('touchstart',this,e);
    },
    onTouchEnd:function(e) {
        this.fireEvent('touchend',this,e);
    },
    onTouchMove:function(e) {
        this.fireEvent('touchmove',this,e);
    }
});