Ext.application({
	name: 'SenchaDraw',
	requires: ['SenchaDraw.view.Viewport'],
	controllers: ['Draw'],
	models: ['Friend'],
	stores: ['Friend'],
	views: ['MainView','FriendList','ViewPanel','Editor','Canvas'],

	launch: function() {
		Ext.create('SenchaDraw.view.Viewport')
	}
});