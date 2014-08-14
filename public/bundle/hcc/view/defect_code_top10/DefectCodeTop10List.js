Ext.define('Hcc.view.defect_code_top10.DefectCodeTop10List', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'hcc_defect_code_top10_list',
		
	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	
	items : [ {
		xtype : 'grid',
		store: 'Hcc.store.DefectCodeTop10',
		width : 450,
		columns : [
			//{ xtype : 'rownumberer' },
			{ header : T('label.rank'), dataIndex : 'ranking', width : 60, align : 'right' },
			{ header : T('label.defect_code'), dataIndex : 'defect_code_name', flex : 1.3 },
			{ header : T('label.description'), dataIndex : 'defect_code_desc', flex : 2 },
			{ header : T('label.defect_qty'), dataIndex : 'sum_defect_qty', xtype : 'numbercolumn', format : T('format.number'), align : 'right', flex : 1 }
		]
	}, {
		xtype : 'chart',
        animate: true,
        shadow: true,
		legend: { position: 'top' },
        store: Ext.create('Hcc.store.DefectCodeTop10'),
		
		flex : 1,
        axes: [
			{
            	type: 'Numeric',
            	minimum: 0,
            	position: 'left',
            	fields: ['sum_defect_qty'],
            	title: T('label.defect_qty'),
            	minorTickSteps: 1,
            	grid: true
        	}, 
			{
            	type: 'Category',
            	position: 'bottom',
            	fields: ['defect_code_desc'],
            	title: T('label.defect_code')
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
            	xField: 'defect_code_desc',
            	yField: ['sum_defect_qty'],
				title: T('label.defect_qty'),
				showInLegend: true,
				tips : {
					trackMouse : true,
					width : 150,
					height : 25,
					style: {
						background : '#ffff99'
					},
					renderer : function(storeItem, item) {
						var scrapQty = (storeItem.get('sum_defect_qty') ? storeItem.get('sum_defect_qty') : '0');
						var scrapCode = storeItem.get('defect_code_desc');
						this.setTitle(scrapCode + ' : ' + scrapQty);
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : ['sum_defect_qty'],
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
	}]

});