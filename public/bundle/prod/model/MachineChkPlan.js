Ext.define('Prod.model.MachineChkPlan', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'machine_id', type : 'string' },
		{ name : 'machine', type : 'auto' },
		{ name : 'status', type : 'string' },
		{ name : 'plan_date', type : 'date', dateWriteFormat : T('format.submitDate') },
		{ name : 'due_date', type : 'date', dateWriteFormat : T('format.submitDate') },
		{ name : 'check_date', type : 'date', dateWriteFormat : T('format.submitDate') },
		{ name : 'start_time', type : 'date', dateWriteFormat : T('format.submitDatetime') },
		{ name : 'end_time', type : 'date', dateWriteFormat : T('format.submitDatetime') },
		{ name : 'work_term', type : 'integer' },
		{ name : 'chk_comment', type : 'string' },
		{ name : 'pm_part', type : 'string' },
		{ name : 'pm_type', type : 'string' },
		{ name : 'reporter', type : 'string' },
		{ name : 'inspector_id', type : 'string' },
		{ name : 'inspector', type : 'auto' },
		{ name : 'checker_count', type : 'string' },
		{ name : 'total_work_term', type : 'integer' },
		{ name : 'upload_flag', type : 'boolean' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],

	/*validations : [
		{type : 'presence', field : 'name'}
	],*/
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/machine_chk_plans',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});