Ext.define('Hcc.view.bar_report.BarInActualInf2List', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_bar_in_actual_inf2_list',
	
	useCheckBox : false,
		
	store : 'Hcc.store.BarInActualInf2',
	
	columns : [
		{
			xtype: 'rownumberer',
			width : 50
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
				
				if(!mes || !barcode || !inf || !erp) {
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
		{ header : T('label.product'), dataIndex : 'product', width : 110 },
		{ header : 'MES', dataIndex : 'mes', width : 275 },
		{ header : 'Barcode', dataIndex : 'barcode', width : 275 },
		{ header : 'Interface', dataIndex : 'ifc', width : 275 },
		{ 
			header : 'ERP Status', 
			dataIndex : 'erp', 
			renderer : function(val) {
				if(!val) {
					return '';
				} else if(val == '1') {
					return 'COMPLETED';
				} else if(val == '0') {
					return 'WAITING';
				} else if(val == '2') {
					return 'ERROR';
				} else {
					return val;
				}
			}
		 }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items : []
	} ]
});