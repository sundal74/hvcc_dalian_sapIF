/**
 * PmsSpcAlarm controller
 */
Ext.define('Comp.controller.pms_spc_alarm.PmsSpcAlarm', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Comp.model.PmsSpcAlarm', 
		'Comp.store.PmsSpcAlarm', 
		'Comp.view.pms_spc_alarm.PmsSpcAlarm' 
	],
	
	models : ['Comp.model.PmsSpcAlarm'],
			
	stores: ['Comp.store.PmsSpcAlarm'],
	
	views : ['Comp.view.pms_spc_alarm.PmsSpcAlarm'],
	
	refs: [ { ref : 'PmsSpcAlarm', selector : 'comp_pms_spc_alarm' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_pms_spc_alarm' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'comp_pms_spc_alarm_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'comp_pms_spc_alarm_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'comp_pms_spc_alarm_list #go_detail' : {
				click : this.onShowDetail
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['prd_date-eq']) {
			params['prd_date-eq'] = HF.getShiftDate(0);
		}
		return params;
	},
	
	/**
	 * after import success
	 */
	onImportSuccess : function(response) {
		var gridView = this.getGridView();
		gridView.store.load();
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
		return this.getPmsSpcAlarm();
	}
});