# -*- coding: utf-8 -*-
# Copyright (c) 2020, Akram Mutaher and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import (flt)
from frappe.contacts.address_and_contact import load_address_and_contact

class ProjectProposal(Document):
	pass
	def validate(self):
		self.check_percent()

	def check_percent(self):
		total_percent = 0
		for d in self.get("targeted_programs"):
			total_percent += flt(d.percent)

		if flt(total_percent) != 100:
			frappe.throw(_("Sum of percent for all programs should be 100. It is {0}").format(total_percent))
	def onload(self):
		"""Load address and contacts in `__onload`"""
		load_address_and_contact(self)