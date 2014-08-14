Ext.define('Prod.view.machine_loss.MachineLoss', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.machine_loss.MachineLossSearch',
		'Prod.view.machine_loss.MachineLossList'
	],
	
	xtype : 'prod_machine_loss',
	
	title : T('title.machine_loss'),
	
	searchView : 'prod_machine_loss_search',
	
	gridView : 'prod_machine_loss_list'
	
});