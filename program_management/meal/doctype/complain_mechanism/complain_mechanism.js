// Copyright (c) 2020, Akram Mutaher and contributors
// For license information, please see license.txt

/*frappe.ui.form.on('Complain Mechanism', {
    refresh(frm) {
		if (frm.doc.docstatus==0){
			frm.add_custom_button(__("Project"),
				() => frm.events.make_project(frm), __('Create'));
		}		
	},
	make_project: function(frm) {
		frappe.route_options = {"project_proposal": frm.doc.name,
			"project_name": frm.doc.project_no,
			"estimated_costing": frm.doc.budget}
		frappe.set_route("Form", 'Project', 'New Project 1');

	},
*/

frappe.ui.form.on('Complain Mechanism', {
	refresh(frm) {
	cur_frm.set_query("governorate", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return{
		filters: [
		    
			['Territory', 'is_Group', '=', 1],
		
		]
	}
	})
}
    
});

	cur_frm.set_query("district", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return{
		filters: [
		    
			['Territory', 'parent_territory', '=', d.governorate],
		
		]
	}
});