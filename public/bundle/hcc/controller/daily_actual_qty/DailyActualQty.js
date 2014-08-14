/**
 * DailyActualQty controller
 */
Ext.define('Hcc.controller.daily_actual_qty.DailyActualQty', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.daily_actual_qty.DailyActualQty', 'Hcc.view.daily_actual_qty.DailyActualQtyDetail'],
	
	models : [],
			
	stores: ['Hcc.store.DailyActualQty'],
	
	views : ['Hcc.view.daily_actual_qty.DailyActualQty'],
	
	refs: [ 
		{ ref : 'DailyActualQty', selector : 'hcc_daily_actual_qty' },
		{ ref : 'DailyActualQtyList', selector : 'hcc_daily_actual_qty_list' },
		{ ref : 'DailyActualQtyDetail', selector : 'hcc_daily_actual_qty_detail' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_daily_actual_qty' : {
				paramschange : this.onParamsChange
			},
			'hcc_daily_actual_qty_list' : {
				click_export : this.onExport,
				click_update : this.onUpdateDetail
			},
			'hcc_daily_actual_qty_detail' : {
				paramschange : this.onDetailParamsChange,
				click_save : this.onClickModifyActual,
				click_close : this.onClickClose
			},
			'hcc_daily_actual_qty_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	
	beforeParamsChange : function(view, params) {
		// 검색은 오늘 날짜까지만 가능
		var searchView = this.getSearchView();
		searchView.down('datefield[name=work_date-eq]').setMaxValue(HF.getCurrentShiftDate());
		
		if(!params) {
			params = {};
		}
		if(!params['work_date-eq']) {
			params['work_date-eq'] = Ext.util.Format.date(HF.getCurrentShiftDate(), T('format.date'));
		}
		return params;
	},
	
	/**
	 * 실적 수정 팝업 Params Change
	 */
	onDetailParamsChange : function(view, params) {
		view.child(' #order_date').setValue(HF.getFormattedDate(view.getParams().record.order_date));
		view.child(' #workcenter').setValue(view.getParams().record.workcenter);
		view.child(' #operation').setValue(view.getParams().record.operation);
		view.child(' #machine').setValue(view.getParams().record.machine);
		view.child('grid').store.loadRawData(view.getParams().record);
	},
	
	/**
	 * 실적 수정 팝업 
	 */
	onUpdateDetail : function(gridView, td, rowIndex, colIndex, event, record, tr, grid) {
		var selection = this.getDailyActualQtyList().getSelectionModel().getSelection();
		
		if(selection.length > 0) {
			//this.checkProdClosing(selection[0].data);
			HF.popup('Hcc.view.daily_actual_qty.DailyActualQtyDetail', { record : selection[0].data });
		} else {
			HF.msg.notice({ title : T('text.Nothing selected'), msg : T('text.Select Item First')});
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
					HF.msg.alert('Already Production closed, You can not modify actuals!');
				} else {
					HF.popup('Hcc.view.daily_actual_qty.DailyActualQtyDetail', { record : data });
				}
				
			}
		});
	},
	
	/**
	 * 실적 수정 팝업에서 save 버튼 클릭시 ...
	 */
	onClickModifyActual : function(popup) {
		var formView = popup.child('form');
		var modifyQty = formView.down('numberfield[name=modify_qty]').getValue();
		var actualQty = popup.getParams().record.actual_qty;

		if(!modifyQty) {
			HF.msg.notice({title : T('text.Invalid data'), msg : T('text.Empty data exist')});
			return;
		}

		// 수정 값이 음수일 경우 실적보다 절대값이 커서는 안된다.
		if(modifyQty < 0 && (-1 * modifyQty) > actualQty) {
			HF.msg.notice({title : T('text.Invalid data'), msg : T('text.X greater than Y', {x : T('label.modify_qty'), y : T('label.actual_qty')})});
			return;
		}
		
		var self = this;
		formView.getForm().submit({
			clientValidation : true,
			url : '/domains/' + login.current_domain_id + '/diy_services/OpsModifyActual/shoot.json',
			params : { 'prod_order_id' : popup.getParams().record.id },
			success: function(form, action) {
				var result = action.result;
				popup.close();
				HF.msg.alert({title : result.message, msg : T('text.Success to Process')});
				var view = self.getMainView();
				var gridStore = view.child('grid').getStore();
				gridStore.load();
			}
		});
	},
	
	/**
	 * 실적 수정 팝업 close 버튼 클릭시 
	 */
	onClickClose : function(view) {
		view.close();
	},
	
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/diy_selections/GetDailyActualQty/query.xls';
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getDailyActualQty();
	}
});