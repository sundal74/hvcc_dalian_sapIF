Ext.define('Comp.view.prod_hist.ProdHistVsHistsPopup', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Comp.store.ProdHistVsHist'],
	
	xtype : 'comp_prod_hist_vs_hists_popup',
	
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
	
	store : Ext.create('Comp.store.ProdHistVsHist'),
	
	items: [{
		xtype : 'grid',
		
		width : 60,
		
		itemId : 'grid1',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name: 'prd_date', type : 'string' }, 
				{ name: 'sht', type : 'string' }, 
				{ name: 'int_no', type : 'string' }, 
				{ name: 'p_code', type : 'string' }, 
				{ name: 'serial_no', type : 'string' }, 
				{ name: 'lbl_code', type : 'string' }, 
				{ name: 'dpin_ins_force10_1', type : 'string' }, 
				{ name: 'dpin_ins_force10_2', type : 'string' }
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
			text : 'dpin_ins_force10_1',
			dataIndex : 'dpin_ins_force10_1',
			width : 130
		}, {
			text : 'dpin_ins_force10_2',
			dataIndex : 'dpin_ins_force10_2',
			width : 130
		} ]
	}, {
		xtype : 'grid',
        
		width : 60,
        
		itemId : 'grid2',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name: 'muffler_plate_ins_force', type : 'string' },
				{ name: 'prv_torque', type : 'string' },
				{ name : 'vvplate_rvt_force', type : 'string' },
				{ name : 'dpin_ins_force40_1', type : 'string' },
				{ name : 'dpin_ins_force40_2', type : 'string' },
				{ name : 'nrb_ins_force040', type : 'string' },
				{ name : 'ring_ins_depth050', type : 'string' },
				{ name : 'splate_thick1', type : 'string' }
			]
		}),
        
		columns : [ {
			text : 'muffler_plate_ins_force',
			dataIndex : 'muffler_plate_ins_force',
			width : 130 
		}, {
			text : 'prv_torque',
			dataIndex : 'prv_torque',
			width : 130
		}, {
			text : 'vvplate_rvt_force',
			dataIndex : 'vvplate_rvt_force',
			align : 'center',
			width : 130
		}, {
			text : 'dpin_ins_force40_1',
			dataIndex : 'dpin_ins_force40_1',
			align : 'center',
			width : 130
		}, {
			text : 'dpin_ins_force40_2',
			dataIndex : 'dpin_ins_force40_2',
			width : 130
		}, {
			text : 'nrb_ins_force040',
			dataIndex : 'nrb_ins_force040',
			width : 130
		}, {
			text : 'ring_ins_depth050',
			dataIndex : 'ring_ins_depth050',
			width : 130
		}, {
			text : 'splate_thick1',
			dataIndex : 'splate_thick1',
			width : 130
		} ]
	}, {
		xtype : 'grid',
        
		width : 60,
        
		itemId : 'grid3',
        
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'splate_thick2', type : 'string' },
				{ name : 'splate_thick_avg', type : 'string' },
				{ name : 'splate_torque', type : 'string' },
				{ name : 'ring_check', type : 'string' },
				{ name : 'splate_max_angle', type : 'string' },
				{ name : 'splate_min_angle', type : 'string' },
				{ name : 'piston_lower1', type : 'string' },
				{ name : 'piston_lower2', type : 'string' }
			]
		}),
        
		columns : [ {
			text : 'splate_thick2',
			dataIndex : 'splate_thick2',
			width : 130
		}, {
			text : 'splate_thick_avg',
			dataIndex : 'splate_thick_avg',
			width : 130
		}, {
			text : 'splate_torque',
			dataIndex : 'splate_torque',
			width : 130
		}, {
			text : 'ring_check',
			dataIndex : 'ring_check',
			width : 130
		}, {
			text : 'splate_max_angle',
			dataIndex : 'splate_max_angle',
			width : 130
		}, {
			text : 'splate_min_angle',
			dataIndex : 'splate_min_angle',
			width : 130
		}, {
			text : 'piston_lower1',
			dataIndex : 'piston_lower1',
			width : 130
		}, {
			text : 'piston_lower2',
			dataIndex : 'piston_lower2',
			width : 130
		} ]
	}, {
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid4',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'piston_lower3', type : 'string' },
				{ name : 'piston_lower4', type : 'string' },
				{ name : 'piston_lower5', type : 'string' },			
				{ name : 'piston_lower6', type : 'string' },
				{ name : 'piston_lower7', type : 'string' },
				{ name : 'piston_lower_grade1', type : 'string' },
				{ name : 'piston_lower_grade2', type : 'string' },
				{ name : 'piston_lower_grade3', type : 'string' }
			]
		}),
    
		columns : [ {
			text : 'piston_lower3',
			dataIndex : 'piston_lower3',
			width : 130
		}, {
			text : 'piston_lower4',
			dataIndex : 'piston_lower4',
			width : 130
		}, {
			text : 'piston_lower5',
			dataIndex : 'piston_lower5',
			width : 130
		}, {
			text : 'piston_lower6',
			dataIndex : 'piston_lower6',
			width : 130
		}, {
			text : 'piston_lower7',
			dataIndex : 'piston_lower7',
			width : 130
		}, {
			text : 'piston_lower_grade1',
			dataIndex : 'piston_lower_grade1',
			width : 130
		}, {
			text : 'piston_lower_grade2',
			dataIndex : 'piston_lower_grade2',
			width : 130
		}, {
			text : 'piston_lower_grade3',
			dataIndex : 'piston_lower_grade3',
			width : 130
		} ]
	}, {
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid5',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'piston_lower_grade4', type : 'string' },
				{ name : 'piston_lower_grade5', type : 'string' },
				{ name : 'piston_lower_grade6', type : 'string' },
				{ name : 'piston_lower_grade7', type : 'string' },
				{ name : 'piston_upper1', type : 'string' },
				{ name : 'piston_upper2', type : 'string' },
				{ name : 'piston_upper3', type : 'string' },
				{ name : 'piston_upper4', type : 'string' },
			]
		}),
    
		columns : [ {
			text : 'piston_lower_grade4',
			dataIndex : 'piston_lower_grade4',
			width : 130
		}, {
			text : 'piston_lower_grade5',
			dataIndex : 'piston_lower_grade5',
			width : 130
		}, {
			text : 'piston_lower_grade6',
			dataIndex : 'piston_lower_grade6',
			width : 130
		}, {
			text : 'piston_lower_grade7',
			dataIndex : 'piston_lower_grade7',
			width : 130
		}, {
			text : 'piston_upper1',
			dataIndex : 'piston_upper1',
			width : 130
		}, {
			text : 'piston_upper2',
			dataIndex : 'piston_upper2',
			width : 130
		}, {
			text : 'piston_upper3',
			dataIndex : 'piston_upper3',
			width : 130
		}, {
			text : 'piston_upper4',
			dataIndex : 'piston_upper4',
			width : 130
		} ]
	}, {
		xtype : 'grid',
    
		width : 60,
    
		itemId : 'grid6',
    
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'piston_upper5', type : 'string' },
				{ name : 'piston_upper6', type : 'string' },
				{ name : 'piston_upper7', type : 'string' },
				{ name : 'piston_upper_grade1', type : 'string' },
				{ name : 'piston_upper_grade2', type : 'string' },
				{ name : 'piston_upper_grade3', type : 'string' },
				{ name : 'piston_upper_grade4', type : 'string' },
				{ name : 'piston_upper_grade5', type : 'string' },
			]
		}),
    
		columns : [ {
			text : 'piston_upper5',
			dataIndex : 'piston_upper5',
			width : 130
		}, {
			text : 'piston_upper6',
			dataIndex : 'piston_upper6',
			width : 130
		}, {
			text : 'piston_upper7',
			dataIndex : 'piston_upper7',
			width : 130
		}, {
			text : 'piston_upper_grade1',
			dataIndex : 'piston_upper_grade1',
			width : 130
		}, {
			text : 'piston_upper_grade2',
			dataIndex : 'piston_upper_grade2',
			width : 130
		}, {
			text : 'piston_upper_grade3',
			dataIndex : 'piston_upper_grade3',
			width : 130
		}, {
			text : 'piston_upper_grade4',
			dataIndex : 'piston_upper_grade4',
			width : 130
		}, {
			text : 'piston_upper_grade5',
			dataIndex : 'piston_upper_grade5',
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
				{ name : 'piston_shoe_clearance7', type : 'string' },
				{ name : 'piston_shoe_check_l1', type : 'string' },
				{ name : 'piston_shoe_check_l2', type : 'string' },
				{ name : 'piston_shoe_check_l3', type : 'string' },
				{ name : 'piston_shoe_check_l4', type : 'string' },
				{ name : 'piston_shoe_check_l5', type : 'string' },
				{ name : 'piston_shoe_check_l6', type : 'string' },
				{ name : 'piston_shoe_check_l7', type : 'string' }
			]
		}),
    
		columns : [ {
			text : 'piston_shoe_clearance7',
			dataIndex : 'piston_shoe_clearance7',
			width : 130
		}, {
			text : 'piston_shoe_check_l1',
			dataIndex : 'piston_shoe_check_l1',
			width : 130
		}, {
			text : 'piston_shoe_check_l2',
			dataIndex : 'piston_shoe_check_l2',
			width : 130
		}, {
			text : 'piston_shoe_check_l3',
			dataIndex : 'piston_shoe_check_l3',
			width : 130
		}, {
			text : 'piston_shoe_check_l4',
			dataIndex : 'piston_shoe_check_l4',
			width : 130
		}, {
			text : 'piston_shoe_check_l5',
			dataIndex : 'piston_shoe_check_l5',
			width : 130
		}, {
			text : 'piston_shoe_check_l6',
			dataIndex : 'piston_shoe_check_l6',
			width : 130
		}, {
			text : 'piston_shoe_check_l7',
			dataIndex : 'piston_shoe_check_l7',
			width : 130
		} ]
	} ]
});