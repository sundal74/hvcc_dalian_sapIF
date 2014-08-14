/**
 * Barcode Scan : Lot Processing
 */
Ext.define('Term.controller.scan.OpScanP110', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.scan.OpScanP110'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_scan_opscanp110' },
		{ ref : 'ProdStatusView', selector : 'term_prod_opprodm010' }
	],
	
	init : function() {
		this.control({
			'term_scan_opscanp110' : {
				paramschange : this.onParamsChange
			},
			'term_scan_opscanp110 #btn_ok' : {
				click : this.onScanLabel
			},
			'term_scan_opscanp110 #text_label_enter' : {
				keydown : this.downLabel
			}
		});
	},
	
	downLabel : function(f, e) {
		if(e.keyCode == 13) {
			this.doActual();
		}
	},
	
	onParamsChange : function(view, params) {
		view.child(' #text_label_enter').reset();
		view.child(' #text_label_enter').focus(false, 20);
		this.reload(null);
		view.child(' image').show();
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onScanLabel : function(btn, e) {
		this.doActual();
	},
	
	doActual : function() {
		var view = this.getMainView();
		var label = view.child(' #text_label_enter').getValue().toUpperCase();
		
		if(this.checkValidAtClient(label)) {
			// this.checkValidRun(label);
			this.actualOnly(label);
		}
	},
	
	/**
	 * 클라이언트 측 validation check
	 * 날짜 | 로케이션코드 | 품목 | Lot No | Serial | 수량 |
	 * 20130605|V611|F500MKABA03C|YFE|011|80|
	 */
	checkValidAtClient : function(label) {
		if(label == null || label == '') {
			return false;
		}
		
		var labelArr = label.split('|');
		if(labelArr.length != 6 && labelArr.length != 7) {
			HF.msg.alert(T('text.Invalid Label'));
			return false;
		}
		
		// 첫 번째는 날짜 : 8 자리 
		if(labelArr[0].length != 8) {
			HF.msg.alert(T('text.Invalid Label') + ' - Date');
			return false;
		}

		// 두 번째는 로케이션 코드 : 4 자리
		if(labelArr[1].length != 4) {
			HF.msg.alert(T('text.Invalid Label') + ' - Location');
			return false;
		}
				
		// 세 번째는 품목 코드 : 오더의 픔목 코드와 일치 해야 함 
		if(labelArr[2] != this.getMainView().getParams().product) {
			HF.msg.alert(T('text.Invalid Label') + ' - Product');
			return false;
		}
		
		// 네 번째는 LOT NO : 3 자리 
		if(labelArr[3].length != 3) {
			HF.msg.alert(T('text.Invalid Label') + ' - LOT NO');
			return false;
		}
		
		// 네 번째는 시리얼 : 3 자리 
		if(labelArr[4].length != 3) {
			HF.msg.alert(T('text.Invalid Label') + ' - Serial');
			return false;
		}
		
		// 다섯번째는 수량 : Integer 형 
		try {
			var qty = parseInt(labelArr[4]);
			if(!qty) {
				HF.msg.alert(T('text.Invalid Label') + ' - Qty.');
				return false;
			}
		} catch (e) {
			HF.msg.alert(T('text.Invalid Label') + ' - Qty.');
			return false;
		}
		
		return true;
	},
	
	/**
	 * 서버 측 validation 체크 후 실적 처리 ...
	 */
	checkValidRun : function(label_no) {
		var view = this.getMainView();
		var self = this;
		
		// label_no validation check
		Ext.Ajax.request({
			url : '/domains/' + login.current_domain_id + '/diy_services/CheckValidLot/shoot.json',
			method : 'POST',
			params : {
				prod_order_id : view.getParams().id,
				label_no : label_no,
				operation_id : HF.setting.get('option-operation').id
			},
			success : function(response, opts) {
				self.actualOnly(label_no);
			},
		    failure: function(response, opts) {
				var respObj = Ext.decode(response.responseText);
				var msg = respObj.throwable ? respObj.throwable.message : T('title.failure');
				var msgType = respObj.throwable ? respObj.throwable.type : '';
				
				if(msgType == 'Hatio::Exception::ValidationWarning') {
					HF.msg.confirm({
						msg : respObj.throwable.message + ",\n" + T('text.Sure to Going On'),
						fn : function(btn) {
							if(btn == 'yes') {
								self.actualOnly(label_no);
							}
						},
						scope: this
					});
				} else if(msgType == 'Hatio::Exception::InvalidRequest') {
					HF.msg.alert({
						title : T('title.error'),
						msg : respObj.throwable.message
					});
					view.child(' #text_label_enter').setValue("");
				} else {
					HF.msg.alert(msg);
				}
		    }
		});
	},
	
	/**
	 * 실적 처리 
	 */
	actualOnly : function(label_no) {
		var self = this;
		var view = this.getMainView();
		Ext.Ajax.request({
		    url: '/domains/' + login.current_domain_id + '/diy_services/DoActualScan/shoot.json',
		    method : 'POST',
		    params : {
				prod_order_id : view.getParams().id,
				label_no : label_no
			},
		    success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				self.reload(null, obj.actual_qty);
				view.child(' #text_label_enter').reset();
				view.child(' #text_label_enter').focus(false, 20);
				var prodStatusView = self.getProdStatusView();
				var prodStatusViewStore = prodStatusView.child('grid').getStore();
				prodStatusViewStore.load();
			},
			failure: function() {
				view.child(' #text_label_enter').setValue("");
			}
		});
	},
	
	reload : function(label, current_actual_qty) {
		var view = this.getMainView();
		var viewParams = view.getParams();
		
		if(viewParams) {
			var product = view.child(' #product');
			var product_desc = view.child(' #product_desc');
			var plan = view.child(' #plan');
			var actual = view.child(' #actual');
			
			product.setValue(viewParams.product);	
			product_desc.setValue(viewParams.product_desc);
			plan.setValue(viewParams.order_qty)
			
			if(current_actual_qty) {
				actual.setValue(current_actual_qty);
			} else {
				actual.setValue(viewParams.actual_qty);
			}
		}
	}
});