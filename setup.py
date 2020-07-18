# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in program_management/__init__.py
from program_management import __version__ as version

setup(
	name='program_management',
	version=version,
	description='App to manage program in NGOs.',
	author='Akram Mutaher',
	author_email='a.mutaher@partner-cons.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
