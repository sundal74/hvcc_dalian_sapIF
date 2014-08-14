/**
 * ProdParam controller
 */
Ext.define('Prod.controller.prod_param.ProdParam', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.ProdParam', 
		'Prod.store.ProdParam', 
		'Prod.view.prod_param.ProdParam',
		'Prod.view.prod_param.ProdParamAddPopup'
	],
	
	models : ['Prod.model.ProdParam'],
			
	stores: ['Prod.store.ProdParam'],
	
	views : ['Prod.view.prod_param.ProdParam'],
	
	refs: [
		{ ref : 'ProdParam', selector : 'prod_prod_param' },
		{ ref : 'ProdParamList', selector : 'prod_prod_param_list' },
		{ ref : 'ProdParamAddPopup', selector : 'prod_prod_param_add_popup' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_prod_param' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_prod_param_list' : {
				click_update : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_inquiry : this.onInquiryDetail
			},
			'prod_prod_param_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_prod_param_add_popup' : {
				paramschange : this.onAddPopupParamsChange,
				click_close : this.onPopupClose,
				click_save : this.onPopupSave,
				click_add : this.onGridAdd
			},
			'prod_prod_param_add_popup grid' : {
				after_grid_updated : this.afterPopupGridUpdated,
			},
			'prod_prod_param_add_popup #btn_add' : {
				click : this.onGridAdd
			},
			'prod_prod_param_add_popup #btn_show' : {
				click : this.onGridShow
			}
		});
	},

	/****************************************************************
	 ** 				여기는 customizing area 						**
	 ****************************************************************/
	/**
	 * Popup params change
	 */
	onAddPopupParamsChange : function(view, params) {
		var selection = this.getProdParamList().getSelectionModel().getSelection();
		var data = {};
		
		if(selection && selection.length > 0) {
			data['operation'] = selection[0].data.operation;
			data['machine'] = selection[0].data.machine;
		} else {
			var searchParams = this.getSearchForm().getValues();
			if(searchParams['operation.name-eq']) {
				data['operation'] = { id : login.current_domain_id + '-' + searchParams['operation.name-eq'], name : searchParams['operation.name-eq'] };
			}
			if(searchParams['machine.name-eq']) {
				data['machine'] = { id : login.current_domain_id + '-' + searchParams['machine.name-eq'], name : searchParams['machine.name-eq'] };
			}
		}
		
		view.child('form').getForm().setValues(data);
		if(data['operation'] && data['machine']) {
			this.onGridShow();
		}
	},
	
	onPopupNew : function() {
		HF.popup('Prod.view.prod_param.ProdParamAddPopup', {}, {});
	},
	
	onGridAdd : function(btn) {
		var popup = this.getProdParamAddPopup();
		var form = popup.child('form').getForm();
		var formValues = form.getValues();
		var operId = formValues.operation_id;
		var machineId = formValues.machine_id;
		
		if(!operId) {
			HF.msg.alert(T('text.X is empty', {x : T('label.operation')}));
			return;
		}
		
		if(!machineId) {
			HF.msg.alert(T('text.X is empty', {x : T('label.machine')}));
			return;
		}
		if(!popup.child(' #btn_show').name) {
			HF.msg.alert(T('text.Click Search Button'));
			return;
		}
		
		var view = this.getProdParamAddPopup().child('grid');
		var gridStore = view.getStore();
		gridStore.add_row(operId, machineId);
	},
	
	onPopupClose : function(view) {
		view.close();
	},
	
	onPopupSave:function(btn){
		var popup = this.getProdParamAddPopup();
		var form = popup.child('form').getForm();
		var formValues = form.getValues();
		
		if(!formValues.operation_id) {
			HF.msg.alert(T('text.X is empty', {x : T('label.operation')}));
			return;
		}
		
		if(!formValues.machine_id) {
			HF.msg.alert(T('text.X is empty', {x : T('label.machine')}));
			return;
		}
		
		var popupGrid = popup.child('grid');
		var gridStore = popupGrid.getStore();
		var url = '/domains/' + login.current_domain_id + '/prod_params/update_multiple.json';
		this.saveGridData(popupGrid, url);
	},
	
	onGridShow : function(btn) {
		var popup = this.getProdParamAddPopup();
		var popupGrid = popup.child('grid');
		var gridStore = popupGrid.getStore();
		var form = popup.child('form').getForm();
		var formValues = form.getValues();
		
		if(!formValues.operation_id) {
			HF.msg.alert(T('text.X is empty', {x : T('label.operation')}));
			return;
		}
		
		if(!formValues.machine_id) {
			HF.msg.alert(T('text.X is empty', {x : T('label.machine')}));
			return;
		}
		
		popup.child(' #btn_show').name = true;
		var searchParams = {};
		Ext.Object.each(formValues, function(key, value) {
			searchParams['_q[' + key + '-eq' + ']'] = value;
		});
		
		gridStore.getProxy().extraParams = searchParams
		gridStore.load();
	},
	
	afterPopupGridUpdated : function(grid, updateType, response) {
		var mainGrid = this.getGridView();
		var params = this.getSearchForm().getValues();
		this.reload(mainGrid, params);
		var popup = this.getProdParamAddPopup();
		popup.close();
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
		return this.getProdParam();
	}
});