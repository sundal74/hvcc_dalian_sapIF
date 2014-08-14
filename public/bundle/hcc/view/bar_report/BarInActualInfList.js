Ext.define('Hcc.view.bar_report.BarInActualInfList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_bar_in_actual_inf_list',
	
	useCheckBox : false,
		
	store : 'Hcc.store.BarInActualInf',
	
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
				var mes = record.get('mes');
				var barcode = record.get('barcode');
				var inf = record.get('ifc');
				var erp = record.get('erp');
				
				if(mes != barcode || mes != inf || mes != erp || barcode != inf || barcode != erp || inf != erp) {
				//if(mes != barcode || mes != inf || barcode != inf) {
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
		{ header : 'MES', dataIndex : 'mes', width : 80, align : 'right', xtype : 'numbercolumn', format : T('format.number') },
		{ header : 'Barcode', dataIndex : 'barcode', width : 80, align : 'right', xtype : 'numbercolumn', format : T('format.number') },
		{ header : 'Interface', dataIndex : 'ifc', width : 80, align : 'right', xtype : 'numbercolumn', format : T('format.number') },
		{ header : 'ERP', dataIndex : 'erp', width : 80, align : 'right', xtype : 'numbercolumn', format : T('format.number') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items : []
	} ]
});