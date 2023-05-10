import python from "../static/logos/python-logo-notext.png"
import rlogo from "../static/logos/rlogo.png"
import mysql from "../static/logos/mysql-logo.png"
import nodejs from "../static/logos/nodejs-logo.png"
import gurobi from "../static/logos/gurobi-logo.png"
import tensorflow from "../static/logos/tensorflow-logo.png"
import arena from "../static/logos/arena-logo.png"
import plotly from "../static/logos/plotly-logo.png"
import react from "../static/logos/react-logo.png"
import django from "../static/logos/django-logo.png"
import postman from "../static/logos/postman-logo.png"
import github from "../static/logos/github-logo.png"
import databricks from "../static/logos/databricks_logo.png"
import docker from "../static/logos/docker-logo.png"
import aws from "../static/logos/aws-logo.png"


export default [
    {
        'section': 'Technical',
        'skills': [
            { 'name': 'Python', 'image': python },
            { 'name': 'SQL', 'image': mysql },
            { 'name': 'AWS', 'image': aws },
            { 'name': 'Databricks', 'image': databricks },
            { 'name': 'R', 'image': rlogo },

        ]
    },
    {
        'section': 'Analytics',
        'skills': [
            { 'name': 'Mathematical Optimization', 'image': gurobi },
            { 'name': 'Simulation Modelling', 'image': arena },
            { 'name': 'Machine Learning', 'image': tensorflow },
            { 'name': 'Data Visualization', 'image': plotly },
        ]
    },
    {
        'section': 'Development Tools',
        'skills': [
            { 'name': 'Node.js', 'image': nodejs },
            { 'name': 'Docker', 'image': docker },
            { 'name': 'React', 'image': react },
            { 'name': 'Django', 'image': django },
            { 'name': 'Postman', 'image': postman },
            { 'name': 'Github', 'image': github },
        ]
    }
]