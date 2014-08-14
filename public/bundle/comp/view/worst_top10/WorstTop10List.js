Ext.define('Comp.view.worst_top10.WorstTop10List', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'comp_worst_top10_list',
		
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [ {
		xtype : 'chart',
        animate: true,
        shadow: true,
		//legend: { position: 'top' },
        store: Ext.create('Comp.store.WorstTop10'),		
		flex : 1.5,
        axes: [
			{
            	type: 'Numeric',
            	minimum: 0,
            	position: 'left',
            	fields: ['err_cnt'],
            	title: T('label.err_cnt'),
            	minorTickSteps: 1,
            	grid: true
        	}, 
			{
            	type: 'Category',
            	position: 'bottom',
            	fields: ['st_no'],
            	title: T('label.station')
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
            	xField: 'st_no',
            	yField: ['err_cnt'],
				title: T('label.err_cnt'),
				showInLegend: true,
				tips : {
					trackMouse : true,
					width : 200,
					height : 35,
					style: {
						background : '#ffff99'
					},
					renderer : function(storeItem, item) {
						var errCnt = (storeItem.get('err_cnt') ? storeItem.get('err_cnt') : '0');
						var errCode = storeItem.get('err_code');
						this.setTitle(T('label.err_code') + ' : ' + errCode + ', ' + T('label.err_cnt') + ' : ' + errCnt);
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : ['err_cnt'],
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
		store: 'Comp.store.WorstTop10',
		flex : 1,
		columns : [
			{ xtype : 'rownumberer' },
			{ header : T('label.st_no'), dataIndex : 'st_no', flex : 1.3, align : 'center' },
			{ header : T('label.st_name'), dataIndex : 'st_name', flex : 2 },
			{ header : T('label.err_code'), dataIndex : 'err_code', flex : 1, align : 'center' },
			{ header : T('label.err_name'), dataIndex : 'err_code_name', flex : 1 },
			{ header : T('label.err_cnt'), dataIndex : 'err_cnt', xtype : 'numbercolumn', format : T('format.number'), flex : 1, align : 'right' }
		]
	}]

});