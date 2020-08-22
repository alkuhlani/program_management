// Copyright (c) 2020, Akram Mutaher and contributors
// For license information, please see license.txt

frappe.ui.form.on('Indicators', {
	// refresh: function(frm) {

	// }
});
frappe.ui.form.on('Indicators', {
	refresh(frm) {
	cur_frm.set_query("governorate", "indicator_detail", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return{
		filters: [
		    
			['Territory', 'is_Group', '=', 1],
		
		]
	}
});    
	cur_frm.set_query("district", "indicator_detail", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return{
		filters: [
		    
			['Territory', 'parent_territory', '=', d.governorate],
		
		]
	}
});
    
	}
})


frappe.ui.form.on('Indicators', {
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

frappe.ui.form.on('Indicator Detail', {
    
    indicator_detail_remove: function(frm, cdt, cdn) {
        cur_frm.cscript.calculate_final(frm, cdt, cdn)
    },
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
        frm.doc.indicator_detail.forEach(function(d) { total_m += (d.men);});
        frm.doc.indicator_detail.forEach(function(d) { total_w += (d.women);});
        frm.doc.indicator_detail.forEach(function(d) { total_b += (d.boys);});
        frm.doc.indicator_detail.forEach(function(d) { total_g += (d.girls);});
        frm.doc.indicator_detail.forEach(function(d) { total_u += (d.unclassified);});
        frm.doc.indicator_detail.forEach(function(d) { total_t += (d.total);});
        frm.set_value("total_men", total_m);
        frm.set_value("total_women", total_w);
        frm.set_value("total_boys", total_b);
        frm.set_value("total_girls", total_g);
        frm.set_value("total_unclassified", total_u);
        frm.set_value("total", total_t);
        refresh_field("total_men");
        refresh_field("total_women");
        refresh_field("total_boys");
        refresh_field("total_girls");
        refresh_field("total_unclassified");
        refresh_field("total");
    }
    
frappe.ui.form.on('Indicators', {
	validate : function(frm, cdt, cdn) {
       cur_frm.cscript.calculate_final(frm, cdt, cdn)
   
	}
})