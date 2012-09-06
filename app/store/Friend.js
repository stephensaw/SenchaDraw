Ext.define('SenchaDraw.store.Friend',{
	extend: 'Ext.data.Store',
	requires: ['SenchaDraw.model.Friend'],

	config: {
		model: 'SenchaDraw.model.Friend',
		data: [
			{ id: 1, name: 'Bill Gates' },
			{ id: 2, name: 'Steve Jobs' }
		],
		autoLoad: true
	}
})