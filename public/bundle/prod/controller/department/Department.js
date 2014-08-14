/**
 * Department controller
 */
Ext.define('Prod.controller.department.Department', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Base.store.Code',
		'Prod.model.Department', 
		'Prod.store.Department', 
		'Prod.view.department.Department' 
	],
	
	models : ['Prod.model.Department'],
			
	stores: ['Prod.store.Department'],
	
	views : ['Prod.view.department.Department'],
	
	refs: [ { ref : 'Department', selector : 'prod_department' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_department' : {
				paramschange : this.onParamsChange
			},
			'prod_department_list' : {
				click_add : this.onGridAdd,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_inquiry : this.onInquiryDetail
			},
			'prod_department_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	/**
	 * Department Code Id
	 */
	deptCodeId : '',
	
	/**
	 * entry point
	 *
	 * @return
	 */	
	onParamsChange: function(view, params) {
		params = this.beforeParamsChange(view, params);
		var searchForm = this.getSearchForm();
		searchForm.setValues(params);
		
		if(this.deptCodeId) {
			this.loadDept(view, params);
		} else {
			this.loadFirst(view, params);
		}
	},
	
	loadDept : function(view, params) {
		var grid = view.child('grid');
		var newParams = {'_q[parent_id-eq]' : this.deptCodeId};
		if(params) {
			newParams['_q[name-like]'] = params['name-like'];
			newParams['_q[description-like]'] = params['description-like'];
		}
		grid.store.getProxy().extraParams = newParams;
		grid.store.load();
	},
	
	loadFirst : function(view, params) {
		var self = this;
		var codeStore = Ext.getStore('Base.store.CommonCode');
		if(!codeStore) {
			codeStore = Ext.create('Base.store.CommonCode');
		}
		
		var newParams = {};
		newParams['_q[name-eq]'] = 'PROD_DEPT';
		newParams['_q[parent_id-is_null]'] = '';
		codeStore.getProxy().extraParams = newParams;
		codeStore.load({
			scope : this,
			callback : function(records, operation, success) {
				var respText = operation.response.responseText;
				var deptCode = Ext.JSON.decode(respText);
				var items = deptCode.items;
				if(items.length == 1) {
					self.deptCodeId = items[0].id;
					self.loadDept(view, params);
				}
			}
		});	
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 				   **
	 ****************************************************************/
	getMultipleUpdateUrl : function() {
		return 'domains/' + login.current_domain_id + '/common_codes/update_multiple.json';
	},
	
	/**
	 * grid에 row 추가 
	 *
	 * @grid
	 * @newData
	 */
	addGridRow : function(gridView, newData) {
		newData.data['parent_id'] = this.deptCodeId;
		console.log(newData.data);
		gridView.store.insert(0, newData);
		gridView.plugins[0].startEditByPosition({row: 0, column: 0});
		gridView.fireEvent('after_grid_added', gridView, newData);
	},
	
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
		return this.getDepartment();
	}
});