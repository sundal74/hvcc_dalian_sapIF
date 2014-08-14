Ext.define('Comp.store.ProdHistHsHist', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'prd_date', type : 'string' },
		{ name : 'sht', type : 'string' },
		{ name : 'int_no', type : 'string' },
		{ name : 'p_code', type : 'string' },
		{ name : 'serial_no', type : 'string' },
		{ name : 'lbl_code', type : 'string' },
		{ name : 'ins_force_front', type : 'string' },
		{ name : 'ins_force_rear', type : 'string' },
		
		{ name : 'piston_blst_dis1', type : 'string' },
		{ name : 'piston_blst_dis2', type : 'string' },
		{ name : 'piston_blst_dis3', type : 'string' },
		{ name : 'piston_blst_dis4', type : 'string' },
		{ name : 'piston_blst_dis5', type : 'string' },
		{ name : 'splate_thick1', type : 'string' },
		{ name : 'splate_thick2', type : 'string' },
		{ name : 'splate_thick_ave', type : 'string' },
		
		{ name : 'splate_blst_dis1_grade', type : 'string' },
		{ name : 'splate_blst_dis2_grade', type : 'string' },
		{ name : 'splate_blst_dis3_grade', type : 'string' },
		{ name : 'splate_blst_dis4_grade', type : 'string' },
		{ name : 'splate_blst_dis5_grade', type : 'string' },
		{ name : 'piston_blst_dis1_shoe', type : 'string' },
		{ name : 'piston_blst_dis2_shoe', type : 'string' },
		{ name : 'piston_blst_dis3_shoe', type : 'string' },
		
		{ name : 'piston_blst_dis4_shoe', type : 'string' },
		{ name : 'piston_blst_dis5_shoe', type : 'string' },
		{ name : 'cyl_hgt_frt', type : 'string' },
		{ name : 'hgt_rear_and_sw', type : 'string' },
		{ name : 'finalrace_thick', type : 'string' },
		{ name : 'finalrace_grade', type : 'string' },
		{ name : 'shaft_end_play', type : 'string' },
		{ name : 'max_shaft_toq', type : 'string' },
		
		{ name : 'piston_end_play1', type : 'string' },
		{ name : 'piston_end_play2', type : 'string' },
		{ name : 'piston_end_play3', type : 'string' },
		{ name : 'piston_end_play4', type : 'string' },
		{ name : 'piston_end_play5', type : 'string' },
		{ name : 'head_bolt1_toq', type : 'string' },
		{ name : 'head_bolt2_toq', type : 'string' },
		{ name : 'head_bolt3_toq', type : 'string' },
		
		{ name : 'head_bolt4_toq', type : 'string' },
		{ name : 'head_bolt5_toq', type : 'string' },
		{ name : 'manifold_bolt1_toq', type : 'string' },
		{ name : 'manifold_bolt2_toq', type : 'string' },
		{ name : 'manifold_bolt3_toq', type : 'string' },
		{ name : 'manifold_bolt4_toq', type : 'string' },
		{ name : 'pre_decay', type : 'string' },
		{ name : 'pre_decay_leak', type : 'string' },
		
		{ name : 'vac_decay', type : 'string' },
		{ name : 'vac_decay_leak', type : 'string' },
		{ name : 'vacuum', type : 'string' },
		{ name : 'he_charge', type : 'string' },
		{ name : 'he_leak_rate', type : 'string' },
		{ name : 'he_leak_rate_std', type : 'string' },
		{ name : 'he_reclaim', type : 'string' },
		{ name : 'fnc_vaccum', type : 'string' },
		
		{ name : 'fnc_v_leak', type : 'string' },
		{ name : 'fnc_pressure', type : 'string' },
		{ name : 'fnc_p_leak', type : 'string' },
		{ name : 'rot_toq', type : 'string' },
		{ name : 'noise_band1', type : 'string' },
		{ name : 'noise_band2', type : 'string' },
		{ name : 'noise_band3', type : 'string' },
		{ name : 'noise_band4', type : 'string' }
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