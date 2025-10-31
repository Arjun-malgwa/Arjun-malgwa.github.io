import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { Helmet, HelmetProvider } from 'react-helmet-async'; // Import Helmet for SEO
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Github, Linkedin, Mail, ExternalLink, X, Sun, Moon, Briefcase, Brain, Code, Database, 
  BarChart2, Filter, Download, Cpu, HardDrive, Share2, Settings, ShoppingCart, Presentation
} from 'lucide-react';

// --- (Gemini API Utility Function) ---

/**
 * Calls the Gemini API with exponential backoff.
 * @param {string} prompt The prompt to send to the API.
 * @param {number} retries Number of retries left.
 * @returns {Promise<string>} The AI-generated text or an error message.
 */
const callGeminiApi = async (prompt, retries = 3) => {
  const apiKey = ""; // Leave empty
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API response error: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.candidates && result.candidates[0].content?.parts?.[0]?.text) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid API response structure.');
    }
  } catch (error) {
    console.error("Gemini API call failed:", error);
    if (retries > 0) {
      const delay = (Math.pow(2, 3 - retries) + Math.random()) * 1000; // Exponential backoff
      // console.log(`Retrying in ${Math.round(delay/1000)}s...`); // Silence retries
      await new Promise(resolve => setTimeout(resolve, delay));
      return callGeminiApi(prompt, retries - 1);
    }
    return "Sorry, I couldn't generate an explanation right now. Please try again later.";
  }
};


// --- (Data: Structured Content) ---
// We keep all data separate for easy updating.

const PROJECTS = [
  {
    id: 1,
    title: 'Flood Risk Analytics for Montpelier, VT',
    category: 'Analysis',
    image: 'https://placehold.co/600x400/1e40af/ffffff?text=Flood+Analytics',
    tags: ['Python', 'K-means clustering', 'Random Forest', 'Precisely APIs', 'FEMA Data'],
    description: 'A capstone project identifying flood risks, detecting underinsured properties, and optimizing premiums.',
    problem: 'To identify high-risk flood zones and flag underinsured properties in Montpelier, VT, to balance insurer profitability and policyholder satisfaction.',
    process: 'Built a K-means clustering model using geospatial data (elevation, proximity to water bodies) to classify high-risk flood zones. Designed an Insurance-to-Value (ITV) model to find coverage gaps. Developed a Random Forest Regressor for premium prediction.',
    findings: 'Identified critical areas near the Winooski River, uncovered 25%+ coverage gaps in high-value properties, and developed a model that improved policyholder satisfaction by 15%.',
  },
  {
    id: 2,
    title: 'Broadband Plan Recommendation Engine',
    category: 'Machine Learning',
    image: 'https://placehold.co/600x400/be185d/ffffff?text=Broadband+AI',
    tags: ['Python', 'Random Forest', 'Streamlit', 'Geospatial Analysis'],
    description: 'A business consulting project to predict optimal internet speeds and recommend providers.',
    problem: 'To help users find optimal internet plans based on their needs (age, income, device usage) and location, and to improve accessibility for underserved demographics.',
    process: 'Engineered a synthetic dataset (US Census/FCC) and trained a Random Forest model. Integrated FIPS codes for geospatial analysis of county-level providers. Built a Streamlit web app for the UI.',
    findings: 'Achieved 95% accuracy in predicting optimal speeds and enabled personalized recommendations for the top 3 service providers in a user\'s region.',
  },
  {
    id: 3,
    title: 'Next-Word Prediction Model Using LSTM',
    category: 'Machine Learning',
    image: 'https://placehold.co/600x400/b45309/ffffff?text=LSTM+Forecast',
    tags: ['Python', 'TensorFlow', 'Keras', 'NLTK', 'LSTM', 'CNN'],
    description: 'Built an LSTM model to predict next-word sequences for applications like spam detection and predictive text.',
    problem: 'To enhance applications like spam detection and predictive text input by accurately predicting next-word sequences.',
    process: 'Used the SMS Spam Collection Dataset (UCI). Preprocessed text (stopword removal, tokenization, padding). Compared CNN/RNN architectures and selected LSTM for its strength in handling long-term dependencies.',
    findings: 'Achieved optimal performance with LSTM, demonstrating business potential to improve user engagement and reduce misclassification in automated text systems.',
  },
  {
    id: 4,
    title: 'Predicting Customer Churn',
    category: 'Machine Learning',
    image: 'https://placehold.co/600x400/059669/ffffff?text=Churn+Prediction',
    tags: ['R', 'XGBoost', 'Feature Engineering', 'Hyperparameter Tuning', 'RStudio'],
    description: 'Developed a predictive model to identify customers at high risk of churn for an online store.',
    problem: 'To address a 90% churn rate by developing a predictive model to identify customers at risk of not returning, enhancing customer retention strategies.',
    process: 'Analyzed key variables affecting churn through correlation and XGBoost importance plots. Achieved model robustness with stratified cross-validation and hyperparameter tuning.',
    findings: 'Secured the #1 Rank in the STAT 642 Final Project Kaggle Competition, outperforming 24 other groups with an innovative approach to churn prediction.',
  },
  {
    id: 5,
    title: 'Co-Op Evaluation Data Project',
    category: 'Dashboard',
    image: 'https://placehold.co/600x400/6d28d9/ffffff?text=Co-Op+Dashboard',
    tags: ['Python', 'Tableau', 'Data Analysis'],
    description: 'Analyzed Drexel University\'s Co-Op program using Python for processing and Tableau for visualization.',
    problem: 'To conduct an insightful analysis of Drexel University\'s Co-Op program by exploring student and employer perspectives from post-co-op surveys.',
    process: 'Leveraged Python for robust data processing and analysis of survey data to uncover key trends and perspectives.',
    findings: 'Created insightful visualizations in Tableau that clearly presented the findings from both student and employer viewpoints.',
  },
  {
    id: 6,
    title: 'Compass Maritime Bid Estimation (HBR Case Study)',
    category: 'Analysis',
    image: 'https://placehold.co/600x400/0f766e/ffffff?text=Maritime+Bids',
    tags: ['R', 'Python', 'Excel', 'Linear Regression', 'Statistics', 'ANOVA'],
    description: 'Estimated ship bid prices using multiple Linear Regression models as part of a Harvard Business Review case study.',
    problem: 'To accurately estimate ship bid prices using statistical modeling based on a Harvard Business Review case study.',
    process: 'Built and compared multiple Linear Regression models using R, Python, and Excel to determine the most accurate estimation method.',
    findings: 'Used R-squared value, analysis of variance (ANOVA), and factor analysis to test and validate the efficiency of the regression models.',
  },
];

// This is the "Top Skills" matrix for the About page
const SKILLS = {
  'Languages & Databases': [
    { name: 'Python (Pandas, NumPy)', level: 95 },
    { name: 'SQL (PostgreSQL, MySQL)', level: 90 },
    { name: 'R', level: 75 },
  ],
  'Data Visualization': [
    { name: 'Tableau', level: 95 },
    { name: 'Power BI', level: 90 },
    { name: 'Streamlit', level: 80 },
  ],
  'AI & Machine Learning': [
    { name: 'NLP / LLM Evaluation (RAG)', level: 90 },
    { name: 'Predictive Modeling & Forecasting', level: 85 },
    { name: 'TensorFlow', level: 80 },
    { name: 'PyTorch', level: 70 },
  ],
  'Tools & Platforms': [
    { name: 'Git & GitHub', level: 90 },
    { name: 'Docker', level: 70 },
    { name: 'ETL Automation', level: 85 },
  ],
};

// This is the new, comprehensive list for the "Skills" page
const SKILLS_DATA = {
  "AI & Machine Learning": [
    { name: "Predictive Modeling", icon: Cpu },
    { name: "Retrieval-Augmented Generation (RAG)", icon: Cpu },
    { name: "k-means clustering", icon: Cpu },
    { name: "Random Forest", icon: Cpu },
    { name: "TensorFlow", icon: Cpu },
    { name: "Keras", icon: Cpu },
    { name: "NLTK", icon: Cpu },
    { name: "Long Short-term Memory (LSTM)", icon: Cpu },
    { name: "Convolutional Neural Networks (CNN)", icon: Cpu },
    { name: "Vertex AI", icon: Cpu },
    { name: "Hyperparameter Tuning", icon: Cpu },
    { name: "Feature Engineering", icon: Cpu },
    { name: "Modeling and Simulation", icon: Cpu },
  ],
  "Data & Analytics": [
    { name: "Python (Programming Language)", icon: Code },
    { name: "R (Programming Language)", icon: Code },
    { name: "RStudio", icon: Code },
    { name: "SQL", icon: Database },
    { name: "Tableau", icon: BarChart2 },
    { name: "Microsoft Power BI", icon: BarChart2 },
    { name: "Data Visualization", icon: BarChart2 },
    { name: "Business Intelligence (BI)", icon: BarChart2 },
    { name: "Statistics", icon: BarChart2 },
    { name: "Data Analysis", icon: BarChart2 },
    { name: "Analytical Skills", icon: BarChart2 },
    { name: "Data Management", icon: Database },
    { name: "Analytics", icon: BarChart2 },
    { name: "Precisely APIs", icon: Share2 },
    { name: "FEMA Data", icon: HardDrive },
  ],
  "Business & Strategy": [
    { name: "IT Business Analysis", icon: Briefcase },
    { name: "Business Analytics", icon: Briefcase },
    { name: "Business Analysis", icon: Briefcase },
    { name: "Critical Thinking", icon: Brain },
    { name: "Business Process", icon: Settings },
    { name: "Key Performance Indicators (KPIs)", icon: BarChart2 },
    { name: "Market Research", icon: ShoppingCart },
    { name: "Operations Management", icon: Settings },
    { name: "Program Management", icon: Settings },
    { name: "Marketing Analytics", icon: ShoppingCart },
    { name: "Supply Chain Analytics", icon: Share2 },
    { name: "Commerce", icon: ShoppingCart },
    { name: "Problem Solving", icon: Brain },
    { name: "Analytical and Strategic Thinking", icon: Brain },
    { name: "Sales & Marketing", icon: ShoppingCart },
    { name: "Project Management", icon: Settings },
    { name: "Research", icon: Brain },
    { name: "Finance", icon: Briefcase },
  ],
  "Tools & Software": [
    { name: "Digital Marketing", icon: ShoppingCart },
    { name: "Google Analytics", icon: ShoppingCart },
    { name: "Microsoft Word", icon: Presentation },
    { name: "Microsoft Excel", icon: Presentation },
    { name: "Accounting", icon: Briefcase },
    { name: "Microsoft PowerPoint", icon: Presentation },
    { name: "Search Engine Optimization (SEO)", icon: ShoppingCart },
    { name: "Microsoft Office", icon: Presentation },
    { name: "Presentations", icon: Presentation },
    { name: "Online Advertising", icon: ShoppingCart },
  ]
};


const EXPERIENCE = [
  {
    role: 'Data Analyst Intern',
    company: 'Letusto',
    date: 'Sep 2025 - Present',
    description: '• Conducted market analysis to identify trends in the Amazon marketplace, aiding product expansion. \n• Developed interactive dashboards for tracking inventory, shipments, and seller performance. \n• Visualized e-commerce metrics to enhance decision-making for internal and partner stakeholders.',
  },
  {
    role: 'Data Analytics Intern',
    company: 'Stacker Group',
    date: 'Jul 2024 - Dec 2024',
    description: '• Designed and optimized retrieval-augmented generation (RAG) models for renewable energy regulation queries. \n• Evaluated various LLMs (GPT, Gemini, Llama3) for accuracy, bias, and hallucination rates. \n• Developed a prompt optimization framework that enhanced comparative analysis and model citation reliability.',
  },
  {
    role: 'Business Analyst',
    company: 'Majitel Solutions Pvt Ltd',
    date: 'Jan 2021 - Jan 2023',
    description: '• Analyzed sales and operational data for over 15 Amazon seller accounts, enhancing sales performance by 20%. \n• Automated inventory tracking and reporting using Python, reducing manual effort by 40%. \n• Developed Power BI and Tableau dashboards to visualize sales trends, providing actionable insights for clients.',
  },
  {
    role: 'Business Analysis Intern',
    company: 'Sonil Selfcare Pvt. Ltd.',
    date: 'Feb 2023 - Jun 2023',
    description: '• Synthesized raw industry and competitor data into an interactive Tableau dashboard to visualize market gaps. \n• Reported insights that influenced pricing and marketing strategies for a new product. \n• Contributed to the product\'s success, achieving ~1000 items sold monthly with a 22% profit margin.',
  },
];

const CERTIFICATIONS = [
  { name: 'Feature Engineering in R', issuer: 'DataCamp', url: 'https://www.datacamp.com/statement-of-accomplishment/course/49ecd0cd3dc897f8489e421e1833b2105ff33306' },
  { name: 'Intermediate Data Visualization with ggplot2', issuer: 'DataCamp', url: 'https://www.datacamp.com/statement-of-accomplishment/course/662bd3344797df0421577a777492dfca4b34c42b' },
  { name: 'Python for Business Data Analytics & Intelligence', issuer: 'Zero To Mastery Academy', url: 'https://zerotomastery.io/courses/learn-business-analytics/' },
  { name: 'Financial markets', issuer: 'Yale University', url: 'https://www.coursera.org/account/accomplishments/certificate/FXVMZD5DNTNJ' },
  { name: 'Attract and Engage Customers with Digital Marketing', issuer: 'Coursera', url: 'https://www.coursera.org/account/accomplishments/certificate/V8A92QQCJNPZ' },
  { name: 'Foundations of Digital Marketing and E-commerce', issuer: 'Google Career Certificates', url: '#' }, // No link provided for this one
  { name: 'Advanced Excel workshop', issuer: 'JS academy', url: '#' }, // No link provided for this one
];

// DASHBOARD_EXAMPLES constant removed

// --- (Reusable Components) ---

/**
 * RevealOnScroll: Wraps content to animate it on scroll.
 */
const RevealOnScroll = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};


/**
 * Navbar: Main navigation component.
 * *** UPDATED: Removed 'Dashboards' page ***
 */
const Navbar = ({ currentPage, setCurrentPage, theme, toggleTheme }) => {
  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Contact'];
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">AM</span>
            <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Arjun Malgwa</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase())}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.toLowerCase()
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          {/* Mobile menu button could be added here */}
        </div>
      </div>
    </nav>
  );
};

/**
 * Hero: The main landing section (Home page).
 * Now initializes Typed.js and particles.js
 */
const Hero = ({ setCurrentPage, scriptsLoaded }) => {
  
  useEffect(() => {
    let typedInstance;
    
    if (scriptsLoaded && window.Typed && window.particlesJS) {
      // 1. Initialize Typed.js
      typedInstance = new window.Typed('#typed-output', {
        strings: ['Building Dashboards', 'Automating ETL', 'Evaluating RAG/LLM', 'Forecasting Solutions'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2000,
      });

      // 2. Initialize particles.js
      window.particlesJS('particles-js', {
        "particles": {
          "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
          "color": { "value": "#8b5cf6" }, // Indigo color
          "shape": { "type": "circle" },
          "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
          "size": { "value": 3, "random": true, "anim": { "enable": false } },
          "line_linked": { "enable": true, "distance": 150, "color": "#a78bfa", "opacity": 0.4, "width": 1 },
          "move": { "enable": true, "speed": 3, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
          "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
      });
    }
    
    // Cleanup function to destroy Typed.js instance when component unmounts
    return () => {
      if (typedInstance) {
        typedInstance.destroy();
      }
    };
  }, [scriptsLoaded]);
  
  return (
    <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-center px-4 py-20 relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 z-[-2] bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900 animate-gradient-xy" />
      <div id="particles-js" className="absolute inset-0 z-[-1]" /> {/* Target for particles.js */}
      <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/assets/noise.png)' }} />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full filter blur-3xl opacity-30 dark:opacity-20 animate-blob z-[-1]" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000 z-[-1]" />
      <div className="absolute top-1/3 left-3/4 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000 z-[-1]" />
      
      <RevealOnScroll>
        <div className="max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Data & AI Analyst
          </h1>
          <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-indigo-600 dark:text-indigo-400 h-12 md:h-16">
            <span id="typed-output" className="font-mono"></span> {/* Target for Typed.js */}
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            I transform complex data into actionable insights. Specialized in predictive modeling, dashboard development, and telling stories with data.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setCurrentPage('projects')}
              className="px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
            >
              View Projects
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-3 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-lg font-medium rounded-lg shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-transform transform hover:scale-105"
            >
              Get in Touch
            </button>
          </div>

          {/* Headshot */}
          <div className="mt-12 w-36 h-36 mx-auto rounded-full overflow-hidden shadow-xl ring-4 ring-indigo-500/50 dark:ring-indigo-400/50">
            <img 
              src="https://media.licdn.com/dms/image/v2/D4E03AQEGTnvp62iywQ/profile-displayphoto-crop_800_800/B4EZnkuBaeHoAI-/0/1760478894342?e=1763596800&v=beta&t=V4HklmSyjV1zqVlsBwfJ6Gv3_QOA-45jQXt6ssyVw-M" 
              alt="Arjun Malgwa headshot" 
              className="w-full h-full object-cover" 
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/144x144/cccccc/ffffff?text=AM'; }}
            />
          </div>

          {/* Socials */}
          <div className="mt-8 flex justify-center space-x-6">
            <a href="https://www.linkedin.com/in/arjunmalgwa" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Linkedin size={32} />
            </a>
            <a href="https://github.com/Arjun-malgwa" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Github size={32} />
            </a>
            <a href="mailto:arjun.malgwa@gmail.com" title="Email" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Mail size={32} />
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

/**
 * Section: A wrapper component for consistent page styling.
 */
const Section = ({ id, title, children }) => (
  <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
    <RevealOnScroll>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
        {title}
      </h2>
    </RevealOnScroll>
    {children}
  </section>
);

/**
 * About: The 'About Me' section.
 */
const About = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(SKILLS)[0]);

  return (
    <Section id="about" title="About Me">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <RevealOnScroll>
          <div className="space-y-8">
            <div className="prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300">
              <p>
                Hello! I’m Arjun, a Data and AI Analyst passionate about transforming complex data into actionable insights. My work focuses on building KPI dashboards, automating reporting workflows, and evaluating large language models (LLMs) to help teams make faster, more confident decisions.
              </p>
              <p>
                I recently completed my <strong>MS in Business Analytics at Drexel University (GPA 3.9)</strong>, where I specialized in machine learning, predictive modeling, and data visualization.
              </p>
              <p>
                I enjoy connecting technical methods to real business outcomes—whether that's through forecasting models, time series analysis, or ensuring AI model reliability via Retrieval-Augmented Generation (RAG) and LLM evaluation.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('certifications')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
            >
              <Brain size={20} /> View My Certifications
            </button>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={150}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Skills Matrix</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(SKILLS).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {SKILLS[activeTab].map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </Section>
  );
};

/**
 * *** NEW: SkillsPage component ***
 * A dedicated page to show all skills.
 */
const SkillsPage = () => (
  <Section id="skills" title="Comprehensive Skills">
    <div className="max-w-5xl mx-auto space-y-12">
      {Object.entries(SKILLS_DATA).map(([category, skills], index) => (
        <RevealOnScroll key={category} delay={index * 150}>
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">{category}</h3>
            <div className="flex flex-wrap gap-4">
              {skills.map(skill => {
                const Icon = skill.icon;
                return (
                  <div key={skill.name} className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <Icon size={20} className="text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  </Section>
);


/**
 * Certifications: New component for the certifications section.
 */
const Certifications = () => (
  <Section id="certifications" title="My Certifications">
    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {CERTIFICATIONS.map((cert, index) => (
        <RevealOnScroll key={cert.name} delay={index * 100}>
          <a 
            href={cert.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`flex items-center p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all ${cert.url !== '#' ? 'hover:shadow-xl hover:scale-105' : 'cursor-default'}`}
          >
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
              <Brain size={24} />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-900 dark:text-white">{cert.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
            </div>
            {cert.url !== '#' && (
              <div className="ml-auto flex-shrink-0 text-gray-400 dark:text-gray-500">
                <ExternalLink size={20} />
              </div>
            )}
          </a>
        </RevealOnScroll>
      ))}
    </div>
  </Section>
);


/**
 * ProjectGallery: The 'Projects' section with filtering.
 */
const ProjectGallery = ({ onProjectSelect }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Analysis', 'Machine Learning', 'Dashboard'];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <Section id="projects" title="Featured Projects">
      <RevealOnScroll>
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          <Filter size={24} className="text-gray-600 dark:text-gray-400" />
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                activeFilter === filter
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </RevealOnScroll>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <RevealOnScroll key={project.id} delay={index * 100}>
            <div
              onClick={() => onProjectSelect(project)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
              />
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{project.category}</span>
                <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
};

/**
 * ProjectModal: The popup modal for project details.
 * *** UPDATED with Gemini API Feature ***
 */
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const [aiExplanation, setAiExplanation] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Mock data for a chart related to the project
  const projectChartData = [
    { name: 'Phase 1', 'Work (hrs)': 20 },
    { name: 'Phase 2', 'Work (hrs)': 45 },
    { name: 'Phase 3', 'Work (hrs)': 30 },
    { name: 'Phase 4', 'Work (hrs)': 50 },
  ];

  const handleAiExplanation = async () => {
    setIsLoadingAi(true);
    setAiExplanation('');

    const prompt = `
      You are a helpful and friendly data science tutor. 
      A user wants a simple explanation of the following project.
      Explain it in 2-3 concise, easy-to-understand sentences. Avoid technical jargon.

      Project Title: ${project.title}
      Problem: ${project.problem}
      Process: ${project.process}
      Findings: ${project.findings}
    `;

    const explanation = await callGeminiApi(prompt);
    setAiExplanation(explanation);
    setIsLoadingAi(false);
  };

  const handleClose = () => {
    setAiExplanation('');
    setIsLoadingAi(false);
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
      >
        <div className="sticky top-0 z-10 flex justify-between items-center p-5 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
          <button onClick={handleClose} className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 md:p-8 space-y-6">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-64 object-cover rounded-lg"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
          />
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-medium rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <h3 className="text-gray-900 dark:text-white">Problem Statement</h3>
            <p>{project.problem}</p>
            
            <h3 className="text-gray-900 dark:text-white">Process & Methodology</h3>
            <p>{project.process}</p>
            
            <h3 className="text-gray-900 dark:text-white">Key Findings & Impact</h3>
            <p>{project.findings}</p>
          </div>

          {/* --- NEW GEMINI FEATURE --- */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Need a simpler summary?</h4>
            <button
              onClick={handleAiExplanation}
              disabled={isLoadingAi}
              className="inline-flex items-center gap-2 px-5 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Brain size={18} />
              {isLoadingAi ? '✨ Thinking...' : '✨ Ask AI for a simple explanation'}
            </button>
            {aiExplanation && (
              <div className="mt-4 p-4 bg-purple-50 dark:bg-gray-800 border border-purple-200 dark:border-gray-700 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 italic whitespace-pre-line">{aiExplanation}</p>
              </div>
            )}
          </div>
          {/* --- END GEMINI FEATURE --- */}
          
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Visualization (Example)</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <XAxis dataKey="name" stroke={document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                      borderColor: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Work (hrs)" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="flex gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-900 dark:hover:bg-gray-300 transition-colors">
              <Github size={18} />
              View on GitHub
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <ExternalLink size={18} />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Experience: The professional timeline section.
 */
const Experience = () => (
  <Section id="experience" title="Professional Experience">
    <div className="relative max-w-3xl mx-auto">
      {/* The timeline bar */}
      <div className="absolute left-5 top-2 w-1.5 h-full bg-indigo-200 dark:bg-indigo-900 rounded-full" />
      
      <div className="space-y-12">
        {EXPERIENCE.map((job, index) => (
          <RevealOnScroll key={index} delay={index * 150}>
            <div className="relative pl-12">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full text-white">
                <Briefcase size={20} />
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{job.date}</span>
                <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">{job.role}</h3>
                <p className="mt-1 text-md font-semibold text-gray-700 dark:text-gray-300">{job.company}</p>
                <p className="mt-3 text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </Section>
);

// Dashboards component removed

/**
 * Contact: The contact section.
 * *** FIXED JSX ERROR ***
 */
const Contact = () => (
  <Section id="contact" title="Get In Touch">
    <RevealOnScroll>
      <div className="max-w-xl mx-auto text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          I'm always open to discussing new projects, freelance opportunities, or just chatting about data. Feel free to reach out!
        </p>
        <div className="flex justify-center items-center flex-wrap gap-6">
          <a href="mailto:arjun.malgwa@gmail.com" className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">
            <Mail size={22} />
            Email Me
          </a>
          <a href="https://linkedin.com/in/arjunmalgwa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <Linkedin size={32} />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a href="https://github.com/Arjun-malgwa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <Github size={32} />
            <span className="font-medium">GitHub</span>
          </a>
        </div>
        
        <div className="mt-16 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Download My Resume</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-5">
            Want a hard copy? You can download my full resume here.
          </p>
          <a 
            href="https://drive.google.com/file/d/1vuQqStkGZKV2AaJIJ9X8PYexzqNtg7kZ/view?usp=sharing"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-900 dark:hover:bg-gray-300 transition-colors"
          >
            <Download size={18} />
            View Resume (G-Drive)
          </a>
        </div>
      </div>
    </RevealOnScroll>
  </Section>
);

/**
 * Footer: The main app footer.
 * *** FIXED JSX ERROR ***
 */
const Footer = () => (
  <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Arjun Malgwa. All rights reserved.
      </p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="https://github.com/Arjun-malgwa" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <Github size={24} />
        </a>
        <a href="https://www.linkedin.com/in/arjunmalgwa" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <Linkedin size={24} />
        </a>
        <a href="mailto:arjun.malgwa@gmail.com" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <Mail size={24} />
        </a>
      </div>
    </div>
  </footer>
);

// --- (Main App Component) ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  
  // --- Theme Toggle ---
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme); // Save theme preference
  }, [theme]);
  
  // --- Script Loading (including Lenis for smooth scroll) ---
  useEffect(() => {
    let scriptLoadCount = 0;
    const totalScripts = 3; // Typed.js, particles.js, Lenis.js

    const checkAllScriptsLoaded = () => {
      scriptLoadCount++;
      if (scriptLoadCount === totalScripts) {
        setScriptsLoaded(true);
      }
    };
    
    const loadScript = (src, onDone) => {
      // Prevent duplicate script loading
      if (document.querySelector(`script[src="${src}"]`)) {
        onDone();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = onDone;
      script.onerror = () => console.error(`Failed to load script: ${src}`);
      document.body.appendChild(script);
      return script;
    };

    // Load Typed.js
    loadScript('https://cdn.jsdelivr.net/npm/typed.js@2.0.12', checkAllScriptsLoaded);
    
    // Load particles.js
    loadScript('https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js', checkAllScriptsLoaded);

    // Load and initialize Lenis (smooth scroll)
    loadScript('https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js', () => {
      checkAllScriptsLoaded();
      if (window.Lenis) {
        const lenis = new window.Lenis({
          duration: 1.1,
          smoothWheel: true,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    });
    
  }, []); // Run only once on app mount

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // --- Page Rendering Logic ---
  // *** UPDATED: Removed 'dashboards' page ***
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero setCurrentPage={setCurrentPage} scriptsLoaded={scriptsLoaded} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'skills':
        return <SkillsPage />;
      case 'projects':
        return <ProjectGallery onProjectSelect={setSelectedProject} />;
      case 'experience':
        return <Experience />;
      case 'certifications': 
        return <Certifications />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero setCurrentPage={setCurrentPage} scriptsLoaded={scriptsLoaded} />;
    }
  };

  return (
    <HelmetProvider> 
      <Helmet>
        <title>Arjun Malgwa | Data Analyst</title>
        <meta name="description" content="Arjun Malgwa | Data Analyst. Building dashboards, ETL automation, RAG/LLM evaluation, and forecasting solutions through data-driven analytics." />
        <meta name="theme-color" content="#0066cc" />

        {/* Open Graph */}
        <meta property="og:title" content="Arjun Malgwa | Data Analyst" />
        <meta property="og:description" content="Data Analyst Portfolio - Building insights through data analytics, machine learning, and visualization" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arjun-malgwa.github.io" />
        <meta property="og:image" content="https://arjun-malgwa.github.io/assets/img/headshot.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arjun Malgwa | Data Analyst" />
        <meta name="twitter:description" content="Data Analyst Portfolio - Dashboards, ML, Analytics & Insights" />
        <meta name="twitter:image" content="https://arjun-malgwa.github.io/assets/img/headshot.webp" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org/",
              "@type": "Person",
              "name": "Arjun Malgwa",
              "description": "Data Analyst",
              "url": "https://arjun-malgwa.github.io",
              "email": "arjun.malgwa@gmail.com",
              "jobTitle": "Data Analytics Intern",
              "worksFor": {
                "@type": "Organization",
                "name": "Stacker Group"
              },
              "sameAs": [
                "https://www.linkedin.com/in/arjunmalgwa",
                "https://github.com/Arjun-malgwa"
              ]
            }
          `}
        </script>
        <link rel="canonical" href="https://arjun-malgwa.github.io" />
      </Helmet>

      <div className={`font-inter antialiased text-gray-800 dark:text-gray-200 min-h-screen relative transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
        
        <div className="relative z-10">
          <a href="#main-content" className="skip-link sr-only focus:not-sr-only absolute top-0 left-0 bg-indigo-600 text-white p-2 z-[101]">Skip to main content</a>
          <Navbar 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          
          <main id="main-content" className="transition-opacity duration-500">
            {renderPage()}
          </main>
          
          <Footer />
        </div>
        
        {selectedProject && (
          <ProjectModal 
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
        
        {/* CSS for animations (kept from previous version for blobs/gradient) */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          
          html.lenis {
            height: auto;
          }
          .lenis.lenis-smooth {
            scroll-behavior: auto;
          }
          .lenis.lenis-smooth [data-lenis-prevent] {
            overscroll-behavior: contain;
          }
          .lenis.lenis-stopped {
            overflow: hidden;
          }
          
          .font-inter { font-family: 'Inter', sans-serif; }
          
          /* --- Reveal on Scroll Animation --- */
          .reveal {
            opacity: 0;
            transform: translateY(16px);
            transition: opacity 0.6s ease, transform 0.6s ease;
            will-change: opacity, transform;
          }
          .reveal.visible {
            opacity: 1;
            transform: none;
          }
          /* --- End Reveal Animation --- */
          
          @keyframes gradient-xy {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-xy {
            background-size: 400% 400%;
            animation: gradient-xy 15s ease infinite;
          }
          
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 20s infinite ease-in-out;
          }
          .animation-delay-2000 { animation-delay: -2s; }
          .animation-delay-4000 { animation-delay: -4s; }

          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
          
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slide-up 0.4s ease-out;
          }
          
          /* Accessibility: Skip Link */
          .skip-link {
            position: absolute;
            top: -9999px;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
            z-index: 9999;
          }

          .skip-link:focus {
            left: 0;
            top: 0;
            width: auto;
            height: auto;
            padding: 8px 12px;
            background-color: #4f46e5;
            color: #ffffff;
            font-weight: 500;
            border-radius: 4px;
            text-decoration: none;
          }

          /* particles.js canvas default styling */
          #particles-js {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
          }

          /* Stop animations on reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .animate-gradient-xy,
            .animate-blob,
            .animate-fade-in,
            .animate-slide-up,
            .transition-all,
            .transition-colors,
            .transition-opacity,
            .transition-transform {
              animation: none !important;
              transition: none !important;
            }
            
            /* Disable reveal animation on reduced motion */
            .reveal {
              opacity: 1 !important;
              transform: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </div>
    </HelmetProvider>
  );
}


