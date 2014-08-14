/**
 * Lot controller
 */
Ext.define('Prod.controller.lot.Lot', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.Lot', 
		'Prod.store.Lot', 
		'Prod.view.lot.Lot',
		//'Prod.view.lot.LotTrackPopup',
		//'Prod.view.lot.SerialTrackPopup',
		//'Prod.view.lot.RmInOutTrackPopup'
	],
	
	models : ['Prod.model.Lot'],
			
	stores: ['Prod.store.Lot'],
	
	views : ['Prod.view.lot.Lot'],
	
	refs: [ 
			{ ref : 'Lot', selector : 'prod_lot' },
			{ ref : 'LotList', selector : 'prod_lot_list' },
			//{ ref : 'LotTrackPopup', selector : 'prod_lot_track_popup' },
			//{ ref : 'SerialTrackPopup', selector : 'prod_serial_track_popup' },
			//{ ref : 'LotTrackList', selector : 'prod_lot_track_list' }
		],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_lot' : {
				paramschange : this.onParamsChange
			},
			'prod_lot_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_inquiry : this.onInquiryDetail,
				click_track : this.onLotTrack,
				click_serial_track : this.onSerialTrack,
				//itemclick : this.onItemClick
			},
			'prod_lot_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}/*,
			'prod_lot_track_popup' : {
				paramschange : this.onEditorPopupParamsChange
			},
			'prod_serial_track_popup' : {
				paramschange : this.onEditorSerialPopupParamsChange
			},
			'prod_lot_track_list' : {
				itemdblclick : this.onRmItemClick
			},
			'prod_rm_in_out_track_popup' : {
				paramschange : this.onEditorRmInOutPopupParamsChange
			}*/
		});
	},
	
	/*onParamsChange:function(){
		this.callParent(arguments);
		var trackList = this.getLotTrackList();
		var gridStore = trackList.getStore();
		gridStore.removeAll();
	},*/
	
	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['work_date-eq']) {
			params['work_date-eq'] = HF.getCurrentShiftDate();
		}
		return params;
	},
		
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 				   **
	 ****************************************************************/
	onPopupNew : function() {
		HF.popup(this.getDetailViewName(), {}, {});
	},

	
	/**
	 * detail view type(popup | view | none)을 리턴
	 */	
	getDetailViewType : function() {
		return 'popup';
	},
	
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getLot();
	},
	
	onItemClick:function(grid, record, item, index, e, eOpts) {
		var trackList = this.getLotTrackList();
		var gridStore = trackList.getStore();
		gridStore.getProxy().url = '/domains/' + login.current_domain_id + '/lots/' + record.get('id') + '/lot_track.json';
		gridStore.removeAll();
		gridStore.load();
	},
	
	/**
	 * LotTrack
	 */
	onLotTrack : function(gridView, td, rowIndex, colIndex, event, record, tr, grid) {
		var selection = this.getLotList().getSelectionModel().getSelection();
		
		if(selection.length > 0) {
			HF.popup('Prod.view.lot.LotTrackPopup', {record:selection[0].data});
		}else {
			HF.msg.alert(T('text.Nothing selected'));
		}
	},
	
	onSerialTrack : function(gridView, td, rowIndex, colIndex, event, record, tr, grid) {
		var selection = this.getLotList().getSelectionModel().getSelection();
		
		if(selection.length > 0) {
			HF.popup('Prod.view.lot.SerialTrackPopup', {record:selection[0].data});
		}else {
			HF.msg.alert(T('text.Nothing selected'));
		}
	},
	
	onEditorPopupParamsChange : function(view, params) {
		
		view.down('#label_no').setValue(params.record.name);
		view.down('#product').setValue(params.record.product.name);
		view.down('#operation').setValue(params.record.operation.name);
		view.down('#machine').setValue(params.record.machine.name);
		
		var grid = view.child('grid');
		var gridStore = grid.getStore();
		gridStore.getProxy().url = '/domains/' + login.current_domain_id + '/lots/' + params.record.id + '/lot_track.json';
		gridStore.removeAll();
		gridStore.load();
	},
	
	onEditorSerialPopupParamsChange : function(view, params) {
		
		view.down('#label_no').setValue(params.record.name);
		view.down('#product').setValue(params.record.product.name);
		view.down('#operation').setValue(params.record.operation.name);
		view.down('#machine').setValue(params.record.machine.name);
		
		var grid = view.child('grid');
		var gridStore = grid.getStore();
		gridStore.getProxy().url = '/domains/' + login.current_domain_id + '/lots/' + params.record.id + '/serial_track.json';
		gridStore.removeAll();
		gridStore.load();
	},
	
	onRmItemClick : function(grid, record, item, index, e, eOpts) {
		var selection = this.getLotTrackList().getSelectionModel().getSelection();
		
		HF.popup('Prod.view.lot.RmInOutTrackPopup', {record:selection[0].data});
	},

	onEditorRmInOutPopupParamsChange : function(view, params) {
		var grid = view.child('grid');
		var gridStore = grid.getStore();
		gridStore.getProxy().url = '/domains/' + login.current_domain_id + '/rm_lots/' + params.record.id + '/rm_lot_track.json';
		gridStore.removeAll();
		gridStore.load();
	}
});