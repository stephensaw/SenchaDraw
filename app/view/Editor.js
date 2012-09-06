Ext.define('SenchaDraw.view.Editor',{
	extend: 'Ext.Panel',
	xtype: 'editor',

	requires: ['Ext.Toolbar'],

	initialize: function() {
		var toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			title: 'Draw!',
			items: [
				{
					xtype: 'button',
					text: 'Cancel',
					ui: 'back',
					handler: this.onCancelDraw,
					scope: this
				},
				{ xtype: 'spacer' },
				{
					xtype: 'button',
					text: 'Done',
					ui: 'confirm',
					handler: this.onFinishDraw,
					scope: this
				}
			]
		};

		this.add(toolbar);
	},

	config: {
		items: [
			{
				xtype: 'canvas',
				layout: 'fit'
			}
		]
	},

	onFinishDraw: function() {
		this.fireEvent('finishDrawCommand',this);
	},

	onCancelDraw: function() {
		this.fireEvent('cancelDrawCommand',this);
	}
})