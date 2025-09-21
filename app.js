// Ultimate Career Platform - Fixed Navigation and Core Functionality
// Dark Theme Career Platform with AI-Powered Guidance

// Enhanced Career Data Management
class UltimateCareerManager {
    constructor() {
        this.careerData = this.initializeCareerData();
        this.studyResources = this.initializeStudyResources();
        this.jobPlatforms = this.initializeJobPlatforms();
        this.internshipPlatforms = this.initializeInternshipPlatforms();
        this.aiKnowledge = this.initializeAIKnowledge();
        this.init();
    }

    initializeCareerData() {
        return {
            ca: {
                name: "Chartered Accountant",
                description: "Financial expertise in accounting, auditing, taxation, and business advisory",
                avgSalary: "₹6-50 LPA",
                demandLevel: "Very High",
                growthRate: "12% annually",
                topSkills: ["Financial Analysis", "Taxation", "Auditing", "Business Law", "Excel"],
                jobTitles: ["Auditor", "Tax Consultant", "Financial Analyst", "CFO", "CA Partner"]
            },
            engineering: {
                name: "Engineering",
                description: "Technical problem-solving across software, mechanical, electrical, and civil domains",
                avgSalary: "₹4-60 LPA", 
                demandLevel: "High",
                growthRate: "15% annually",
                topSkills: ["Programming", "Design", "Analytics", "Problem Solving", "Project Management"],
                jobTitles: ["Software Engineer", "Mechanical Engineer", "Civil Engineer", "Electrical Engineer"]
            },
            medical: {
                name: "Medical",
                description: "Healthcare services including medicine, nursing, pharmacy, and allied health",
                avgSalary: "₹5-100 LPA",
                demandLevel: "Very High", 
                growthRate: "8% annually",
                topSkills: ["Clinical Knowledge", "Patient Care", "Diagnosis", "Medical Ethics", "Communication"],
                jobTitles: ["Doctor", "Surgeon", "Nurse", "Pharmacist", "Medical Officer"]
            },
            mba: {
                name: "MBA/Business",
                description: "Business management, marketing, finance, and leadership roles",
                avgSalary: "₹8-150 LPA",
                demandLevel: "High",
                growthRate: "10% annually", 
                topSkills: ["Leadership", "Strategy", "Marketing", "Finance", "Operations"],
                jobTitles: ["Manager", "Business Analyst", "Consultant", "VP", "CEO"]
            },
            law: {
                name: "Law/Legal",
                description: "Legal practice in corporate, criminal, civil, and constitutional law",
                avgSalary: "₹3-80 LPA",
                demandLevel: "Moderate",
                growthRate: "6% annually",
                topSkills: ["Legal Research", "Writing", "Argumentation", "Case Analysis", "Client Relations"],
                jobTitles: ["Advocate", "Corporate Lawyer", "Judge", "Legal Advisor", "Prosecutor"]
            },
            design: {
                name: "Design/Creative", 
                description: "Creative design for digital products, graphics, and user experiences",
                avgSalary: "₹3-50 LPA",
                demandLevel: "Growing",
                growthRate: "18% annually",
                topSkills: ["Design Software", "Creativity", "Visual Communication", "User Research", "Prototyping"],
                jobTitles: ["UI/UX Designer", "Graphic Designer", "Art Director", "Design Lead", "Creative Director"]
            },
            dataScience: {
                name: "Data Science & AI",
                description: "Analytics, machine learning, and artificial intelligence solutions",
                avgSalary: "₹8-80 LPA",
                demandLevel: "Very High",
                growthRate: "25% annually",
                topSkills: ["Python", "Machine Learning", "Statistics", "Data Visualization", "SQL"],
                jobTitles: ["Data Scientist", "ML Engineer", "Data Analyst", "AI Researcher", "Analytics Manager"]
            },
            government: {
                name: "Government Jobs",
                description: "Public service in administration, defense, banking, and railways",
                avgSalary: "₹3-30 LPA", 
                demandLevel: "High",
                growthRate: "5% annually",
                topSkills: ["General Knowledge", "Reasoning", "Quantitative Aptitude", "English", "Current Affairs"],
                jobTitles: ["IAS Officer", "Bank PO", "SSC Officer", "Railway Officer", "Defense Personnel"]
            }
        };
    }

    initializeStudyResources() {
        return {
            ca: {
                youtube: [
                    {
                        name: "CA Rajat Arora",
                        url: "https://www.youtube.com/@CArajatarora",
                        subscribers: "500K+",
                        focus: "Foundation to Final - Complete CA Course"
                    },
                    {
                        name: "Sunil Sharma CA", 
                        url: "https://www.youtube.com/@sunilsharmaCA",
                        subscribers: "300K+",
                        focus: "Mathematics & Statistics for CA"
                    },
                    {
                        name: "CA Praveen Sharma",
                        url: "https://www.youtube.com/@CApraveensharma", 
                        subscribers: "250K+",
                        focus: "Business Law & Economics"
                    }
                ],
                courses: [
                    {
                        name: "ICAI Learning Hub",
                        url: "https://learning.icai.org/",
                        price: "Free",
                        type: "Official Institute Platform"
                    },
                    {
                        name: "Unacademy CA Plus",
                        url: "https://unacademy.com/goal/ca-foundation/TGECA",
                        price: "₹999/month",
                        type: "Premium Live Classes"
                    },
                    {
                        name: "BYJU's CA Program",
                        url: "https://byjus.com/ca/",
                        price: "₹15,000/year", 
                        type: "Comprehensive Course Package"
                    }
                ],
                books: [
                    {
                        name: "ICAI Study Material (All Levels)",
                        author: "ICAI Publications",
                        price: "₹500-1500",
                        essential: true
                    },
                    {
                        name: "Munish Bhandari - Advanced Accounts",
                        author: "CA Munish Bhandari",
                        price: "₹800",
                        essential: true
                    }
                ]
            },
            engineering: {
                youtube: [
                    {
                        name: "Physics Wallah Engineering",
                        url: "https://www.youtube.com/@PhysicsWallah",
                        subscribers: "8.2M+",
                        focus: "JEE Mains & Advanced Complete Preparation"
                    },
                    {
                        name: "CodeWithHarry Programming",
                        url: "https://www.youtube.com/@CodeWithHarry",
                        subscribers: "3.8M+", 
                        focus: "Programming Languages & Web Development"
                    },
                    {
                        name: "Apna College",
                        url: "https://www.youtube.com/@ApnaCollegeOfficial",
                        subscribers: "4.5M+",
                        focus: "Data Structures & Algorithms"
                    }
                ],
                courses: [
                    {
                        name: "Coursera Engineering Specializations",
                        url: "https://www.coursera.org/browse/engineering", 
                        price: "$49/month",
                        type: "University Certified Programs"
                    },
                    {
                        name: "edX MIT Engineering",
                        url: "https://www.edx.org/school/mitx",
                        price: "Free audit / $99 verified",
                        type: "MIT Level Courses"
                    },
                    {
                        name: "NPTEL - IIT/IISc Courses",
                        url: "https://nptel.ac.in/",
                        price: "Free",
                        type: "Government Premium Content"
                    }
                ],
                platforms: [
                    {
                        name: "LeetCode",
                        url: "https://leetcode.com/",
                        focus: "Coding Interview Preparation"
                    },
                    {
                        name: "HackerRank",
                        url: "https://www.hackerrank.com/",
                        focus: "Programming Skills Assessment"
                    },
                    {
                        name: "GeeksforGeeks",
                        url: "https://www.geeksforgeeks.org/",
                        focus: "Computer Science Concepts"
                    }
                ]
            },
            medical: {
                youtube: [
                    {
                        name: "Physics Wallah NEET",
                        url: "https://www.youtube.com/@PhysicsWallah",
                        subscribers: "8.2M+",
                        focus: "Complete NEET Preparation - Physics, Chemistry, Biology"
                    },
                    {
                        name: "Vedantu NEET Master",
                        url: "https://www.youtube.com/@VedantuNEET",
                        subscribers: "2.1M+",
                        focus: "Live Classes & Doubt Solving"
                    },
                    {
                        name: "Unacademy NEET UG",
                        url: "https://www.youtube.com/@UnacademyNEETUG",
                        subscribers: "1.8M+", 
                        focus: "Top Faculty & Strategy"
                    }
                ],
                courses: [
                    {
                        name: "BYJU's NEET Complete",
                        url: "https://byjus.com/neet/",
                        price: "₹30,000/year",
                        type: "Comprehensive NEET Preparation"
                    },
                    {
                        name: "Allen Online NEET",
                        url: "https://www.allen.ac.in/",
                        price: "₹25,000/year", 
                        type: "Kota's #1 Institute Online"
                    },
                    {
                        name: "Aakash Digital NEET",
                        url: "https://www.aakash.ac.in/",
                        price: "₹35,000/year",
                        type: "Premium Digital Learning"
                    }
                ]
            },
            mba: {
                youtube: [
                    {
                        name: "Unacademy CAT & MBA",
                        url: "https://www.youtube.com/@UnacademyCAT",
                        subscribers: "800K+",
                        focus: "CAT Preparation & MBA Entrance"
                    },
                    {
                        name: "Career Launcher",
                        url: "https://www.youtube.com/@CareerLauncherIndia",
                        subscribers: "600K+",
                        focus: "MBA Entrance Exams"
                    },
                    {
                        name: "MBA Crystal Ball",
                        url: "https://www.youtube.com/@MBACrystalBall",
                        subscribers: "400K+",
                        focus: "MBA Strategy & GMAT"
                    }
                ],
                courses: [
                    {
                        name: "Coursera MBA Essentials",
                        url: "https://www.coursera.org/browse/business",
                        price: "$49/month",
                        type: "University Business Programs"
                    },
                    {
                        name: "edX Business Administration",
                        url: "https://www.edx.org/learn/business",
                        price: "Free audit / $99 verified",
                        type: "Top University MBA Prep"
                    }
                ]
            },
            law: {
                youtube: [
                    {
                        name: "Legal Edge CLAT",
                        url: "https://www.youtube.com/@LegalEdgeIndia", 
                        subscribers: "300K+",
                        focus: "CLAT Preparation & Law Entrance"
                    },
                    {
                        name: "Law Prep Tutorial",
                        url: "https://www.youtube.com/@LawPrepTutorial",
                        subscribers: "150K+",
                        focus: "Legal Aptitude & Reasoning"
                    },
                    {
                        name: "Judiciary Gold",
                        url: "https://www.youtube.com/@JudiciaryGold",
                        subscribers: "200K+",
                        focus: "Judicial Services Exam"
                    }
                ],
                courses: [
                    {
                        name: "Unacademy Law Plus",
                        url: "https://unacademy.com/goal/clat",
                        price: "₹999/month",
                        type: "Premium CLAT Preparation"
                    },
                    {
                        name: "BYJU's CLAT Program",
                        url: "https://byjus.com/clat/", 
                        price: "₹20,000/year",
                        type: "Comprehensive Law Entrance Prep"
                    }
                ]
            },
            design: {
                youtube: [
                    {
                        name: "Adobe Creative Cloud",
                        url: "https://www.youtube.com/@AdobeCreativeCloud",
                        subscribers: "1.2M+",
                        focus: "Design Tools & Creative Software"
                    },
                    {
                        name: "Figma Official",
                        url: "https://www.youtube.com/@Figma",
                        subscribers: "800K+",
                        focus: "UI/UX Design & Prototyping"
                    },
                    {
                        name: "The Futur",
                        url: "https://www.youtube.com/@thefutur",
                        subscribers: "1.5M+",
                        focus: "Design Business & Creativity"
                    }
                ],
                courses: [
                    {
                        name: "Udemy Design Masterclass",
                        url: "https://www.udemy.com/topic/design/",
                        price: "$50-200",
                        type: "Practical Design Skills"
                    },
                    {
                        name: "Skillshare Creative",
                        url: "https://www.skillshare.com/browse/design", 
                        price: "$99/year",
                        type: "Creative Learning Community"
                    },
                    {
                        name: "Adobe Creative Cloud Training",
                        url: "https://www.adobe.com/creativecloud.html",
                        price: "$52.99/month",
                        type: "Professional Design Suite"
                    }
                ]
            }
        };
    }

    initializeJobPlatforms() {
        return [
            {
                name: "LinkedIn Jobs India",
                url: "https://www.linkedin.com/jobs/",
                description: "Professional network with premium job opportunities",
                type: "Professional Network"
            },
            {
                name: "Naukri.com",
                url: "https://www.naukri.com/",
                description: "India's leading job portal with lakhs of opportunities",
                type: "Job Portal"
            },
            {
                name: "Indeed India",
                url: "https://in.indeed.com/",
                description: "Global job search engine with Indian opportunities", 
                type: "Job Search Engine"
            },
            {
                name: "Glassdoor India",
                url: "https://www.glassdoor.co.in/",
                description: "Jobs with company reviews and salary insights",
                type: "Job + Reviews"
            },
            {
                name: "Monster India",
                url: "https://www.monsterindia.com/",
                description: "Career advancement and job search platform",
                type: "Career Platform"
            },
            {
                name: "AngelList India",
                url: "https://angel.co/",
                description: "Startup jobs and equity opportunities",
                type: "Startup Platform"
            }
        ];
    }

    initializeInternshipPlatforms() {
        return [
            {
                name: "Internshala",
                url: "https://internshala.com/",
                description: "India's #1 internship platform with 100K+ opportunities",
                features: ["Stipend Info", "Work from Home", "Certificate"],
                type: "Primary Platform"
            },
            {
                name: "LetsIntern", 
                url: "https://www.letsintern.com/",
                description: "Quality internships with top companies",
                features: ["Premium Opportunities", "Skill Development", "Mentorship"],
                type: "Premium Platform"
            },
            {
                name: "Forage Virtual Internships",
                url: "https://www.theforage.com/",
                description: "Virtual work experience programs with global companies",
                features: ["Virtual Experience", "Big Companies", "Certificate"],
                type: "Virtual Experience"
            },
            {
                name: "HelloIntern",
                url: "https://hellointern.com/",
                description: "Internships across diverse fields and locations",
                features: ["Diverse Fields", "Pan India", "Easy Apply"],
                type: "General Platform"
            },
            {
                name: "Twenty19 Internships",
                url: "https://www.twenty19.com/",
                description: "Tech-focused internships and hackathons",
                features: ["Tech Focus", "Hackathons", "Skill Tests"],
                type: "Tech Platform"
            },
            {
                name: "Youth4work Internships",
                url: "https://www.youth4work.com/",
                description: "Internships with skill assessment and preparation",
                features: ["Skill Tests", "Preparation", "Assessment"],
                type: "Skill-Based"
            }
        ];
    }

    initializeAIKnowledge() {
        return {
            greetings: `🚀 **Welcome to Ultimate Career AI!**

I'm your comprehensive career guide with access to:

📚 **Live Study Materials** - YouTube channels, courses, books, mock tests
💼 **Real Job Opportunities** - LinkedIn, Naukri, specialized platforms  
🎯 **Live Internships** - Internshala, LetsIntern, virtual experiences
📊 **Career Analytics** - Salary insights, market trends, growth data
🗺️ **Detailed Roadmaps** - Step-by-step career progression paths
⏰ **Study Timetables** - Personalized schedules and timelines
💡 **Motivation & Success Stories** - Inspiration for your journey
🔗 **Direct Resource Links** - Working links to courses, jobs, internships

**I can provide guidance on ANY career topic!**

**Popular queries I can help with:**
• "How to become a software engineer?"
• "CA complete roadmap with resources"  
• "NEET preparation strategy and materials"
• "MBA entrance exam guidance"
• "Law career opportunities in India"
• "Design portfolio building tips"
• "Government job preparation strategy"
• "Data Science learning path"

**What would you like to explore today?**`,

            softwareEngineer: `🚀 **Complete Software Engineering Roadmap (6-12 months)**

**💡 Why Software Engineering?**
- High demand: 50K+ jobs available
- Excellent growth: 25% year-over-year 
- Remote work opportunities
- Innovation and creativity

**📚 Phase 1: Foundation (2-3 months)**
🎥 **YouTube Learning:**
• CodeWithHarry: https://www.youtube.com/@CodeWithHarry (3.8M+ subscribers)
• Apna College: https://www.youtube.com/@ApnaCollegeOfficial (4.5M+ subscribers)
• Love Babbar: https://www.youtube.com/@lovebabbar (Programming guru)
• Thapa Technical: https://www.youtube.com/@ThapaTechnical (Web development)

📱 **Essential Courses:**
• freeCodeCamp: https://www.freecodecamp.org/ (Free, comprehensive)
• Coursera Computer Science: https://www.coursera.org/specializations/computer-science
• The Odin Project: https://www.theodinproject.com/ (Full-stack free)
• Codecademy: https://www.codecademy.com/ (Interactive learning)

**📚 Phase 2: Skill Building (3-4 months)**
💻 **Practice Platforms:**
• LeetCode: https://leetcode.com/ (Interview preparation)
• HackerRank: https://www.hackerrank.com/ (Skill assessment)
• CodeChef: https://www.codechef.com/ (Competitive programming)
• GeeksforGeeks: https://www.geeksforgeeks.org/ (CS concepts)

🔧 **Build Projects:**
• Portfolio website
• CRUD application
• E-commerce clone
• Real-time chat application

**💼 Phase 3: Job Preparation (2-3 months)**
🎯 **Current Job Opportunities:**
• LinkedIn: https://www.linkedin.com/jobs/software-engineer-jobs/
• Naukri.com: https://www.naukri.com/software-engineer-jobs
• AngelList: https://angel.co/job-collections/software-engineer
• Indeed: https://in.indeed.com/software-engineer-jobs

**🎯 Active Internship Opportunities:**
• Microsoft: https://careers.microsoft.com/students/
• Google: https://careers.google.com/students/
• Amazon: https://www.amazon.jobs/en/teams/internships-for-students
• Internshala: https://internshala.com/internships/computer-science

**💰 Salary Expectations:**
• Fresher: ₹3-12 LPA
• 2-5 years: ₹8-25 LPA
• 5+ years: ₹15-50 LPA

**⏰ Daily Study Schedule:**
• 6:00-8:00 AM: Theory and concepts
• 10:00-12:00 PM: Coding practice
• 2:00-4:00 PM: Project work
• 8:00-10:00 PM: Interview preparation

**🎯 Success Milestones:**
✅ Week 4: First program running
✅ Month 2: First project completed
✅ Month 4: Portfolio ready
✅ Month 6: First job application
✅ Month 8: Job interview calls
✅ Month 10: Job offer received

**💡 Motivation:** "Every expert was once a beginner. The best time to plant a tree was 20 years ago. The second best time is now. Start coding today!"

**🚀 Next Steps:** Which programming language interests you most? I can provide specialized guidance!`,

            ca: `💼 **Complete Chartered Accountant Roadmap (3-5 years)**

**💡 Why CA?**
- Prestigious profession with high respect
- Excellent earning potential: ₹6-50 LPA+
- Diverse career opportunities
- Strong job security and growth

**📚 Foundation Level (4-6 months)**
🎥 **YouTube Champions:**
• CA Rajat Arora: https://www.youtube.com/@CArajatarora (500K+ subscribers)
• Sunil Sharma CA: https://www.youtube.com/@sunilsharmaCA (300K+ subscribers)
• CA Praveen Sharma: https://www.youtube.com/@CApraveensharma (250K+ subscribers)
• CA Swapnil Patni: https://www.youtube.com/@CASwapnilPatni (Accounts master)

📱 **Premium Courses:**
• ICAI Learning Hub: https://learning.icai.org/ (Official, Free access)
• Unacademy CA Plus: https://unacademy.com/goal/ca-foundation/ (₹999/month)
• BYJU's CA: https://byjus.com/ca/ (₹15,000/year, Comprehensive)
• Vedantu CA: https://www.vedantu.com/ca (Expert faculty)

**📚 Intermediate Level (8-12 months)**
📖 **Essential Books:**
• ICAI Study Material (Official, ₹500-1000)
• Munish Bhandari Advanced Accounts (₹800)
• Tulsian Business Law (₹600)
• Padhuka Reference Books (₹400-600 each)

🧪 **Mock Test Series:**
• ICAI Test Series: https://learning.icai.org/ (₹500, Official)
• Testbook CA: https://testbook.com/ca (₹299/month)
• CA Gyaan: https://cagyaan.com/ (Free tests available)

**📚 Final Level + Articleship (3 years)**
💼 **Articleship Opportunities:**
• Big 4: Deloitte, PwC, EY, KPMG
• Mid-tier firms: Grant Thornton, BDO, RSM
• Small firms: Local CA practices

**💼 Current Job Market:**
🎯 **Live Job Opportunities:**
• LinkedIn CA Jobs: https://www.linkedin.com/jobs/chartered-accountant-jobs/
• Naukri CA: https://www.naukri.com/chartered-accountant-jobs
• TimesJobs: https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&txtKeywords=chartered+accountant
• Monster CA: https://www.monsterindia.com/jobs/chartered-accountant

**💰 Salary Progression:**
• Article Assistant: ₹8,000-15,000/month
• Newly Qualified CA: ₹6-12 LPA
• 3-5 years experience: ₹12-25 LPA
• 5+ years: ₹25-50 LPA+
• CA Partner/CFO: ₹50 LPA+

**💡 Motivation:** "CA is not just a degree, it's a brand. Every business needs a CA. Your expertise will shape India's economy!"`,

            medical: `🩺 **Complete Medical Career Roadmap (6-10 years)**

**💡 Why Medical Career?**
- Noble profession serving humanity
- High respect and job security  
- Excellent earning potential: ₹5-100 LPA+
- Diverse specialization opportunities
- Global career prospects

**📚 NEET Preparation (1-2 years)**
🎥 **YouTube Power Channels:**
• Physics Wallah NEET: https://www.youtube.com/@PhysicsWallah (8.2M+ subscribers)
• Vedantu NEET: https://www.youtube.com/@VedantuNEET (2.1M+ subscribers)  
• Unacademy NEET: https://www.youtube.com/@UnacademyNEETUG (1.8M+ subscribers)
• BYJU's NEET: https://www.youtube.com/@BYJUS (Animated learning)

📱 **Premium NEET Courses:**
• BYJU's NEET Program: https://byjus.com/neet/ (₹30,000/year)
• Allen Online: https://www.allen.ac.in/ (₹25,000/year)
• Aakash Digital: https://www.aakash.ac.in/ (₹35,000/year)
• Vedantu Master: https://www.vedantu.com/neet (Live interaction)

📚 **Essential NEET Books:**
• NCERT (Class 11 & 12) - Foundation
• HC Verma Physics (₹400) - Must have
• Trueman's Biology (₹600) - Complete coverage
• OP Tandon Chemistry (₹500) - Comprehensive

**🧪 Mock Tests & Practice:**
• Embibe AI: https://www.embibe.com/ (AI-powered preparation)
• NTA Mock Tests: https://nta.ac.in/ (Official practice)
• Aakash Test Series (₹2000)
• Allen Test Series (₹1500)

**💼 Current Medical Job Market:**
🎯 **Live Opportunities:**
• LinkedIn Medical: https://www.linkedin.com/jobs/medical-jobs/
• Naukri Healthcare: https://www.naukri.com/medical-jobs
• Health Jobs India: https://www.healthjobsindia.com/
• MedJobsIndia: https://www.medjobsindia.com/

**💰 Medical Career Salary:**
• MBBS Intern: ₹15,000-25,000/month
• Medical Officer: ₹5-8 LPA
• Specialist Doctor: ₹12-30 LPA
• Super Specialist: ₹25-100 LPA+

**💡 Motivation:** "Medicine is not just a career, it's a calling. Every life you save makes this journey worthwhile!"`,

            default: `🎯 **Ultimate Career AI - Your Complete Guide**

I can provide detailed roadmaps and resources for:

💼 **CA (Chartered Accountant)** - Complete 3-5 year roadmap with YouTube channels, courses, job opportunities

⚙️ **Engineering** - JEE preparation, programming skills, job market analysis  

🩺 **Medical** - NEET preparation, medical college selection, career options

📈 **MBA/Business** - CAT/GMAT preparation, business skills, management careers

⚖️ **Law/Legal** - CLAT preparation, legal specializations, job market

🎨 **Design/Creative** - Portfolio building, design tools, creative opportunities

🤖 **Data Science & AI** - Programming foundation, ML roadmap, high-paying careers

🏛️ **Government Jobs** - UPSC, SSC, Banking exam preparation

**💡 Just ask me specifically about any field!**
Examples: "How to become a software engineer?" or "CA complete roadmap"`
        };
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('software') || message.includes('programming') || message.includes('developer') || message.includes('coding')) {
            return this.aiKnowledge.softwareEngineer;
        }
        
        if (message.includes('ca') || message.includes('chartered accountant') || message.includes('accounting')) {
            return this.aiKnowledge.ca;
        }
        
        if (message.includes('medical') || message.includes('doctor') || message.includes('neet') || message.includes('mbbs')) {
            return this.aiKnowledge.medical;
        }
        
        if (message.includes('hello') || message.includes('hi') || message.includes('start') || message.includes('help')) {
            return this.aiKnowledge.greetings;
        }
        
        return this.aiKnowledge.default;
    }

    init() {
        console.log('🚀 Ultimate Career Manager initialized');
    }
}

// Initialize career manager
window.ultimateCareerManager = new UltimateCareerManager();

// Initialize notification system  
window.notificationSystem = {
    show: function(message, type = 'info', duration = 5000) {
        console.log(`${type.toUpperCase()}: ${message}`);
    },
    success: function(message) { this.show(message, 'success'); },
    error: function(message) { this.show(message, 'error'); },
    info: function(message) { this.show(message, 'info'); }
};

// Global utility functions
window.CareerUtils = {
    formatIndianNumber: (num) => num.toLocaleString('en-IN'),
    getCareerColor: (field) => {
        const colors = {
            ca: '#00d4ff', engineering: '#00ff88', medical: '#8b5cf6',
            law: '#ff6b35', mba: '#fbbf24', design: '#ec4899',
            dataScience: '#06b6d4', government: '#10b981'
        };
        return colors[field] || '#00d4ff';
    },
    generateId: () => Date.now().toString(36) + Math.random().toString(36).substr(2),
    debounce: (func, wait) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
};

console.log('🚀 Ultimate Career Platform JavaScript Loaded Successfully!');
