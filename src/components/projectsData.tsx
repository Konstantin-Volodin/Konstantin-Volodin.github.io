import mcgillCapstone from "../static/images/capstone.png"
import artfDashboard from "../static/images/artf-dashboard.jpg"
import artfBaselines from "../static/images/artf-baselines.jpg"
import artfAppTimes from "../static/images/artf-apptimes.jpg"
import ohriUrgentCare from "../static/images/urgent-care.jpg"
import ohriCTScheduling from "../static/images/urgent-care.jpg"
import ohriBlockScheduling from "../static/images/block-scheduling.jpg"
import uOttawaDynamicKnapsack from "../static/images/dynamic-knapsack.jpg"
import uOttawaWorkloadAllocation from "../static/images/workload-allocation.png"
import personalForecasting from "../static/images/personal-forecasting.jpg"

export default [
  {
    'company': 'CAE Inc.',
    'name': 'Demand Forecasting and Inventory Management',
    'description': 'At CAE Inc, I contributed to the development of a Python-based time series forecasting solution aimed at optimizing inventory management. By accurately predicting demand for thousands of items, we enhanced operational efficiency, achieved cost savings, and improved customer satisfaction. Leveraging statistical models and incorporating external economic variables, we significantly improved forecast accuracy. Additionally, we formulated an effective inventory management policy to align with the demand forecast. To showcase the insights gained, we created compelling visualizations using Power BI, enabling stakeholders to easily understand and act upon the information.',
    'picture': mcgillCapstone,
    'technologies': ['Python', 'Statsforecast', 'Plotly'],
    'skills': ['Forecasting', 'Data Pipelines', 'Visualization']
  },

  // {
  //   'company': 'Immigration, Refugees and Citizenship Canada',
  //   'name': 'Modernizing Existing Classification Models',
  //   'description': "add some stuff",
  //   'picture': artfDashboard,
  //   'technologies': ['Python', 'SQL', 'SPSS'],
  //   'skills': ['Forecasting', 'Data Pipelines']
  // },
  {
    'company': 'Immigration, Refugees and Citizenship Canada',
    'name': 'Analyzing Anti-Racism Survey Results',
    'description': "At IRCC, I conducted an analysis of data from an anti-racism survey administered to over nine thousand employees. Leveraging my skills in data analysis, survey design, and dashboarding, I performed quantitative analysis using R. The analysis aimed to identify the extent of racism within IRCC and provide actionable insights. Furthermore, I developed an interactive dashboard using R-Shiny, enabling stakeholders to visualize and explore the survey results in a user-friendly manner. This project played a crucial role in shedding light on the prevalence of racism and supporting IRCC's commitment to fostering an inclusive and equitable workplace",
    'picture': artfDashboard,
    'technologies': ['R', 'Shiny'],
    'skills': ['Data Analysis', 'Survey Design', 'Dashboarding']
  },
  {
    'company': 'Immigration, Refugees and Citizenship Canada',
    'name': 'Recruitment Targets Model for Diversity and Inclusion at Immigration',
    'description': 'As part of the diversity, equity, and inclusion initiatives at IRCC, I contributed to a model to calculate the recruitment targets necessary to achieve baseline representation. Recognizing the stochastic nature of turnover, retirement, and promotions rates, the model was designed in Python. Leveraging my expertise in data analysis and utilizing technologies such as Python and Excel, I created a robust framework that accurately predicted the required recruitment numbers.',
    'picture': artfBaselines,
    'technologies': ['Python', 'Excel'],
    'skills': ['Data Analysis']
  },
  {
    'company': 'Immigration, Refugees and Citizenship Canada',
    'name': 'Permanent Resident Wait Time Analysis',
    'description': 'At Immigration, Refugees and Citizenship Canada, I conducted an in-depth analysis of wait times for receiving Temporary Residence and Permanent Residence status for immigrants. Using my expertise in data analysis and utilizing technologies such as R and RMarkdown, I prepared a comprehensive report that examined the underlying mechanics of wait times and identified key factors affecting the process. The insights gleaned from the report were important in advancing our agenda and persuading management to allocate resources towards resolving this issue.',
    'picture': artfAppTimes,
    'technologies': ['R', 'RMarkdown'],
    'skills': ['Data Analysis']
  },

  {
    'company': 'Ottawa Hospital Research Institute',
    'name': 'Simulation Analysis of Urgent Care Facility',
    'description': "At the Ottawa Hospital Research Institute, I contributed in mapping and simulating an Urgent Care facility with the aim of identifying and mitigating bottlenecks. Leveraging my skills in data analysis, simulation, and process mapping, I contributed to a comprehensive analysis of the facility's operations. This project demonstrates the power of data-driven analysis and simulation in optimizing the operations of urgent care facilities, ultimately enhancing patient care and outcomes",
    'picture': ohriUrgentCare,
    'technologies': ['Python'],
    'skills': ['Data Analysis', 'Simulation', 'Process Mapping']
  },
  {
    'company': 'Ottawa Hospital Research Institute',
    'name': 'Efficient Surgery Block Scheduling Solution',
    'description': 'At OHRI, a more efficient scheduling policy was needed to address the backlog of elective surgeries caused by the Covid-19 epidemic. To tackle this challenge, a linear optimization model accompanied by a demo user interface was developed. Leveraging the capabilities of Python and React, the model successfully generated an optimized schedule that fulfilled all requirements. This project exemplifies the transformative impact of optimization techniques and web development skills in enhancing scheduling processes, particularly in times of heightened demand and constraints',
    'picture': ohriBlockScheduling,
    'technologies': ['Python', 'React'],
    'skills': ['Optimization', 'Web Development']
  },

  {
    'company': 'University of Ottawa',
    'name': 'Stochastic Spine Surgery Scheduling with MDP model',
    'description': 'As a research assistant at the University of Ottawa, I developed an advanced scheduling model using a Markov Decision Process (MDP) approach for optimal spine surgery scheduling in a stochastic environment. Leveraging my expertise in optimization and MDPs, I created a cutting-edge model. By utilizing Python and optimizing the system on a Linux compute cluster, we successfully executed the model. The developed system maximizes healthcare resource utilization, minimizes patient wait times, and reduces overall costs. This project exemplifies the potential of MDP modeling in enhancing scheduling processes.',
    'picture': uOttawaDynamicKnapsack,
    'technologies': ['Python', 'Linux', 'Gurobi'],
    'skills': ['Optimization', 'Markov Decision Processes', 'Distributed Computing']
  },
  {
    'company': 'University of Ottawa',
    'name': "Optimization Model for Automating Course Scheduling",
    'description': 'At uOttawa, I led a group of students developing a robust mathematical optimization model aimed at automating the course scheduling process for the Telfer School of Management. Drawing upon our expertise in mathematical optimization, web development, and database management, we created an intuitive user interface that significantly improved the efficiency of scheduling tasks. The model results in reduction of time and effort required to generate course schedules, while also increasing satisfaction levels among students and professors. This project showcases the power of mathematical optimization in improving course scheduling.',
    'picture': uOttawaWorkloadAllocation,
    'technologies': ['Python', 'Gurobi', 'Django', 'React', 'MySQL'],
    'skills': ['Optimization', 'Web Development', 'Database Management']
  },

  // {
  //   'company': 'Academic',
  //   'name': 'Text Mining',
  //   'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu nisl, luctus at laoreet sit amet, faucibus ut enim. Fusce ante sem, tincidunt vel lorem ac, dictum congue nunc. Donec sed hendrerit dui. Mauris at vestibulum nunc. Nunc volutpat pharetra tellus non mattis. Nunc malesuada varius sollicitudin. Mauris non metus eget leo rhoncus sagittis. Sed dapibus, ipsum a accumsan feugiat, est libero facilisis sem, quis porttitor risus odio eget nunc. Donec malesuada vehicula pellentesque. Integer sed venenatis tellus. Cras ut tristique lacus. Suspendisse efficitur nisl a arcu sollicitudin, sed consectetur massa consequat',
  //   'picture': ''
  // },  // {
  //   'company': 'Academic',
  //   'name': 'Text Mining',
  //   'description': '',
  //   'picture': ''
  // },  // {
  //   'company': 'Academic',
  //   'name': 'Text Mining',
  //   'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu nisl, luctus at laoreet sit amet, faucibus ut enim. Fusce ante sem, tincidunt vel lorem ac, dictum congue nunc. Donec sed hendrerit dui. Mauris at vestibulum nunc. Nunc volutpat pharetra tellus non mattis. Nunc malesuada varius sollicitudin. Mauris non metus eget leo rhoncus sagittis. Sed dapibus, ipsum a accumsan feugiat, est libero facilisis sem, quis porttitor risus odio eget nunc. Donec malesuada vehicula pellentesque. Integer sed venenatis tellus. Cras ut tristique lacus. Suspendisse efficitur nisl a arcu sollicitudin, sed consectetur massa consequat',
  //   'picture': ''
  // },  // {
  //   'company': 'Academic',
  //   'name': 'Text Mining',
  //   'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu nisl, luctus at laoreet sit amet, faucibus ut enim. Fusce ante sem, tincidunt vel lorem ac, dictum congue nunc. Donec sed hendrerit dui. Mauris at vestibulum nunc. Nunc volutpat pharetra tellus non mattis. Nunc malesuada varius sollicitudin. Mauris non metus eget leo rhoncus sagittis. Sed dapibus, ipsum a accumsan feugiat, est libero facilisis sem, quis porttitor risus odio eget nunc. Donec malesuada vehicula pellentesque. Integer sed venenatis tellus. Cras ut tristique lacus. Suspendisse efficitur nisl a arcu sollicitudin, sed consectetur massa consequat',
  //   'picture': ''
  // },  // {
  //   'company': 'Academic',
  //   'name': 'Text Mining',
  //   'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu nisl, luctus at laoreet sit amet, faucibus ut enim. Fusce ante sem, tincidunt vel lorem ac, dictum congue nunc. Donec sed hendrerit dui. Mauris at vestibulum nunc. Nunc volutpat pharetra tellus non mattis. Nunc malesuada varius sollicitudin. Mauris non metus eget leo rhoncus sagittis. Sed dapibus, ipsum a accumsan feugiat, est libero facilisis sem, quis porttitor risus odio eget nunc. Donec malesuada vehicula pellentesque. Integer sed venenatis tellus. Cras ut tristique lacus. Suspendisse efficitur nisl a arcu sollicitudin, sed consectetur massa consequat',
  //   'picture': ''
  // },
]
