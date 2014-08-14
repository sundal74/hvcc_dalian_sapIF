Ext.define('Prod.view.lot.LotDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.lot.LotForm'
	],
	
	xtype : 'prod_lot_detail',
	
	title : T('title.lot'),
		
	items : [ {
		xtype : 'prod_lot_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});