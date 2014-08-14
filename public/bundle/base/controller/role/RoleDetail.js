/**
 * RoleDetail controller
 */
Ext.define('Base.controller.role.RoleDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Base.model.Role', 
		'Base.store.Role', 
		'Base.store.User',
		'Base.view.role.RoleDetail'
	],
	
	models : ['Base.model.Role'],
	
	stores: ['Base.store.Role'],
	
	views : ['Base.view.role.RoleDetail'],
	
	refs: [ { ref : 'RoleDetail', selector : 'base_role_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_role_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' base_role_form' : {
				click_back : this.onBackClick,
				click_new :  this.onFormNew,
				click_save :  this.onFormSave,
				click_delete : this.onFormDelete,
				after_form_saved : this.afterFormSaved,
				after_form_deleted : this.afterFormDeleted
			},
			' base_role_user' : {
				click_back : this.onBackClick,
				click_add : this.onAddUserClick,
				click_delete : this.onDeleteUserClick,
				after_role_user_render : this.afterRoleUserRender
			},
			' base_role_permissions' : {
				click_back : this.onBackClick,
				click_save : this.onRolePmssSave,
				after_role_permission_render : this.afterRolePermissionRender
			}
			/*' base_role_menu_auth' : {
				click_back : this.onBackClick,
				click_save :  this.onRoleMenuSave,
				after_role_menu_auth_render : this.afterMenuAuthRender
			},' base_role_user_bind' : {
				click_back : this.onBackClick,
				click_save :  this.onRoleUserSave,
				after_form_saved : this.afterUserBindSaved,
				roleUserBindAfterRender : this.roleUserBindAfterRender,
				groupTreeItemClick : this.groupTreeItemClick
			}*/
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 					**
	 ****************************************************************/
	/**
	 * after role permission render
	 */
	afterRolePermissionRender : function(view) {
		var self = this;
		Ext.Ajax.request({
			url: '/domains/' + login.current_domain_id + '/roles/' + self.selectedRecord.data.id + '/permitted_resources.json?resource_type=Menu',
			method : 'GET',
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				var permissions = [];
				Ext.Array.each(res.items, function(item) {
					var pmss = self.findPermission(permissions, item);
					if(!pmss) {
						pmss = item;
						permissions.push(pmss);
					}
					if(item.action_name && item.action_name != '') {
						pmss[item.action_name] = true;
					}
				});
				view.renderPermissions(self.selectedRecord.data.id, permissions);
			}
		});
	},
	
	/**
	 * permission 찾기
	 */
	findPermission : function(permissions, pmss) {
		var foundPmss = null;
		Ext.Array.each(permissions, function(permission) {
			if(permission.id == pmss.id) {
				foundPmss = permission;
				return true;
			}
		});
		return foundPmss;
	},
	
	/**
	 * role permission save
	 */
	onRolePmssSave : function(view) {
		// master menu
		var treestore = view.store;
		var rootNode = treestore.getRootNode();
		var masterNodes = rootNode.childNodes;
		
		var jsonData = {'permissions' : {'Menu' : {}}};
		Ext.Array.each(masterNodes, function(masterNode) {
			jsonData['permissions']['Menu'][masterNode.data.id] = { 'show' : masterNode.data.show };
		});
		
		// child menu
		var store = view.store;
		var models = store.getModifiedRecords();
		Ext.Array.each(models, function(model) {
			if(model.data.show || model.data.create || model.data.update || model.data.delete) {
				jsonData['permissions']['Menu'][model.data.id] = { 'show' : model.data.show, 'create' : model.data.create, 'update' : model.data.update, 'delete' : model.data.delete };
			}
		});
						
		var self = this;
	    Ext.Ajax.request({
		    url: 'domains/' + login.current_domain_id + '/roles/' + this.selectedRecord.data.id + '/update_permissions.json',
		    method : 'POST',
		    params : { 'role' : Ext.JSON.encode(jsonData) },
		    success : function(response) {
				self.afterRolePermissionRender(view);
				Ext.Msg.alert(T('title.success'), T('text.Success to Save'));
			}
		});
	},
	
	/**
	 * role - user : add user click
	 */
	onAddUserClick : function(view) {
		HF.popup('Base.view.user.UserListPopup',{by:view}, {});
	},
	
	/**
	 * role - user : delete user click
	 */
	onDeleteUserClick : function(view) {
		var self = this;
		
		Ext.Msg.confirm(T('title.confirm'), T('text.Sure to Delete'), function(confirmBtn) {
			if(confirmBtn != 'yes')
				return;
			
			var selections = view.getSelectionModel().getSelection();
			var records = [];
			Ext.Array.each(selections, function(selection) {
				selection.set('_cud_flag_', 'd');
				records.push(selection.data);
			});
			Ext.Ajax.request({
				url : 'domains/' + login.current_domain_id + '/roles/' + self.selectedRecord.data.id + '/update_users.json',
				method : 'POST',
				params : { 'role' : Ext.JSON.encode(records) },
				success : function(response) {
					self.reloadRoleUser(view);
					Ext.Msg.alert(T('title.success'), T('text.Success to Delete'));
				}
			});
		});
	},
	
	/**
	 * role - user : render role user
	 */
	afterRoleUserRender : function(view) {
		this.reloadRoleUser(view);
	},
	
	/**
	 * role - user : reload
	 */
	reloadRoleUser : function(view) {
		var self = this;
		Ext.Ajax.request({
			url: 'domains/' + login.current_domain_id + '/roles/' + this.selectedRecord.data.id + '/role_users.json',
			method : 'GET',
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				view.renderRoleUser(self.selectedRecord.data.id, res.items);
			}
		});
	},
	
	/*onRoleUserSave : function(view) {
		var self = this;
		var formView = view.child('form');
		formView.getForm().submit({
			url: 'domains/' + login.current_domain_id + '/roles/' + this.selectedRecord.data.id + '/update_users.json',
			success: function(form, action) {
				self.reloadRoleUser(view);
				Ext.Msg.alert(T('title.success'), action.result.msg);
			}
		});
	},
	onRoleMenuSave : function(view) {
		var self = this;
		var formView = view.child('form');
		formView.getForm().submit({
			url: 'domains/' + login.current_domain_id + '/roles/' + this.selectedRecord.data.id + '/update_permissions.json',
			success: function(form, action) {
				Ext.Msg.alert(T('title.success'), action.result.msg);
				self.reloadRoleMenuAuth(view);
			}
		});
	},
	afterMenuAuthRender : function(view) {
		this.reloadRoleMenuAuth(view);
	},
	reloadRoleMenuAuth : function(view) {
		var self = this;
		Ext.Ajax.request({
			url: '/domains/' + login.current_domain_id + '/roles/' + self.selectedRecord.data.id + '/permitted_resources.json?resource_type=Menu',
			method : 'GET',
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				view.renderMenuAuth(self.selectedRecord.data.id, res.items);
			}
		});
	},
	afterUserBindSaved : function(formView) {
	},
	groupTreeItemClick : function(view, record, item, index, e, eOpts){
		this.getUserbindView().child(' #userbyGroupGrid').store.proxy.url = '/domains/' + login.current_domain_id + '/diy_selections/'+record.data.id+'/query.json?test=y';
		this.getUserbindView().child(' #userbyGroupGrid').store.load();
	}*/
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/
	/**
	 * override
	 */
	afterDetailLoaded : function(record, operation) {
		this.callParent(arguments);
		this.selectedRecord = record;
		HF.setTitle(T('title.role') + ' ' + record.get('name'));
		this.afterRolePermissionRender(this.getRolePmssView());
		this.reloadRoleUser(this.getUserRoleView());
		//this.getUserbindView().child(' #selectUserGrid').store.proxy.url = '/domains/' + login.current_domain_id + '/diy_selections/'+record.id.substring(23)+'/query.json?test=y';
		//this.getUserbindView().child(' #selectUserGrid').store.load();
	},
	
	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		this.callParent(arguments);
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, record, operation) {
		HF.show('Base.view.role.Role', null);
	},

	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getRoleDetail();
	},
	
	getFormView : function() {
		return this.queryItem(null, 'base_role_form');
	},
	
	/*getMenuAuthView : function() {
		return this.queryItem(null, 'base_role_menu_auth');
	},
	
	getUserbindView : function() {
		return this.queryItem(null, 'base_role_user_bind');
	},*/
	
	getUserRoleView : function() {
		return this.queryItem(null, 'base_role_user');
	},
	
	getRolePmssView : function() {
		return this.queryItem(null, 'base_role_permissions');
	},
	
	getModelClass : function() {
		return Base.model.Role;
	}
});