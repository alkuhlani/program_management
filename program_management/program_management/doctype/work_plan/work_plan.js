// Copyright (c) 2020, Akram Mutaher and contributors
// For license information, please see license.txt

frappe.ui.form.on('Work Plan', {
	refresh: function(frm) {
		frm.set_df_property("get_activity", "hidden", frm.doc.__islocal ? 1:0);

	},
	get_activity: function(frm){
		frm.events.fill_activity(frm);
	},
	fill_activity: function (frm) {
		return frappe.call({
			doc: frm.doc,
			method: 'fill_activity',
			callback: function(r) {
				if (r.docs[0].work_plan_details){
					frm.save();
					frm.refresh();
				}
			}
		})
	}
});

frappe.ui.form.on('Work Plan', {
	setup: function(frm) {
    	frm.fields_dict['work_plan_details'].grid.get_field('output').get_query = function(frm, cdt, cdn) {
			var child = locals[cdt][cdn];
			return{
				filters: {
					"project_proposal": frm.project_proposal
				}
			}
	    }	   
	}
})


frappe.ui.form.on('Work Plan', {
	refresh(frm) {
	cur_frm.set_query("activity", "work_plan_details", function(doc, cdt, cdn) {
	    var d = locals[cdt][cdn];
    	return{
	    	filters: [
		    
		    	['Activity', 'output', '=', d.output]
	    	]
            	}
        });
	}
})
