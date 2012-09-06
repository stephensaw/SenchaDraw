Ext.define('SenchaDraw.view.ViewPanel',{
	extend: 'Ext.Panel',
	xtype: 'viewpanel',

	config: {
		title: 'View',
		items: [
			{
				xtype: 'canvas',
				layout: 'fit'
			}
		]
	}
})