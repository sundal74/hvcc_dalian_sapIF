/**
 * WorkerTime controller
 */
Ext.define('Prod.controller.worker_time.WorkerTime', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.WorkerTime', 
		'Prod.store.WorkerTime', 
		'Prod.view.worker_time.WorkerTime' 
	],
	
	models : ['Prod.model.WorkerTime'],
			
	stores: ['Prod.store.WorkerTime'],
	
	views : ['Prod.view.worker_time.WorkerTime'],
	
	refs: [ { ref : 'WorkerTime', selector : 'prod_worker_time' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_worker_time' : {
				paramschange : this.onParamsChange
			},
			'prod_worker_time_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_worker_time_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_worker_time_list #go_detail' : {
				click : this.onShowDetail
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	/**
	 * reload전에 처리 할 것 처리
	 */
	beforeParamsChange : function(view, params) {
		params = this.getSearchForm().getValues();
		if(!params['work_date-eq']) {
			params['work_date-eq'] = Ext.util.Format.date(HF.getCurrentShiftDate(), T('format.date'));
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
		return this.getWorkerTime();
	}
});