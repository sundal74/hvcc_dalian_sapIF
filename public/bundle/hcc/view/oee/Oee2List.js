Ext.define('Hcc.view.oee.Oee2List', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'hcc_oee2_list',
	
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
				name: 'oee_value'
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
            	fields: ['oee_value'],
            	title: T('label.oee'),
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
            	yField: ['oee_value'],
				title: T('label.oee'),
				showInLegend: true,
				tips : {
					trackMouse : true,
					width : 160,
					height : 50,
					style: {
						background : '#ffff99'
					},
					renderer : function(storeItem, item) {
						var oee = (storeItem.get('oee_value') ? Ext.util.Format.number(storeItem.get('oee_value'), T('format.number')) : '0');
						var op = storeItem.get('operation');
						var title = T('label.operation') + ':' + op + '<br/>' + T('label.oee') + ' : ' + oee;
						this.setTitle(title);
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : ['oee_value'],
					display : 'insideEnd',
					renderer : function(value) {
						if(value != 0) {
							return Ext.util.Format.number(value, '0,000.00');
						} else {
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
		// title : T('title.oee2'),
		store : 'Hcc.store.Oee2',
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

		columns : [
			{ header : T('label.operation'), dataIndex : 'operation', flex : 1.5 },
			{ header : T('label.operation_desc'), dataIndex : 'operation_desc', flex : 2 },
			{ header : T('label.machine'), dataIndex : 'machine', flex : 1.5 },
			{ header : T('label.machine_desc'), dataIndex : 'machine_desc', flex : 2 },
			{
				header : T('label.availability'),
				dataIndex : 'availability',
				// summaryType: 'average',
				align : 'right', 
				flex : 1,
				renderer: function(value) {
					return Ext.util.Format.number(value * 100, '0,000.00');
				}
				// summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')
			},
			{
				header : T('label.performance'),
				dataIndex : 'perf_eff',
				// summaryType: 'average',
				align : 'right', 
				flex : 1,
				renderer: function(value) {
					return Ext.util.Format.number(value * 100, '0,000.00');
				}
				// summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')
			},
			{
				header : T('label.quality'),
				dataIndex : 'quality',
				// summaryType: 'average',
				align : 'right', 
				flex : 1,
				renderer: function(value) {
					return Ext.util.Format.number(value * 100, '0,000.00');
				}
				// summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')
			},
			{
				header : T('label.oee'),
				dataIndex : 'oee_value',
				// summaryType: 'average',
				align : 'right', 
				flex : 1,
				renderer: function(value) {
					return Ext.util.Format.number(value * 100, '0,000.00');
				}
				// summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')
			}
		]
	}]
});