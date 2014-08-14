Ext.define('Hcc.view.plan_actual.ActualByMc', {
	
	extend: 'Base.abstract.PivotReport',
	
 	requires : [ 
		'Hcc.view.plan_actual.ActualByMcSearch',
	],
	
	xtype : 'hcc_actual_by_mc',
	
	title : T('menu.ActualByMc'),
	
	searchView : 'hcc_actual_by_mc_search',
	
	store : 'Hcc.store.ActualByMc',
	
	grid : {
		xtype : 'mzpivotgrid',
		
	    enableLocking : true,
	
		enableRowSummary : true,
		
	    viewConfig: {
	        trackOver : true,
	        stripeRows : false
	    },
	    
	    aggregate: [ {
	        measure : 'plan',
	        header : T('label.plan_qty'),
			width : 80,
	        aggregator : 'sum',
	        align : 'right',
	        renderer : Ext.util.Format.numberRenderer(T('format.number'))
	    }, {
			measure : 'actual',
			header : T('label.actual'),
			width : 80,
			aggregator : 'sum',
			align : 'right',
			renderer : Ext.util.Format.numberRenderer(T('format.number'))
		},{
		    measure : 'achv_rate',
			header : T('label.achievement_rate'),
			width : 95,
			aggregator : 'avg',
			align : 'right',
			renderer : function(value, metaData, record, rowIndex, colIndex, store) { 
				metaData.tdCls = 'pivot-value';
				var avg = 0;
				var plan = 0;
				var actual = 0;
				
				if(colIndex == 2) {
					plan = record.data.c0;
					actual = record.data.c1;
				} else if(colIndex == 5) {
					plan = record.data.c3;
					actual = record.data.c4;
				} else if(colIndex == 8) {
					plan = record.data.c6;
					actual = record.data.c7;
				}

				if(plan > 0) {
					avg = (actual / plan) * 100;
				}
				
				return Ext.util.Format.number(avg, '0.00');
			}
		} ],
	
	    leftAxisTitle:  T('menu.ActualByMc'),
	
	    leftAxis: [ {
			width : 80,
	        dataIndex : 'workcenter',
	        header : T('label.wc')
		}, {
			width : 80,
	        dataIndex : 'operation',
	        header : T('label.operation')
		}, {
			width : 100,
		    dataIndex : 'machine',
		    header : T('label.machine')
		} ],
	    
	    topAxis: [ {
			dataIndex : 'shift',
			header : T('label.shift')
		} ]
	}

});