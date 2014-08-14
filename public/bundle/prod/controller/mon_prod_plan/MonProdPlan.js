/**
 * MonProdPlan controller
 */
Ext.define('Prod.controller.mon_prod_plan.MonProdPlan', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.MonProdPlan', 
		'Prod.store.MonProdPlan', 
		'Prod.view.mon_prod_plan.MonProdPlan' 
	],
	
	models : ['Prod.model.MonProdPlan'],
			
	stores: ['Prod.store.MonProdPlan'],
	
	views : ['Prod.view.mon_prod_plan.MonProdPlan'],
	
	refs: [ { ref : 'MonProdPlan', selector : 'prod_mon_prod_plan' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_mon_prod_plan' : {
				paramschange : this.onParamsChange
			},
			'prod_mon_prod_plan_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_inquiry : this.onInquiryDetail
			},
			'prod_mon_prod_plan_search' : {
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

		if(!params['plan_year-eq']) {
			params['plan_year-eq'] = Ext.Date.format(new Date(), 'Y');
		}
		if(!params['plan_month-eq']) {
			params['plan_month-eq'] = Ext.Date.format(new Date(), 'm');
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
		return this.getMonProdPlan();
	}
});