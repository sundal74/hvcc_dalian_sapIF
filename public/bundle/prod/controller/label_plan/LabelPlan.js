/**
 * LabelPlan controller
 */
Ext.define('Prod.controller.label_plan.LabelPlan', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.LabelPlan', 
		'Prod.store.LabelPlan', 
		'Prod.view.label_plan.LabelPlan',
		'Prod.view.label_plan.ReprintPopup'
	],
	
	models : ['Prod.model.LabelPlan'],
			
	stores: ['Prod.store.LabelPlan'],
	
	views : ['Prod.view.label_plan.LabelPlan'],
	
	refs: [ 
		{ ref : 'LabelPlan', selector : 'prod_label_plan' },
		{ ref : 'LabelReprint', selector : 'prod_reprint_popup' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_label_plan' : {
				paramschange : this.onParamsChange
			},
			'prod_label_plan_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				click_print : this.onMultiPrint,
				click_stop : this.onPrintStop,
				click_print_test : this.onPrintTest,
				click_test : this.onConnectionTest,
				click_update : this.onInquiryDetail,
				click_reprint : this.onReprintPopup,
				after_grid_updated : this.afterGridUpdated
			},
			'prod_label_plan_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_reprint_popup' : {
				paramschange : this.onReprintPopupParamsChange,
				click_print : this.onReprint,
				click_close : this.onClickClose
			}
		});
		
		var self = this;
		Ext.getStore(this.stores[0]).on('load', function(store, records, successful, eOpts) {
			var gridView = self.getGridView();
			if(gridView) {
				gridView.getSelectionModel().deselectAll();
			}
		});		
	},
	
	stopFlag : false,

	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	/**
	 * 인쇄 간격을 설정에서 읽어서 리턴
	 */
	getPrintInterval : function() {
		var interval = HF.setting.get('setting-print_interval');
		if(!interval) {
			interval = 6.5;
		}
		
		return interval * 1000;
	},
	
	/**
	 * print 버튼을 클릭시 
	 */
	onMultiPrint : function() {
		// 1. 서버에 선택된 라벨 인쇄 데이터 Ajax 요청 
		var self = this;
		var gridView = this.getGridView();
		var selections = gridView.getSelectionModel().getSelection();
		
		// 2. Callback에서 Agent로 프린트 요청 
		if(selections.length > 0) {
			HF.msg.confirm({
				msg : T('text.Sure to Print'),
				fn : function(confirmBtn) {
					if(confirmBtn == 'yes') {
						gridView.down('controlbar').down('#stop').enable();
						self.printLabel(selections, 0);
					}
				},
				scope : this
			});
		} else {
			HF.msg.notice(T('text.Nothing selected'));
		}
	},
	
	/**
	 * 라벨 프린트 : 주기적으로 인쇄 명령을 호출한다.
	 */
	issueLabel : function(labelPlanId, results, gridSelections, selectionIndex) {
		var printInterval = this.getPrintInterval();
		var msgCount = results.length;
		var self = this;
		var i = 0;
		
		var issueTask = new Ext.util.DelayedTask(function() {
			if(self.stopFlag) {
				self.stopPrint();
				results = [];
				return;
			}
						
			var commands = results;
			if(i < msgCount) {
				self.oneByOnePrint(labelPlanId, commands[i].print_command);
				i += 1;
				issueTask.delay(printInterval);
			} else {
				self.printLabel(gridSelections, selectionIndex + 1);
			}
		});

		issueTask.delay(100);
	},
	
	/**
	 * print label
	 */
	printLabel : function(gridSelections, selectionIndex) {
		if(!gridSelections || gridSelections.length <= selectionIndex) {
			this.getGridView().getSelectionModel().deselectAll();
			HF.msg.notice(T('text.Success to Process'));			
		} else {
			if(this.stopFlag) {
				this.stopPrint();
				results = [];
				return;
			}
			
			var selection = gridSelections[selectionIndex];
			if(selection && selection.data) {
				var self = this;
				Ext.Ajax.request({
					url : '/domains/' + login.current_domain_id + '/label_plans/' + selection.data.id + '/get_print_info.json',
					method : 'GET',
					success : function(response) {
						var results = Ext.JSON.decode(response.responseText);
						self.issueLabel(selection.data.id, results, gridSelections, selectionIndex);
					}
				});
			}			
		}
	},
	
	/**
	 * Reprint Popup Params changed
	 */
	onReprintPopupParamsChange : function(view, params) {
		view.child(' #work_date').setValue(Ext.util.Format.date(params.order_date, T('format.date')));
		view.child(' #shift').setValue(params.shift);
		view.child(' #operation').setValue(params.operation.name);
		view.child(' #product').setValue(params.product.name);
		view.child(' #plan_qty').setValue(params.order_qty);
		view.child(' #lot_qty').setValue(params.lot_qty);
		view.child(' #to_lot_qty').setValue(params.lot_qty);
		view.child(' #label_plan_id').setValue(params.id);
		//view.child(' #customer').setValue(params.customer ? params.customer.name : '');
	},
	
	/**
	 * Reprint Popup 
	 */
	onReprintPopup : function() {
		var gridView = this.getGridView();
		var selections = gridView.getSelectionModel().getSelection();
		if(selections.length > 0) {
			var data = selections[0].data;
			HF.popup("Prod.view.label_plan.ReprintPopup", data, {});
		} else {
			HF.msg.notice(T('text.Nothing selected'));
		}
	},
	
	/**
	 * Reprint at Reprint Popup
	 */
	onReprint : function(view) {
		var params = view.child('form').getValues();
		if(params.to_print_qty < 1) {
			HF.msg.alert(T('text.Qty must be greater than x', {x : 1}));
			return;
		}
		
		var self = this;
		Ext.Ajax.request({
			url : '/domains/' + login.current_domain_id + '/label_plans/' + params.id + '/reprint.json',
			method : 'POST',
			params : { id : params.id, to_print_qty : params.to_print_qty, to_lot_qty : params.to_lot_qty },
			success : function(response) {
				var results = Ext.JSON.decode(response.responseText);
				self.issueLabel(params.id, results);
			}
		});
	},
	
	oneByOnePrint : function(labelPlanId, command) {
		var message = { "labelPlanId" : labelPlanId, "msgType" : "PRINT", "msg" : command };
		var reqMsg = HF.agent.buildRequestMsg(message);
		var self = this;
		console.log(reqMsg);
		HF.agent.request(reqMsg, function(response) {
			self.updatePrintedCount(labelPlanId, 1);
		}, this);
	},
	
	/**
	 * printed 된 개수를 업데이트한다. 
	 */
	updatePrintedCount : function(labelPlanId, count) {
		Ext.Ajax.request({
			url : '/domains/' + login.current_domain_id + '/label_plans/' + labelPlanId + '/update_print_count.json',
			method : 'POST',
			params : { printed_qty : count }
			/*success : function(response) {
				var results = Ext.JSON.decode(response.responseText);
				alert(response.responseText);
			}*/
		});
	},
	
	/**
	 * 테스트 바코드 프린트 
	 */
	onPrintTest : function(btn) {
		var msg = "^XA^FO320, 33^BXB,3,200^FD20130614|V611|SCP1TIBLB01|YFE|002|1|^FS^FO100, 25^A0I, 25, 20^FD20130613^FS^FO100, 50^A0I, 25, 20^FDAAAAAAAAAA^FS^FO190, 25^A0I, 25, 20^FDBBBBBBBBB^FS^FO190, 50^A0I, 25, 20^FDCCCCCCC^FS^FO100, 75^A0I, 25, 20^FDDDDDDDD^FS^FO100, 100^A0I, 25, 20^FDFFFFFFFFF^FS^FO320, 183^BXB,3,200^FDGGGGGGG^FS^FO100, 175^A0I, 25, 20^FDHHHHHHHHHHH^FS^FO100, 200^A0I, 25, 20^FDIIIIIIIIIII^FS^FO190, 175^A0I, 25, 20^FDJJJJJJJJJJ^FS^FO190, 200^A0I, 25, 20^FDKKKKKKKKK^FS^FO100, 225^A0I, 25, 20^FDLLLLLLLLLLLLL^FS^FO100, 250^A0I, 25, 20^FDMMMMMMMM^FS^FO320, 333^BXB,3,200^FDNNNNNNNNNNNN^FS^FO100, 325^A0I, 25, 20^FDOOOOOO^FS^FO100, 350^A0I, 25, 20^FDPPPPPPPPP^FS^FO190, 325^A0I, 25, 20^FDQQQQQQQQ^FS^FO190, 350^A0I, 25, 20^FDRRRRRRRR^FS^FO100, 375^A0I, 25, 20^FDSSSSSSSSS^FS^FO100, 400^A0I, 25, 20^FDTTTTTTTTT^FS^FT110, 850^A0B, 50, 25^FDUUUUUUUUUU^FS^FT160, 750^A0B, 50, 25^FDVVVVVVVVV^FS^FT210, 750^A0B, 40, 25^FDWWWWWWWWWWWWW^FS^FT250, 750^A0B, 40, 25^FDXXXXXXXXXXX^FS^FT280, 650^A0B, 30, 25^FDYYYYYYYYYY^FS^FT310, 650^A0B, 30, 25^FDZZZZZZZZZZ^FS^FO340, 630^A0B, 30, 25^FDAAAAAAAAAAAAAAA ^FS^FO340, 490^A0B, 30, 25^FDBBBBBBBBB^FS^FO370, 584^A0B, 30, 25^FDCCCCCCCCC^FS^FO290, 740^BXB,4,200^FDDDDDDD^FS^XZ"
		/*var msg = "CT~~CD,~CC^~CT~\n";
		msg += "^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR2,2~SD15^JUS^LRN^CI0^XZ\n";
		msg += "^XA\n";
		msg += "^MMT\n";
		msg += "^PW602\n";
		msg += "^LL1476\n";
		msg += "^LS0\n";
		msg += "^FT536,96^A0R,43,52^FH\^FDHalla Visteon Climate Control(Thailand)Co.,Ltd.^FS\n";
		msg += "^FT234,646^A0R,42,36^FH\^FDSeiral : ^FS\n";
		msg += "^FT155,294^A0R,42,36^FH\^FDLot Size: ^FS\n";
		msg += "^FT309,646^A0R,42,36^FH\^FDQ`ty : ^FS\n";
		msg += "^FT393,78^A0R,42,36^FH\^FDPart No. : ^FS\n";
		msg += "^FT470,78^A0R,42,36^FH\^FDRouting : ^FS\n";
		msg += "^FT321,78^A0R,42,40^FH\^FDOption : ^FS\n";
		msg += "^FT74,293^A0R,42,40^FH\^FDLot No. : ^FS\n";
		msg += "^FT318,249^A0R,42,48^FH\^FD^FS\n";
		msg += "^FT436,1336^A0N,33,28^FH\^FDQ'ty.^FS\n";
		msg += "^FT200,1437^A0N,25,24^FH\^FD120513|A101AEPAA13|6AULZ|0033^FS\n";
		msg += "^FT200,1384^A0N,25,24^FH\^FDEVAP. UNIT ASS'Y-A/C^FS\n";
		msg += "^FT199,1333^A0N,33,33^FH\^FDA101AEPAA13^FS\n";
		msg += "^FT496,1343^A0N,42,40^FH\^FD10^FS\n";
		msg += "^FT154,474^A0R,42,48^FH\^FD10^FS\n";
		msg += "^FT234,774^A0R,42,48^FH\^FD0033^FS\n";
		msg += "^FT312,764^A0R,58,57^FH\^FD10^FS\n";
		msg += "^FT315,426^A0R,42,31^FH\^FD^FS\n";
		msg += "^FT393,249^A0R,50,50^FH\^FDA101AEPAA13^FS\n";
		msg += "^FT393,644^A0R,33,33^FH\^FDEVAP. UNIT ASS'Y-A/C^FS\n";
		msg += "^FT467,645^A0R,33,33^FH\^FDEVAP^FS\n";
		msg += "^FT470,247^A0R,42,81^FH\^FD6AULZ^FS\n";
		msg += "^BY110,110^FT176,1301^BXI,5,200,0,0,1,_\n";
		msg += "^FH\^FD120513|A101AEPAA13|6AULZ|0033|10^FS\n";
		msg += "^BY176,176^FT238,82^BXI,8,200,0,0,1,_\n";
		msg += "^FH\^FD120513|A101AEPAA13|6AULZ|0033|10^FS\n";
		msg += "^FT71,475^A0R,42,40^FH\^FD120513|A101AEPAA13|6AULZ|0033^FS\n";
		msg += "^PQ1,0,1,Y^XZ";*/
		
		var printMsg = {
			"requestId" : "1",
			"labelPlanId" : "System-0db3c0573cf47b10155507bfbe3997e633724d8f",
		 	"msgType" : "PRINT",
		 	"msg" : msg
		};
		HF.agent.request(printMsg, function(response) {
			HF.msg.success(T('title.success'));
		}, this);
	},
	
	/**
	 * Connection 연결 테스트 
	 */
	onConnectionTest : function() {
		var chkValid = this.checkConnection();		
		if(chkValid) {
			var connMsg = {
				"requestId" : "connectionMsg",
			 	"msgType" : "ECHO",
			 	"msg" : "Websocket Ping!!"
			};
			HF.agent.request(connMsg, function(response) {
				if(response.success) {
					HF.msg.success(T('title.success'));
				} else {
					HF.msg.failure(response.msg);
				}
			}, this);
		} else {
			/*HF.agent.connect();
			HF.agent.on('open', function(url) {
				alert('Websocket Connected With (' + url + ')');
			});
			HF.agent.on('error', function(error) {
				alert('Websocket Connection Error (' + error + ')');
			});*/
			HF.msg.failure(T('title.failure'));
		}
	},
	
	/**
	 * stop print
	 */
	stopPrint : function() {
		HF.msg.notice(T('text.Print Stopped'));
		this.stopFlag = false;
		this.getGridView().down('controlbar').down('#stop').disable();
	},
	
	/**
	 * Print Stop
	 */
	onPrintStop : function() {
		this.stopFlag = true;
	},
	
	/**
	 * connection check
	 */
	checkConnection : function() {
		var agentUrl = HF.setting.get('setting-agent-url');
		if(!agentUrl || agentUrl.length < 5) {
			HF.msg.failure(T('text.Agent URL Is Empty'));
			return false;
		} else {
			return true;
			/*if(HF.agent.state == 'open') {
				return true;
			} else {
				return false;
			}*/
		}
	},
		
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * override, onParamsChange 전에 기본 파라미터 세팅
	 */
	beforeParamsChange : function(view, params) {
		params = this.getSearchForm().getValues();
		if(!params['order_date-eq']) {
			params['order_date-eq'] = HF.getCurrentShiftDate();
		}
		return params;
	},
	
	onPopupNew : function() {
		var searchParams = this.getSearchForm().getValues();
		HF.popup(this.getDetailViewName(), searchParams, {});
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
		return this.getLabelPlan();
	}
});