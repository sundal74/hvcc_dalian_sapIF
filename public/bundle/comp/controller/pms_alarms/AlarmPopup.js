Ext.define('Comp.controller.pms_alarms.AlarmPopup', {
	
	extend : 'Base.abstract.PopupController',
	
	views : ['Comp.view.pms_alarms.AlarmPopup'],
	
	init : function() {
		this.control({
			'comp_alarm_popup' : {
				paramschange : this.onParamsChange,
				click_close : this.onClose
			}
		});
	},
	
	onParamsChange : function(view, params) {
		var tsfrData = [];
		var equipmentData = [];
		var measureMissData = [];
		var ngProductData = [];
		
		Ext.Array.each(params, function(param) {
			if(param.data.alarm_type == "1") {
				tsfrData.push(param);
			} else if(param.data.alarm_type == "2") {
				equipmentData.push(param);
			} else if(param.data.alarm_type == "3") {
				measureMissData.push(param);
			} else if(param.data.alarm_type == "4") {
				ngProductData.push(param);
			}
		});
		
		this.setTsfrData(view, tsfrData);
		this.setEquipmentData(view, equipmentData);
		this.setMeasureMissData(view, measureMissData);
		this.setNgProductData(view, ngProductData);
	},
	
	setTsfrData : function(view, data) {
		var grid = view.down(' #tsfr_grid');
		if(!data || data.length == 0) {
			grid.hide();
		} else {
			grid.store.loadRawData(data);			
		}
	},
	
	setEquipmentData : function(view, data) {
		var grid = view.down(' #equipment_grid');
		if(!data || data.length == 0) {
			grid.hide();
		} else {
			grid.store.loadRawData(data);			
		}
	},
	
	setMeasureMissData : function(view, data) {
		var grid = view.down(' #measure_miss_grid');
		if(!data || data.length == 0) {
			grid.hide();
		} else {
			grid.store.loadRawData(data);			
		}
	},
	
	setNgProductData : function(view, data) {
		var grid = view.down(' #ng_product_grid');
		if(!data || data.length == 0) {
			grid.hide();
		} else {
			grid.store.loadRawData(data);			
		}
	},
	
	onClose : function(view) {
		view.close();
	}
});