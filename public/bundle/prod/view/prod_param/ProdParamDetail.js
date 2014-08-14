Ext.define('Prod.view.prod_param.ProdParamDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.prod_param.ProdParamForm'
	],
	
	xtype : 'prod_prod_param_detail',
	
	title : T('title.prod_param'),
	
	items : [ {
		xtype : 'prod_prod_param_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});