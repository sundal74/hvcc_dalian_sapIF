/**
 * QtyActual controller
 */
Ext.define('Prod.controller.qty_actual.QtyActual', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.QtyActual', 
		'Prod.store.QtyActual', 
		'Prod.view.qty_actual.QtyActual' 
	],
	
	models : ['Prod.model.QtyActual'],
			
	stores: ['Prod.store.QtyActual'],
	
	views : ['Prod.view.qty_actual.QtyActual'],
	
	refs: [ { ref : 'QtyActual', selector : 'prod_qty_actual' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_qty_actual' : {
				paramschange : this.onParamsChange
			},
			'prod_qty_actual_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_inquiry : this.onInquiryDetail
			},
			'prod_qty_actual_search' : {
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
		return this.getQtyActual();
	}
});