# -*- coding: utf-8 -*-
# Copyright (c) 2020, Akram Mutaher and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.core.doctype.user.user import STANDARD_USERS
from frappe.model.document import Document

class MonthlyReport(Document):
	pass
	def get_users(self,governorates):
		"""get list of users"""
		user_list = frappe.db.sql("""
			select name from tabTerritory
			where is_group =1
			order by name asc""", as_dict=1)
		if governorates:
			recipient_list = governorates.split("\n")
		else:
			recipient_list = []
		for p in user_list:
			p["checked"] = p["name"] in recipient_list and 1 or 0

		frappe.response['user_list'] = user_list

@frappe.whitelist()
def get_district(districts=None,governorates=None):
	recipient_list=[]
	#governorates=[]
	cond=""
	if governorates:
		recipient_list = governorates.split("\n")				
		#frappe.msgprint('{0}='.format(cond))
	"""get list of users"""
	user_list = frappe.db.sql("""
		select name from tabTerritory
		where is_group =0 and parent_territory in ({0}) 
		order by name asc""".format(', '.join(['%s']*len(recipient_list))), tuple(recipient_list),as_dict=1)
	if districts:
		recipient_list = districts.split("\n")
	else:
		recipient_list = []
	for p in user_list:
		p["checked"] = p["name"] in recipient_list and 1 or 0
	frappe.response['user_list'] = user_list