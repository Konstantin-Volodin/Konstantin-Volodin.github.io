import sql from "../static/assets/logos/mysql-logo.png"
import nosql from "../static/assets/logos/nosql-logo.png"
import python from "../static/assets/logos/python-logo-notext.png"
import nodejs from "../static/assets/logos/nodejs-logo.png"
import aws from "../static/assets/logos/aws-logo.png"
import gcp from "../static/assets/logos/gcp-logo.png"

import gurobi from "../static/assets/logos/gurobi-logo.png"
import arena from "../static/assets/logos/arena-logo.png"
import powerbi from '../static/assets/logos/power-bi.png'
import pytorch from '../static/assets/logos/pytorch-logo.png'
import airflow from '../static/assets/logos/airflow-logo.png'
import databricks from "../static/assets/logos/databricks_logo.png"

import frontend from '../static/assets/logos/front-end-logo.png'
import react from "../static/assets/logos/react-logo.png"
import django from "../static/assets/logos/django-logo.png"
import postman from "../static/assets/logos/postman-logo.png"
import github from "../static/assets/logos/github-logo.png"
import docker from "../static/assets/logos/docker-logo.png"

import { SkillSection } from '../types';

const skillsData: SkillSection[] = [
    {
        'section': 'Programming & Data',
        'skills': [
            { 'name': 'SQL', 'image': sql, proficiency: 5, yearsExperience: 7, description: 'Advanced database design and optimization' },
            { 'name': 'Python', 'image': python, proficiency: 5, yearsExperience: 6, description: 'Data science, web development, automation' },
            { 'name': 'NoSQL', 'image': nosql, proficiency: 4, yearsExperience: 3, description: 'MongoDB, DynamoDB, document databases' },
            { 'name': 'Node.js', 'image': nodejs, proficiency: 4, yearsExperience: 3, description: 'Backend services and APIs' },
        ]
    },
    {
        'section': 'Cloud & Infrastructure', 
        'skills': [
            { 'name': 'AWS', 'image': aws, proficiency: 4, yearsExperience: 4, description: 'EC2, S3, Lambda, RDS, CloudFormation' },
            { 'name': 'GCP', 'image': gcp, proficiency: 4, yearsExperience: 3, description: 'BigQuery, Cloud Functions, App Engine' },
        ]
    },
    {
        'section': 'Analytics & Data Science',
        'skills': [
            { 'name': 'Mathematical Optimization', 'image': gurobi, proficiency: 5, yearsExperience: 5, description: 'Linear/integer programming with Gurobi' },
            { 'name': 'Simulation Modelling', 'image': arena, proficiency: 4, yearsExperience: 4, description: 'Discrete event simulation with Arena' },
            { 'name': 'Machine Learning', 'image': pytorch, proficiency: 4, yearsExperience: 4, description: 'PyTorch, scikit-learn, deep learning' },
            { 'name': 'Data Visualization', 'image': powerbi, proficiency: 4, yearsExperience: 5, description: 'Power BI, Tableau, matplotlib, plotly' },
            { 'name': 'ETL/ELT', 'image': airflow, proficiency: 4, yearsExperience: 3, description: 'Apache Airflow, data pipelines' },
            { 'name': 'Data Engineering', 'image': databricks, proficiency: 4, yearsExperience: 2, description: 'Databricks, Spark, data lakehouse architecture' }
        ]
    },
    {
        'section': 'Development & Tools',
        'skills': [
            { 'name': 'Frontend Development', 'image': frontend, proficiency: 4, yearsExperience: 3, description: 'HTML5, CSS3, JavaScript, responsive design' },
            { 'name': 'React', 'image': react, proficiency: 4, yearsExperience: 3, description: 'Modern React, hooks, TypeScript, Chakra UI' },
            { 'name': 'Backend Development', 'image': django, proficiency: 4, yearsExperience: 4, description: 'Django, Flask, REST APIs' },
            { 'name': 'API Testing', 'image': postman, proficiency: 4, yearsExperience: 4, description: 'Postman, API design, testing automation' },
            { 'name': 'Version Control', 'image': github, proficiency: 5, yearsExperience: 7, description: 'Git, GitHub, collaborative development' },
            { 'name': 'Containerization', 'image': docker, proficiency: 3, yearsExperience: 2, description: 'Docker, container orchestration' }
        ]
    }
];

export default skillsData;