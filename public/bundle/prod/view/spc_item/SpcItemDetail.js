Ext.define('Prod.view.spc_item.SpcItemDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.spc_item.SpcItemForm'
	],
	
	xtype : 'prod_spc_item_detail',
	
	title : T('title.spc_item'),
	
	height : 470,
		
	items : [ {
		xtype : 'prod_spc_item_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});