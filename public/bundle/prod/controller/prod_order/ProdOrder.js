/**
 * ProdOrder controller
 */
Ext.define('Prod.controller.prod_order.ProdOrder', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.ProdOrder', 
		'Prod.store.ProdOrder', 
		'Prod.view.prod_order.ProdOrder' 
	],
	
	models : ['Prod.model.ProdOrder'],
			
	stores: ['Prod.store.ProdOrder'],
	
	views : ['Prod.view.prod_order.ProdOrder'],
	
	refs: [ { ref : 'ProdOrder', selector : 'prod_prod_order' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_prod_order' : {
				paramschange : this.onParamsChange
			},
			'prod_prod_order_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				click_create_label_plan : this.onCreateLabelPlan,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_prod_order_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
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
		if(!params['order_date-eq']) {
			params['order_date-eq'] = HF.getCurrentShiftDate();
		}
		return params;
	},
	
	/**
	 * Create Label 버튼 클릭 
	 */
	onCreateLabelPlan : function() {
		var searchValues = this.getSearchForm().getValues();
		var workDate = searchValues['order_date-eq'];
		
		if(workDate) {
			HF.msg.confirm({
				msg : T('text.Sure to Process'),
				fn : function(confirmBtn) {
					if(confirmBtn == 'yes') {
						Ext.Ajax.request({
				    		url: '/domains/' + login.current_domain_id + '/label_plans/create_daily_plan.json',
							method : 'POST',
							timeout : 60000,
							params : { work_date : workDate },
							success : function(response) {
								HF.msg.success(T('text.Success to Process'));
							}
						})
					}
				},
				scope : this
			});
		} else {
			HF.msg.alert({
				title : T('text.Empty data exist'),
				msg : T('text.X is empty', {x : T('label.date')}),
			});
		}
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
		return this.getProdOrder();
	}
});