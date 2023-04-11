import artfDashboard from "../assets/images/artf-dashboard.jpg"
import artfBaselines from "../assets/images/artf-baselines.jpg"
import artfAppTimes from "../assets/images/artf-apptimes.jpg"
import ohriUrgentCare from "../assets/images/urgent-care.jpg"
import ohriCTScheduling from "../assets/images/urgent-care.jpg"
import ohriBlockScheduling from "../assets/images/block-scheduling.jpg"
import uOttawaDynamicKnapsack from "../assets/images/dynamic-knapsack.jpg"
import uOttawaWorkloadAllocation from "../assets/images/workload-allocation.jpg"
import personalForecasting from "../assets/images/personal-forecasting.jpg"

export default [
  {
    'company': 'IRCC',
    'name': 'ARTF Dashboard & Survey Analysis',
    'description': 'Analyzed data and developed a dashboard reporting anti-racism survey results at IRCC. The survey was delivered to over nine thousand employees. The data analysis was done in R and the dashboard was developed in R-Shiny. This was one of the first quantitative analyses performed to identify the extent of racism at IRCC.',
    'picture': artfDashboard,
    'technologies': ['Python'],
    'skills': ['Forecasting', 'Data Pipelines']
  },
  {
    'company': 'IRCC',
    'name': 'IRCC Recruitment Targets Model',
    'description': 'As part of the diversity, equity, and inclusion efforts at IRCC I developed a model to calculate the necessary recruitment numbers to meet the baseline representation. The model takes into account the stochastic nature of turnover, retirement, and promotions rates and was developed in python',
    'picture': artfBaselines,
    'technologies': ['Python'],
    'skills': ['Forecasting', 'Data Pipelines']
  },
  {
    'company': 'IRCC',
    'name': 'Permanent Resident Wait Time Analysis',
    'description': 'I prepared a report analysing the mechanics of wait times for receiving Temporary Residence and Permanent Residence for immigrants on various factors. The report allowed us to advance our agenda and convince the management to put effort into fixing this problem',
    'picture': artfAppTimes,
    'technologies': ['Python'],
    'skills': ['Forecasting', 'Data Pipelines']
  },
  {
    'company': 'OHRI',
    'name': 'Urgent Care Simulation',
    'description': 'At the Ottawa Hostpital Research Institute, I worked on mapping and simulating an Urgent Care facility. In an attempt to identify bottlenecks and remove them.',
    'picture': ohriUrgentCare,
    'technologies': ['Python'],
    'skills': ['Forecasting', 'Data Pipelines']
  },
  // {
  //   'company': 'OHRI',
  //   'name': 'CT Scan Scheduling',
  //   'description': 'At the Ottawa Hostpital Research Institute, I worked on creating a demo web application that would utilize an existing scheduling model to make CT scan scheduling require less man hours and to make it more efficient for the system overall',
  //   'picture': ''
  // },
  {
    'company': 'OHRI',
    'name': 'Surgery Block Scheduling',
    'description': 'Due to Covid-19 epidemic putting stress on the functionings of elective surgeries at the ottawa hospital, a more efficient scheduling policy was required to handle the backlog. This linear optimization model, along with a demo user interface, addresses the issue, by creating a better schedule that would address the huge backlog well.',
    'picture': ohriBlockScheduling,
    'technologies': ['Python'],
    'skills': ['Forecasting', 'Data Pipelines']
  },
  {
    'company': 'uOttawa',
    'name': 'MDP model for Stochastic Spine Surgery Scheduling',
    'description': 'As a research assistant at the University of Ottawa, developed a cutting-edge scheduling model that uses a Markov Decision Process approach to optimally schedule spine surgery patients in a stochastic environment. The model was developed using Python and optimized on a Linux compute cluster, resulting in a highly effective system that maximizes the utilization of operating rooms and healthcare resources while minimizing patient wait times and overall costs.',
    'picture': uOttawaDynamicKnapsack,
    'technologies': ['Python', 'Linux', 'Gurobi'],
    'skills': ['Optimization', 'Markov Decision Processes', 'Distributed Computing']
  },
  {
    'company': 'uOttawa',
    'name': "Optimization model for Automation of a Course Scheduling Process",
    'description': 'Led the development of an optimization model that generates a course schedule for the Telfer School of Management. Incorporated front-end and back-end development expertise to create an intuitive, user-friendly interface. The outcome was a superior course scheduling system that has significantly reduced the time and effort required to create a course schedule while increasing student and professor satisfaction with the schedule',
    'picture': uOttawaWorkloadAllocation,
    'technologies': ['Python', 'React', 'Django', 'Gurobi', 'MySQL'],
    'skills': ['Optimization', 'Front-End Web Dev', 'Back-End Web Dev', 'Database Management']
  },
  {
    'company': 'McGill',
    'name': 'Demand Forecasting for Efficient Inventory Management',
    'description': 'Developed a Python-based advanced timeseries forecasting solution for a company seeking to optimize inventory management by accurately predicting demand for thousands of items. Utilized statistical models and external economic variables to enhance forecast accuracy, resulting in increased operational efficiency, cost savings, and customer satisfaction.',
    'picture': personalForecasting,
    'technologies': ['Python', 'Statsforecast', 'Plotly'],
    'skills': ['Forecasting', 'Data Pipelines', 'Visualization']
  },
  // {
  //   'company': 'Personal',
  //   'name': 'Text Mining',
  //   'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu nisl, luctus at laoreet sit amet, faucibus ut enim. Fusce ante sem, tincidunt vel lorem ac, dictum congue nunc. Donec sed hendrerit dui. Mauris at vestibulum nunc. Nunc volutpat pharetra tellus non mattis. Nunc malesuada varius sollicitudin. Mauris non metus eget leo rhoncus sagittis. Sed dapibus, ipsum a accumsan feugiat, est libero facilisis sem, quis porttitor risus odio eget nunc. Donec malesuada vehicula pellentesque. Integer sed venenatis tellus. Cras ut tristique lacus. Suspendisse efficitur nisl a arcu sollicitudin, sed consectetur massa consequat',
  //   'picture': ''
  // },
]
