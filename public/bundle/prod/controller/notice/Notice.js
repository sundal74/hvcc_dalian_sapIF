/**
 * Notice controller
 */
Ext.define('Prod.controller.notice.Notice', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.Notice', 
		'Prod.store.Notice', 
		'Prod.view.notice.Notice' 
	],
	
	models : ['Prod.model.Notice'],
			
	stores: ['Prod.store.Notice'],
	
	views : ['Prod.view.notice.Notice'],
	
	refs: [ { ref : 'Notice', selector : 'prod_notice' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_notice' : {
				paramschange : this.onParamsChange
			},
			'prod_notice_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_notice_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	// Customized code here ...
	
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}

		var searchForm = this.getSearchForm();
		formValues = searchForm.getValues();
		
		if(!params['work_date-gte'] && !formValues['work_date-gte']) {
			params['work_date-gte'] = HF.getDate(-7);
		}
		if(!params['work_date-lte'] && !formValues['work_date-lte']) {
			params['work_date-lte'] = HF.getDate(0);
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
		return this.getNotice();
	}
});