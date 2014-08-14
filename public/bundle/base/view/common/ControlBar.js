Ext.define('Base.view.common.ControlBar', {
	extend : 'Ext.toolbar.Toolbar',
	
	xtype : 'controlbar',

	dock : 'bottom',

	items : [ '->', 'close' ],

	initComponent : function() {
		this.on('afterrender', this.afterrenderExe);
		this.items = Ext.Array.map(this.items, function(b) {
			if (typeof(b) === 'string' && b !== '-' && b !== '->' && b !== ' ') {
				if(b == 'delete') {
					return {
						text : T('button.' + b),
						itemId : Ext.String.uncapitalize(b),
						minWidth : 75,
						cls : 'btnDelete'
					};
				} else {
					return {
						text : T('button.' + b),
						itemId : Ext.String.uncapitalize(b),
						minWidth : 75
					};
				}
			}
			return b;
		});

		this.callParent();
	},

	getOwner : function() {
		return this.up();
	},
	
	afterrenderExe: function(obj, eOpts){
		this.getMenuAuth(this);
		
		if(this.beforeUpObj){
			this.authApply();
			
		}
	},
	
	authApply: function(){
		var me = this;
		var menuDatas = Ext.getStore("Menu").data.items;
		
		if(menuDatas.length == 0) {
			var task = new Ext.util.DelayedTask(function() {
			    me.authApply();
			});
			task.delay(500);
			
		} else {
			if(menuDatas[0].data) {
				for(var i = 0 ; i < menuDatas.length; i++) {
					if(this.beforeUpObj.itemId == menuDatas[i].data.template) {
						if(menuDatas[i].data.auth) {
							var authDatas = menuDatas[i].data.auth.split(",");
							
							// TODO 권한을 정확히 버튼 이름으로 제어하지 말고 버튼 이름의 컨벤션으로 컨트롤 하도록 한다. 
							if(authDatas.indexOf('C') == -1) {
								if(this.child('#add')) {
									this.child('#add').hide();
								}
								if(this.child('#new')) {
									this.child('#new').hide();
								}
								if(this.child('#add')) {
									this.child('#add').hide();
								}
								if(this.child('#import')) {
									this.child('#import').hide();
								}
								if(this.child('#create_order')) {
									this.child('#create_order').hide();
								}
								if(this.child('#create_label_plan')) {
									this.child('#create_label_plan').hide();
								}
							} 
							
							if(authDatas.indexOf('U') == -1) {
								if(this.child('#save')) {
									this.child('#save').hide();
								}
								if(this.child('#update')) {
									this.child('#update').hide();
								}
							} 
							
							if(authDatas.indexOf('D') == -1) {
								if(this.child('#delete')) {
									this.child('#delete').hide();
								}
							}
						}
					}
				}
			} else {
				var task = new Ext.util.DelayedTask(function(){
				    me.authApply();
				});
				task.delay(500);
			}
		}
	},
	
	beforeUpObj: null,
	getMenuAuth: function(tarView) {
		try {
			if(!tarView) {
				return;
			}
			var upObj = tarView.up();
			if(upObj && upObj.id && upObj.id=='content') {
				return;
			} else {
				this.beforeUpObj = upObj;
				this.getMenuAuth(upObj)
			}
		} catch(e) {
			return;
		}
	}
});