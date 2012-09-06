Ext.define('SenchaDraw.view.FriendList',{
	extend: 'Ext.dataview.List',
	xtype: 'friendlist',

	config: {
		title: 'Friends',
		store: 'Friend',
		itemTpl: [
			'<div>{name}</div>'
		],
		disableSelection: true,
		onItemDisclosure: function(record,btn,index){
			this.fireEvent('viewDrawCommand', record);
		}
	}
})