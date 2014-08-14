Ext.define('Prod.view.inventory_hist.InventoryHistDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.inventory_hist.InventoryHistForm'
	],
	
	xtype : 'prod_inventory_hist_detail',
	
	title : T('title.inventory_hist'),
	
	items : [ {
		xtype : 'prod_inventory_hist_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});