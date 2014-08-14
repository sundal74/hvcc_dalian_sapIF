Ext.define('mixin.OpsUtil', function() {
	
	function getWorkDate() {
		return HF.setting.get('option-work_date') ? HF.setting.get('option-work_date') : "";
	}
	
	function getShift() {
		return HF.setting.get('option-shift') ? HF.setting.get('option-shift') : "";
	}
	
	function getOperation() {
		return HF.setting.get('option-operation');
	}
	
	function getOperationId() {
		return HF.setting.get('option-operation') ? HF.setting.get('option-operation').id : '';
	}
	
	function getOperationName() {
		return HF.setting.get('option-operation') ? HF.setting.get('option-operation').name : '';
	}
	
	return {
		getOperation : getOperation,
		getOperationId : getOperationId,
		getOperationName : getOperationName,
		getWorkDate : getWorkDate,
		getShift : getShift
	};
}());