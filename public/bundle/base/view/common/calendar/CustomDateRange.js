Ext.define('Base.view.common.calendar.CustomDateRange', {
    extend: 'Extensible.form.field.DateRange',
    xtype : 'hatio_custom_daterange',
    
    setValue: function(v){
    	v.IsAllDay = true;
    	
    	var display = this.up().up().down('#' + this.displayId);
    	if(v.StartDate && v.StartDate.toString().length>10){
    		display.setValue(v.StartDate.toString().substring(0,10));
    	}
		
        if(!v) {
            return;
        }
        var me = this,
            eventMappings = Extensible.calendar.data.EventMappings,
            startDateName = eventMappings.StartDate.name;
            
        if(Ext.isArray(v)){
            me.setDT(v[0], 'start');
            me.setDT(v[1], 'end');
            me.allDay.setValue(!!v[2]);
        }
        else if(Ext.isDate(v)){
            me.setDT(v, 'start');
            me.setDT(v, 'end');
            me.allDay.setValue(false);
        }
        else if(v[startDateName]){ //object
            me.setDT(v[startDateName], 'start');
            if(!me.setDT(v[eventMappings.EndDate.name], 'end')){
                me.setDT(v[startDateName], 'end');
            }
            me.allDay.setValue(!!v[eventMappings.IsAllDay.name]);
        }
    }
});