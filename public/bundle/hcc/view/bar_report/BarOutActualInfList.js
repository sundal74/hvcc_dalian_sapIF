Ext.define('Hcc.view.bar_report.BarOutActualInfList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_bar_out_actual_inf_list',
	
	useCheckBox : false,
		
	store : 'Hcc.store.BarOutActualInf',
	
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
				var inf = record.get('ifc');
				
				if(barcode != inf) {
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
		{ header : 'Loc From', dataIndex : 'loc_from', width : 90 },
		{ header : 'Loc To', dataIndex : 'loc_to', width : 90 },
		{ header : 'Barcode', dataIndex : 'barcode', width : 300 },
		{ header : 'Interface', dataIndex : 'ifc', width : 300 },
		//{ header : 'ERP', dataIndex : 'erp', width : 300 }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items : []
	} ]
});