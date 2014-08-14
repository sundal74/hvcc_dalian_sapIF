Ext.define('Term.controller.lnst.OpLnstM010', {
	
	extend : 'Base.abstract.FormController',
	
	views : ['Term.view.lnst.OpLnstM010'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_lnst_oplnstm010' }
	],
	
	init : function() {
		this.control({
			'term_lnst_oplnstm010' : {
				paramschange : this.onParamsChange
			},
			'term_lnst_oplnstm010 #line_stop_report' : {
				click : this.onLineStopReport
			},
			'term_lnst_oplnstm010 #line_stop_adjust' : {
				click : this.onLineStopAdjust
			},
			'term_lnst_oplnstm010 #line_stop_adjust_modify' : {
				click : this.onLineStopAdjustModify
			},
			'term_lnst_oplnstm010 #btn_line_stop' : {
				click : this.onLineStop
			},
		});
	},
	
	onParamsChange : function(view, params) {
		view.store.getProxy().extraParams = {'_q[status-eq]' : '1', '_o[event_time]' : 'desc'};
		view.store.load();
	},

	onLineStopAdjust : function(grid, item, rowIndex, colIndex, e, record) {
		if(record.get("status") == "1") {
			HF.popup('Term.view.lnst.OpLnstP030', record.data, null);
		}
	},
	
	onLineStopReport : function(grid, item, rowIndex, colIndex, e, record) {
		HF.popup('Term.view.lnst.OpLnstP040', record.data, null);
	},
	
	onLineStopAdjustModify : function(grid, item, rowIndex, colIndex, e, record) {
		if(record.get("status") == "2") {
			HF.popup('Term.view.lnst.OpLnstP050', record.data, null);
		}
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	onLineStop : function() {
		HF.popup('Term.view.lnst.OpLnstP020', {}, {});
	},
});