Ext.define('Base.view.role.RoleMenuAuth', {
	
	extend: 'Base.abstract.Panel',
	
	requires : [ 'Base.view.role.RoleFieldSet' ],
	
	xtype : 'base_role_menu_auth',
	
	title : T('title.menu_auth'),
	
	layout : { type : 'border' },
	
	items : [ {
		xtype: 'form',
		itemId : 'menuAuth'
	}],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save']
	} ],
	
	afterRender: function() {
		this.fireEvent('after_role_menu_auth_render', this);
	},
	
	renderMenuAuth : function(roleId, menus) {
		var self = this;
		var menuAuthForm = self.child('form');
		menuAuthForm.removeAll();
		
		Ext.Array.each(menus, function(menu) {
			if(!menu.parent_id) {
				var checked = (menu.resource_type && menu.resource_type != '') ? true : false;
				menuAuthForm.add({
					xtype: 'role_fieldset',
					title: T('menu.' + menu.name),
					layout: 'form',
					formFieldName : 'role[permissions][Menu][' + menu.id + '][show]', 
					dataValue : menu.id,
					checkboxChecked : checked,
					defaults: {
						labelStyle: 'padding-left:4px;'
					},
					collapsible: true,
					items: [ {
						itemId : menu.id,
						xtype: 'checkboxgroup',
						columns: 4
					} ]
				});
			}
		});
		
		Ext.Array.each(menus, function(menu) {
			if(menu.parent_id) {
				var parentSet = self.child(' #' + menu.parent_id);
				if(parentSet) {
					var checked = (menu.resource_type && menu.resource_type != '') ? true : false;
					parentSet.add({
						boxLabel: T('menu.' + menu.name),
						name: 'role[permissions][Menu][' + menu.id + '][show]', 
						dataValue : menu,
						checked : checked,
						listeners: {
							change: self.onSelectCheckChange,
							scope: self
						}
					})
				}
			}
		});
	},
	
	onSelectCheckChange: function(cmp, checked) {
        var me  = this;
        cmp.up().up().setAllCheck(checked);
        cmp.dataValue.select = checked;
    }
});
