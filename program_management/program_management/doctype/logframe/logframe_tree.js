frappe.provide("frappe.treeview_settings");

frappe.treeview_settings['Logframe'] = {
	get_tree_nodes: "program_management.program_management.doctype.logframe.logframe.get_children",
	add_tree_node: "program_management.program_management.doctype.logframe.logframe.add_node",
	filters: [
		{
			fieldname: "project_proposal",
			fieldtype:"Link",
			options: "Project Proposal",
			label: __("Project Proposal"),
		},
		{
			fieldname: "logframe",
			fieldtype:"Link",
			options: "Logframe",
			label: __("Logframe"),
			get_query: function() {
				var me = frappe.treeview_settings['Logframe'];
				var project_proposal = me.page.fields_dict.project_proposal.get_value();
				var args = [["Logframe", 'is_group', '=', 1]];
				if(project_proposal){
					args.push(["Logframe", 'project_proposal', "=", project_proposal]);
				}
				return {
					filters: args
				};
			}
		}
	],
	breadcrumb: "Project Proposals",
	get_tree_root: false,
	root_label: "All Logframe",
	ignore_fields: ["parent_logical_framework_chart"],
	onload: function(me) {
		frappe.treeview_settings['Logframe'].page = {};
		$.extend(frappe.treeview_settings['Logframe'].page, me.page);
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
					title: __("Add Multiple Logframe"),
					fields: [
						{
							fieldname: "multiple_logframes", fieldtype: "Table",
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
							method: "program_management.program_management.doctype.logframe.logframe.add_multiple_logframes",
							args: {
								data: dialog.get_values()["multiple_logframes"],
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