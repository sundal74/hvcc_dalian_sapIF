Ext.define('Comp.view.prod_hist.ProdHistHsHistsPopup', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Comp.store.ProdHistHsHist'],
	
	xtype : 'comp_prod_hist_hs_hists_popup',
	
	title : T('title.prod_hist_hists'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	width : 1100,
	
	height : 630,
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'close']
	} ],
	
	store : Ext.create('Comp.store.ProdHistHsHist'),
	
	items: [{
		xtype : 'grid',
		
		width : 60,
		
		itemId : 'grid1',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'prd_date', type : 'string' },
				{ name : 'sht', type : 'string' },
				{ name : 'int_no', type : 'string' },
				{ name : 'p_code', type : 'string' },
				{ name : 'serial_no', type : 'string' },
				{ name : 'lbl_code', type : 'string' },
				{ name : 'ins_force_front', type : 'string' },
				{ name : 'ins_force_rear', type : 'string' }
			]
		}),

		columns : [ {
			text : T('label.work_date'),
			dataIndex : 'prd_date',
			align : 'center',
			width : 130
		}, {
			text : T('label.shift'),
			dataIndex : 'sht',
			align : 'center',
			width : 130
		}, {
			text : T('label.int_no'),
			dataIndex : 'int_no',
			width : 130
		}, {
			text : T('label.p_code'),
			dataIndex : 'p_code',
			width : 130
		}, {
			text : T('label.ser_no'),
			dataIndex : 'serial_no',
			width : 130
		}, {
			text : 'Lbl Code',
			dataIndex : 'lbl_code',
			width : 130
		}, {
			text : 'ins_force_front',
			dataIndex : 'ins_force_front',
			width : 130
		}, {
			text : 'ins_force_rear',
			dataIndex : 'ins_force_rear',
			width : 130
		} ]
	}, {
		xtype : 'grid',
        
		width : 60,
        
		itemId : 'grid2',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'piston_blst_dis1', type : 'string' },
				{ name : 'piston_blst_dis2', type : 'string' },
				{ name : 'piston_blst_dis3', type : 'string' },
				{ name : 'piston_blst_dis4', type : 'string' },
				{ name : 'piston_blst_dis5', type : 'string' },
				{ name : 'splate_thick1', type : 'string' },
				{ name : 'splate_thick2', type : 'string' },
				{ name : 'splate_thick_ave', type : 'string' }
			]
		}),
        
		columns : [ {
			text : 'piston_blst_dis1',
			dataIndex : 'piston_blst_dis1',
			width : 130 
		}, {
			text : 'piston_blst_dis2',
			dataIndex : 'piston_blst_dis2',
			width : 130
		}, {
			text : 'piston_blst_dis3',
			dataIndex : 'piston_blst_dis3',
			align : 'center',
			width : 130
		}, {
			text : 'piston_blst_dis4',
			dataIndex : 'piston_blst_dis4',
			align : 'center',
			width : 130
		}, {
			text : 'piston_blst_dis5',
			dataIndex : 'piston_blst_dis5',
			width : 130
		}, {
			text : 'splate_thick1',
			dataIndex : 'splate_thick1',
			width : 130
		}, {
			text : 'splate_thick2',
			dataIndex : 'splate_thick2',
			width : 130
		}, {
			text : 'splate_thick_ave',
			dataIndex : 'splate_thick_ave',
			width : 130
		} ]
	}, {
		xtype : 'grid',
        
		width : 60,
        
		itemId : 'grid3',
        
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'splate_blst_dis1_grade', type : 'string' },
				{ name : 'splate_blst_dis2_grade', type : 'string' },
				{ name : 'splate_blst_dis3_grade', type : 'string' },
				{ name : 'splate_blst_dis4_grade', type : 'string' },
				{ name : 'splate_blst_dis5_grade', type : 'string' },
				{ name : 'piston_blst_dis1_shoe', type : 'string' },
				{ name : 'piston_blst_dis2_shoe', type : 'string' },
				{ name : 'piston_blst_dis3_shoe', type : 'string' }
			]
		}),
        
		columns : [ {
			text : 'splate_blst_dis1_grade',
			dataIndex : 'splate_blst_dis1_grade',
			width : 130
		}, {
			text : 'splate_blst_dis2_grade',
			dataIndex : 'splate_blst_dis2_grade',
			width : 130
		}, {
			text : 'splate_blst_dis3_grade',
			dataIndex : 'splate_blst_dis3_grade',
			width : 130
		}, {
			text : 'splate_blst_dis4_grade',
			dataIndex : 'splate_blst_dis4_grade',
			width : 130
		}, {
			text : 'splate_blst_dis5_grade',
			dataIndex : 'splate_blst_dis5_grade',
			width : 130
		}, {
			text : 'piston_blst_dis1_shoe',
			dataIndex : 'piston_blst_dis1_shoe',
			width : 130
		}, {
			text : 'piston_blst_dis2_shoe',
			dataIndex : 'piston_blst_dis2_shoe',
			width : 130
		}, {
			text : 'piston_blst_dis3_shoe',
			dataIndex : 'piston_blst_dis3_shoe',
			width : 130
		} ]
	}, {
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid4',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'piston_blst_dis4_shoe', type : 'string' },
				{ name : 'piston_blst_dis5_shoe', type : 'string' },
				{ name : 'cyl_hgt_frt', type : 'string' },
				{ name : 'hgt_rear_and_sw', type : 'string' },
				{ name : 'finalrace_thick', type : 'string' },
				{ name : 'finalrace_grade', type : 'string' },
				{ name : 'shaft_end_play', type : 'string' },
				{ name : 'max_shaft_toq', type : 'string' }
			]
		}),
    
		columns : [ {
			text : 'piston_blst_dis4_shoe',
			dataIndex : 'piston_blst_dis4_shoe',
			width : 130
		}, {
			text : 'piston_blst_dis5_shoe',
			dataIndex : 'piston_blst_dis5_shoe',
			width : 130
		}, {
			text : 'cyl_hgt_frt',
			dataIndex : 'cyl_hgt_frt',
			width : 130
		}, {
			text : 'hgt_rear_and_sw',
			dataIndex : 'hgt_rear_and_sw',
			width : 130
		}, {
			text : 'finalrace_thick',
			dataIndex : 'finalrace_thick',
			width : 130
		}, {
			text : 'finalrace_grade',
			dataIndex : 'finalrace_grade',
			width : 130
		}, {
			text : 'shaft_end_play',
			dataIndex : 'shaft_end_play',
			width : 130
		}, {
			text : 'max_shaft_toq',
			dataIndex : 'max_shaft_toq',
			width : 130
		} ]
	}, {
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid5',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'piston_end_play1', type : 'string' },
				{ name : 'piston_end_play2', type : 'string' },
				{ name : 'piston_end_play3', type : 'string' },
				{ name : 'piston_end_play4', type : 'string' },
				{ name : 'piston_end_play5', type : 'string' },
				{ name : 'head_bolt1_toq', type : 'string' },
				{ name : 'head_bolt2_toq', type : 'string' },
				{ name : 'head_bolt3_toq', type : 'string' }
			]
		}),
    
		columns : [ {
			text : 'piston_end_play1',
			dataIndex : 'piston_end_play1',
			width : 130
		}, {
			text : 'piston_end_play2',
			dataIndex : 'piston_end_play2',
			width : 130
		}, {
			text : 'piston_end_play3',
			dataIndex : 'piston_end_play3',
			width : 130
		}, {
			text : 'piston_end_play4',
			dataIndex : 'piston_end_play4',
			width : 130
		}, {
			text : 'piston_end_play5',
			dataIndex : 'piston_end_play5',
			width : 130
		}, {
			text : 'head_bolt1_toq',
			dataIndex : 'head_bolt1_toq',
			width : 130
		}, {
			text : 'head_bolt2_toq',
			dataIndex : 'head_bolt2_toq',
			width : 130
		}, {
			text : 'head_bolt3_toq',
			dataIndex : 'head_bolt3_toq',
			width : 130
		} ]
	}, {
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid6',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'head_bolt4_toq', type : 'string' },
				{ name : 'head_bolt5_toq', type : 'string' },
				{ name : 'manifold_bolt1_toq', type : 'string' },
				{ name : 'manifold_bolt2_toq', type : 'string' },
				{ name : 'manifold_bolt3_toq', type : 'string' },
				{ name : 'manifold_bolt4_toq', type : 'string' },
				{ name : 'pre_decay', type : 'string' },
				{ name : 'pre_decay_leak', type : 'string' }
			]
		}),
    
		columns : [ {
			text : 'head_bolt4_toq',
			dataIndex : 'head_bolt4_toq',
			width : 130
		}, {
			text : 'head_bolt5_toq',
			dataIndex : 'head_bolt5_toq',
			width : 130
		}, {
			text : 'manifold_bolt1_toq',
			dataIndex : 'manifold_bolt1_toq',
			width : 130
		}, {
			text : 'manifold_bolt2_toq',
			dataIndex : 'manifold_bolt2_toq',
			width : 130
		}, {
			text : 'manifold_bolt3_toq',
			dataIndex : 'manifold_bolt3_toq',
			width : 130
		}, {
			text : 'manifold_bolt4_toq',
			dataIndex : 'manifold_bolt4_toq',
			width : 130
		}, {
			text : 'pre_decay',
			dataIndex : 'pre_decay',
			width : 130
		}, {
			text : 'pre_decay_leak',
			dataIndex : 'pre_decay_leak',
			width : 130
		} ]
	}, {
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid7',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'piston_upper_grade6', type : 'string' },
				{ name : 'piston_upper_grade7', type : 'string' },
				{ name : 'piston_shoe_clearance1', type : 'string' },
				{ name : 'piston_shoe_clearance2', type : 'string' },
				{ name : 'piston_shoe_clearance3', type : 'string' },
				{ name : 'piston_shoe_clearance4', type : 'string' },
				{ name : 'piston_shoe_clearance5', type : 'string' },
				{ name : 'piston_shoe_clearance6', type : 'string' }
			]
		}),
    
		columns : [ {
			text : 'piston_upper_grade6',
			dataIndex : 'piston_upper_grade6',
			width : 130
		}, {
			text : 'piston_upper_grade7',
			dataIndex : 'piston_upper_grade7',
			width : 130
		}, {
			text : 'piston_shoe_clearance1',
			dataIndex : 'piston_shoe_clearance1',
			width : 130
		}, {
			text : 'piston_shoe_clearance2',
			dataIndex : 'piston_shoe_clearance2',
			width : 130
		}, {
			text : 'piston_shoe_clearance3',
			dataIndex : 'piston_shoe_clearance3',
			width : 130
		}, {
			text : 'piston_shoe_clearance4',
			dataIndex : 'piston_shoe_clearance4',
			width : 130
		}, {
			text : 'piston_shoe_clearance5',
			dataIndex : 'piston_shoe_clearance5',
			width : 130
		}, {
			text : 'piston_shoe_clearance6',
			dataIndex : 'piston_shoe_clearance6',
			width : 130
		} ]
	}, 	{
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid8',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'vac_decay', type : 'string' },
				{ name : 'vac_decay_leak', type : 'string' },
				{ name : 'vacuum', type : 'string' },
				{ name : 'he_charge', type : 'string' },
				{ name : 'he_leak_rate', type : 'string' },
				{ name : 'he_leak_rate_std', type : 'string' },
				{ name : 'he_reclaim', type : 'string' },
				{ name : 'fnc_vaccum', type : 'string' }
			]
		}),
    
		columns : [ {
			text : 'vac_decay',
			dataIndex : 'vac_decay',
			width : 130
		}, {
			text : 'vac_decay_leak',
			dataIndex : 'vac_decay_leak',
			width : 130
		}, {
			text : 'vacuum',
			dataIndex : 'vacuum',
			width : 130
		}, {
			text : 'he_charge',
			dataIndex : 'he_charge',
			width : 130
		}, {
			text : 'he_leak_rate',
			dataIndex : 'he_leak_rate',
			width : 130
		}, {
			text : 'he_leak_rate_std',
			dataIndex : 'he_leak_rate_std',
			width : 130
		}, {
			text : 'he_reclaim',
			dataIndex : 'he_reclaim',
			width : 130
		}, {
			text : 'fnc_vaccum',
			dataIndex : 'fnc_vaccum',
			width : 130
		} ]
	} ]
});