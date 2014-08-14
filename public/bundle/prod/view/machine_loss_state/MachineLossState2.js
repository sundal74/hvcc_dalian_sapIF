Ext.define('Prod.view.machine_loss_state.MachineLossState2', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.machine_loss_state.MachineLossState2Search',
		'Prod.view.machine_loss_state.MachineLossState2List'
	],
	
	xtype : 'prod_machine_loss_state2',
	
	title : T('title.machine_loss_state2'),
	
	searchView : 'prod_machine_loss_state2_search',
	
	gridView : 'prod_machine_loss_state2_list'

});