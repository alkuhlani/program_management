from __future__ import unicode_literals
from frappe import _

def get_data():
	return {
		'heatmap': True,
		'fieldname': 'work_plan',
		'transactions': [
			{
				'items': ['Work Plan Log']
			}
		]
	}