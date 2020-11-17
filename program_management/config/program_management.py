from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Programs"),
			"items": [
				{
					"type": "doctype",
					"name": "Project Proposal",
					
				},
				{
					"type": "doctype",
					"name": "Location",
					
				},
				{
					"type": "doctype",
					"name": "Programs",
					
				},
				{
					"type": "doctype",
					"name": "Budget Lines",
					
				},


				
			]
		},
                {
			"label": _("Logical Framework"),
			"items": [
				{
					"type": "doctype",
					"name": "Outcome and Output",
					"description": _("Outcome and Output.")
					
				},
				{
					"type": "doctype",
					"name": "Indicators",
					"description": _("Indicators.")
					
				},
				{
					"type": "doctype",
					"name": "Activity",
					"description": _("Activity.")
					
				},
				{
					"type": "doctype",
					"name": "Proposal Documents",
					"description": _("Proposal Documents."),
					"onboard": 1,
				}
			]
		},
                {
			"label": _("Plans"),
			"items": [
				{
					"type": "doctype",
					"name": "Work Plan",
					"description": _("Work Plan."),
					
				},
				{
					"type": "doctype",
					"name": "Risk Plan",
					"description": _("Risk Plan."),
				},
				{
					"type": "doctype",
					"name": "Communication Plan",
					"description": _("Communication Plan.")
				},
				{
					"type": "doctype",
					"name": "Technical Plan for Supervision",
					
				},
				

			]
		},

		{
			"label": _("Reports"),
			"items": [
				{
					"type": "doctype",
					"name": "Monthly Report",
					"description": _("Monthly Reports for Projects"),
				},
				]
		},

                {
			"label": _("Volunteer"),
			"items": [
				{
					"type": "doctype",
					"name": "Volunteer",
					"description": _("Volunteer information."),
					"onboard": 1,
				},
				{
					"type": "doctype",
					"name": "Volunteer Type",
					"description": _("Volunteer Type information."),
				}
			]
		},
		{
			"label": _("Donor"),
			"items": [
				{
					"type": "doctype",
					"name": "Donor",
					"description": _("Donor information."),
				},
				{
					"type": "doctype",
					"name": "Donor Type",
					"description": _("Donor Type information."),
				}
			]
		},

		
	]
