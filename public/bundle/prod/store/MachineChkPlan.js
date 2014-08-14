Ext.define('Prod.store.MachineChkPlan', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Prod.model.MachineChkPlan',
	
	model : 'Prod.model.MachineChkPlan',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	buffered : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/machine_chk_plans',
		format : 'json',
	    reader: {
			type: 'json',
			root: 'items',
			successProperty : 'success',
			totalProperty : 'total'
        },
        writer: {
			type: 'json'
        }
	}
	
});