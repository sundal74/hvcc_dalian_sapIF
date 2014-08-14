Ext.define('Prod.view.line_stop_top10.LineStopTop10List', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'prod_line_stop_top10_list',
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [{
		xtype : 'chart',
        animate: true,
        shadow: true,
        store: Ext.create('Ext.data.Store', {
			fields: [{
				name: 'machine'
			}, {
				name: 'loss_count'
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
            	fields: ['loss_count'],
            	title: '',
            	minorTickSteps: 1,
            	grid: true
        	}, 
			{
            	type: 'Category',
            	position: 'bottom',
            	fields: ['machine']
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
            	xField: 'machine',
            	yField: ['loss_count'],
				title: [],
				showInLegend: true,
				tips : {
					trackMouse : true,
					width : 120,
					height : 25,
					style: {
						background : '#ffff99'
					},
					renderer : function(storeItem, item) {
						var loss_count = (storeItem.get('loss_count') ? storeItem.get('loss_count') : '0');
						if(item.series.title == T('label.loss_count')) {
							this.setTitle(T('label.loss_count') + ' : ' + loss_count);
						}else {
							this.setTitle(T('label.loss_term') + ' : ' + loss_count);
						}
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : ['loss_count'],
					display : 'insideEnd',
					renderer : function(value) {
						if(value != 0) {
							return value;
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
		title : T('title.machine_loss'),
		flex : 5,
        store: 'Prod.store.LineStopTop10',
		//flex : 1,
	    enableLocking:  false,
	
		columns : [
			{ xtype : 'rownumberer' },
			{ header : T('label.wc'), dataIndex : 'workcenter', width : 90 },
			{ header : T('label.operation'), dataIndex : 'operation' },
			{ header : T('label.operation_desc'), dataIndex : 'operation_desc', width : 180 },
			{ header : T('label.machine'), dataIndex : 'machine' },
			{ header : T('label.machine_desc'), dataIndex : 'machine_desc', width : 200 },
			{ header : T('label.loss_count'), dataIndex : 'loss_count', align : 'right', width : 80 },
			{ header : T('label.loss_term'), dataIndex : 'loss_term', xtype : 'numbercolumn', align : 'right', width : 90, format : T('format.number') },
			{ header : T('label.maint_term'), dataIndex : 'maint_term', xtype : 'numbercolumn', align : 'right', width : 90, format : T('format.number') }
		]
	}]
});