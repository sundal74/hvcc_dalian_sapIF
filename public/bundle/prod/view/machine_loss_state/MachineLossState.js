Ext.define('Prod.view.machine_loss_state.MachineLossState', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.machine_loss_state.MachineLossStateSearch',
		'Prod.view.machine_loss_state.MachineLossStateList'
	],
	
	xtype : 'prod_machine_loss_state',
	
	title : T('title.machine_loss_state'),
	
	searchView : 'prod_machine_loss_state_search',
	
	gridView : 'prod_machine_loss_state_list'

});