Ext.define('Comp.view.pms_spc_alarm.PmsSpcAlarmList', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : 'comp_pms_spc_alarm_list',
		
	store : 'Comp.store.PmsSpcAlarm',
	
	useDetailBtn : false,
	
	selectionMode : 'SINGLE',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ 
			dataIndex : 'alarm_type',
		  	xtype: 'actioncolumn',
		  	width : 40,
		  	align : 'center',
			tooltip : '',
			renderer: function(value, metaData, record, row, col, store, gridView) {
				var alarmType = record.get("alarm_type");
				
				if(alarmType == '1') {
					this.items[0].icon = 'theme/image/statusGreen.png';
					//this.items[0].tooltip = 'Up and Down 4P';
				} else if(alarmType == '2') {
					this.items[0].icon = 'theme/image/statusYellow.png';
					//this.items[0].tooltip = 'Continuous Up or Down 6P';
				} else if(alarmType == '3') {
					this.items[0].icon = 'theme/image/statusGray.png';
					//this.items[0].tooltip = 'Above or Below CL 9P';
				} else if(alarmType == '4') {
					this.items[0].icon = 'theme/image/iconRed.png';
					//this.items[0].tooltip = 'Out Of USL/LSL';
				}
				
				return '';
			},
			items: [{
				icon: '',
				tooltip: ''
			}]
		},
		{ xtype : 'codecolumn', header : T('label.type'), width : 170, dataIndex : 'alarm_type', tpl : '{description}', commonCode : 'SPC_ALARM' },
		{ header : T('label.work_date'), dataIndex : 'prd_date', width : 85 },
		{ header : T('label.operation'), dataIndex : 'routing', width : 80 },
		{ header : T('label.st_no'), dataIndex : 'st_no', width : 85 },
		{ header : T('label.p_code'), dataIndex : 'p_code', width : 70 },
		{ header : T('label.item_no'), dataIndex : 'item_no', width : 100 },
		{ header : T('label.value') + '1', dataIndex : 'val1', width : 80 },
		{ header : T('label.value') + '2', dataIndex : 'val2', width : 80 },
		{ header : T('label.value') + '3', dataIndex : 'val3', width : 80 },
		{ header : T('label.value') + '4', dataIndex : 'val4', width : 80 },
		{ header : T('label.value') + '5', dataIndex : 'val5', width : 80 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: []
	} ]
});