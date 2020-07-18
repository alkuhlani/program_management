# -*- coding: utf-8 -*-
# Copyright (c) 2020, Akram Mutaher and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import json

import frappe
from frappe import _, throw
from frappe.desk.form.assign_to import clear, close_all_assignments
from frappe.model.mapper import get_mapped_doc
from frappe.utils import add_days, cstr, date_diff, get_link_to_form, getdate, today, flt
from frappe.utils.nestedset import NestedSet

class Logframe(NestedSet):
	pass


@frappe.whitelist()
def get_children(doctype, parent, logframe=None, project_proposal=None, is_root=False):

	filters = [['docstatus', '<', '2']]

	if logframe:
		filters.append(['parent_logical_framework_chart', '=', logframe])
	elif parent and not is_root:
		# via expand child
		filters.append(['parent_logical_framework_chart', '=', parent])
	else:
		filters.append(['ifnull(`parent_logical_framework_chart`, "")', '=', ''])

	if project_proposal:
		filters.append(['project_proposal', '=', project_proposal])

	logframes = frappe.get_list(doctype, fields=[
		'name as value',
		'subject as title',
		'is_group as expandable'
	], filters=filters, order_by='name')

	# return logframes
	return logframes

@frappe.whitelist()
def add_node():
	from frappe.desk.treeview import make_tree_args
	args = frappe.form_dict
	args.update({
		"name_field": "subject"
	})
	args = make_tree_args(**args)

	if args.parent_logical_framework_chart == 'All Logframe' or args.parent_logical_framework_chart == args.project_proposal:
		args.parent_logical_framework_chart = None

	frappe.get_doc(args).insert()

@frappe.whitelist()
def add_multiple_logframes(data, parent):
	data = json.loads(data)
	new_doc = {'doctype': 'Logframe', 'parent_logical_framework_chart': parent if parent!="All Logframes" else ""}
	new_doc['project_proposal'] = frappe.db.get_value('Logframe', {"name": parent}, 'project_proposal') or ""

	for d in data:
		if not d.get("subject"): continue
		new_doc['subject'] = d.get("subject")
		new_logframe = frappe.get_doc(new_doc)
		new_logframe.insert()