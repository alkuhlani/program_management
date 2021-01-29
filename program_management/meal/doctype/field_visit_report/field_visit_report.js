// Copyright (c) 2020, Akram Mutaher and contributors
// For license information, please see license.txt

frappe.ui.form.on('Field Visit Report', {
	refresh(frm) {
	cur_frm.set_query("governorate", "visit_report_details", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return{
		filters: [
		    
			['Territory', 'is_Group', '=', 1],
		
		]
	}
	})
}
    
});

	cur_frm.set_query("district", "visit_report_details", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return{
		filters: [
		    
			['Territory', 'parent_territory', '=', d.governorate],
		
		]
	}
});


frappe.ui.form.on('Field Visit Report',{
    field_visit_plan: function(frm) {

		frappe.call({
			"method": "frappe.client.get",
			args: {
				doctype: "Field Visit Plan",
				name: frm.doc.field_visit_plan
			},
			callback: function(data){
				frm.fields_dict.visit_report_details.grid.remove_all();
              //frm.fields_dict.table_name_target.grid.remove_all();
				let report = data.message.field_visit_plan_details;
		        //let var_name = data.message.table_name_in_template;
				for (var iic in report) {
                //for (var iic in var_name){				    
					frm.add_child("visit_report_details");
				  //frm.add_child("target_table_name");
					frm.fields_dict.visit_report_details.get_value()[iic].governorate = report[iic].governorate;
					frm.fields_dict.visit_report_details.get_value()[iic].district = report[iic].district;
					frm.fields_dict.visit_report_details.get_value()[iic].the_name_of_the_site_providing_the_service_to_be_visited = report[iic].the_name_of_the_site_providing_the_service_to_be_visited;
					frm.fields_dict.visit_report_details.get_value()[iic].the_number_of_sites_planned_to_be_visited_per_day = report[iic].the_number_of_sites_planned_to_be_visited_per_day;
					frm.fields_dict.visit_report_details.get_value()[iic].the_actual_date_of_accessing_the_site = report[iic].the_actual_date_of_accessing_the_site;

				  //frm.fields_dict.target_table_name.get_value()[iic].column_name_in_target_table = var_name[iic].column_name_in_template_table;
				    frm.refresh();
				}

			}
		});

	},

});
