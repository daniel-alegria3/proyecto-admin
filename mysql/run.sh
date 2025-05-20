#!/bin/bash
mysql -u root -p < ./crear_database.sql
mysql -u root -p < ./datos.sql

