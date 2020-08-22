frappe.provide("frappe.treeview_settings");

frappe.treeview_settings['Outcome and Output'] = {
	get_tree_nodes: "program_management.program_management.doctype.outcome_and_output.outcome_and_output.get_children",
	add_tree_node:  "program_management.program_management.doctype.outcome_and_output.outcome_and_output.add_node",
	filters: [
		{
			fieldname: "project_proposal",
			fieldtype:"Link",
			options: "Project Proposal",
			label: __("Project Proposal"),
		},
		{
			fieldname: "outcome_and_output",
			fieldtype:"Link",
			options: "Outcome and Output",
			label: __("Outcome and Output"),
			get_query: function() {
				var me = frappe.treeview_settings['Outcome and Output'];
				var project_proposal = me.page.fields_dict.project_proposal.get_value();
				var args = [["Outcome and Output", 'is_group', '=', 1]];
				if(project_proposal){
					args.push(["Outcome and Output", 'project_proposal', "=", project_proposal]);
				}
				return {
					filters: args
				};
			}
		}
	],
	breadcrumb: "Program Management",
	get_tree_root: false,
	root_label: "All Outcome and Output",
	ignore_fields: ["parent_outcome_and_output"],
	onload: function(me) {
		frappe.treeview_settings['Outcome and Output'].page = {};
		$.extend(frappe.treeview_settings['Outcome and Output'].page, me.page);
		me.make_tree();
	},
	toolbar: [
		{
			label:__("Add Multiple"),
			condition: function(node) {
				return node.expandable;
			},
			click: function(node) {
				this.data = [];
				const dialog = new frappe.ui.Dialog({
					title: __("Add Multiple Outcome and Output"),
					fields: [
						{
							fieldname: "multiple_outputs", fieldtype: "Table",
							in_place_edit: true, data: this.data,
							get_data: () => {
								return this.data;
							},
							fields: [{
								fieldtype:'Data',
								fieldname:"subject",
								in_list_view: 1,
								reqd: 1,
								label: __("Subject")
							}]
						},
					],
					primary_action: function() {
						dialog.hide();
						return frappe.call({
							method: "program_management.program_management.doctype.outcome_and_output.outcome_and_output.add_multiple_outcome_and_output",
							args: {
								data: dialog.get_values()["multiple_outputs"],
								parent: node.data.value
							},
							callback: function() { }
						});
					},
					primary_action_label: __('Create')
				});
				dialog.show();
			}
		}
	],
	extend_toolbar: true
};