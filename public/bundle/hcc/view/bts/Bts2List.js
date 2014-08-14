Ext.define('Hcc.view.bts.Bts2List', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'hcc_bts2_list',
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	requires : ['Ext.ux.CheckColumn', 'Base.view.grid.HatioGroupSummary'],
	
	items : [{
		xtype : 'chart',
        animate: true,
        shadow: true,
        store: Ext.create('Ext.data.Store', {
			fields: [{
				name: 'operation'
			}, {
				name: 'bts_value'
			}],
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			}
		}),
		
		flex : 4,
        axes: [
			{
            	type: 'Numeric',
            	minimum: 0,
            	position: 'left',
            	fields: ['bts_value'],
            	title: T('label.bts'),
            	minorTickSteps: 1,
            	grid: true
        	}, 
			{
            	type: 'Category',
            	position: 'bottom',
            	fields: ['operation']
        	}
		],
        series: [
			{
            	type: 'column',
            	highlight: {
                	size: 7,
                	radius: 7
            	},
				smooth: true,
            	axis: 'left',
            	xField: 'operation',
            	yField: ['bts_value'],
				title: T('label.bts'),
				showInLegend: true,
				tips : {
					trackMouse : true,
					width : 160,
					height : 50,
					style: {
						background : '#ffff99'
					},
					renderer : function(storeItem, item) {
						var bts = (storeItem.get('bts_value') ? Ext.util.Format.number(storeItem.get('bts_value'), '0,000.00') : '0');
						var op = storeItem.get('operation');
						var title = T('label.operation') + ':' + op + '<br/>' + T('label.bts') + ' : ' + bts;
						this.setTitle(title);
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : ['bts_value'],
					display : 'insideEnd',
					renderer : function(value) {
						if(value != 0) {
							return Ext.util.Format.number(value, '0,000.00');
						}else {
							return '';
						}
					},
					contrast : true,
					color: '#333',
					font : '14px Arial'
				}
        	}
		]
	}, {
		xtype : 'grid',
		// title : T('title.bts2'),
		store : 'Hcc.store.Bts2',
		flex : 5,

		features: [{
			ftype: 'groupingsummary',
			groupHeaderTpl: Ext.create('Ext.XTemplate',
					'<tpl if="name == \'Total\'">',
						'{name}',
					'<tpl else>',
						'WORKCENTER : {name}',
					'</tpl>'
			)
		}],
		//flex : 1,
	    enableLocking:  false,
		columns : [
			{ header : T('label.operation'), dataIndex : 'operation', flex : 0.6 },
			{ header : T('label.operation_desc'), dataIndex : 'operation_desc', flex : 1 },
			{ header : T('label.machine'), dataIndex : 'machine', flex : 0.7 },
			{ header : T('label.machine_desc'), dataIndex : 'machine_desc', flex : 1 },
			{ header : T('label.product'), dataIndex : 'product', flex : 0.7 },
			{ header : T('label.product_desc'), dataIndex : 'product_desc', flex : 2 },
			{
				header : T('label.vol_perf'),
				dataIndex : 'vol_perf',
				align : 'right', 
				flex : 0.5,
				renderer : function(value, metaData, record, rowIndex, colIndex, store) {
					var volPerf = 0;
					var planQty = record.get("plan_qty");
					var actualQty = record.get("actual_qty");
					if(planQty > 0) {
						volPerf = actualQty / planQty;
					}

					record.data['vol_perf'] = volPerf;
					return Ext.util.Format.number(volPerf, '0.00');
				}
			},
			{
				header : T('label.mix_perf'),
				dataIndex : 'mix_perf',
				align : 'right', 
				flex : 0.5,
				renderer : function(value, metaData, record, rowIndex, colIndex, store) {
					var mixPerf = 0;
					var planQty = record.get('plan_qty');
					var actualQty = record.get('actual_qty');
					var lowerPlanQty = record.get('plan_act_lower_qty');

					if(planQty > 0 && actualQty > 0) {
						var mixPerfParent = (planQty > actualQty) ? actualQty : planQty;
						mixPerf = lowerPlanQty / mixPerfParent;
					}

					record.data['mix_perf'] = mixPerf;
					return Ext.util.Format.number(mixPerf, '0.00');
				}
			},
			{
				header : T('label.seq_perf'),
				dataIndex : 'seq_perf',
				align : 'right', 
				flex : 0.5,
				renderer : function(value, metaData, record, rowIndex, colIndex, store) {
					var seqPerf = 0;
					var achvQty = record.get('actual_qty');
					var lowerPlanQty = record.get('plan_act_lower_qty');

					if(lowerPlanQty > 0) {
						seqPerf = achvQty / lowerPlanQty;
					}

					record.data['seq_perf'] = seqPerf;
					return Ext.util.Format.number(seqPerf, '0.00');
				}
			},
			{
				header : T('label.bts'),
				dataIndex : 'bts_value',
				align : 'right', 
				flex : 0.5,
				renderer:function(value, metaData, record, rowIndex, colIndex, store) { 
					value = record.get('vol_perf') * record.get('mix_perf') * record.get('seq_perf');
					record.data['bts_value'] = value;
					return Ext.util.Format.number(value, '0.00');
				}
			}
		]
	}]
});