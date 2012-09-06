Ext.define('SenchaDraw.model.Friend',{
	extend: 'Ext.data.Model',

	config: {
		idProperty: 'id',
		fields: [
			{ name: 'id', type: 'integer' },
			{ name: 'name', type: 'string' }
		]
	}
})