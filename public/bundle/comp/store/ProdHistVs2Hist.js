Ext.define('Comp.store.ProdHistVs2Hist', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'prd_date', type : 'string' },
		{ name : 'sht', type : 'string' },
		{ name : 'int_no', type : 'string' },
		{ name : 'p_code', type : 'string' },
		{ name : 'serial_no', type : 'string' },
		{ name : 'lbl_code', type : 'string' },
		{ name : 's_plate_thick_1', type : 'string' },
		{ name : 's_plate_thick_2', type : 'string' },
		
		{ name : 's_plate_avg', type : 'string' },
		{ name : 's_plate_torque', type : 'string' },
		{ name : 'load_hinge_pin', type : 'string' },
		{ name : 'ring_check_ok', type : 'string' },
		{ name : 'spring_check_ok', type : 'string' },
		{ name : 'max_angle', type : 'string' },
		{ name : 'min_angle', type : 'string' },
		{ name : 'load_pisto_shoe', type : 'string' },
		
		{ name : 'load_u_shoe', type : 'string' },
		{ name : 'piston_1_shoe_clear', type : 'string' },
		{ name : 'piston_2_shoe_clear', type : 'string' },
		{ name : 'piston_3_shoe_clear', type : 'string' },
		{ name : 'piston_4_shoe_clear', type : 'string' },
		{ name : 'piston_5_shoe_clear', type : 'string' },
		{ name : 'piston_6_shoe_clear', type : 'string' },
		{ name : 'piston_7_shoe_clear', type : 'string' },
		
		{ name : 'piston_1_l_shoe', type : 'string' },
		{ name : 'piston_2_l_shoe', type : 'string' },
		{ name : 'piston_3_l_shoe', type : 'string' },
		{ name : 'piston_4_l_shoe', type : 'string' },
		{ name : 'piston_5_l_shoe', type : 'string' },
		{ name : 'piston_6_l_shoe', type : 'string' },
		{ name : 'piston_7_l_shoe', type : 'string' },
		{ name : 'piston_1_l_rank', type : 'string' },
		
		{ name : 'piston_2_l_rank', type : 'string' },
		{ name : 'piston_3_l_rank', type : 'string' },
		{ name : 'piston_4_l_rank', type : 'string' },
		{ name : 'piston_5_l_rank', type : 'string' },
		{ name : 'piston_6_l_rank', type : 'string' },
		{ name : 'piston_7_l_rank', type : 'string' },
		{ name : 'piston_1_u_shoe', type : 'string' },
		{ name : 'piston_2_u_shoe', type : 'string' },
		
		{ name : 'piston_3_u_shoe', type : 'string' },
		{ name : 'piston_4_u_shoe', type : 'string' },
		{ name : 'piston_5_u_shoe', type : 'string' },
		{ name : 'piston_6_u_shoe', type : 'string' },
		{ name : 'piston_7_u_shoe', type : 'string' },
		{ name : 'piston_1_u_shoe_rank', type : 'string' },
		{ name : 'piston_2_u_shoe_rank', type : 'string' },
		{ name : 'piston_3_u_shoe_rank', type : 'string' },
		
		{ name : 'piston_4_u_shoe_rank', type : 'string' },
		{ name : 'piston_5_u_shoe_rank', type : 'string' },
		{ name : 'piston_6_u_shoe_rank', type : 'string' },
		{ name : 'piston_7_u_shoe_rank', type : 'string' },
		{ name : 'show_check_ok', type : 'string' },
		{ name : 'cyl_height', type : 'string' },
		{ name : 'end_clear', type : 'string' },
		{ name : 'final_race_thick', type : 'string' },
		
		{ name : 'final_race_rank', type : 'string' },
		{ name : 'piston_1_top_clear', type : 'string' },
		{ name : 'piston_2_top_clear', type : 'string' },
		{ name : 'piston_3_top_clear', type : 'string' },
		{ name : 'piston_4_top_clear', type : 'string' },
		{ name : 'piston_5_top_clear', type : 'string' },
		{ name : 'piston_6_top_clear', type : 'string' },
		{ name : 'piston_7_top_clear', type : 'string' }
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