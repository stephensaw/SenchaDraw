Ext.define('SenchaDraw.view.MainView',{
	extend: 'Ext.navigation.View',
	xtype: 'mainview',

	config: {
		title: 'Friends',
		navigationBar: {
			items: [
				{
					xtype: 'button',
					text: 'Draw',
					align: 'right',
					hidden: true
				}
			]
		},
		items: [
			{ xtype: 'friendlist' }
		]
	}
})