Ext.define('Comp.model.PmsMasterStation', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'routing', type : 'string' },
		{ name : 'equipment', type : 'string' },
		{ name : 'st_no', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'tsfr_alarm_limit', type : 'float' },
		{ name : 'monitor_flg', type : 'boolean' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],

	validations : [
		{type : 'presence', field : 'routing'},
		{type : 'presence', field : 'st_no'},
		{type : 'presence', field : 'name'}
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/pms_master_stations',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});