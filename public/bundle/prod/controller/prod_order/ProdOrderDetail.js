/**
 * ProdOrderDetail controller
 */
Ext.define('Prod.controller.prod_order.ProdOrderDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.ProdOrder', 
		'Prod.store.ProdOrder', 
		'Prod.view.prod_order.ProdOrderDetail'
	],
	
	models : ['Prod.model.ProdOrder'],
			
	stores: ['Prod.store.ProdOrder'],
	
	views : ['Prod.view.prod_order.ProdOrderDetail'],
	
	refs: [ { ref : 'ProdOrderDetail', selector : 'prod_prod_order_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_prod_order_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_prod_order_form' : {
				click_close : this.onClickClose,
				click_save :  this.onFormSave,
				click_delete : this.onFormDelete,
				after_form_saved : this.afterFormSaved,
				after_form_deleted : this.afterFormDeleted,
				validitychange: this.onFormValidityChange
			}
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	/**
	 * 실적 마감이 되었는지 체크하여 마감이 되었다면 수정이 안 되도록 버튼을 숨긴다.
	 */
	checkProdClosing : function(record) {
		var self = this;
		Ext.Ajax.request({
		    url: '/domains/' + login.current_domain_id + '/prod_closings/exist.json',
		    method : 'GET',
		    params : {
				work_date : Ext.util.Format.date(record.data.order_date, 'Y-m-d'),
				operation_id : record.data.operation.id
			},
		    success: function(response, opts) {
				var result = Ext.decode(response.responseText);
				var closing = result.exist;
				var mainView = self.getMainView();
				var chkForm = mainView.down('form');
				chkForm.down('entityfield[name=machine]').setReadOnly(true);
				chkForm.down('codecombo[name=shift]').setReadOnly(true);
				chkForm.down('textfield[name=status]').setReadOnly(true);
				chkForm.down('numberfield[name=uph]').setReadOnly(true);
				chkForm.down('datefield[name=order_date]').setReadOnly(true);
				chkForm.down('entityfield[name=operation]').setReadOnly(true);
				chkForm.down('entityfield[name=product]').setReadOnly(true);
				chkForm.down('numberfield[name=cycletime]').setReadOnly(true);
				chkForm.down('numberfield[name=pallet_qty]').setReadOnly(true);
				mainView.setRecord(record);
				if(closing) {
					mainView.down(' #save').hide();
				}
			}
		});
	},
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/
	/**
	 * override
	 */
	afterDetailLoaded : function(record, operation) {
		if(record && record.data && record.data.id) {
			//this.checkProdClosing(record);
			var mainView = this.getMainView();
			var chkForm = mainView.down('form');
			chkForm.down('entityfield[name=machine]').setReadOnly(true);
			chkForm.down('codecombo[name=shift]').setReadOnly(true);
			chkForm.down('textfield[name=status]').setReadOnly(true);
			chkForm.down('numberfield[name=uph]').setReadOnly(true);
			chkForm.down('datefield[name=order_date]').setReadOnly(true);
			chkForm.down('entityfield[name=operation]').setReadOnly(true);
			chkForm.down('entityfield[name=product]').setReadOnly(true);
			chkForm.down('numberfield[name=cycletime]').setReadOnly(true);
			chkForm.down('numberfield[name=pallet_qty]').setReadOnly(true);
			mainView.setRecord(record);
		} else {
			var mainView = this.getMainView();
			var chkForm = mainView.down('form');
			chkForm.down('textfield[name=status]').hide();
			chkForm.down('numberfield[name=actual_qty]').hide();
			chkForm.down('numberfield[name=rework_qty]').hide();
			chkForm.down('numberfield[name=defect_qty]').hide();
			chkForm.down('datetimefield[name=actual_start_time]').hide();
			chkForm.down('datetimefield[name=actual_end_time]').hide();
			mainView.setRecord(record);
		}
	},
	
	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.prod_order.ProdOrder', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.prod_order.ProdOrder', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getProdOrderDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});