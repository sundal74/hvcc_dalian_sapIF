/**
 * ProdPlan controller
 */
Ext.define('Prod.controller.prod_plan.ProdPlan', {
	
	extend : 'Base.abstract.entity.ReportMainController',
	
	requires : [ 
		'Prod.view.prod_plan.ProdPlan',
		'Prod.view.prod_plan.PlanPopup',
		'Prod.view.prod_plan.AddPlanPopup'
	],
	
	models : [ 'Prod.model.ProdPlan' ],
			
	stores : [ 'Prod.store.ProdPlan' ],
	
	views : [ 'Prod.view.prod_plan.ProdPlan' ],
	
	refs : [ 
		{ ref : 'ProdPlan', selector : 'prod_prod_plan' },
		{ ref : 'ProdPlanPopup', selector : 'prod_plan_popup' },
		{ ref : 'AddPlanPopup', selector : 'prod_add_plan_popup' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_prod_plan' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_prod_plan_list' : {
				click_save : this.onGridSave,
				click_add : this.onClickAdd,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				click_test : this.onPlanPopup,
				click_create_order : this.onGenerateOrder,
				after_grid_updated : this.afterGridUpdated,
				after_grid_loaded : this.afterGridLoaded
			},
			'prod_prod_plan_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_plan_popup' : {
				click_save : this.onPopupSave,
				click_cancel : this.onClickClose
			},
			'prod_plan_popup_list' : {
				after_grid_updated : this.afterPopupGridUpdated
			},
			'prod_add_plan_popup' : {
				click_close : this.onPopupClose,
				click_save : this.onAddPopupSave
			},
			'prod_add_plan_popup form' : {
				after_form_saved : this.afterFormSaved
			},
		});
	},

	/****************************************************************
	 ** 					POPUP LOGIC 		 				   **
	 ****************************************************************/
	/**
	 * Click Add
	 */
	onClickAdd : function() {
		HF.popup('Prod.view.prod_plan.AddPlanPopup', {}, {});
	},

	/**
	 * Popup Close
	 */	
	onPopupClose : function(view) {
		view.close();
	},
	
	/**
	 * Plan Save 된 후 Refersh
	 */
	afterFormSaved : function() {
		var popup = this.getAddPlanPopup();
		popup.close();
		this.onSearchClick();
	},
	
	/**
	 * Add Popup Save
	 */
	onAddPopupSave : function(view) {
		var form = view.child('form');
		this.saveFormData(form);
	},
	
	/**
	 * Popup Save
	 */
	onPopupSave : function() {
		var planPopup = this.getProdPlanPopup();
		var gridView = planPopup.child('prod_plan_popup_list');
		this.onGridSave(gridView);
	},
	
	/**
	 * after import success
	 */
	onImportSuccess : function(response) {
		var headers = response.result.headers;
		var items = response.result.items;
		// 팝업 창을 띄워서 표시
		HF.popup('Prod.view.prod_plan.PlanPopup', {}, {});
		var planPopup = this.getProdPlanPopup();
		var gridView = planPopup.child('prod_plan_popup_list');
		this.gridPopupColumnHeaderChange(gridView, headers);
		gridView.getStore().loadData(items);
	},
	
	/**
	 * 그리드 헤더 변경 : 날짜 D-Day 컬럼을 실제 날짜로 변경한다.
	 */
	gridPopupColumnHeaderChange : function(grid, headers) {
		var columns = grid.columns;
		var index = 0;
		Ext.each(columns, function(column) {
			// 세 번째 컬럼 부터 날짜 컬럼 ...
			if(index >= 4) {
				column.setText(headers[index - 4])
			}
			index += 1;
		});
	},
	
	/**
	 * 그리드 멀티플 업데이트 후 callback
	 * 
	 * grid grid
	 * @updateType update : u, delete : d
	 * @response grid update후 서버에서 보내준 response
	 */
	afterPopupGridUpdated : function(grid, updateType, response) {
		var planPopup = this.getProdPlanPopup();
		planPopup.close();
		this.getMainView().setParams(this.getMainView().getParams());
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/	
	/**
	 * 그리드 헤더 변경 : 날짜 D-Day 컬럼을 실제 날짜로 변경한다.
	 */
	gridColumnHeaderChange : function(grid, headers) {
		var columns = grid.columns;
		var index = 0;
		Ext.each(columns, function(column) {
			// 세 번째 컬럼 부터 날짜 컬럼 ...
			if(index >= 4) {
				column.setText(headers[index - 4])
			}
			index += 1;
		});
	},
	
	/**
	 * created, updated, deleted records를 한꺼번에 생성, 수정, 삭제한다.  
	 *
	 * @gridView
	 * @records
	 * @url
	 */
	updateMultiple : function(gridView, records, url) {
		var startDate = gridView.columns[4].text;
		var updateType = records[0]._cud_flag_;
		var self = this;
	    Ext.Ajax.request({
		    url: url,
		    method : 'POST',
		    params : { multiple_data : Ext.JSON.encode(records), plan_date_from : startDate, dept_type : this.getDeptType() },
		    success : function(response) {
				gridView.fireEvent('after_grid_updated', gridView, updateType, response);
				HF.msg.success((updateType == 'd') ? T('text.Success to Delete') : T('text.Success to Update'));
			}
		});
	},
	
	/**
	 * multiple update url
	 */
	getMultipleUpdateUrl : function(grid) {
		return '/domains/' + login.current_domain_id + '/prod_plans/update_multiple.json';
	},
	
	/**
	 * 시작일 
	 */
	getStartDate : function() {
		var values = this.getSearchForm().getValues();
		return values['plan_date-eq'];
	},
	
	/**
	 * 가공/조립 여부를 가져온다.
	 */
	getDeptType : function() {
		var values = this.getSearchForm().getValues();
		return values['dept_type-eq'];
	},
	
	/**
	 * Workcenter를 가져온다.
	 */
	getWorkcenter : function() {
		var values = this.getSearchForm().getValues();
		return values['workcenter.name-eq'];
	},
	
	/**
	 * Order 생성 
	 */
	onGenerateOrder : function() {
		var startDate = this.getStartDate();
		var deptType = this.getDeptType();
		
		if(startDate && deptType) {
			var deptTypeStr = (deptType == '1' ? 'Machining' : 'Assembly');
			var msg = T('text.Sure to Generate Order') + "\n(StartDate : " + startDate + ", Type : " + deptTypeStr + ")";
			
			HF.msg.confirm({
				msg : msg,
				fn : function(confirmBtn) {
					if(confirmBtn == 'yes') {
						Ext.Ajax.request({
			    			url: '/domains/' + login.current_domain_id + '/prod_plans/generate_order.json',
							method : 'POST',
							timeout : 180000,
							params : { start_date : startDate, order_days : 7, dept_type : deptType },
							success : function(response) {
								HF.msg.success(T('text.Success to Process'));
							}
						})
					}
				},
				scope : this
			});
		} else {
			if(!startDate) {
				HF.msg.notice(T('text.Select x First', {x : T('label.date')}));
			} else if(!deptType) {
				HF.msg.notice(T('text.Select x First', {x : T('label.type')}));
			}
		}
	},
	
	/**
	 * reload전에 처리 할 것 처리
	 */
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['plan_date-eq']) {
			params['plan_date-eq'] = Ext.util.Format.date(HF.getShiftDate(1), T('format.date'));
		}
		if(!params['dept_type-eq']) {
			params['dept_type-eq'] = '1';
		}
		return params;
	},
	
	/**
	 * search button click시 
	 */
	onSearchClick : function(btn) {
		var searchForm = this.getSearchForm();
		var params = searchForm.getValues();
		if(params['dept_type-eq']) {
			this.getMainView().setParams(params);
		} else {
			if(!params['dept_type-eq']) {
				HF.msg.notice(T('text.Select x First', {x : T('label.type')}));
			}
		}
	},	
	
	/**
	 * grid load된 후 처리 
	 */
	afterGridLoaded : function(records, operation) {
		var resultSet = Ext.JSON.decode(operation.response.responseText);
		var headers = resultSet.headers;
		var grid = this.getGridView();
		this.gridColumnHeaderChange(grid, headers);
	},
	
	/**
	 * 서버로 전달되서는 안 되는 값을 제거하거나 값을 선처리한다.
	 * 
	 * @data
	 */
	validateMultipleUpdateData : function(data) {
		Ext.Object.each(data, function(key, value) {
			if(key == 'operation_desc' && key == 'product_desc') {
				delete data[key];
			}
		});	
		return data;
	},
	
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/prod_plans.xls';
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getProdPlan();
	}
});