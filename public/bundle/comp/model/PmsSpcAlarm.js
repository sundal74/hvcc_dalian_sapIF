Ext.define('Comp.model.PmsSpcAlarm', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'prd_date', type : 'string' },
		{ name : 'seq', type : 'integer' },
		{ name : 'routing', type : 'string' },
		{ name : 'st_no', type : 'string' },
		{ name : 'p_code', type : 'string' },
		{ name : 'item_no', type : 'string' },
		{ name : 'alarm_type', type : 'string' },
		{ name : 'val1', type : 'float' },
		{ name : 'val2', type : 'float' },
		{ name : 'val3', type : 'float' },
		{ name : 'val4', type : 'float' },
		{ name : 'val5', type : 'float' },
		{ name : 'actdttm', type : 'string' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/pms_spc_alarms',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});