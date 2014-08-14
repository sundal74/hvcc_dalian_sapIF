Ext.define('Comp.view.pms_master_station.PmsMasterStationList', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : 'comp_pms_master_station_list',
		
	store : 'Comp.store.PmsMasterStation',
	
	useDetailBtn : false,
	
	selectionMode : 'SINGLE',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.operation'), dataIndex : 'routing' },
		{ header : T('label.machine'), dataIndex : 'equipment' },
		{ header : T('label.st_no'), dataIndex : 'st_no', align : 'center' , sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.st_name'), dataIndex : 'name', width : 300 },
		{ header : T('label.tsfr_alarm_limit'), dataIndex : 'tsfr_alarm_limit', xtype : 'numbercolumn', format : T('format.precision'), align : 'right' },
		{ header : T('label.monitor'), dataIndex : 'monitor_flg', xtype : 'checkcolumn', width : 60 },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 140 },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'update']
	} ]
});