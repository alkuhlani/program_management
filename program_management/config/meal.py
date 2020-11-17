from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Plans"),
			"items": [
				{
					"type": "doctype",
					"name": "MEAL Plan",
					
				},
				{
					"type": "doctype",
					"name": "Field Visit Plan",
					
				},								


			]
		},

                {
			"label": _("Indicators"),
			"items": [
				{
					"type": "doctype",
					"name": "Indicator Log",
					
				}
			]
		},

                {
			"label": _("Tasks Management"),
			"items": [
				{
					"type": "doctype",
					"name": "Task",
					
				},				

			]
		},
		
		 {
			"label": _("Complain Mechanism"),
			"items": [
				{
					"type": "doctype",
					"name": "Complain Mechanism",
					
				},				

			]
		},

        
		{
			"label": _("Reports"),
			"items": [
				{
					"type": "doctype",
					"name": "Field Visit Report",
					
				},				

			]
		},

		
	]
