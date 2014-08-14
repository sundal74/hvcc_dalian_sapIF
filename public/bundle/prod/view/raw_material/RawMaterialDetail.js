Ext.define('Prod.view.raw_material.RawMaterialDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.raw_material.RawMaterialForm'
	],
	
	xtype : 'prod_raw_material_detail',
	
	title : T('menu.RawMaterial'),
		
	items : [ {
		xtype : 'prod_raw_material_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});