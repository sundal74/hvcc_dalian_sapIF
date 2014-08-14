/**
 * PmsSpc controller
 */
Ext.define('Comp.controller.pms_spc.PmsSpc', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Comp.view.pms_spc.PmsSpc'],
	
	models : [],
			
	stores: [],
	
	views : ['Comp.view.pms_spc.PmsSpc'],
	
	refs: [ 
		{ ref : 'PmsSpc', selector : 'comp_pms_spc' },
		{ ref : 'PmsSpcList', selector : 'comp_pms_spc_list' }
	 ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_pms_spc' : {
				paramschange : this.onParamsChange,
				click_export : this.onExport
			},
			'comp_pms_spc_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
		
		this.store = Ext.create('Ext.data.Store', {
			fields: ['id', 'name', 'description'],
			proxy : {
				type : 'ajax',
				url : '',
				format : 'json',
				reader : {
					type : 'json'
				}
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	/**
	 * params change
	 */
	onParamsChange : function(view, params) {
		params = this.beforeParamsChange(view, params);
		var searchForm = this.getSearchForm();
		searchForm.setValues(params);
		
		if(params['work_date-eq'] && params['item_no-eq'] && params['p_code-eq']) {
			this.requestData(params);
		}
	},
	
	/**
	 * search click
	 */
	onSearchClick : function(btn) {
		var searchForm = this.getSearchForm();
		var params = searchForm.getValues();
		
		if(params['work_date-eq'] && params['item_no-eq'] && params['p_code-eq']) {
			this.getMainView().setParams(params);
		} else {
			HF.msg.notice(T('text.Select Item First'));
		}
	},
	
	/**
	 * params change 진입 전 처리 
	 */
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['work_date-eq']) {
			params['work_date-eq'] = HF.getCurrentShiftDate();
		}
		return params;
	},
	
	/**
	 * 서버에 데이터 요청 
	 */
	requestData : function(params) {
		var self = this;
		var gridView = this.getPmsSpcList();
		
		try {
			this.store.getProxy().url = 'domains/' + login.current_domain_id + '/pms_master_items/spc_values.json';
			this.store.getProxy().extraParams = params;
			this.store.load({
				callback : function(records, operation, success) {
					if(success) {
						var spcData = Ext.JSON.decode(operation.response.responseText);
						if(spcData.raws.length > 0) {
							gridView.store.loadRawData(spcData.raws);
							self.onChartDisplay(spcData);
						} else {
							HF.msg.notice({title : T('text.No Data'), msg : T('text.No Data')});
						}
					}
				}
			});
		} catch(e) {
			HF.error(e);
		}
	},
	
	/**
	 * 받은 데이터로 차트를 표시 
	 */
	onChartDisplay : function(spcData) {
		var self = this;
		try {
			self.chartDisplayExe(spcData)
		} catch(e) {
			var task = new Ext.util.DelayedTask(function() {
			    self.chartDisplayExe(spcData)
			});
			task.delay(500);
		}
	},
	
	chartDisplayExe : function(spcData){
		var iframeObj = Ext.dom.Query.jsSelect('*[src=/spc_chart]', document);
		iframeObj[0].contentWindow.chartDisplay(spcData);
	},
	
	/**
	 * export button click시 
	 */
	onExport : function() {
		var searchFormView = this.getSearchView();
		var params = searchFormView.getForm().getValues();
		if(params['work_date-eq'] && params['item_no-eq'] && params['p_code-eq']) {
			var paramStr = Ext.Object.toQueryString(params);
			window.location.href = 'domains/' + login.current_domain_id + '/pms_master_items/spc_values.xls?' + paramStr;
		} else {
			HF.msg.notice({title : T('text.Nothing selected'), msg : T('text.Select item and process')});
		}
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getPmsSpc();
	}
});