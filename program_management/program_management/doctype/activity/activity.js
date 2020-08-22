// Copyright (c) 2020, Akram Mutaher and contributors
// For license information, please see license.txt

frappe.ui.form.on('Activity', {
	// refresh: function(frm) {

	// }
});

frappe.ui.form.on('Activity', {
	refresh(frm) {
		// your code here
	}
})
frappe.ui.form.on('Activity', {
	refresh(frm) {
	cur_frm.set_query("output", function(doc, cdt, cdn) {
	    var d = locals[cdt][cdn];
    	return{
	    	filters: [
		    
		    	['Outcome and Output', 'type', '=', d.linked_with],
		    	['Outcome and Output', 'project_proposal', '=', d.project_proposal]
	    	]
            	}
        });
	}
})