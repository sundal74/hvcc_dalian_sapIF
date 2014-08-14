Ext.define('Prod.view.qty_actual.QtyActualDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.qty_actual.QtyActualForm'
	],
	
	xtype : 'prod_qty_actual_detail',
	
	title : T('title.qty_actual'),
		
	items : [ {
		xtype : 'prod_qty_actual_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});