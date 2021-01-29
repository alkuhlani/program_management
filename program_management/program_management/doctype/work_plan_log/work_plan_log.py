# -*- coding: utf-8 -*-
# Copyright (c) 2020, Akram Mutaher and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class WorkPlanLog(Document):
	pass
	def validate(self):
		self.update_plan()

	def update_plan(self):
		work_plan = frappe.get_doc("Work Plan", self.work_plan)
		for s in work_plan.get("work_plan_details"):
			if s.activity == self.activity:
				s.db_set("status", self.status)
				s.db_set("progress", self.progress)
		work_plan.reload()
