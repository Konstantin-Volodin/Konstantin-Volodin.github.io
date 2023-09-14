import sql from "../static/logos/mysql-logo.png"
import nosql from "../static/logos/nosql-logo.png"
import python from "../static/logos/python-logo-notext.png"
import rlogo from "../static/logos/rlogo.png"
import nodejs from "../static/logos/nodejs-logo.png"
import aws from "../static/logos/aws-logo.png"
import gcp from "../static/logos/gcp-logo.png"

import gurobi from "../static/logos/gurobi-logo.png"
import arena from "../static/logos/arena-logo.png"
import powerbi from '../static/logos/power-bi.png'
import pytorch from '../static/logos/pytorch-logo.png'
import airflow from '../static/logos/airflow-logo.png'
import databricks from "../static/logos/databricks_logo.png"

import plotly from "../static/logos/plotly-logo.png"
import frontend from '../static/logos/front-end-logo.png'
import react from "../static/logos/react-logo.png"
import django from "../static/logos/django-logo.png"
import postman from "../static/logos/postman-logo.png"
import github from "../static/logos/github-logo.png"
import docker from "../static/logos/docker-logo.png"


export default [
    {
        'section': 'Programming',
        'skills': [
            { 'name': 'SQL', 'image': sql },
            { 'name': 'NoSQL', 'image': nosql },
            { 'name': 'Python', 'image': python },
            { 'name': 'AWS', 'image': aws },
            { 'name': 'GCP', 'image': gcp },
            { 'name': 'Node.js', 'image': nodejs },
            // { 'name': 'R', 'image': rlogo },

        ]
    },
    {
        'section': 'Analytics',
        'skills': [
            { 'name': 'Mathematical Optimization', 'image': gurobi },
            { 'name': 'Simulation Modelling', 'image': arena },
            { 'name': 'Machine Learning', 'image': pytorch },
            { 'name': 'Data Visualization', 'image': powerbi },
            { 'name': 'ETL/ELT', 'image': airflow },
            { 'name': 'Data Engineering', 'image': databricks }
        ]
    },
    {
        'section': 'Development',
        'skills': [
            { 'name': 'Front-End Development', 'image': frontend },
            { 'name': 'React', 'image': react },
            { 'name': 'Django', 'image': django },
            // { 'name': 'DRF', 'image': django },
            { 'name': 'Github', 'image': github },
            { 'name': 'Docker', 'image': docker },
            { 'name': 'Postman', 'image': postman },
        ]
    }
]