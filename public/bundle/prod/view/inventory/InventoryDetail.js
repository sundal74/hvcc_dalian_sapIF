Ext.define('Prod.view.inventory.InventoryDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.inventory.InventoryForm'
	],
	
	xtype : 'prod_inventory_detail',
	
	title : T('title.inventory'),
	
	width : 600,
		
	height : 350,
	
	items : [ {
		xtype : 'prod_inventory_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});