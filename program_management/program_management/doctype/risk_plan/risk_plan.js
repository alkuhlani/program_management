// Copyright (c) 2020, Akram Mutaher and contributors
// For license information, please see license.txt

frappe.ui.form.on('Risk Plan', {
    refresh: function(frm) {
        $.each(frm.doc.total_risk_scores || [], function(i, d) {
            console.log(d.priority_score)
            d.priority_score = ((d.likelihood_score?d.likelihood_score:0.0 + d.impact_score?d.impact_score:0.0)) / 2;
        });
    } 
})
    /*
    likelihood_score: function(frm, cdt, cdn) {
        cur_frm.cscript.calculate_final(frm, cdt, cdn)
    },
    impact_score: function(frm, cdt, cdn) {
        cur_frm.cscript.calculate_final(frm, cdt, cdn)
    },
})

cur_frm.cscript.calculate_final= function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var final =(d.likelihood_score+d.impact_score/2);
        frappe.model.set_value(cdt, cdn, 'priority_score', final);
}*/

frappe.ui.form.on('Total Risk Scores', 'likelihood_score', function(frm, cdt, cdn) {
    console.log('in like')
    var cur_doc = locals[cdt][cdn];
    cur_doc.priority_score = ((cur_doc.likelihood_score?cur_doc.likelihood_score:0.0) + (cur_doc.impact_score?cur_doc.impact_score:0.0)) / 2;
    cur_frm.refresh_field("total_risk_scores");
});

frappe.ui.form.on('Total Risk Scores', 'impact_score', function(frm, cdt, cdn) {
    console.log('in like2')
    var cur_doc = locals[cdt][cdn];
    cur_doc.priority_score = ((cur_doc.likelihood_score?cur_doc.likelihood_score:0.0) + (cur_doc.impact_score?cur_doc.impact_score:0.0)) / 2;
    cur_frm.refresh_field("total_risk_scores");
    console.log(cur_doc.likelihood_score)
    console.log(cur_doc.impact_score)
    console.log(cur_doc.priority_score)
});
