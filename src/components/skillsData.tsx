import python from "../assets/logos/python-logo-notext.png"
import rlogo from "../assets/logos/rlogo.png"
import mysql from "../assets/logos/mysql-logo.png"
import nodejs from "../assets/logos/nodejs-logo.png"
import gurobi from "../assets/logos/gurobi-logo.png"
import tensorflow from "../assets/logos/tensorflow-logo.png"
import arena from "../assets/logos/arena-logo.png"
import plotly from "../assets/logos/plotly-logo.png"
import react from "../assets/logos/react-logo.png"
import django from "../assets/logos/django-logo.png"
import postman from "../assets/logos/postman-logo.png"
import github from "../assets/logos/github-logo.png"


export default [
    {
        'section': 'Technical',
        'skills': [
            {'name': 'Python', 'image': python},
            {'name': 'R', 'image': rlogo},
            {'name': 'SQL', 'image': mysql},
            {'name': 'Node.js', 'image': nodejs},
        ]
    },
    {
        'section': 'Analytics',
        'skills': [
            {'name': 'Mathematical Optimization', 'image': gurobi},
            {'name': 'Simulation Modelling', 'image': arena},
            {'name': 'Machine Learning', 'image': tensorflow},
            {'name': 'Data Visualization', 'image': plotly},
        ]
    },
    {
        'section': 'Development Tools',
        'skills': [
            {'name': 'React', 'image': react},
            {'name': 'Django', 'image': django},
            {'name': 'Postman', 'image': postman},
            {'name': 'Github', 'image': github}
        ]
    }
]