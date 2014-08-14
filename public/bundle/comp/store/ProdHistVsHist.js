Ext.define('Comp.store.ProdHistVsHist', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'prd_date', type : 'string' },
		{ name : 'sht', type : 'string' },
		{ name : 'int_no', type : 'string' },
		{ name : 'p_code', type : 'string' },
		{ name : 'serial_no', type : 'string' },
		{ name : 'lbl_code', type : 'string' },
		{ name : 'dpin_ins_force10_1', type : 'string' },
		{ name : 'dpin_ins_force10_2', type : 'string' },
		
		{ name : 'muffler_plate_ins_force', type : 'string' },
		{ name : 'prv_torque', type : 'string' },
		{ name : 'vvplate_rvt_force', type : 'string' },
		{ name : 'dpin_ins_force40_1', type : 'string' },
		{ name : 'dpin_ins_force40_2', type : 'string' },
		{ name : 'nrb_ins_force040', type : 'string' },
		{ name : 'ring_ins_depth050', type : 'string' },
		{ name : 'splate_thick1', type : 'string' },
		
		{ name : 'splate_thick2', type : 'string' },		
		{ name : 'splate_thick_avg', type : 'string' },
		{ name : 'splate_torque', type : 'string' },
		{ name : 'ring_check', type : 'string' },
		{ name : 'splate_max_angle', type : 'string' },
		{ name : 'splate_min_angle', type : 'string' },
		{ name : 'piston_lower1', type : 'string' },
		{ name : 'piston_lower2', type : 'string' },
		
		{ name : 'piston_lower3', type : 'string' },
		{ name : 'piston_lower4', type : 'string' },
		{ name : 'piston_lower5', type : 'string' },
		{ name : 'piston_lower6', type : 'string' },
		{ name : 'piston_lower7', type : 'string' },
		{ name : 'piston_lower_grade1', type : 'string' },
		{ name : 'piston_lower_grade2', type : 'string' },
		{ name : 'piston_lower_grade3', type : 'string' },
		
		{ name : 'piston_lower_grade4', type : 'string' },
		{ name : 'piston_lower_grade5', type : 'string' },
		{ name : 'piston_lower_grade6', type : 'string' },
		{ name : 'piston_lower_grade7', type : 'string' },
		{ name : 'piston_upper1', type : 'string' },
		{ name : 'piston_upper2', type : 'string' },
		{ name : 'piston_upper3', type : 'string' },
		{ name : 'piston_upper4', type : 'string' },
		
		{ name : 'piston_upper5', type : 'string' },
		{ name : 'piston_upper6', type : 'string' },
		{ name : 'piston_upper7', type : 'string' },
		{ name : 'piston_upper_grade1', type : 'string' },
		{ name : 'piston_upper_grade2', type : 'string' },
		{ name : 'piston_upper_grade3', type : 'string' },
		{ name : 'piston_upper_grade4', type : 'string' },
		{ name : 'piston_upper_grade5', type : 'string' },
		
		{ name : 'piston_upper_grade6', type : 'string' },
		{ name : 'piston_upper_grade7', type : 'string' },
		{ name : 'piston_shoe_clearance1', type : 'string' },
		{ name : 'piston_shoe_clearance2', type : 'string' },
		{ name : 'piston_shoe_clearance3', type : 'string' },
		{ name : 'piston_shoe_clearance4', type : 'string' },
		{ name : 'piston_shoe_clearance5', type : 'string' },
		{ name : 'piston_shoe_clearance6', type : 'string' },
		
		{ name : 'piston_shoe_clearance7', type : 'string' },
		{ name : 'piston_shoe_check_l1', type : 'string' },
		{ name : 'piston_shoe_check_l2', type : 'string' },
		{ name : 'piston_shoe_check_l3', type : 'string' },
		{ name : 'piston_shoe_check_l4', type : 'string' },
		{ name : 'piston_shoe_check_l5', type : 'string' },
		{ name : 'piston_shoe_check_l6', type : 'string' },
		{ name : 'piston_shoe_check_l7', type : 'string' }
	],
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	pageSize : 50,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/PmsHistHists/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
		
});