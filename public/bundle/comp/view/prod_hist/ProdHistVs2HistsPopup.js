Ext.define('Comp.view.prod_hist.ProdHistVs2HistsPopup', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Comp.store.ProdHistVs2Hist'],
	
	xtype : 'comp_prod_hist_vs2_hists_popup',
	
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
	
	store : Ext.create('Comp.store.ProdHistVs2Hist'),
	
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
				{ name : 's_plate_thick_1', type : 'string' },
				{ name : 's_plate_thick_2', type : 'string' }
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
			text : 's_plate_thick_1',
			dataIndex : 's_plate_thick_1',
			width : 130
		}, {
			text : 's_plate_thick_2',
			dataIndex : 's_plate_thick_2',
			width : 130
		} ]
	}, {
		xtype : 'grid',
        
		width : 60,
        
		itemId : 'grid2',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 's_plate_avg', type : 'string' },
				{ name : 's_plate_torque', type : 'string' },
				{ name : 'load_hinge_pin', type : 'string' },
				{ name : 'ring_check_ok', type : 'string' },
				{ name : 'spring_check_ok', type : 'string' },
				{ name : 'max_angle', type : 'string' },
				{ name : 'min_angle', type : 'string' },
				{ name : 'load_pisto_shoe', type : 'string' },
			]
		}),
        
		columns : [ {
			text : 's_plate_avg',
			dataIndex : 's_plate_avg',
			width : 130 
		}, {
			text : 's_plate_torque',
			dataIndex : 's_plate_torque',
			width : 130
		}, {
			text : 'load_hinge_pin',
			dataIndex : 'load_hinge_pin',
			align : 'center',
			width : 130
		}, {
			text : 'ring_check_ok',
			dataIndex : 'ring_check_ok',
			align : 'center',
			width : 130
		}, {
			text : 'spring_check_ok',
			dataIndex : 'spring_check_ok',
			width : 130
		}, {
			text : 'max_angle',
			dataIndex : 'max_angle',
			width : 130
		}, {
			text : 'min_angle',
			dataIndex : 'min_angle',
			width : 130
		}, {
			text : 'load_pisto_shoe',
			dataIndex : 'load_pisto_shoe',
			width : 130
		} ]
	}, {
		xtype : 'grid',
        
		width : 60,
        
		itemId : 'grid3',
        
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'load_u_shoe', type : 'string' },
				{ name : 'piston_1_shoe_clear', type : 'string' },
				{ name : 'piston_2_shoe_clear', type : 'string' },
				{ name : 'piston_3_shoe_clear', type : 'string' },
				{ name : 'piston_4_shoe_clear', type : 'string' },
				{ name : 'piston_5_shoe_clear', type : 'string' },
				{ name : 'piston_6_shoe_clear', type : 'string' },
				{ name : 'piston_7_shoe_clear', type : 'string' }
			]
		}),
        
		columns : [ {
			text : 'load_u_shoe',
			dataIndex : 'load_u_shoe',
			width : 130
		}, {
			text : 'piston_1_shoe_clear',
			dataIndex : 'piston_1_shoe_clear',
			width : 130
		}, {
			text : 'piston_2_shoe_clear',
			dataIndex : 'piston_2_shoe_clear',
			width : 130
		}, {
			text : 'piston_3_shoe_clear',
			dataIndex : 'piston_3_shoe_clear',
			width : 130
		}, {
			text : 'piston_4_shoe_clear',
			dataIndex : 'piston_4_shoe_clear',
			width : 130
		}, {
			text : 'piston_5_shoe_clear',
			dataIndex : 'piston_5_shoe_clear',
			width : 130
		}, {
			text : 'piston_6_shoe_clear',
			dataIndex : 'piston_6_shoe_clear',
			width : 130
		}, {
			text : 'piston_7_shoe_clear',
			dataIndex : 'piston_7_shoe_clear',
			width : 130
		} ]
	}, {
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid4',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'piston_1_l_shoe', type : 'string' },
				{ name : 'piston_2_l_shoe', type : 'string' },
				{ name : 'piston_3_l_shoe', type : 'string' },
				{ name : 'piston_4_l_shoe', type : 'string' },
				{ name : 'piston_5_l_shoe', type : 'string' },
				{ name : 'piston_6_l_shoe', type : 'string' },
				{ name : 'piston_7_l_shoe', type : 'string' },
				{ name : 'piston_1_l_rank', type : 'string' }
			]
		}),
    
		columns : [ {
			text : 'piston_1_l_shoe',
			dataIndex : 'piston_1_l_shoe',
			width : 130
		}, {
			text : 'piston_2_l_shoe',
			dataIndex : 'piston_2_l_shoe',
			width : 130
		}, {
			text : 'piston_3_l_shoe',
			dataIndex : 'piston_3_l_shoe',
			width : 130
		}, {
			text : 'piston_4_l_shoe',
			dataIndex : 'piston_4_l_shoe',
			width : 130
		}, {
			text : 'piston_5_l_shoe',
			dataIndex : 'piston_5_l_shoe',
			width : 130
		}, {
			text : 'piston_6_l_shoe',
			dataIndex : 'piston_6_l_shoe',
			width : 130
		}, {
			text : 'piston_7_l_shoe',
			dataIndex : 'piston_7_l_shoe',
			width : 130
		}, {
			text : 'piston_1_l_rank',
			dataIndex : 'piston_1_l_rank',
			width : 130
		} ]
	}, {
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid5',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'piston_2_l_rank', type : 'string' },
				{ name : 'piston_3_l_rank', type : 'string' },
				{ name : 'piston_4_l_rank', type : 'string' },
				{ name : 'piston_5_l_rank', type : 'string' },
				{ name : 'piston_6_l_rank', type : 'string' },
				{ name : 'piston_7_l_rank', type : 'string' },
				{ name : 'piston_1_u_shoe', type : 'string' },
				{ name : 'piston_2_u_shoe', type : 'string' }
			]
		}),
    
		columns : [ {
			text : 'piston_2_l_rank',
			dataIndex : 'piston_2_l_rank',
			width : 130
		}, {
			text : 'piston_3_l_rank',
			dataIndex : 'piston_3_l_rank',
			width : 130
		}, {
			text : 'piston_4_l_rank',
			dataIndex : 'piston_4_l_rank',
			width : 130
		}, {
			text : 'piston_5_l_rank',
			dataIndex : 'piston_5_l_rank',
			width : 130
		}, {
			text : 'piston_6_l_rank',
			dataIndex : 'piston_6_l_rank',
			width : 130
		}, {
			text : 'piston_7_l_rank',
			dataIndex : 'piston_7_l_rank',
			width : 130
		}, {
			text : 'piston_1_u_shoe',
			dataIndex : 'piston_1_u_shoe',
			width : 130
		}, {
			text : 'piston_2_u_shoe',
			dataIndex : 'piston_2_u_shoe',
			width : 130
		} ]
	}, {
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid6',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'piston_3_u_shoe', type : 'string' },
				{ name : 'piston_4_u_shoe', type : 'string' },
				{ name : 'piston_5_u_shoe', type : 'string' },
				{ name : 'piston_6_u_shoe', type : 'string' },
				{ name : 'piston_7_u_shoe', type : 'string' },
				{ name : 'piston_1_u_shoe_rank', type : 'string' },
				{ name : 'piston_2_u_shoe_rank', type : 'string' },
				{ name : 'piston_3_u_shoe_rank', type : 'string' },
			]
		}),
    
		columns : [ {
			text : 'piston_3_u_shoe',
			dataIndex : 'piston_3_u_shoe',
			width : 130
		}, {
			text : 'piston_4_u_shoe',
			dataIndex : 'piston_4_u_shoe',
			width : 130
		}, {
			text : 'piston_5_u_shoe',
			dataIndex : 'piston_5_u_shoe',
			width : 130
		}, {
			text : 'piston_6_u_shoe',
			dataIndex : 'piston_6_u_shoe',
			width : 130
		}, {
			text : 'piston_7_u_shoe',
			dataIndex : 'piston_7_u_shoe',
			width : 130
		}, {
			text : 'piston_1_u_shoe_rank',
			dataIndex : 'piston_1_u_shoe_rank',
			width : 130
		}, {
			text : 'piston_2_u_shoe_rank',
			dataIndex : 'piston_2_u_shoe_rank',
			width : 130
		}, {
			text : 'piston_3_u_shoe_rank',
			dataIndex : 'piston_3_u_shoe_rank',
			width : 130
		} ]
	}, {
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid7',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'piston_4_u_shoe_rank', type : 'string' },
				{ name : 'piston_5_u_shoe_rank', type : 'string' },
				{ name : 'piston_6_u_shoe_rank', type : 'string' },
				{ name : 'piston_7_u_shoe_rank', type : 'string' },
				{ name : 'show_check_ok', type : 'string' },
				{ name : 'cyl_height', type : 'string' },
				{ name : 'end_clear', type : 'string' },
				{ name : 'final_race_thick', type : 'string' }
			]
		}),
    
		columns : [ {
			text : 'piston_4_u_shoe_rank',
			dataIndex : 'piston_4_u_shoe_rank',
			width : 130
		}, {
			text : 'piston_5_u_shoe_rank',
			dataIndex : 'piston_5_u_shoe_rank',
			width : 130
		}, {
			text : 'piston_6_u_shoe_rank',
			dataIndex : 'piston_6_u_shoe_rank',
			width : 130
		}, {
			text : 'piston_7_u_shoe_rank',
			dataIndex : 'piston_7_u_shoe_rank',
			width : 130
		}, {
			text : 'show_check_ok',
			dataIndex : 'show_check_ok',
			width : 130
		}, {
			text : 'cyl_height',
			dataIndex : 'cyl_height',
			width : 130
		}, {
			text : 'end_clear',
			dataIndex : 'end_clear',
			width : 130
		}, {
			text : 'final_race_thick',
			dataIndex : 'final_race_thick',
			width : 130
		} ]
	}, 	{
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid8',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'final_race_rank', type : 'string' },
				{ name : 'piston_1_top_clear', type : 'string' },
				{ name : 'piston_2_top_clear', type : 'string' },
				{ name : 'piston_3_top_clear', type : 'string' },
				{ name : 'piston_4_top_clear', type : 'string' },
				{ name : 'piston_5_top_clear', type : 'string' },
				{ name : 'piston_6_top_clear', type : 'string' },
				{ name : 'piston_7_top_clear', type : 'string' }
			]
		}),
    
		columns : [ {
			text : 'final_race_rank',
			dataIndex : 'final_race_rank',
			width : 130
		}, {
			text : 'piston_1_top_clear',
			dataIndex : 'piston_1_top_clear',
			width : 130
		}, {
			text : 'piston_2_top_clear',
			dataIndex : 'piston_2_top_clear',
			width : 130
		}, {
			text : 'piston_3_top_clear',
			dataIndex : 'piston_3_top_clear',
			width : 130
		}, {
			text : 'piston_4_top_clear',
			dataIndex : 'piston_4_top_clear',
			width : 130
		}, {
			text : 'piston_5_top_clear',
			dataIndex : 'piston_5_top_clear',
			width : 130
		}, {
			text : 'piston_6_top_clear',
			dataIndex : 'piston_6_top_clear',
			width : 130
		}, {
			text : 'piston_7_top_clear',
			dataIndex : 'piston_7_top_clear',
			width : 130
		} ]
	} ]
});