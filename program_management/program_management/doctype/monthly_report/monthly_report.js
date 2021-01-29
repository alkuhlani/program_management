// Copyright (c) 2020, Akram Mutaher and contributors
// For license information, please see license.txt

/*frappe.ui.form.on('Monthly Report',  'validate',  function(frm) {
    if (frm.doc.reporting_date < get_today()) {
        msgprint('You can not select past date in Reporting Date');
        validated = false;
    } 
});*/


frappe.ui.form.on('Monthly Report', {
    refresh(frm) {
        cur_frm.set_query("governorate", "activities_updates", function (doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            return {
                filters: [

                    ['Territory', 'is_Group', '=', 1],

                ]
            }
        })
    }

});

cur_frm.set_query("district", "activities_updates", function (doc, cdt, cdn) {
    var d = locals[cdt][cdn];
    const selected_gov = d.governorates.split(/\n/g).filter(s => s);
    return {
        filters: [

            ['Territory', 'parent_territory', 'in', selected_gov],

        ]
    }
});

//////////////////////////////////////////

frappe.ui.form.on('Monthly Report', {
    refresh(frm) {
        cur_frm.set_query("governorate", "supply_distribution_updates", function (doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            return {
                filters: [

                    ['Territory', 'is_Group', '=', 1],

                ]
            }
        })
    }

});

cur_frm.set_query("district", "supply_distribution_updates", function (doc, cdt, cdn) {
    var d = locals[cdt][cdn];
    return {
        filters: [

            ['Territory', 'parent_territory', '=', d.governorate],

        ]
    }
});

//////////////////////////////////////////

frappe.ui.form.on('Monthly Report', {
    refresh(frm) {
        cur_frm.set_query("governorate", "monitoring_visits_updates", function (doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            return {
                filters: [

                    ['Territory', 'is_Group', '=', 1],

                ]
            }
        })
    }

});

cur_frm.set_query("district", "monitoring_visits_updates", function (doc, cdt, cdn) {
    var d = locals[cdt][cdn];
    return {
        filters: [

            ['Territory', 'parent_territory', '=', d.governorate],

        ]
    }
});

//////////////////////////////////////////

frappe.ui.form.on('Monthly Report', {
    refresh(frm) {
        cur_frm.set_query("governorate", "activities_priorities_for_next_month", function (doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            return {
                filters: [

                    ['Territory', 'is_Group', '=', 1],

                ]
            }
        })
    }

});

cur_frm.set_query("district", "activities_priorities_for_next_month", function (doc, cdt, cdn) {
    var d = locals[cdt][cdn];
    return {
        filters: [

            ['Territory', 'parent_territory', '=', d.governorate],

        ]
    }
});


frappe.ui.form.on('Activities Updates', {
    /*governorate: function(frm, cdt, cdn){
        var d = locals[cdt][cdn];
        var gov_list= d.governorates;
        var new_line='\n';
        if (d.governorate!=""){
        if (!gov_list){
            var mm=d.governorate;
            frappe.model.set_value(cdt, cdn, 'governorates', mm);
            frappe.model.set_value(cdt, cdn, 'governorate', "");
        }
        else {
            var mg=gov_list + new_line + d.governorate;
            frappe.model.set_value(cdt, cdn, 'governorates', mg);
            frappe.model.set_value(cdt, cdn, 'governorate', "");
        }
        }
    },*/
    district: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var gov_list = d.districts;
        var new_line = '\n';
        if (d.district != "") {
            if (!gov_list) {
                var mm = d.district;
                frappe.model.set_value(cdt, cdn, 'districts', mm);
                frappe.model.set_value(cdt, cdn, 'district', "");
            }
            else {
                var mg = gov_list + new_line + d.district;
                frappe.model.set_value(cdt, cdn, 'districts', mg);
                frappe.model.set_value(cdt, cdn, 'district', "");
            }
        }
    }
});

cur_frm.cscript.add_governorate = function (doc, cdt, cdn) {
    // Get user list
    var c = locals[cdt][cdn];
    return cur_frm.call('get_users', c.governorates, function (r) {
        // Open a dialog and display checkboxes against email addresses
        doc = locals[cdt][cdn];
        var d = new frappe.ui.Dialog({
            title: __('Add/Remove Governorates'),
            width: 400
        });

        $.each(r.user_list, function (i, v) {
            var fullname = v.name;
            /*if(fullname !== v.name) fullname = fullname + " &lt;" + v.name + "&gt;";

            if(v.enabled==0) {
                fullname = repl("<span style='color: red'> %(name)s (" + __("disabled user") + ")</span>", {name: v.name});
            }*/

            $('<div class="checkbox"><label>\
				<input type="checkbox" data-id="' + v.name + '"' +
                (v.checked ? 'checked' : '') +
                '> ' + fullname + '</label></div>').appendTo(d.body);
        });

        // Display add recipients button
        d.set_primary_action("Update", function () {
            cur_frm.cscript.add_to_rec_list(doc, d.body, r.user_list.length);
        });

        cur_frm.rec_dialog = d;
        d.show();
    });
}

cur_frm.cscript.add_to_rec_list = function (doc, dialog, length) {
    // add checked users to list of recipients
    var rec_list = [];
    $(dialog).find('input:checked').each(function (i, input) {
        rec_list.push($(input).attr('data-id'));
    });

    doc.governorates = rec_list.join('\n');
    cur_frm.rec_dialog.hide();
    cur_frm.refresh_fields();
}
///////////////////////////////////////////////////////////////////

cur_frm.cscript.add_district = function (doc, cdt, cdn) {
    // Get user list
    var c = locals[cdt][cdn];
    return cur_frm.call({
        method:'get_district', 
        args:{"districts":c.districts, "governorates":c.governorates},
        callback: function (r) {
        // Open a dialog and display checkboxes against email addresses
        doc = locals[cdt][cdn];
        var d = new frappe.ui.Dialog({
            title: __('Add/Remove District'),
            width: 400
        });

        $.each(r.user_list, function (i, v) {
            var fullname = v.name;
            /*if(fullname !== v.name) fullname = fullname + " &lt;" + v.name + "&gt;";

            if(v.enabled==0) {
                fullname = repl("<span style='color: red'> %(name)s (" + __("disabled user") + ")</span>", {name: v.name});
            }*/

            $('<div class="checkbox"><label>\
				<input type="checkbox" data-id="' + v.name + '"' +
                (v.checked ? 'checked' : '') +
                '> ' + fullname + '</label></div>').appendTo(d.body);
        });

        // Display add recipients button
        d.set_primary_action("Update", function () {
            cur_frm.cscript.add_to_recd_list(doc, d.body, r.user_list.length);
        });

        cur_frm.rec_dialog = d;
        d.show();
    }});
}

cur_frm.cscript.add_to_recd_list = function (doc, dialog, length) {
    // add checked users to list of recipients
    var rec_list = [];
    $(dialog).find('input:checked').each(function (i, input) {
        rec_list.push($(input).attr('data-id'));
    });

    doc.districts = rec_list.join('\n');
    cur_frm.rec_dialog.hide();
    cur_frm.refresh_fields();
}

frappe.ui.form.on('Supply Distribution Updates', {
    /*governorate: function(frm, cdt, cdn){
        var d = locals[cdt][cdn];
        var gov_list= d.governorates;
        var new_line='\n';
        if (d.governorate!=""){
        if (!gov_list){
            var mm=d.governorate;
            frappe.model.set_value(cdt, cdn, 'governorates', mm);
            frappe.model.set_value(cdt, cdn, 'governorate', "");
        }
        else {
            var mg=gov_list + new_line + d.governorate;
            frappe.model.set_value(cdt, cdn, 'governorates', mg);
            frappe.model.set_value(cdt, cdn, 'governorate', "");
        }
        }
    },*/
    district: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var gov_list = d.districts;
        var new_line = '\n';
        if (d.district != "") {
            if (!gov_list) {
                var mm = d.district;
                frappe.model.set_value(cdt, cdn, 'districts', mm);
                frappe.model.set_value(cdt, cdn, 'district', "");
            }
            else {
                var mg = gov_list + new_line + d.district;
                frappe.model.set_value(cdt, cdn, 'districts', mg);
                frappe.model.set_value(cdt, cdn, 'district', "");
            }
        }
    }
});

cur_frm.cscript.add_governorate = function (doc, cdt, cdn) {
    // Get user list
    var c = locals[cdt][cdn];
    return cur_frm.call('get_users', c.governorates, function (r) {
        // Open a dialog and display checkboxes against email addresses
        doc = locals[cdt][cdn];
        var d = new frappe.ui.Dialog({
            title: __('Add/Remove Governorates'),
            width: 400
        });

        $.each(r.user_list, function (i, v) {
            var fullname = v.name;
            /*if(fullname !== v.name) fullname = fullname + " &lt;" + v.name + "&gt;";

            if(v.enabled==0) {
                fullname = repl("<span style='color: red'> %(name)s (" + __("disabled user") + ")</span>", {name: v.name});
            }*/

            $('<div class="checkbox"><label>\
				<input type="checkbox" data-id="' + v.name + '"' +
                (v.checked ? 'checked' : '') +
                '> ' + fullname + '</label></div>').appendTo(d.body);
        });

        // Display add recipients button
        d.set_primary_action("Update", function () {
            cur_frm.cscript.add_to_rec_list(doc, d.body, r.user_list.length);
        });

        cur_frm.rec_dialog = d;
        d.show();
    });
}

cur_frm.cscript.add_to_rec_list = function (doc, dialog, length) {
    // add checked users to list of recipients
    var rec_list = [];
    $(dialog).find('input:checked').each(function (i, input) {
        rec_list.push($(input).attr('data-id'));
    });

    doc.governorates = rec_list.join('\n');
    cur_frm.rec_dialog.hide();
    cur_frm.refresh_fields();
}
///////////////////////////////////////////////////////////////////

cur_frm.cscript.add_district = function (doc, cdt, cdn) {
    // Get user list
    var c = locals[cdt][cdn];
    return cur_frm.call({
        method:'get_district', 
        args:{"districts":c.districts, "governorates":c.governorates},
        callback: function (r) {
        // Open a dialog and display checkboxes against email addresses
        doc = locals[cdt][cdn];
        var d = new frappe.ui.Dialog({
            title: __('Add/Remove District'),
            width: 400
        });

        $.each(r.user_list, function (i, v) {
            var fullname = v.name;
            /*if(fullname !== v.name) fullname = fullname + " &lt;" + v.name + "&gt;";

            if(v.enabled==0) {
                fullname = repl("<span style='color: red'> %(name)s (" + __("disabled user") + ")</span>", {name: v.name});
            }*/

            $('<div class="checkbox"><label>\
				<input type="checkbox" data-id="' + v.name + '"' +
                (v.checked ? 'checked' : '') +
                '> ' + fullname + '</label></div>').appendTo(d.body);
        });

        // Display add recipients button
        d.set_primary_action("Update", function () {
            cur_frm.cscript.add_to_recd_list(doc, d.body, r.user_list.length);
        });

        cur_frm.rec_dialog = d;
        d.show();
    }});
}

cur_frm.cscript.add_to_recd_list = function (doc, dialog, length) {
    // add checked users to list of recipients
    var rec_list = [];
    $(dialog).find('input:checked').each(function (i, input) {
        rec_list.push($(input).attr('data-id'));
    });

    doc.districts = rec_list.join('\n');
    cur_frm.rec_dialog.hide();
    cur_frm.refresh_fields();
}














frappe.ui.form.on('Monitoring Visits Updates', {
    /*governorate: function(frm, cdt, cdn){
        var d = locals[cdt][cdn];
        var gov_list= d.governorates;
        var new_line='\n';
        if (d.governorate!=""){
        if (!gov_list){
            var mm=d.governorate;
            frappe.model.set_value(cdt, cdn, 'governorates', mm);
            frappe.model.set_value(cdt, cdn, 'governorate', "");
        }
        else {
            var mg=gov_list + new_line + d.governorate;
            frappe.model.set_value(cdt, cdn, 'governorates', mg);
            frappe.model.set_value(cdt, cdn, 'governorate', "");
        }
        }
    },*/
    district: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var gov_list = d.districts;
        var new_line = '\n';
        if (d.district != "") {
            if (!gov_list) {
                var mm = d.district;
                frappe.model.set_value(cdt, cdn, 'districts', mm);
                frappe.model.set_value(cdt, cdn, 'district', "");
            }
            else {
                var mg = gov_list + new_line + d.district;
                frappe.model.set_value(cdt, cdn, 'districts', mg);
                frappe.model.set_value(cdt, cdn, 'district', "");
            }
        }
    }
});

cur_frm.cscript.add_governorate = function (doc, cdt, cdn) {
    // Get user list
    var c = locals[cdt][cdn];
    return cur_frm.call('get_users', c.governorates, function (r) {
        // Open a dialog and display checkboxes against email addresses
        doc = locals[cdt][cdn];
        var d = new frappe.ui.Dialog({
            title: __('Add/Remove Governorates'),
            width: 400
        });

        $.each(r.user_list, function (i, v) {
            var fullname = v.name;
            /*if(fullname !== v.name) fullname = fullname + " &lt;" + v.name + "&gt;";

            if(v.enabled==0) {
                fullname = repl("<span style='color: red'> %(name)s (" + __("disabled user") + ")</span>", {name: v.name});
            }*/

            $('<div class="checkbox"><label>\
				<input type="checkbox" data-id="' + v.name + '"' +
                (v.checked ? 'checked' : '') +
                '> ' + fullname + '</label></div>').appendTo(d.body);
        });

        // Display add recipients button
        d.set_primary_action("Update", function () {
            cur_frm.cscript.add_to_rec_list(doc, d.body, r.user_list.length);
        });

        cur_frm.rec_dialog = d;
        d.show();
    });
}

cur_frm.cscript.add_to_rec_list = function (doc, dialog, length) {
    // add checked users to list of recipients
    var rec_list = [];
    $(dialog).find('input:checked').each(function (i, input) {
        rec_list.push($(input).attr('data-id'));
    });

    doc.governorates = rec_list.join('\n');
    cur_frm.rec_dialog.hide();
    cur_frm.refresh_fields();
}
///////////////////////////////////////////////////////////////////

cur_frm.cscript.add_district = function (doc, cdt, cdn) {
    // Get user list
    var c = locals[cdt][cdn];
    return cur_frm.call({
        method:'get_district', 
        args:{"districts":c.districts, "governorates":c.governorates},
        callback: function (r) {
        // Open a dialog and display checkboxes against email addresses
        doc = locals[cdt][cdn];
        var d = new frappe.ui.Dialog({
            title: __('Add/Remove District'),
            width: 400
        });

        $.each(r.user_list, function (i, v) {
            var fullname = v.name;
            /*if(fullname !== v.name) fullname = fullname + " &lt;" + v.name + "&gt;";

            if(v.enabled==0) {
                fullname = repl("<span style='color: red'> %(name)s (" + __("disabled user") + ")</span>", {name: v.name});
            }*/

            $('<div class="checkbox"><label>\
				<input type="checkbox" data-id="' + v.name + '"' +
                (v.checked ? 'checked' : '') +
                '> ' + fullname + '</label></div>').appendTo(d.body);
        });

        // Display add recipients button
        d.set_primary_action("Update", function () {
            cur_frm.cscript.add_to_recd_list(doc, d.body, r.user_list.length);
        });

        cur_frm.rec_dialog = d;
        d.show();
    }});
}

cur_frm.cscript.add_to_recd_list = function (doc, dialog, length) {
    // add checked users to list of recipients
    var rec_list = [];
    $(dialog).find('input:checked').each(function (i, input) {
        rec_list.push($(input).attr('data-id'));
    });

    doc.districts = rec_list.join('\n');
    cur_frm.rec_dialog.hide();
    cur_frm.refresh_fields();
}














frappe.ui.form.on('Activities Priorities for Next Month', {
    /*governorate: function(frm, cdt, cdn){
        var d = locals[cdt][cdn];
        var gov_list= d.governorates;
        var new_line='\n';
        if (d.governorate!=""){
        if (!gov_list){
            var mm=d.governorate;
            frappe.model.set_value(cdt, cdn, 'governorates', mm);
            frappe.model.set_value(cdt, cdn, 'governorate', "");
        }
        else {
            var mg=gov_list + new_line + d.governorate;
            frappe.model.set_value(cdt, cdn, 'governorates', mg);
            frappe.model.set_value(cdt, cdn, 'governorate', "");
        }
        }
    },*/
    district: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var gov_list = d.districts;
        var new_line = '\n';
        if (d.district != "") {
            if (!gov_list) {
                var mm = d.district;
                frappe.model.set_value(cdt, cdn, 'districts', mm);
                frappe.model.set_value(cdt, cdn, 'district', "");
            }
            else {
                var mg = gov_list + new_line + d.district;
                frappe.model.set_value(cdt, cdn, 'districts', mg);
                frappe.model.set_value(cdt, cdn, 'district', "");
            }
        }
    }
});

cur_frm.cscript.add_governorate = function (doc, cdt, cdn) {
    // Get user list
    var c = locals[cdt][cdn];
    return cur_frm.call('get_users', c.governorates, function (r) {
        // Open a dialog and display checkboxes against email addresses
        doc = locals[cdt][cdn];
        var d = new frappe.ui.Dialog({
            title: __('Add/Remove Governorates'),
            width: 400
        });

        $.each(r.user_list, function (i, v) {
            var fullname = v.name;
            /*if(fullname !== v.name) fullname = fullname + " &lt;" + v.name + "&gt;";

            if(v.enabled==0) {
                fullname = repl("<span style='color: red'> %(name)s (" + __("disabled user") + ")</span>", {name: v.name});
            }*/

            $('<div class="checkbox"><label>\
				<input type="checkbox" data-id="' + v.name + '"' +
                (v.checked ? 'checked' : '') +
                '> ' + fullname + '</label></div>').appendTo(d.body);
        });

        // Display add recipients button
        d.set_primary_action("Update", function () {
            cur_frm.cscript.add_to_rec_list(doc, d.body, r.user_list.length);
        });

        cur_frm.rec_dialog = d;
        d.show();
    });
}

cur_frm.cscript.add_to_rec_list = function (doc, dialog, length) {
    // add checked users to list of recipients
    var rec_list = [];
    $(dialog).find('input:checked').each(function (i, input) {
        rec_list.push($(input).attr('data-id'));
    });

    doc.governorates = rec_list.join('\n');
    cur_frm.rec_dialog.hide();
    cur_frm.refresh_fields();
}
///////////////////////////////////////////////////////////////////

cur_frm.cscript.add_district = function (doc, cdt, cdn) {
    // Get user list
    var c = locals[cdt][cdn];
    return cur_frm.call({
        method:'get_district', 
        args:{"districts":c.districts, "governorates":c.governorates},
        callback: function (r) {
        // Open a dialog and display checkboxes against email addresses
        doc = locals[cdt][cdn];
        var d = new frappe.ui.Dialog({
            title: __('Add/Remove District'),
            width: 400
        });

        $.each(r.user_list, function (i, v) {
            var fullname = v.name;
            /*if(fullname !== v.name) fullname = fullname + " &lt;" + v.name + "&gt;";

            if(v.enabled==0) {
                fullname = repl("<span style='color: red'> %(name)s (" + __("disabled user") + ")</span>", {name: v.name});
            }*/

            $('<div class="checkbox"><label>\
				<input type="checkbox" data-id="' + v.name + '"' +
                (v.checked ? 'checked' : '') +
                '> ' + fullname + '</label></div>').appendTo(d.body);
        });

        // Display add recipients button
        d.set_primary_action("Update", function () {
            cur_frm.cscript.add_to_recd_list(doc, d.body, r.user_list.length);
        });

        cur_frm.rec_dialog = d;
        d.show();
    }});
}

cur_frm.cscript.add_to_recd_list = function (doc, dialog, length) {
    // add checked users to list of recipients
    var rec_list = [];
    $(dialog).find('input:checked').each(function (i, input) {
        rec_list.push($(input).attr('data-id'));
    });

    doc.districts = rec_list.join('\n');
    cur_frm.rec_dialog.hide();
    cur_frm.refresh_fields();
}
