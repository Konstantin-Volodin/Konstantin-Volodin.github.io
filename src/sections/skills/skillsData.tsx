import sql from "../../assets/logos/mysql-logo.png"
import python from "../../assets/logos/python-logo-notext.png"
import nodejs from "../../assets/logos/nodejs-logo.png"
import aws from "../../assets/logos/aws-logo.png"
import gcp from "../../assets/logos/gcp-logo.png"

import gurobi from "../../assets/logos/gurobi-logo.png"
import arena from "../../assets/logos/arena-logo.png"
import powerbi from '../../assets/logos/power-bi.png'
import pytorch from '../../assets/logos/pytorch-logo.png'
import databricks from "../../assets/logos/databricks_logo.png"

import docker from "../../assets/logos/docker-logo.png"
import rlogo from "../../assets/logos/rlogo.png"

import azurelogo from "../../assets/logos/azure-logo.png";

import htmlLogo from "../../assets/logos/html5-logo.png";
import reactLogo from "../../assets/logos/react-logo.png";
import djangoLogo from "../../assets/logos/django-logo.png";
import githubLogo from "../../assets/logos/github-logo.png";

import { SkillSection } from '../../shared/types';

const skillsData: SkillSection[] = [
    {
        section: 'Programming & Data',
        skills: [
            { name: 'Python', image: python, proficiency: 5, yearsExperience: 6, description: 'Data apps, ML, automation' },
            { name: 'SQL', image: sql, proficiency: 5, yearsExperience: 7, description: 'Modeling, performance tuning' },
            { name: 'Node.js', image: nodejs, proficiency: 4, yearsExperience: 3, description: 'APIs, services' },
            { name: 'R', image: rlogo, proficiency: 4, yearsExperience: 4, description: 'Analysis, visualization' },
        ]
    },
    {
        section: 'Analytics & ML',
        skills: [
            { name: 'PySpark', image: databricks, proficiency: 4, yearsExperience: 3, description: 'Distributed data processing' },
            { name: 'Machine Learning', image: pytorch, proficiency: 4, yearsExperience: 4, description: 'PyTorch, scikit‑learn' },
            { name: 'Data Visualization', image: powerbi, proficiency: 4, yearsExperience: 5, description: 'Power BI, dashboards' },
        ]
    },
    {
        section: 'Cloud & Infrastructure', 
        skills: [
            { name: 'AWS', image: aws, proficiency: 4, yearsExperience: 4, description: 'EC2, S3, Lambda' },
            { name: 'GCP', image: gcp, proficiency: 4, yearsExperience: 3, description: 'BigQuery, Cloud Functions' },
            { name: 'Azure DevOps', image: azurelogo, proficiency: 3, yearsExperience: 2, description: 'Boards, Pipelines, Repos' },
            { name: 'Docker', image: docker, proficiency: 3, yearsExperience: 2, description: 'Containers' },
        ]
    },
    {
        section: 'Decision Science',
        skills: [
            { name: 'Optimization', image: gurobi, proficiency: 4, yearsExperience: 5, description: 'Gurobi, practical models' },
            { name: 'Simulation', image: arena, proficiency: 3, yearsExperience: 4, description: 'Discrete‑event scenarios' },
        ]
    },
    {
        section: 'Web Development & Tools',
        skills: [
            { name: 'Front-End', image: htmlLogo, proficiency: 4, yearsExperience: 3, description: 'HTML, CSS, JavaScript' },
            { name: 'React', image: reactLogo, proficiency: 4, yearsExperience: 2, description: 'Component-based UIs' },
            { name: 'Django', image: djangoLogo, proficiency: 3, yearsExperience: 2, description: 'Python web framework' },
            { name: 'Git & GitHub', image: githubLogo, proficiency: 5, yearsExperience: 7, description: 'Version control, CI/CD' }
        ]
    }
];

export default skillsData;