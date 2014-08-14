/**
 * SpcItem controller
 */
Ext.define('Prod.controller.spc_item.SpcItem', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.SpcItem', 
		'Prod.store.SpcItem', 
		'Prod.view.spc_item.SpcItem' 
	],
	
	models : ['Prod.model.SpcItem'],
			
	stores: ['Prod.store.SpcItem'],
	
	views : ['Prod.view.spc_item.SpcItem'],
	
	refs: [ { ref : 'SpcItem', selector : 'prod_spc_item' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_spc_item' : {
				paramschange : this.onParamsChange
			},
			'prod_spc_item_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_update : this.onInquiryDetail,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated
			},
			'prod_spc_item_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_spc_item_list #go_detail' : {
				click : this.onShowDetail
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	// Customized code here ...
		
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
		return this.getSpcItem();
	}
});