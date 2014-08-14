/**
 * DefectMgt controller
 */
Ext.define('Prod.controller.defect_mgt.DefectMgt', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : [ 
		'Prod.view.defect_mgt.DefectMgt',
		'Prod.view.defect_mgt.DefectMgtDetailPopup',
		'Prod.view.defect_mgt.DefectMgtUpdatePopup'
	],
	
	models : [],
			
	stores: ['Prod.store.DefectMgt'],
	
	views : ['Prod.view.defect_mgt.DefectMgt'],
	
	refs: [ 
		{ ref : 'DefectMgt', selector : 'prod_defect_mgt' },
		{ ref : 'DefectMgtDetailPopup', selector : 'prod_defect_mgt_detail_popup' },
		{ ref : 'DefectMgtUpdatePopup', selector : 'prod_defect_mgt_update_popup' },
		{ ref : 'DefectMgtList', selector : 'prod_defect_mgt_list' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_defect_mgt' : {
				paramschange : this.onParamsChange
			},
			'prod_defect_mgt_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_defect_mgt_list' : {
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onDetailPopup
				//click_save : this.onGridSave,
				//click_update : this.onUpdatePopup,
			},
			'prod_defect_mgt_update_popup' : {
				paramschange : this.onUpdateParamsChange,
				click_save : this.onUpdatePopupSave,
				click_close : this.onPopupClose
			},
			'prod_defect_mgt_update_popup grid' : {
				after_grid_updated : this.afterUpdatePopupGridUpdated,
			},
			'prod_defect_mgt_detail_popup' : {
				paramschange : this.onDetailParamsChange,
				after_detail_loaded : this.afterDetailPopupLoaded,
				click_add : this.onDetailGridAdd,
				click_save : this.onDetailPopupSave,
				click_close : this.onPopupClose
			},
			'prod_defect_mgt_detail_popup grid' : {
				after_grid_updated : this.afterDetailPopupGridUpdated,
			},
		});
	},

	/****************************************************************
	 ** 					여기는 detail popup  				       **
	 ****************************************************************/
	/**
	 * 상세 팝업 
	 */
	onDetailPopup : function(btn) {
		var selection = this.getDefectMgtList().getSelectionModel().getSelection();

		if(selection.length > 0) {
			//this.checkProdClosing(selection[0].data);
			HF.popup('Prod.view.defect_mgt.DefectMgtDetailPopup', {order : selection[0].data}, {record: selection[0].data});
		} else {
			HF.msg.alert(T('text.Nothing selected'));
		}
	},
	
	/**
	 * 실적 마감이 되었는지 체크하여 마감이 되었다면 수정이 안 되도록 버튼을 숨긴다.
	 */
	checkProdClosing : function(data) {
		Ext.Ajax.request({
		    url: '/domains/' + login.current_domain_id + '/prod_closings/exist.json',
		    method : 'GET',
		    params : {
				work_date : data.order_date.substring(0, 10),
				operation_id : login.current_domain_id + '-' + data.operation
			},
		    success: function(response, opts) {
				var result = Ext.decode(response.responseText);
				if(result.exist) {
					HF.msg.alert('Already Production closed, You can not modify scrap!');
				} else {
					HF.popup('Prod.view.defect_mgt.DefectMgtDetailPopup', {order : data}, {record: data});
				}
			}
		});
	},
	
	/**
	 * 상세 팝업 params change
	 */
	onDetailParamsChange : function(view, params) {
		var detailStore = view.child('grid').store;
		detailStore.getProxy().extraParams = { 'prod_order_id' : params.order.id };
		detailStore.load();
		view.child(' #product').setValue(params.order.product);
		view.child(' #product_desc').setValue(params.order.product_desc);
	},
	
	/**
	 * Detail 팝업 Grid를 추가한다. 
	 */
	onDetailGridAdd : function(view) {
		var grid = view.down('grid');
		grid.store.addRow(view.getParams().order.id);
	},
	
	/**
	 * Detail 팝업 저장시
	 */
	onDetailPopupSave : function(view) {
		var grid = view.child('grid');
		var records = grid.store.getModifiedRecords();
		var models = [];
		for(var i = 0 ; i < records.length ; i++) {
			var data = records[i].data;
			if(!data['_cud_flag_'] || data['_cud_flag_'] == '') {
				data['_cud_flag_'] = 'u';
			}
			
			var defectCode = data['defect_code'];
			delete data['defect_code'];
			if(!defectCode || defectCode.id == '') {
				HF.msg.alert(T('text.X is empty', {x : T('label.defect_code')}));
				return;
			} else {
				data['defect_code_id'] = defectCode.id;
			}
			
			/*if(!data['defect_qty'] || data['defect_qty'] == 0) {
				HF.msg.alert(T('text.Qty must be greater than x', {x : '1'}));
				return;
			}*/
			
			data['domain_id'] = login.current_domain_id;
			models.push(data);
		}
		
		if(models.length > 0 ) {
			this.updateMultiple(grid, models, '/domains/' + login.current_domain_id + '/defects/update_multiple.json');
		} else {
			HF.msg.alert(T('text.Nothing changed'));
		}
	},
	
	/**
	 * Update Popup 저장 후 
	 */
	afterDetailPopupGridUpdated : function(grid, updateType, response) {
		var defectMgtList = this.getDefectMgtList();
		HF.show('Prod.view.defect_mgt.DefectMgt', {}, {});
		var popup = this.getDefectMgtDetailPopup();
		popup.close();
	},
	
	/****************************************************************
	 ** 					여기는 update popup  				       **
	 ****************************************************************/	
	
	/**
	 * Update Grid Popup
	 */
	onUpdatePopup : function(btn) {
		var selection = this.getDefectMgtList().getSelectionModel().getSelection();

		if(selection.length > 0) {
			HF.popup('Prod.view.defect_mgt.DefectMgtUpdatePopup', {order : selection[0].data}, {record: selection[0].data});
			this.getDefectMgtDetailPopup().close();
		} else {
			HF.msg.alert(T('text.Nothing selected'));
		}
	},

	/**
	 * Update Popup Params Changed
	 */	
	onUpdateParamsChange : function(view, params) {
		var updateStore = view.child('grid').store;
		updateStore.getProxy().extraParams = { 'prod_order_id' : params.order.id };
		updateStore.load();
	},
	
	/**
	 * Update Popup Save
	 */
	onUpdatePopupSave : function(view) {
		var selection = this.getDefectMgtList().getSelectionModel().getSelection();
		var popup = this.getDefectMgtUpdatePopup();
		var popupGrid = popup.child('grid');
		var records = popupGrid.store.getUpdatedRecords();
		var attrsToDel = ['defect_code', 'child_product', 'child_product_desc', 'unit', 'bom_qty', 'defect_desc', 'parent_yn'];
		var models = []
		
		/**
		 * defect를 multiple_update하기 위한 데이터를 변경한다.
		 */
		for(var i = 0 ; i < records.length ; i++) {
			var model = records[i].data;

			model['description'] = model['defect_desc'];
			var defectCode = model['defect_code'];
			
			if(!defectCode || defectCode == '') {
				HF.msg.alert(T('text.X is empty', {x : T('label.defect_code')}));
				return;
			}
			
			var defectCodeId = defectCode['id'];
			
			if(!model['defect_qty'] || model['defect_qty'] == 0) {
				HF.msg.alert(T('text.Qty must be greater than x', {x : '1'}));
				return;
			}
			
			model['defect_code_id'] = defectCodeId;
			if(model['parent_yn'] == 'Y') {
				model['product_id'] = model['child_product_id'];
				model['child_product_id'] = '';
			}
			
			this.deleteAttrs(model, attrsToDel);
			this.addOrderInfo(model, selection[0].data);
			models.push(model);
		};
		if(models.length > 0 ) {
			this.updateMultiple(popupGrid, models, '/domains/' + login.current_domain_id + '/defects/update_multiple.json');
		} else {
			HF.msg.alert(T('text.Nothing changed'));
		}
	},
	
	/**
	 * 그리드에서 선택한 오더의 정보를 모델에 추가한다.
	 */
	addOrderInfo : function(model, selectionData) {
		model['work_date'] = selectionData.order_date;
		model['shift'] = selectionData.shift;
		model['operation_id'] = login.current_domain_id + '-' + selectionData.operation;
		model['machine_id'] = login.current_domain_id + '-' + selectionData.machine;
		model['product_id'] = login.current_domain_id + '-' + selectionData.product;
		model['_cud_flag_'] = 'c';
	},
	
	/**
	 * 필요없는 필드들을 모델로 부터 제거한다. 
	 */
	deleteAttrs : function(model, deleteAttrNames) {
		for(var i = 0 ; i < deleteAttrNames.length ; i++) {
			delete model[deleteAttrNames[i]];
		}
	},
	
	/**
	 * Update Popup 저장 후 
	 */
	afterUpdatePopupGridUpdated : function(grid, updateType, response) {
		var defectMgtList = this.getDefectMgtList();
		//this.reload(defectMgtList, this.getSearchForm().getValues());
		HF.show('Prod.view.defect_mgt.DefectMgt', {}, {});
		var popup = this.getDefectMgtUpdatePopup();
		popup.close();
	},
	
	/**
	 * popup close
	 */
	onPopupClose : function(view) {
		view.close();
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	
	getMultipleUpdateUrl : function() {
		return 'domains/' + login.current_domain_id + '/prod_orders/update_multiple.json';
	},
	
	/**
	 * reload전에 처리 할 것 처리
	 */
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		
		var searchForm = this.getSearchForm();
		formValues = searchForm.getValues();
		
		if(!params['order_date-eq'] && !formValues['order_date-eq']) {
			params['order_date-eq'] = HF.getCurrentShiftDate();
		}
		
		return params;
	},
	
	/**
	 * 서버로 전달되서는 안 되는 값을 제거하거나 값을 선처리한다.
	 * 
	 * @data
	 */
	validateMultipleUpdateData : function(data) {
		Ext.Object.each(data, function(key, value) {
			if(key != 'id' && key != 'defect_qty' && key != '_cud_flag_') {
				delete data[key];
			}
		});		
		return data;
	},
	
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/diy_selections/DefectMgt/query.xls';
	},
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getDefectMgt();
	}
});