Ext.define('Hcc.view.bar_report.BarOutActualInf2List', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_bar_out_actual_inf2_list',
	
	useCheckBox : false,
		
	store : 'Hcc.store.BarOutActualInf2',
	
	columns : [
		{
			xtype: 'rownumberer',
			width : 40
		},
		{ 
			header: T('label.status'),
			dataIndex : 'status',
		  	xtype: 'actioncolumn',
		  	width : 50,
		  	align : 'center',
			tooltip : '',
			renderer: function(value, metaData, record, row, col, store, gridView) {
				var barcode = record.get('barcode');
				var ifc = record.get('ifc');
				var erp = record.get('erp');
				
				if(barcode != ifc || barcode != erp || ifc != erp) {
					this.items[0].icon = 'theme/image/iconRed.png';
					this.items[0].tooltip = 'Different';
				} else  {
					this.items[0].icon = 'theme/image/statusGreen.png';
					this.items[0].tooltip = 'Same';
				}
				
				return '';
			},
			items: [ {
				icon: '',
				tooltip: ''
			} ]
		},
		{ header : T('label.work_date'), dataIndex : 'work_date', width : 80, align : 'center' },
		{ header : T('label.product'), dataIndex : 'product', width : 130 },
		{ header : 'Loc From', dataIndex : 'loc_from', width : 100 },
		{ header : 'Loc To', dataIndex : 'loc_to', width : 100 },
		{ header : 'Barcode', dataIndex : 'barcode', xtype : 'numbercolumn', width : 100, format : T('format.number'), align : 'right' },
		{ header : 'Interface', dataIndex : 'ifc', xtype : 'numbercolumn', width : 100, format : T('format.number'), align : 'right' },
		{ header : 'ERP', dataIndex : 'erp', xtype : 'numbercolumn', width : 100, format : T('format.number'), align : 'right' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items : []
	} ]
});