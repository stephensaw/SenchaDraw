Ext.define('SenchaDraw.view.Viewport',{
	extend: 'Ext.Panel',

	config: {
		fullscreen: true,
		layout: 'card',
		items: [{ xtype: 'mainview' }]
	}
})