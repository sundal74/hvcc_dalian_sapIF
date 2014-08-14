/**
 * SpcChart controller
 */
Ext.define('Hcc.controller.spc_chart.SpcChart', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.spc_chart.SpcChart'],
	
	models : [],
			
	stores: [],
	
	views : ['Hcc.view.spc_chart.SpcChart'],
	
	refs: [ 
		{ ref : 'SpcChart', selector : 'hcc_spc_chart' },
		{ ref : 'SpcChartList', selector : 'hcc_spc_chart_list' }
	 ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_spc_chart' : {
				paramschange : this.onParamsChange,
				click_import : this.onImport,
				after_import : this.onImportSuccess,
				click_test : this.onTest,
				click_export : this.onExport
			},
			'hcc_spc_chart_search' : {
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
		this.requestData(params);
	},
	
	onSearchClick : function(btn) {
		var searchForm = this.getSearchForm();
		var params = searchForm.getValues();
		if(params['spc_item_id']) {
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
		if(!params['work_date-gte']) {
			params['work_date-gte'] = HF.getShiftDate(-14);
		}
		if(!params['work_date-lte']) {
			params['work_date-lte'] = HF.getCurrentShiftDate();
		}
		return params;
	},
	
	/**
	 * 서버에 데이터 요청 
	 */
	requestData : function(params) {
		if(params['spc_item_id']) {
			var spcItemId = params['spc_item_id'];
			var self = this;
			var gridView = this.getSpcChartList();
			try {
				var domainId = login.current_domain_id;
				this.store.getProxy().url = 'domains/' + domainId + '/spc_items/' + spcItemId + '/spc_values.json';
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
		}
	},
	
	/**
	 * 테스트 용 
	 */
	onTest : function(view, params) {
		var iframeObj = Ext.dom.Query.jsSelect('*[src=/spc_chart]', document);
		iframeObj[0].contentWindow.chartDisplay({"xbar":[{"x":"2013-02-28-1","y":59.46,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-02-28-2","y":59.503,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-02-28-3","y":59.281,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-01-1","y":59.227,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-01-2","y":59.362,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-01-3","y":59.297,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-02-1","y":59.514,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-02-2","y":59.734,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-02-3","y":59.39,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-03-1","y":59.309,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-03-2","y":59.603,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-03-3","y":59.616,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-04-1","y":59.266,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-04-2","y":59.446,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-04-3","y":59.409,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-05-1","y":59.457,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-05-2","y":59.643,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-05-3","y":59.368,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-06-1","y":59.479,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-06-2","y":59.557,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-06-3","y":59.469,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-07-1","y":59.352,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-07-2","y":59.335,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-07-3","y":59.541,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-08-1","y":59.553,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-08-2","y":59.353,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-08-3","y":59.297,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-09-1","y":59.498,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-09-2","y":59.502,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-09-3","y":59.573,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-10-1","y":59.665,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-10-2","y":59.671,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-10-3","y":59.45,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-11-1","y":59.384,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-11-2","y":59.457,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-11-3","y":59.375,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-12-1","y":59.439,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-12-2","y":59.661,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-12-3","y":59.324,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-13-1","y":59.601,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-13-2","y":59.528,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-13-3","y":59.468,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-14-1","y":59.632,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-14-2","y":59.487,"lsl":59.525,"usl":59.689,"cl":59.607},{"x":"2013-03-14-3","y":59.522,"lsl":59.525,"usl":59.689,"cl":59.607}],"rbar":[{"x":"2013-02-28-1","y":0.911,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-02-28-2","y":0.914,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-02-28-3","y":0.616,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-01-1","y":0.539,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-01-2","y":0.566,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-01-3","y":0.87,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-02-1","y":0.914,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-02-2","y":0.472,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-02-3","y":0.949,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-03-1","y":0.643,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-03-2","y":0.638,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-03-3","y":0.641,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-04-1","y":0.403,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-04-2","y":0.591,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-04-3","y":0.71,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-05-1","y":0.756,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-05-2","y":0.582,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-05-3","y":0.312,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-06-1","y":0.71,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-06-2","y":0.711,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-06-3","y":0.86,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-07-1","y":0.623,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-07-2","y":0.67,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-07-3","y":0.947,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-08-1","y":0.798,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-08-2","y":0.339,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-08-3","y":0.452,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-09-1","y":0.737,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-09-2","y":0.567,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-09-3","y":0.76,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-10-1","y":0.424,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-10-2","y":0.598,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-10-3","y":0.296,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-11-1","y":0.61,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-11-2","y":0.885,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-11-3","y":0.455,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-12-1","y":0.801,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-12-2","y":0.489,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-12-3","y":0.498,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-13-1","y":0.645,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-13-2","y":0.835,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-13-3","y":0.899,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-14-1","y":0.708,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-14-2","y":0.819,"lsl":0.45,"usl":0.7,"cl":0.575},{"x":"2013-03-14-3","y":0.565,"lsl":0.45,"usl":0.7,"cl":0.575}]});
	},
	
	/**
	 * 받은 데이터로 차트를 표시 
	 */
	onChartDisplay : function(spcData) {
		var self = this;
		try {
			self.chartDisplayExe(spcData)
		} catch(e) {
			var task = new Ext.util.DelayedTask(function(){
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
	 * import button click시 
	 */
	onImport : function() {
		var searchForm = this.getSearchForm();
		var params = searchForm.getValues();
		
		if(params['spc_item_id']) {
			var spcItemId = params['spc_item_id'];
			var domainId = login.current_domain_id;
			var url = 'domains/' + domainId + '/spc_items/' + spcItemId + '/import_spc_values.json';
			HF.popup('Base.view.field.ImportPopup', null, {
				owner : this.getMainView(), 
				url : url
			});
		} else {
			HF.msg.notice({title : T('text.Nothing selected'), msg : T('text.Select item and process')});
		}
	},
	
	/**
	 * after import success
	 */
	onImportSuccess : function(response) {
		var searchForm = this.getSearchForm();
		var params = searchForm.getValues();
		this.requestData(params);
	},
	
	/**
	 * export button click시 
	 */
	/*onExportData : function() {
		var spcList = this.getSpcChartList();
		this.onExport(spcList);
	},*/
	
	onExport : function() {
		var searchFormView = this.getSearchView();
		var params = searchFormView.getForm().getValues();
		if(params['spc_item_id']) {
			var spcItemId = params['spc_item_id'];
			var paramStr = Ext.Object.toQueryString(params);
			window.location.href = 'domains/' + login.current_domain_id + '/spc_items/' + spcItemId + '/spc_values.xls?' + paramStr;
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
		return this.getSpcChart();
	}
});