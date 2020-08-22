// Copyright (c) 2020, Akram Mutaher and contributors
// For license information, please see license.txt

frappe.ui.form.on('Outcome and Output', {
	// refresh: function(frm) {

	// }
});
frappe.ui.form.on('Outcome and Output', {
	refresh(frm) {
		// your code here
	},
	setup: function(frm) {
		frm.set_query("program", function() {
			return {
				query: "program_management.program_management.doctype.targeted_programs.targeted_programs.get_approvers",
				filters: {
					project_proposal: frm.doc.project_proposal,
					doctype: frm.doc.doctype
				}
			};
		});

		
	},
})