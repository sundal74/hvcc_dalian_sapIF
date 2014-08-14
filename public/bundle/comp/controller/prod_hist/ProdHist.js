/**
 * ProdHist controller
 */
Ext.define('Comp.controller.prod_hist.ProdHist', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : [
		'Comp.store.ProdHist',
		'Comp.view.prod_hist.ProdHist',
		'Comp.view.prod_hist.ProdHistList',
		'Comp.view.prod_hist.ProdHistSearch',
		'Comp.view.prod_hist.ProdHistHsRawsPopup',
		'Comp.view.prod_hist.ProdHistHsHistsPopup',
		'Comp.view.prod_hist.ProdHistVsRawsPopup',
		'Comp.view.prod_hist.ProdHistVsHistsPopup',
		'Comp.view.prod_hist.ProdHistVs2RawsPopup',
		'Comp.view.prod_hist.ProdHistVs2HistsPopup'
	],
	
	models : [],
			
	stores: ['Comp.store.ProdHist'],
	
	views : ['Comp.view.prod_hist.ProdHist'],
	
	refs: [ 
		{ ref : 'ProdHist', selector : 'comp_prod_hist' },
		{ ref : 'ProdHistList', selector : 'comp_prod_hist_list' },
		{ ref : 'ProdHistSubList', selector : 'comp_prod_hist_sub_list' },
		{ ref : 'ProdHistHsRawsPopup', selector : 'comp_prod_hist_hs_raws_popup' },
		{ ref : 'ProdHistHsHistsPopup', selector : 'comp_prod_hist_hs_hists_popup' },
		{ ref : 'ProdHistVsRawsPopup', selector : 'comp_prod_hist_vs_raws_popup' },
		{ ref : 'ProdHistVsHistsPopup', selector : 'comp_prod_hist_vs_hists_popup' },
		{ ref : 'ProdHistVs2RawsPopup', selector : 'comp_prod_hist_vs2_raws_popup' },
		{ ref : 'ProdHistVs2HistsPopup', selector : 'comp_prod_hist_vs2_hists_popup' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_prod_hist' : {
				paramschange : this.onParamsChange
			},
			'comp_prod_hist_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'comp_prod_hist_list' : {
				itemclick : this.onMainGridClick
			},
			'comp_prod_hist_sub_list' : {
				itemclick : this.onSubGridClick
			},
			'comp_prod_hist_hs_raws_popup' : {
				paramschange : this.onRawsPopupParamsChange,
				click_close : this.onClickClose
			},
			'comp_prod_hist_hs_hists_popup' : {
				paramschange : this.onHsHistsPopupParamsChange,
				click_close : this.onClickClose
			},
			'comp_prod_hist_vs_raws_popup' : {
				paramschange : this.onRawsPopupParamsChange,
				click_close : this.onClickClose
			},
			'comp_prod_hist_vs_hists_popup' : {
				paramschange : this.onVsHistsPopupParamsChange,
				click_close : this.onClickClose
			},
			'comp_prod_hist_vs2_raws_popup' : {
				paramschange : this.onRawsPopupParamsChange,
				click_close : this.onClickClose
			},
			'comp_prod_hist_vs2_hists_popup' : {
				paramschange : this.onVs2HistsPopupParamsChange,
				click_close : this.onClickClose
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['work_date-gte']) {
			params['work_date-gte'] = HF.getCurrentShiftDate();
		}
		if(!params['work_date-lte']) {
			params['work_date-lte'] = HF.getCurrentShiftDate();
		}
		if(!params['view_type']) {
			params['view_type'] = 'raw';
		}
		return params;
	},
	
	onMainGridClick : function(grid, record, item, index, e, eOpts) {
		var subGrid = this.getProdHistSubList();
		subStore = subGrid.store;
		subStore.getProxy().extraParams = { 'int_no-eq' : record.data.int_no, 'routing-eq' : record.data.routing };
		subStore.load();
	},
	
	onSubGridClick : function(grid, record, item, index, e, eOpts) {
		var searchParams = this.getSearchForm().getValues();
		var selection = grid.getSelectionModel().getSelection();
		var routing = record.data.routing;
		var rstart = routing.substring(0, 3);
		var view = '';
		
		if(searchParams['view_type'] == 'raw') {
			if(rstart == 'HS1') {
				view = 'Comp.view.prod_hist.ProdHistHsRawsPopup';
			} else if(rstart == 'VS1') {
				view = 'Comp.view.prod_hist.ProdHistVsRawsPopup';
			} else if(rstart == 'VS2') {
				view = 'Comp.view.prod_hist.ProdHistVs2RawsPopup';
			}
		} else {
			if(rstart == 'HS1') {
				view = 'Comp.view.prod_hist.ProdHistHsHistsPopup';
			} else if(rstart == 'VS1') {
				view = 'Comp.view.prod_hist.ProdHistVsHistsPopup';
			} else if(rstart == 'VS2') {
				view = 'Comp.view.prod_hist.ProdHistVs2HistsPopup';
			}
		}
		
		if(view && view != '') {
			HF.popup(view, selection[0].data);
		} else {
			HF.msg.notice('Invalid routing!');
		}
	},

	onRawsPopupParamsChange : function(view, params) {
		var store = view.child('grid').store;
		store.getProxy().extraParams = { 'int_no-eq' : params.int_no, 'p_code-eq' : params.p_code, 'line-eq' : params.routing.substring(0, 3) };
		store.load();
	},
	
	onHsHistsPopupParamsChange : function(view, params) {
		histsStore = view.store;
		histsStore.getProxy().extraParams = { 'int_no-eq' : params.int_no, 'ser_no-eq' : params.ser_no, 'p_code' : params.p_code, 'line-eq' : params.routing.substring(0, 3) };
		histsStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(records && records.length > 0) {
					
					var record = records[0].data;				
					var rec1 = { 'prd_date' : record.prd_date, 'sht' : record.sht, 'int_no' : record.int_no, 'p_code' : record.p_code, 'serial_no' : record.serial_no, 'lbl_code' : record.lbl_code, 'ins_force_front' : record.ins_force_front, 'ins_force_rear' : record.ins_force_rear };
					view.child('#grid1').store.loadRawData(rec1);
				
					var rec2 = { 'piston_blst_dis1' : record.piston_blst_dis1, 'piston_blst_dis2' : record.piston_blst_dis2, 'piston_blst_dis3' : record.piston_blst_dis3, 'piston_blst_dis4' : record.piston_blst_dis4, 'piston_blst_dis5' : record.piston_blst_dis5, 'splate_thick1' : record.splate_thick1, 'splate_thick2' : record.splate_thick2, 'splate_thick_ave' : record.splate_thick_ave };
					view.child('#grid2').store.loadRawData(rec2);
				
					var rec3 = { 'splate_blst_dis1_grade' : record.splate_blst_dis1_grade, 'splate_blst_dis2_grade' : record.splate_blst_dis2_grade, 'splate_blst_dis3_grade' : record.splate_blst_dis3_grade, 'splate_blst_dis4_grade' : record.splate_blst_dis4_grade, 'splate_blst_dis5_grade' : record.splate_blst_dis5_grade, 'piston_blst_dis1_shoe' : record.piston_blst_dis1_shoe, 'piston_blst_dis2_shoe' : record.piston_blst_dis2_shoe, 'piston_blst_dis3_shoe' : record.piston_blst_dis3_shoe };
					view.child('#grid3').store.loadRawData(rec3);
				
					var rec4 = { 'piston_blst_dis4_shoe' : record.piston_blst_dis4_shoe, 'piston_blst_dis5_shoe' : record.piston_blst_dis5_shoe, 'cyl_hgt_frt' : record.cyl_hgt_frt, 'hgt_rear_and_sw' : record.hgt_rear_and_sw, 'finalrace_thick' : record.finalrace_thick, 'finalrace_grade' : record.finalrace_grade, 'shaft_end_play' : record.shaft_end_play, 'max_shaft_toq' : record.max_shaft_toq };
					view.child('#grid4').store.loadRawData(rec4);
				
					var rec5 = { 'piston_lower_grade4' : record.piston_lower_grade4, 'piston_lower_grade5' : record.piston_lower_grade5, 'piston_lower_grade6' : record.piston_lower_grade6, 'piston_lower_grade7' : record.piston_lower_grade7, 'piston_upper1' : record.piston_upper1, 'piston_upper1' : record.piston_upper2, 'piston_upper3' : record.piston_upper3, 'piston_upper4' : record.piston_upper4 };
					view.child('#grid5').store.loadRawData(rec5);

					var rec6 = { 'piston_end_play1' : record.piston_end_play1, 'piston_end_play2' : record.piston_end_play2, 'piston_end_play3' : record.piston_end_play3, 'piston_end_play4' : record.piston_end_play4, 'piston_end_play5' : record.piston_end_play5, 'head_bolt1_toq' : record.head_bolt1_toq, 'head_bolt2_toq' : record.head_bolt2_toq, 'head_bolt3_toq' : record.head_bolt3_toq };
					view.child('#grid6').store.loadRawData(rec6);
				
					var rec7 = { 'head_bolt4_toq' : record.head_bolt4_toq, 'head_bolt5_toq' : record.head_bolt5_toq, 'manifold_bolt1_toq' : record.manifold_bolt1_toq, 'manifold_bolt1_toq' : record.manifold_bolt1_toq, 'manifold_bolt1_toq' : record.manifold_bolt1_toq, 'manifold_bolt1_toq' : record.manifold_bolt1_toq, 'pre_decay' : record.pre_decay, 'pre_decay_leak' : record.pre_decay_leak };
					view.child('#grid7').store.loadRawData(rec7);
				
					var rec8 = { 'vac_decay' : record.vac_decay, 'vac_decay_leak' : record.vac_decay_leak, 'vacuum' : record.vacuum, 'he_charge' : record.he_charge, 'he_leak_rate' : record.he_leak_rate, 'he_leak_rate_std' : record.he_leak_rate_std, 'he_reclaim' : record.he_reclaim, 'fnc_vaccum' : record.fnc_vaccum };
					view.child('#grid8').store.loadRawData(rec8);
				} /*else {
					HF.msg.notice({title : T('text.No Data'), msg : T('text.No Data')});
				}*/
			}
		});
	},
	
	onVsHistsPopupParamsChange : function(view, params) {
		histsStore = view.store;
		histsStore.getProxy().extraParams = { 'int_no-eq' : params.int_no, 'ser_no-eq' : params.ser_no, 'p_code' : params.p_code, 'line-eq' : params.routing.substring(0, 3) };
		histsStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(records && records.length > 0) {
					var record = records[0].data;				
					var rec1 = { 'prd_date' : record.prd_date, 'sht' : record.sht, 'int_no' : record.int_no, 'p_code' : record.p_code, 'serial_no' : record.serial_no, 'lbl_code' : record.lbl_code, 'dpin_ins_force10_1' : record.dpin_ins_force10_1, 'dpin_ins_force10_2' : record.dpin_ins_force10_2 };
					view.child('#grid1').store.loadRawData(rec1);
				
					var rec2 = { 'muffler_plate_ins_force' : record.muffler_plate_ins_force, 'prv_torque' : record.prv_torque, 'vvplate_rvt_force' : record.vvplate_rvt_force, 'dpin_ins_force40_1' : record.dpin_ins_force40_1, 'dpin_ins_force40_2' : record.dpin_ins_force40_2, 'nrb_ins_force040' : record.nrb_ins_force040, 'ring_ins_depth050' : record.ring_ins_depth050, 'splate_thick1' : record.splate_thick1 };
					view.child('#grid2').store.loadRawData(rec2);
				
					var rec3 = { 'splate_thick2' : record.splate_thick2, 'splate_thick_avg' : record.splate_thick_avg, 'splate_torque' : record.splate_torque, 'ring_check' : record.ring_check, 'splate_max_angle' : record.splate_max_angle, 'splate_min_angle' : record.splate_min_angle, 'piston_lower1' : record.piston_lower1, 'piston_lower2' : record.piston_lower2 };
					view.child('#grid3').store.loadRawData(rec3);
				
					var rec4 = { 'piston_lower3' : record.piston_lower3, 'piston_lower4' : record.piston_lower4, 'piston_lower5' : record.piston_lower5, 'piston_lower6' : record.piston_lower6, 'piston_lower7' : record.piston_lower7, 'piston_lower_grade1' : record.piston_lower_grade1, 'piston_lower_grade2' : record.piston_lower_grade2, 'piston_lower_grade3' : record.piston_lower_grade3 };
					view.child('#grid4').store.loadRawData(rec4);
				
					var rec5 = { 'piston_lower_grade4' : record.piston_lower_grade4, 'piston_lower_grade5' : record.piston_lower_grade5, 'piston_lower_grade6' : record.piston_lower_grade6, 'piston_lower_grade7' : record.piston_lower_grade7, 'piston_upper1' : record.piston_upper1, 'piston_upper1' : record.piston_upper2, 'piston_upper3' : record.piston_upper3, 'piston_upper4' : record.piston_upper4 };
					view.child('#grid5').store.loadRawData(rec5);
				
					var rec6 = { 'piston_upper5' : record.piston_upper5, 'piston_upper6' : record.piston_upper6, 'piston_upper7' : record.piston_upper7, 'piston_upper_grade1' : record.piston_upper_grade1, 'piston_upper_grade2' : record.piston_upper_grade2, 'piston_upper_grade3' : record.piston_upper_grade3, 'piston_upper_grade4' : record.piston_upper_grade4, 'piston_upper_grade5' : record.piston_upper_grade5 };
					view.child('#grid6').store.loadRawData(rec6);
				
					var rec7 = { 'piston_upper_grade6' : record.piston_upper_grade6, 'piston_upper_grade7' : record.piston_upper_grade7, 'piston_shoe_clearance1' : record.piston_shoe_clearance1, 'piston_shoe_clearance2' : record.piston_shoe_clearance2, 'piston_shoe_clearance3' : record.piston_shoe_clearance3, 'piston_shoe_clearance4' : record.piston_shoe_clearance4, 'piston_shoe_clearance5' : record.piston_shoe_clearance5, 'piston_shoe_clearance6' : record.piston_shoe_clearance6 };
					view.child('#grid7').store.loadRawData(rec7);
				
					var rec8 = { 'piston_shoe_clearance7' : record.piston_shoe_clearance7, 'piston_shoe_check_l1' : record.piston_shoe_check_l1, 'piston_shoe_check_l2' : record.piston_shoe_check_l2, 'piston_shoe_check_l3' : record.piston_shoe_check_l3, 'piston_shoe_check_l4' : record.piston_shoe_check_l4, 'piston_shoe_check_l5' : record.piston_shoe_check_l5, 'piston_shoe_check_l6' : record.piston_shoe_check_l6, 'piston_shoe_check_l7' : record.piston_shoe_check_l7 };
					view.child('#grid8').store.loadRawData(rec8);
				} /*else {
					HF.msg.notice({title : T('text.No Data'), msg : T('text.No Data')});
				}*/
			}
		});
	},
	
	onVs2HistsPopupParamsChange : function(view, params) {
		histsStore = view.store;
		histsStore.getProxy().extraParams = { 'int_no-eq' : params.int_no, 'ser_no-eq' : params.ser_no, 'p_code' : params.p_code, 'line-eq' : params.routing.substring(0, 3) };
		histsStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(records && records.length > 0) {
					var record = records[0].data;
					var rec1 = { 'prd_date' : record.prd_date, 'sht' : record.sht, 'int_no' : record.int_no, 'p_code' : record.p_code, 'serial_no' : record.serial_no, 'lbl_code' : record.lbl_code, 's_plate_thick_1' : record.s_plate_thick_1, 's_plate_thick_2' : record.s_plate_thick_2 };
					view.child('#grid1').store.loadRawData(rec1);
					
					var rec2 = { 's_plate_avg' : record.s_plate_avg, 's_plate_torque' : record.s_plate_torque, 'load_hinge_pin' : record.load_hinge_pin, 'ring_check_ok' : record.ring_check_ok, 'spring_check_ok' : record.spring_check_ok, 'max_angle' : record.max_angle, 'min_angle' : record.min_angle, 'load_pisto_shoe' : record.load_pisto_shoe };
					view.child('#grid2').store.loadRawData(rec2);
				
					var rec3 = { 'load_u_shoe' : record.load_u_shoe, 'piston_1_shoe_clear' : record.piston_1_shoe_clear, 'piston_2_shoe_clear' : record.piston_2_shoe_clear, 'piston_3_shoe_clear' : record.piston_3_shoe_clear, 'piston_4_shoe_clear' : record.piston_4_shoe_clear, 'piston_5_shoe_clear' : record.piston_5_shoe_clear, 'piston_6_shoe_clear' : record.piston_6_shoe_clear, 'piston_7_shoe_clear' : record.piston_7_shoe_clear };
					view.child('#grid3').store.loadRawData(rec3);
				
					var rec4 = { 'piston_1_l_shoe' : record.piston_1_l_shoe, 'piston_2_l_shoe' : record.piston_2_l_shoe, 'piston_3_l_shoe' : record.piston_3_l_shoe, 'piston_4_l_shoe' : record.piston_4_l_shoe, 'piston_5_l_shoe' : record.piston_5_l_shoe, 'piston_6_l_shoe' : record.piston_6_l_shoe, 'piston_7_l_shoe' : record.piston_7_l_shoe, 'piston_1_l_rank' : record.piston_1_l_rank };
					view.child('#grid4').store.loadRawData(rec4);
				
					var rec5 = { 'piston_2_l_rank' : record.piston_2_l_rank, 'piston_3_l_rank' : record.piston_3_l_rank, 'piston_4_l_rank' : record.piston_4_l_rank, 'piston_5_l_rank' : record.piston_5_l_rank, 'piston_6_l_rank' : record.piston_6_l_rank, 'piston_7_l_rank' : record.piston_7_l_rank, 'piston_1_u_shoe' : record.piston_1_u_shoe, 'piston_2_u_shoe' : record.piston_2_u_shoe };
					view.child('#grid5').store.loadRawData(rec5);
				
					var rec6 = { 'piston_3_u_shoe' : record.piston_3_u_shoe, 'piston_4_u_shoe' : record.piston_4_u_shoe, 'piston_5_u_shoe' : record.piston_5_u_shoe, 'piston_6_u_shoe' : record.piston_6_u_shoe, 'piston_7_u_shoe' : record.piston_7_u_shoe, 'piston_1_u_shoe_rank' : record.piston_1_u_shoe_rank, 'piston_2_u_shoe_rank' : record.piston_2_u_shoe_rank, 'piston_3_u_shoe_rank' : record.piston_3_u_shoe_rank };
					view.child('#grid6').store.loadRawData(rec6);
				
					var rec7 = { 'piston_4_u_shoe_rank' : record.piston_4_u_shoe_rank, 'piston_5_u_shoe_rank' : record.piston_5_u_shoe_rank, 'piston_6_u_shoe_rank' : record.piston_6_u_shoe_rank, 'piston_7_u_shoe_rank' : record.piston_7_u_shoe_rank, 'show_check_ok' : record.show_check_ok, 'cyl_height' : record.cyl_height, 'end_clear' : record.end_clear, 'final_race_thick' : record.final_race_thick };
					view.child('#grid7').store.loadRawData(rec7);
				
					var rec8 = { 'final_race_rank' : record.final_race_rank, 'piston_1_top_clear' : record.piston_1_top_clear, 'piston_2_top_clear' : record.piston_2_top_clear, 'piston_3_top_clear' : record.piston_3_top_clear, 'piston_4_top_clear' : record.piston_4_top_clear, 'piston_5_top_clear' : record.piston_5_top_clear, 'piston_6_top_clear' : record.piston_6_top_clear, 'piston_7_top_clear' : record.piston_7_top_clear };
					view.child('#grid8').store.loadRawData(rec8);
				} /*else {
					HF.msg.notice({title : T('text.No Data'), msg : T('text.No Data')});
				}*/
			}
		});
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getProdHist();
	}
});