from __future__ import unicode_literals
from frappe import _

def get_data():
	return {
		'fieldname': 'field_visit_plan',
		'transactions': [
			{
				'label': _('Report'),
				'items': ['Field Visit Report']
			},
		]
	}