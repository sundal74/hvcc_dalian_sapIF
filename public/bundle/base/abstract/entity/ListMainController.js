/**
 * ListMain controller
 */
Ext.define('Base.abstract.entity.ListMainController', {
	
	extend: 'Base.abstract.entity.CoreController',
	
	/**
	 * initialize
	 */
	init : function() {
		this.parseClassName();
	},
	
	/**
	 * class name을 파싱하여 각종 name을 설정한다. 
	 */
	parseClassName : function() {
		var className = Ext.getClassName(this);
		var classNameArr = className.split('.');
		this.bundleName = classNameArr[0].toLowerCase();
		this.singleEntityName = classNameArr[2];
		this.multipleEntityName = this.getMultipleEntityName(this.singleEntityName);
		// list main view xtype : bundle_entity (ex) base_role
		this.mainViewName = this.bundleName + '_' + this.singleEntityName;
		// grid view xtype : bundle_entity_list (ex) base_role_list
		this.gridViewName = this.bundleName + '_' + this.singleEntityName + '_list';
		// search view xtype : bundle_entity_search (ex) base_role_search
		this.searchViewName = this.bundleName + '_' + this.singleEntityName + '_search';
		
		// buffered store(infinite grid) 일 경우 검색 폼의 파라미터를 같이 보낸다. 
		// TODO 중요 : 동일 store를 다른 곳에서 사용하는데 충돌이 발생하는지 테스트 필요...
		var self = this;
		Ext.getStore(this.stores[0]).on('beforeprefetch', function(store, operation, eOpts) {
			if(store.buffered) {
				var grid = self.getGridView();
				if(grid) {
					var searchForm = self.getSearchForm();
					if(searchForm) {
						var params = searchForm.getValues();
						if(params) {
							operation.params = self.buildGridParams(grid, params);
						}
					}
				}
			}
		});
	},
	
	/**
	 * entity 복수형을 리턴 
	 */
	getMultipleEntityName : function(singleEntityName) {
		return singleEntityName + 's';
	},
	
	/**
	 * grid view를 리턴 
	 */
	getGridView : function() {
		return this.queryItem(null, this.gridViewName);
	},
	
	/**
	 * search view를 리턴 
	 */
	getSearchView : function() {
		// TODO 검색창에 대한 화면 배치를 효율적으로 정리할 것.
		return Ext.getCmp('viewport').down(this.searchViewName);
	},
	
	/**
	 * search form을 리턴 
	 */
	getSearchForm : function() {
		var searchView = this.getSearchView();
		return searchView ? searchView.getForm() : null;
	},
	
	/**
	 * main store를 리턴 
	 */
	getMainStore : function() {	
		return this.getStore(this.stores[0]);
	},
	
	/**
	 * multiple update url을 리턴 
	 */
	getMultipleUpdateUrl : function(grid) {
		if(!this.multipleUpdateUrl)
			this.multipleUpdateUrl = '/domains/' + login.current_domain_id + '/' + this.multipleEntityName + '/update_multiple.json';
			
		return this.multipleUpdateUrl;
	},
	
	/**
	 * search form을 reset
	 */
	onResetClick : function(btn) {
		var searchForm = this.getSearchForm();
		searchForm.reset();
	},
	
	/**
	 * search 버튼을 클릭했을 경우 검색 수행 
	 *
	 * @return
	 */
	onSearchClick : function(btn) {
		var searchForm = this.getSearchForm();
		var params = searchForm.getValues();
		this.getMainView().setParams(params);
	},
	
	/**
	 * detail view name을 리턴 
	 */
	getDetailViewName : function() {
		return this.views[0] + 'Detail';
	},
	
	/**
	 * show detail button을 클릭시  
	 *
	 * @gridView
	 */
	onShowDetail : function(gridView, td, rowIndex, colIndex, event, record, tr, grid) {
		if(this.getDetailViewType && this.getDetailViewName) {
			var detailType = this.getDetailViewType();
			if(detailType == 'popup') {
				HF.popup(this.getDetailViewName(), {id : record.get('id')}, {});
			} else if(detailType == 'view') {
				HF.show(this.getDetailViewName(), {id : record.get('id')})
			}
		}
	},
	
	onInquiryDetail : function(btn) {
		var selection = this.getGridView().getSelectionModel().getSelection();

		if(selection.length > 0) {
			if(this.getDetailViewType && this.getDetailViewName) {
				var detailType = this.getDetailViewType();
				if(detailType == 'popup') {
					HF.popup(this.getDetailViewName(), {id : selection[0].data.id}, {});
				} else if(detailType == 'view') {
					HF.show(this.getDetailViewName(), {id : selection[0].data.id})
				}
			}
		} else {
			HF.msg.notice(T('text.Nothing selected'));
		}
	},
	
	/**
	 * entry point
	 *
	 * @return
	 */	
	onParamsChange: function(view, params) {
		params = this.beforeParamsChange(view, params);
		if(this.validateParams(view, params)) {
			var searchForm = this.getSearchForm();
			searchForm.setValues(params);
			this.reload(view.child('grid'), searchForm.getValues());
		}
	},
	
	/**
	 * onParamsChange전에 처리, 기본으로 들어가야 할 파라미터 등을 세팅한다.
	 */
	beforeParamsChange : function(view, params) {
		return params;
	},
	
	/**
	 * onParamsChange전에 처리, 파라미터 validation 체크 
	 */
	validateParams : function(view, params) {
		return true;
	},
	
	/**
	 * import button click시 
	 */
	onImport : function() {
		HF.popup('Base.view.field.ImportPopup', null, {
			owner : this.getMainView(), 
			url : 'domains/' + login.current_domain_id + '/' + this.multipleEntityName + '/import.json'
		});
	},

	/**
	 * export : 클라이언트 화면의 정보를 그대로 서버에 올려주고 서버는 그 정보를 엑셀로 내려준다. 
	 */
	/*onExport : function(target) {
		if(target instanceof Ext.grid.Panel) {
			var sendArr = [];
			var columns = target.columns;
			var headerObj = {};
			var sendInfo = {};
			for(var i=1; i < columns.length; i++) { //첫번째 컬럼은 체크박스이므로 스킵한다.
				if(!columns[i].hidden) {
					headerObj[columns[i].dataIndex] = columns[i].text;
					sendInfo['col'+ i] = {sendAble:true, dataIndex:columns[i].dataIndex};
				} else {
					sendInfo['col'+ i] = {sendAble:false};
				}
			}
			sendArr.push(headerObj);
			
			var dom = target.getView().table.dom;
			var rowInfo = Ext.dom.Query.jsSelect('*[class^=x-grid-row]', dom);
			for(var i=0; i < rowInfo.length; i++) {
				if(rowInfo[i].className == "x-grid-row-checker") {
					continue;
				}
				var dataInfo = Ext.dom.Query.jsSelect('*[class^=x-grid-cell-inner]', rowInfo[i]);
				var dataObj = {};
				for(var k=0; k<dataInfo.length; k++) { 
					if(sendInfo['col'+ k] && sendInfo['col'+ k].sendAble){
						dataObj[sendInfo['col'+ k].dataIndex] = dataInfo[k].innerText;
					}
				}
				sendArr.push(dataObj);
			}
		}
		
		var searchFormView = this.getSearchView();
		var params = this.buildSearchParams(this.getGridView(), searchFormView.getForm().getValues());
		var paramStr = Ext.Object.toQueryString(params);
		
		var sendform;
		var sendInput;
		if(document.getElementById('xlsForm')) {
			sendform = document.getElementById('xlsForm');
			sendInput = document.getElementById('xlsGridInfo');
		} else {
			sendform = document.createElement("form");
			sendform.setAttribute("name", "xlsForm");
			sendform.setAttribute("id", "xlsForm");
	        sendform.setAttribute("method", "post"); 
	        var sendInput = document.createElement('input');
	        sendInput.setAttribute('type','hidden');
	        sendInput.setAttribute('name','xlsGridInfo');
	        sendInput.setAttribute('id','xlsGridInfo');
	        sendform.appendChild(sendInput);   
	        var bodyArr = Ext.query("body")
	        bodyArr[0].appendChild(sendform); 
		}
		
		sendInput.setAttribute('value', Ext.JSON.encode(sendArr));
        sendform.setAttribute("action", this.getExportUrl() + '?' + paramStr);
        sendform.submit();
	},*/
	
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/' + this.multipleEntityName + '/export.xls';
	},
	
	/**
	 * export : 클라이언트에서는 검색 조건으로 요청만 하고 서버에서 데이터를 생성해서 엑셀로 내려줌 
	 */
	onExport : function() {
		var searchFormView = this.getSearchView();
		var params = this.buildSearchParams(this.getGridView(), searchFormView.getForm().getValues());
		var paramStr = Ext.Object.toQueryString(params);
		window.location.href = this.getExportUrl() + '?' + paramStr;
	}
});