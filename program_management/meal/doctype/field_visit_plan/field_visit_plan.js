// Copyright (c) 2020, Akram Mutaher and contributors
// For license information, please see license.txt

frappe.ui.form.on('Field Visit Plan', {
	// refresh: function(frm) {

	// }
});
frappe.ui.form.on('Field Visit Plan', {
	refresh(frm) {
	cur_frm.set_query("governorate", "field_visit_plan_details", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return{
		filters: [
		    
			['Territory', 'is_Group', '=', 1],
		
		]
	}
	})
}
    
});

	cur_frm.set_query("district", "field_visit_plan_details", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return{
		filters: [
		    
			['Territory', 'parent_territory', '=', d.governorate],
		
		]
	};
});

frappe.ui.form.on('Field Visit Plan', {
	refresh(frm) {
		if (frm.doc.docstatus==1){
			frm.add_custom_button(__("Vehicle Request"),
				() => frm.events.vehicle_requests(frm), __('Create'));
		}		
	},
	vehicle_requests: function(frm) {
		frappe.route_options = {
		    "field_visit_plan": frm.doc.name,
			"project": frm.doc.project
		    
		},
		frappe.set_route("Form", 'Vehicle Request', 'New Vehicle Request 1');

	},
	
});