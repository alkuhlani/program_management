// Copyright (c) 2020, Akram Mutaher and contributors
// For license information, please see license.txt

frappe.ui.form.on('Indicator Log', {
	// refresh: function(frm) {

	// }
});
frappe.ui.form.on('Indicator Log',
{

	indicator: function(frm) {
       

		frappe.call({
			"method": "frappe.client.get",
			args: {
				doctype: "Indicators",
				name: frm.doc.indicator
			},
			callback: function(data){
				frm.fields_dict.indicator_log_detail.grid.remove_all();
				let indicator_detail = data.message.indicator_detail;
				for (var i in indicator_detail) {
					frm.add_child("indicator_log_detail");
					frm.fields_dict.indicator_log_detail.get_value()[i].governorate = indicator_detail[i].governorate;
					frm.fields_dict.indicator_log_detail.get_value()[i].district = indicator_detail[i].district;
					frm.fields_dict.indicator_log_detail.get_value()[i].category = indicator_detail[i].category;
					frm.fields_dict.indicator_log_detail.get_value()[i].type = indicator_detail[i].type;
					frm.fields_dict.indicator_log_detail.get_value()[i].age_group = indicator_detail[i].age_group;
					frm.fields_dict.indicator_log_detail.get_value()[i].men = indicator_detail[i].men;
					frm.fields_dict.indicator_log_detail.get_value()[i].women = indicator_detail[i].women;
					frm.fields_dict.indicator_log_detail.get_value()[i].boys = indicator_detail[i].boys;
					frm.fields_dict.indicator_log_detail.get_value()[i].girls = indicator_detail[i].girls;
					frm.fields_dict.indicator_log_detail.get_value()[i].unclassified = indicator_detail[i].unclassified;
					frm.fields_dict.indicator_log_detail.get_value()[i].total = indicator_detail[i].total;
					frm.fields_dict.indicator_log_detail.get_value()[i].verification_method = indicator_detail[i].verification_method;
				}
				frm.refresh();
				grid_row.toggle_editable("indicator_log_detail", 0);
			}
		});

	},

});





frappe.ui.form.on('Indicator Log', {
	refresh(frm) {
	cur_frm.set_query("governorate", "achieved_indicators", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return{
		filters: [
		    
			['Territory', 'is_Group', '=', 1],
		
		]
	}
});    
	cur_frm.set_query("district", "achieved_indicators", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return{
		filters: [
		    
			['Territory', 'parent_territory', '=', d.governorate],
		
		]
	}
});
    
	}
})


frappe.ui.form.on('Indicator Log', {
	refresh(frm) {
	cur_frm.set_query("indicator", function(doc, cdt, cdn) {
	    var d = locals[cdt][cdn];
    	return{
	    	filters: [
		    
		    	['Indicators', 'project_proposal', '=', d.project_proposal],
		    	
	    	]
            	}
        });
	}
})

frappe.ui.form.on('Achieved Indicators', {
    
    
    men: function(frm, cdt, cdn) {
        cur_frm.cscript.calculate_final(frm, cdt, cdn)
    },
    women: function(frm, cdt, cdn) {
        cur_frm.cscript.calculate_final(frm, cdt, cdn)
    },
    boys: function(frm, cdt, cdn) {
        cur_frm.cscript.calculate_final(frm, cdt, cdn)
    },
    girls: function(frm, cdt, cdn) {
        cur_frm.cscript.calculate_final(frm, cdt, cdn)
    },
    unclassified: function(frm, cdt, cdn) {
       cur_frm.cscript.calculate_final(frm, cdt, cdn)
    }
})
cur_frm.cscript.calculate_final= function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var final =(d.men+d.women+d.boys+d.girls+d.unclassified);
        frappe.model.set_value(cdt, cdn, 'total', final);
        var total_m = 0;
        var total_w = 0;
        var total_b = 0;
        var total_g = 0;
        var total_u = 0;
        var total_t = 0;
        frm.doc.achieved_indicators.forEach(function(d) { total_m += (d.men);});
        frm.doc.achieved_indicators.forEach(function(d) { total_w += (d.women);});
        frm.doc.achieved_indicators.forEach(function(d) { total_b += (d.boys);});
        frm.doc.achieved_indicators.forEach(function(d) { total_g += (d.girls);});
        frm.doc.achieved_indicators.forEach(function(d) { total_u += (d.unclassified);});
        frm.doc.achieved_indicators.forEach(function(d) { total_t += (d.total);});
        frm.set_value("achieved_men", total_m);
        frm.set_value("achieved_women", total_w);
        frm.set_value("achieved_boys", total_b);
        frm.set_value("achieved_girls", total_g);
        frm.set_value("achieved_unclassified", total_u);
        frm.set_value("total_achieved", total_t);
        refresh_field("achieved_men");
        refresh_field("achieved_women");
        refresh_field("achieved_boys");
        refresh_field("achieved_girls");
        refresh_field("achieved_unclassified");
        refresh_field("total_achieved");
    }
    






frappe.ui.form.on('Indicator Log', {
	
		// your code here
    
    total_achieved: function(frm) {
        frm.trigger("calculate_finald")
    },
    total: function(frm) {
        frm.trigger("calculate_finald")
    },
    
    calculate_finald: function(frm) {
        if (frm.doc.total){
            var rem = frm.doc.total - frm.doc.total_achieved;
            var final = flt(frm.doc.total_achieved / frm.doc.total *100);
            var finald = flt(frm.doc.remaining / frm.doc.total * 100);
            frm.set_value('remaining', rem);
            frm.set_value('cumulative_progress', final);
            frm.set_value('in_progress', finald);
        }
    },
	
});

frappe.ui.form.on('Indicator Log', {
	validate : function(frm, cdt, cdn) {
       cur_frm.cscript.calculate_final(frm, cdt, cdn)
	},
	validate: function(frm) {
        frm.trigger("calculate_finald")
    }
})
