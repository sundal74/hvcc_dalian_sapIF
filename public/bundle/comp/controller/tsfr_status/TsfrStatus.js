/**
 * TsfrStatus controller
 */
Ext.define('Comp.controller.tsfr_status.TsfrStatus', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : [
		'Comp.store.TsfrStatus',
		'Comp.view.tsfr_status.TsfrStatus',
		'Comp.view.tsfr_status.TsfrStatusList',
		'Comp.view.tsfr_status.TsfrStatusSearch',
		'Comp.view.tsfr_status.TsfrRejectPopup'
	],
	
	models : [],
			
	stores: ['Comp.store.TsfrStatus'],
	
	views : ['Comp.view.tsfr_status.TsfrStatus'],
	
	refs: [ 
		{ ref : 'TsfrStatus', selector : 'comp_tsfr_status' },
		{ ref : 'TsfrStatusList', selector : 'comp_tsfr_status_list' },
		{ ref : 'TsfrRejectPopup', selector : 'comp_tsfr_reject_popup' } 
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_tsfr_status' : {
				paramschange : this.onParamsChange
			},
			'comp_tsfr_status_list' : {
				click_export : this.onExport,
				itemdblclick : this.onGridDblClick
			},
			'comp_tsfr_status_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'comp_tsfr_reject_popup' : {
				paramschange : this.onRejectPopupParamsChange,
				click_close : this.onCloseClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	/**
	 * 그리드 더블 클릭시 Reject Detail Popup
	 */
	onGridDblClick : function(grid, record, item, index, e, eOpts) {
		var selection = this.getTsfrStatusList().getSelectionModel().getSelection();
		HF.popup('Comp.view.tsfr_status.TsfrRejectPopup', selection[0].data);
	},
	
	/**
	 * Reject Popup Params Change
	 */
	onRejectPopupParamsChange : function(view, params) {
		var grid = view.child('grid');
		var store = grid.getStore();
		var extraParams = {
			'routing' : params['routing'],
			'st_no' : params['st_no'],
			'p_code' : params['p_code']
		};
		
		var searchForm = this.getSearchForm();
		var formParams = searchForm.getValues();
		if(formParams['work_date-eq']) {
			extraParams['prd_date'] = formParams['work_date-eq'];
		}
		if(formParams['shift-eq']) {
			extraParams['shift'] = formParams['shift-eq'];
		}
		store.getProxy().extraParams = extraParams;
		grid.getStore().load();
	},
	
	/**
	 * Popup Close
	 */ 
	onCloseClick : function(popup) {
		popup.close();
	},
	
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['work_date-eq']) {
			params['work_date-eq'] = HF.getShiftDate(0);
		}
		return params;
	},
	
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/diy_selections/PmsTsfrStatus/query.xls';
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getTsfrStatus();
	}
});