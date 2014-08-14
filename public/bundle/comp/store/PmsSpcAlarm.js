Ext.define('Comp.store.PmsSpcAlarm', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Comp.model.PmsSpcAlarm',
	
	model : 'Comp.model.PmsSpcAlarm',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	pageSize : 50,
	
	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/pms_spc_alarms',
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