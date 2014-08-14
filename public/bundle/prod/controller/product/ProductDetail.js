/**
 * ProductDetail controller
 */
Ext.define('Prod.controller.product.ProductDetail', {

	extend: 'Base.abstract.entity.DetailMainController',

	requires : [ 
		'Prod.model.Product', 
		'Prod.store.Product', 
		'Prod.view.product.ProductDetail',
		'Prod.view.product.BomPopup'
	],

	models : ['Prod.model.Product'],

	stores: ['Prod.store.Product'],

	views : ['Prod.view.product.ProductDetail'],

	refs: [ 
		{ ref : 'ProductDetail', selector : 'prod_product_detail' },
		{ ref : 'BomPopup', selector : 'prod_view_bom_popup' }
	],

	init: function() {
		this.callParent(arguments);

		this.control({
			'prod_product_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_product_form' : {
				click_close : this.onClickClose,
				click_save :  this.onFormSave,
				click_delete : this.onFormDelete,
				after_form_saved : this.afterFormSaved,
				after_form_deleted : this.afterFormDeleted,
				validitychange: this.onFormValidityChange
			},
			'prod_view_bom_popup' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterBomPopupLoaded,
				click_close : this.onPopupClose
			}
		});
	},

	/****************************************************************
	 ** 				여기는 customizing area 						**
	 ****************************************************************/
	afterBomPopupLoaded : function(record, operation) {
		var self = this;
		Ext.Ajax.request({
			url : '/domains/' + login.current_domain_id + '/products/' + record.get('id') + '/child_products.json',
			method : 'GET',
			success: function(response) {		    	
				var resultObj = Ext.JSON.decode(response.responseText);
				var popup = self.getBomPopup();

				var directoryTree = popup.getTreeChildren(resultObj.items);
				var root = {
					name: record.get('name'), qty: '', leaf: false, expanded: true, children: directoryTree
				};
				popup.down('treepanel').store.setRootNode(root);
			}
		});	
	},

	onPopupClose : function(view) {
		view.close();
	},

	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/
	/**
	 * override
	 */
	afterDetailLoaded : function(record, operation) {
		var mainView = this.getMainView();
		
		if(record.data.id) {
			var chkForm = mainView.down('form');
			chkForm.down('textfield[name=name]').setReadOnly(true);
		}
		
		mainView.setRecord(record);
		mainView.down(' #back').hide();
	},

	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		// this.getMainView().setRecord(newRecord);
		this.getMainView().close();
		HF.show('Prod.view.product.Product', {}, {});
	},

	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.product.Product', {}, {});
	},

	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getProductDetail();
	},

	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});