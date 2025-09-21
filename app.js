// CareerAI Pro - Enhanced JavaScript Functionality
// Ultimate Career Guidance Platform with AI-Powered Features

// Global Application State and Data Management
class CareerAIProManager {
    constructor() {
        this.version = '2.0.0';
        this.apiEndpoints = {
            jobs: 'https://api.careeraipro.com/jobs',
            internships: 'https://api.careeraipro.com/internships',
            courses: 'https://api.careeraipro.com/courses',
            analytics: 'https://api.careeraipro.com/analytics'
        };
        this.userSession = this.initializeSession();
        this.aiEngine = new EnhancedAIEngine();
        this.analyticsTracker = new AnalyticsTracker();
        this.progressManager = new ProgressManager();
        this.init();
    }

    initializeSession() {
        const session = localStorage.getItem('careerai_session');
        return session ? JSON.parse(session) : {
            userId: this.generateUserId(),
            startTime: Date.now(),
            interactions: 0,
            completedAssessments: [],
            bookmarkedResources: [],
            careerGoals: [],
            skillProgress: {}
        };
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    saveSession() {
        localStorage.setItem('careerai_session', JSON.stringify(this.userSession));
    }

    trackInteraction(type, data = {}) {
        this.userSession.interactions++;
        this.analyticsTracker.track(type, data);
        this.saveSession();
    }

    init() {
        this.setupGlobalEventListeners();
        this.initializeAnimations();
        this.loadUserPreferences();
        console.log('🚀 CareerAI Pro Manager Initialized Successfully!');
    }

    setupGlobalEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        this.focusSearchOrChat();
                        break;
                    case 'h':
                        e.preventDefault();
                        this.goToHome();
                        break;
                    case '/':
                        e.preventDefault();
                        this.showKeyboardShortcuts();
                        break;
                }
            }
        });

        // Intersection Observer for animations
        this.setupIntersectionObserver();

        // Online/Offline status
        window.addEventListener('online', () => this.handleOnlineStatus(true));
        window.addEventListener('offline', () => this.handleOnlineStatus(false));
    }

    focusSearchOrChat() {
        const chatInput = document.querySelector('.chat-input');
        const searchInput = document.querySelector('input[type="search"]');
        
        if (chatInput && chatInput.offsetParent !== null) {
            chatInput.focus();
        } else if (searchInput) {
            searchInput.focus();
        }
    }

    goToHome() {
        const homeButton = document.querySelector('.logo');
        if (homeButton) homeButton.click();
    }

    showKeyboardShortcuts() {
        this.createNotification('Keyboard Shortcuts', 'Ctrl+K: Focus Search/Chat | Ctrl+H: Home | Ctrl+/: Show shortcuts', 'info', 5000);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.trackInteraction('element_viewed', { 
                        element: entry.target.className,
                        timestamp: Date.now()
                    });
                }
            });
        }, observerOptions);

        // Observe elements when they're added to DOM
        setTimeout(() => {
            document.querySelectorAll('.cyber-card, .cyber-panel, .field-card, .resource-card').forEach(el => {
                observer.observe(el);
            });
        }, 1000);
    }

    initializeAnimations() {
        // Add CSS classes for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: slideInUp 0.6s ease-out forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    loadUserPreferences() {
        const preferences = localStorage.getItem('careerai_preferences');
        if (preferences) {
            const prefs = JSON.parse(preferences);
            this.applyUserPreferences(prefs);
        }
    }

    applyUserPreferences(preferences) {
        if (preferences.theme) {
            document.documentElement.setAttribute('data-theme', preferences.theme);
        }
        if (preferences.animations === false) {
            document.documentElement.style.setProperty('--animation-speed', '0s');
        }
    }

    handleOnlineStatus(isOnline) {
        const message = isOnline ? 
            'Connection restored! All features available.' : 
            'You\'re offline. Some features may be limited.';
        
        this.createNotification('Connection Status', message, isOnline ? 'success' : 'warning', 3000);
    }

    createNotification(title, message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-header">
                <h4>${title}</h4>
                <button class="notification-close">&times;</button>
            </div>
            <p>${message}</p>
        `;

        // Add notification styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            maxWidth: '400px',
            padding: '16px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            border: 'var(--border-glow)',
            borderRadius: '12px',
            color: 'var(--text-primary)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease-out'
        });

        document.body.appendChild(notification);

        // Auto-remove
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, duration);

        // Close button
        notification.querySelector('.notification-close').onclick = () => notification.remove();
    }
}

// Enhanced AI Engine with Advanced Career Guidance
class EnhancedAIEngine {
    constructor() {
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.conversationHistory = [];
        this.userContext = {};
        this.responseTemplates = this.initializeResponseTemplates();
    }

    initializeKnowledgeBase() {
        return {
            careerPaths: {
                'software engineer': {
                    roadmap: [
                        'Learn programming fundamentals (3-6 months)',
                        'Master a programming language (6-12 months)',
                        'Build portfolio projects (ongoing)',
                        'Learn frameworks and tools (6 months)',
                        'Practice algorithmic thinking (ongoing)',
                        'Apply for internships/jobs'
                    ],
                    skills: ['Programming', 'Problem Solving', 'Debugging', 'Testing', 'Version Control'],
                    resources: [
                        { name: 'FreeCodeCamp', url: 'https://www.freecodecamp.org/', type: 'Course' },
                        { name: 'LeetCode', url: 'https://leetcode.com/', type: 'Practice' },
                        { name: 'GitHub', url: 'https://github.com/', type: 'Portfolio' }
                    ],
                    salaryRanges: {
                        entry: '₹5-12 LPA',
                        mid: '₹15-30 LPA',
                        senior: '₹35-60 LPA'
                    },
                    marketDemand: 'Very High',
                    growthProjection: '+22% by 2030'
                },
                'data scientist': {
                    roadmap: [
                        'Master statistics and mathematics (6-9 months)',
                        'Learn Python/R programming (3-6 months)',
                        'Study machine learning algorithms (6-12 months)',
                        'Practice with real datasets (ongoing)',
                        'Build ML projects portfolio (6 months)',
                        'Specialize in domain (6-12 months)'
                    ],
                    skills: ['Statistics', 'Python/R', 'Machine Learning', 'Data Visualization', 'SQL'],
                    resources: [
                        { name: 'Coursera ML Course', url: 'https://www.coursera.org/learn/machine-learning', type: 'Course' },
                        { name: 'Kaggle', url: 'https://www.kaggle.com/', type: 'Practice' },
                        { name: 'Pandas Documentation', url: 'https://pandas.pydata.org/', type: 'Reference' }
                    ],
                    salaryRanges: {
                        entry: '₹8-15 LPA',
                        mid: '₹20-40 LPA',
                        senior: '₹45-80 LPA'
                    },
                    marketDemand: 'Extremely High',
                    growthProjection: '+35% by 2030'
                },
                'chartered accountant': {
                    roadmap: [
                        'Complete CA Foundation (6 months)',
                        'CA Intermediate preparation (12-18 months)',
                        'Articleship training (3 years)',
                        'CA Final examination (6-12 months)',
                        'Specialize in area of interest',
                        'Build professional network'
                    ],
                    skills: ['Accounting', 'Auditing', 'Taxation', 'Financial Analysis', 'Compliance'],
                    resources: [
                        { name: 'ICAI Study Material', url: 'https://www.icai.org/', type: 'Official' },
                        { name: 'CA Rajat Arora YouTube', url: 'https://www.youtube.com/@CArajatarora', type: 'Video' },
                        { name: 'Unacademy CA', url: 'https://unacademy.com/ca/', type: 'Course' }
                    ],
                    salaryRanges: {
                        entry: '₹6-12 LPA',
                        mid: '₹15-25 LPA',
                        senior: '₹30-50 LPA'
                    },
                    marketDemand: 'High',
                    growthProjection: '+15% by 2030'
                }
            },
            interviewTips: {
                technical: [
                    'Practice coding problems daily',
                    'Understand data structures and algorithms',
                    'Be able to explain your thought process',
                    'Practice system design for senior roles',
                    'Review your past projects thoroughly'
                ],
                behavioral: [
                    'Use STAR method for behavioral questions',
                    'Prepare specific examples from your experience',
                    'Research the company culture and values',
                    'Practice explaining complex concepts simply',
                    'Show enthusiasm and genuine interest'
                ]
            },
            salaryNegotiation: [
                'Research market rates for your role and location',
                'Document your achievements and contributions',
                'Consider total compensation, not just base salary',
                'Practice your negotiation conversation',
                'Be prepared to walk away if needed',
                'Negotiate timing - not just during hiring'
            ]
        };
    }

    initializeResponseTemplates() {
        return {
            roadmap: `🗺️ **{field} Career Roadmap:**

{roadmapSteps}

**💰 Salary Expectations:**
• Entry Level: {entrySalary}
• Mid Level: {midSalary}  
• Senior Level: {seniorSalary}

**📊 Market Outlook:**
• Demand: {marketDemand}
• Growth: {growthProjection}

**🎯 Next Steps:**
{nextSteps}

Would you like me to elaborate on any specific step or provide more resources for {field}?`,

            resources: `📚 **Top {field} Resources:**

{resourceList}

**💡 Study Strategy:**
{studyStrategy}

**⏰ Recommended Timeline:**
{timeline}

Need help with any specific resource or have questions about the learning path?`,

            interview: `💼 **{field} Interview Preparation Guide:**

**🔧 Technical Preparation:**
{technicalTips}

**🤝 Behavioral Questions:**
{behavioralTips}

**📋 Common {field} Interview Topics:**
{commonTopics}

**🎯 Pro Tips:**
{proTips}

Would you like me to provide mock interview questions or specific preparation strategies?`,

            transition: `🔄 **Career Transition to {field}:**

**📊 Skills Gap Analysis:**
{skillsGap}

**🎓 Learning Plan:**
{learningPlan}

**💼 Transitioning Strategy:**
{transitionStrategy}

**⏱️ Expected Timeline:**
{expectedTimeline}

**💰 Financial Considerations:**
{financialAdvice}

Let me know if you need help with any specific aspect of your career transition!`
        };
    }

    generateResponse(userInput, context = {}) {
        const processedInput = this.preprocessInput(userInput);
        const intent = this.detectIntent(processedInput);
        const response = this.generateContextualResponse(intent, processedInput, context);
        
        this.conversationHistory.push({
            user: userInput,
            ai: response,
            timestamp: Date.now(),
            intent: intent
        });

        return response;
    }

    preprocessInput(input) {
        return {
            original: input,
            lowercase: input.toLowerCase(),
            tokens: input.toLowerCase().split(/\s+/),
            hasNumbers: /\d/.test(input),
            hasQuestionWords: /\b(what|how|when|where|why|which|who)\b/.test(input.toLowerCase())
        };
    }

    detectIntent(processedInput) {
        const { lowercase, tokens } = processedInput;

        // Career roadmap intent
        if (tokens.some(token => ['roadmap', 'path', 'become', 'career', 'steps'].includes(token))) {
            return 'roadmap';
        }

        // Resources intent  
        if (tokens.some(token => ['resources', 'learn', 'courses', 'books', 'materials', 'study'].includes(token))) {
            return 'resources';
        }

        // Interview preparation intent
        if (tokens.some(token => ['interview', 'preparation', 'questions', 'tips'].includes(token))) {
            return 'interview';
        }

        // Salary information intent
        if (tokens.some(token => ['salary', 'pay', 'compensation', 'earnings'].includes(token))) {
            return 'salary';
        }

        // Career transition intent
        if (tokens.some(token => ['transition', 'switch', 'change', 'pivot'].includes(token))) {
            return 'transition';
        }

        // Skills development intent
        if (tokens.some(token => ['skills', 'improve', 'develop', 'enhance'].includes(token))) {
            return 'skills';
        }

        return 'general';
    }

    generateContextualResponse(intent, processedInput, context) {
        const field = this.extractCareerField(processedInput.original);
        
        switch (intent) {
            case 'roadmap':
                return this.generateRoadmapResponse(field);
            case 'resources':
                return this.generateResourcesResponse(field);
            case 'interview':
                return this.generateInterviewResponse(field);
            case 'salary':
                return this.generateSalaryResponse(field);
            case 'transition':
                return this.generateTransitionResponse(field, context);
            case 'skills':
                return this.generateSkillsResponse(field);
            default:
                return this.generateGeneralResponse(processedInput.original, context);
        }
    }

    extractCareerField(input) {
        const fieldKeywords = {
            'software engineer': ['software', 'programming', 'coding', 'developer', 'engineer'],
            'data scientist': ['data science', 'machine learning', 'data scientist', 'ml', 'ai'],
            'chartered accountant': ['ca', 'accountant', 'accounting', 'finance', 'audit'],
            'doctor': ['medical', 'doctor', 'physician', 'medicine', 'mbbs'],
            'lawyer': ['law', 'lawyer', 'legal', 'advocate', 'attorney'],
            'designer': ['design', 'designer', 'ui', 'ux', 'graphic']
        };

        const inputLower = input.toLowerCase();
        
        for (const [field, keywords] of Object.entries(fieldKeywords)) {
            if (keywords.some(keyword => inputLower.includes(keyword))) {
                return field;
            }
        }
        
        return 'general';
    }

    generateRoadmapResponse(field) {
        const careerInfo = this.knowledgeBase.careerPaths[field];
        
        if (!careerInfo) {
            return this.generateGeneralRoadmapResponse(field);
        }

        const roadmapSteps = careerInfo.roadmap.map((step, index) => 
            `${index + 1}. ${step}`
        ).join('\n');

        const nextSteps = [
            `Start with ${careerInfo.roadmap[0]}`,
            `Join ${field} communities and forums`,
            `Follow industry leaders on LinkedIn`,
            `Set up learning schedule and milestones`
        ].map((step, index) => `${index + 1}. ${step}`).join('\n');

        return this.responseTemplates.roadmap
            .replace('{field}', field)
            .replace('{roadmapSteps}', roadmapSteps)
            .replace('{entrySalary}', careerInfo.salaryRanges.entry)
            .replace('{midSalary}', careerInfo.salaryRanges.mid)
            .replace('{seniorSalary}', careerInfo.salaryRanges.senior)
            .replace('{marketDemand}', careerInfo.marketDemand)
            .replace('{growthProjection}', careerInfo.growthProjection)
            .replace('{nextSteps}', nextSteps);
    }

    generateResourcesResponse(field) {
        const careerInfo = this.knowledgeBase.careerPaths[field];
        
        if (!careerInfo) {
            return this.generateGeneralResourcesResponse(field);
        }

        const resourceList = careerInfo.resources.map((resource, index) => 
            `${index + 1}. **${resource.name}** (${resource.type})\n   🔗 ${resource.url}`
        ).join('\n\n');

        const studyStrategy = [
            'Dedicate 2-3 hours daily for consistent learning',
            'Balance theory with hands-on practice',
            'Join study groups or online communities',
            'Track your progress with projects'
        ].map((tip, index) => `• ${tip}`).join('\n');

        const timeline = field === 'software engineer' ? '6-12 months for job readiness' :
                        field === 'data scientist' ? '12-18 months for comprehensive skills' :
                        field === 'chartered accountant' ? '4-5 years including articleship' :
                        '6-18 months depending on background';

        return this.responseTemplates.resources
            .replace('{field}', field)
            .replace('{resourceList}', resourceList)
            .replace('{studyStrategy}', studyStrategy)
            .replace('{timeline}', timeline);
    }

    generateInterviewResponse(field) {
        const technicalTips = this.knowledgeBase.interviewTips.technical
            .map(tip => `• ${tip}`)
            .join('\n');

        const behavioralTips = this.knowledgeBase.interviewTips.behavioral
            .map(tip => `• ${tip}`)
            .join('\n');

        const commonTopics = field === 'software engineer' ? 
            ['Data Structures & Algorithms', 'System Design', 'Object-Oriented Programming', 'Database Design'] :
            field === 'data scientist' ?
            ['Machine Learning Algorithms', 'Statistical Methods', 'Data Preprocessing', 'Model Evaluation'] :
            ['Domain-specific technical knowledge', 'Problem-solving scenarios', 'Industry best practices'];

        const topicsList = commonTopics.map(topic => `• ${topic}`).join('\n');

        const proTips = [
            'Research the company and role thoroughly',
            'Prepare questions to ask the interviewer',
            'Practice explaining concepts in simple terms',
            'Be honest about what you don\'t know',
            'Follow up with a thank-you email'
        ].map(tip => `• ${tip}`).join('\n');

        return this.responseTemplates.interview
            .replace('{field}', field)
            .replace('{technicalTips}', technicalTips)
            .replace('{behavioralTips}', behavioralTips)
            .replace('{commonTopics}', topicsList)
            .replace('{proTips}', proTips);
    }

    generateSalaryResponse(field) {
        const careerInfo = this.knowledgeBase.careerPaths[field];
        
        if (!careerInfo) {
            return `💰 **Salary Information for ${field}:**

Salary ranges vary significantly based on:
• Location (metro vs non-metro cities)
• Company size and type (startup vs MNC)
• Years of experience
• Specific skills and expertise
• Industry domain

**General Guidelines:**
• Entry Level (0-2 years): ₹3-8 LPA
• Mid Level (3-6 years): ₹8-20 LPA
• Senior Level (7+ years): ₹20-50+ LPA

**Negotiation Tips:**
${this.knowledgeBase.salaryNegotiation.map(tip => `• ${tip}`).join('\n')}

Would you like specific salary data for your location or more negotiation strategies?`;
        }

        return `💰 **${field} Salary Breakdown:**

**💼 Experience-based Ranges:**
• **Entry Level (0-2 years):** ${careerInfo.salaryRanges.entry}
• **Mid Level (3-6 years):** ${careerInfo.salaryRanges.mid}
• **Senior Level (7+ years):** ${careerInfo.salaryRanges.senior}

**📈 Market Factors:**
• Demand Level: ${careerInfo.marketDemand}
• Growth Projection: ${careerInfo.growthProjection}
• Location Impact: 30-50% variation between cities

**💡 Salary Enhancement Tips:**
• Specialize in high-demand skills
• Contribute to open source projects
• Build a strong professional network
• Continuously update your skills
• Consider freelancing for extra income

**🎯 Negotiation Strategy:**
${this.knowledgeBase.salaryNegotiation.slice(0, 3).map(tip => `• ${tip}`).join('\n')}

Need specific advice for your situation or location-based data?`;
    }

    generateTransitionResponse(field, context) {
        const currentField = context.currentField || 'your current field';
        
        return `🔄 **Career Transition to ${field}:**

**📊 Transition Analysis:**
• **From:** ${currentField}
• **To:** ${field}
• **Difficulty:** Moderate to High (depends on background)

**🎓 Skills Development Plan:**
1. **Assessment Phase (1-2 weeks)**
   • Identify transferable skills
   • Map skill gaps
   • Set learning objectives

2. **Foundation Building (2-6 months)**
   • Complete fundamental courses
   • Start building basic projects
   • Join relevant communities

3. **Skill Enhancement (6-12 months)**
   • Advanced coursework
   • Real-world project experience
   • Build portfolio/resume

4. **Job Preparation (1-3 months)**
   • Interview preparation
   • Networking and applications
   • Freelance/contract opportunities

**💰 Financial Planning:**
• Budget for courses and certifications
• Plan for potential income gap
• Consider part-time transition
• Build emergency fund (3-6 months expenses)

**🤝 Network Building:**
• Attend industry meetups and conferences
• Connect with professionals on LinkedIn
• Find mentors in your target field
• Join professional associations

**⚠️ Common Challenges:**
• Imposter syndrome in new field
• Salary expectations adjustment
• Competition with experienced candidates
• Learning curve steepness

Would you like a detailed transition timeline or specific advice for your situation?`;
    }

    generateSkillsResponse(field) {
        const careerInfo = this.knowledgeBase.careerPaths[field];
        
        if (!careerInfo) {
            return this.generateGeneralSkillsResponse(field);
        }

        const skillsList = careerInfo.skills.map(skill => `• ${skill}`).join('\n');

        return `🎯 **Essential Skills for ${field}:**

**🔧 Core Technical Skills:**
${skillsList}

**💡 Skill Development Strategy:**

**Phase 1: Foundation (Months 1-3)**
• Master the fundamental concepts
• Start with beginner-friendly resources
• Practice basic exercises daily
• Join online communities for support

**Phase 2: Intermediate (Months 4-8)**
• Work on practical projects
• Contribute to open source projects
• Start building your portfolio
• Network with professionals

**Phase 3: Advanced (Months 9-12+)**
• Specialize in specific areas
• Take on challenging projects
• Mentor others in the community
• Stay updated with industry trends

**📚 Learning Resources:**
${careerInfo.resources.map(resource => `• ${resource.name}: ${resource.url}`).join('\n')}

**🏆 Skill Validation:**
• Build projects that showcase abilities
• Contribute to open source projects
• Obtain relevant certifications
• Participate in competitions/hackathons

**📈 Continuous Improvement:**
• Follow industry leaders and blogs
• Attend conferences and workshops
• Join professional communities
• Practice regularly and consistently

Which specific skill would you like to focus on first?`;
    }

    generateGeneralResponse(input, context) {
        const generalResponses = [
            `🤖 **I'm here to help with your career journey!** 

I can provide detailed guidance on:

**📚 Learning & Development:**
• Personalized career roadmaps
• Study resources and course recommendations
• Skill development strategies
• Certification guidance

**💼 Job Search & Career:**
• Interview preparation tips
• Resume building advice
• Salary negotiation strategies
• Career transition planning

**🎯 Specific Career Fields:**
• Software Engineering & Tech
• Data Science & AI/ML
• Finance & Chartered Accountancy
• Healthcare & Medical
• Law & Legal Services
• Design & Creative Arts

**📊 Market Insights:**
• Industry trends and demand
• Salary ranges and growth projections
• Skill requirements analysis

Try asking me something like:
• "How to become a data scientist?"
• "Software engineer interview tips"
• "Best resources for learning web development"
• "Career transition from finance to tech"

What specific career topic can I help you with today?`,

            `🚀 **Welcome to CareerAI Pro!**

I'm your comprehensive career advisor with access to:
• Real-time industry data and trends
• Personalized learning recommendations
• Career roadmaps for all major fields
• Salary insights and market analysis

**Popular Questions I Can Help With:**
• Career planning and goal setting
• Skill development strategies
• Job search and interview preparation
• Salary negotiation and career growth
• Industry transitions and pivots

**Current Hot Topics:**
• AI/ML career opportunities
• Remote work strategies
• Emerging tech skills in demand
• Post-pandemic career shifts

What would you like to explore first?`,

            `💡 **Career Guidance Made Personal!**

I analyze your questions and provide tailored advice based on:
• Current market trends
• Industry best practices
• Successful career trajectories
• Real-world experience insights

**My Specialties:**
• 📊 Data-driven career recommendations
• 🎓 Customized learning paths
• 💼 Interview and job search strategies
• 📈 Career progression planning
• 🔄 Career transition support

Ask me anything about your professional development, and I'll provide detailed, actionable guidance!

What career challenge would you like to tackle today?`
        ];

        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }

    generateGeneralRoadmapResponse(field) {
        return `🗺️ **General Career Roadmap for ${field}:**

**Phase 1: Research & Foundation (1-3 months)**
• Research the field thoroughly
• Understand job requirements and market demand
• Identify required skills and qualifications
• Connect with professionals in the field

**Phase 2: Skill Development (6-18 months)**
• Take relevant courses and certifications
• Build practical experience through projects
• Develop both technical and soft skills
• Create a professional portfolio

**Phase 3: Job Preparation (2-6 months)**
• Optimize resume and LinkedIn profile
• Practice interview skills
• Apply for entry-level positions
• Network actively in the industry

**Phase 4: Career Growth (Ongoing)**
• Continuously update skills
• Seek mentorship and feedback
• Take on challenging projects
• Build professional reputation

**💡 Success Tips:**
• Set specific, measurable goals
• Track your progress regularly
• Join professional communities
• Stay updated with industry trends

Would you like me to provide more specific guidance for ${field}?`;
    }

    generateGeneralResourcesResponse(field) {
        return `📚 **Learning Resources for ${field}:**

**🌐 Online Learning Platforms:**
• Coursera - University courses and specializations
• edX - Free courses from top universities
• Udemy - Practical, project-based courses
• LinkedIn Learning - Professional development
• Skillshare - Creative and business skills

**📖 Additional Resources:**
• YouTube - Free tutorials and lectures
• Medium - Industry insights and tutorials
• Reddit - Community discussions and advice
• Stack Overflow - Technical problem solving
• GitHub - Open source projects and code examples

**📚 Books & Publications:**
• Industry-specific textbooks and guides
• Biography of successful professionals
• Industry magazines and journals
• Research papers and case studies

**🤝 Community & Networking:**
• Professional associations
• Local meetups and events
• Online forums and discussion groups
• Social media professional groups

**💡 Learning Strategy:**
• Combine multiple learning formats
• Practice hands-on skills regularly
• Join study groups or communities
• Set up a consistent learning schedule

Which type of resource would you like specific recommendations for?`;
    }

    generateGeneralSkillsResponse(field) {
        return `🎯 **Key Skills for ${field} Success:**

**🔧 Technical Skills:**
• Field-specific technical competencies
• Industry-standard tools and software
• Analytical and problem-solving abilities
• Data analysis and interpretation

**🤝 Soft Skills:**
• Communication and presentation
• Leadership and teamwork
• Time management and organization
• Critical thinking and creativity
• Adaptability and learning agility

**📈 Professional Skills:**
• Project management
• Client relationship management
• Business acumen and industry knowledge
• Networking and relationship building

**🎓 Skill Development Approach:**

**1. Self-Assessment:**
• Identify current skill level
• Recognize strengths and weaknesses
• Set specific improvement goals

**2. Learning Plan:**
• Choose appropriate learning resources
• Set realistic timelines
• Balance theory with practice

**3. Practical Application:**
• Work on real projects
• Seek feedback from experts
• Apply skills in different contexts

**4. Continuous Improvement:**
• Stay updated with industry trends
• Regular skill assessment
• Expand into related areas

What specific skills would you like to develop first in ${field}?`;
    }
}

// Analytics and Progress Tracking System
class AnalyticsTracker {
    constructor() {
        this.events = JSON.parse(localStorage.getItem('careerai_analytics') || '[]');
        this.sessionStart = Date.now();
    }

    track(eventType, data = {}) {
        const event = {
            type: eventType,
            data: data,
            timestamp: Date.now(),
            sessionId: this.getSessionId(),
            url: window.location.pathname,
            userAgent: navigator.userAgent.substring(0, 100)
        };

        this.events.push(event);
        this.saveEvents();
        
        // Keep only last 1000 events to manage storage
        if (this.events.length > 1000) {
            this.events = this.events.slice(-1000);
            this.saveEvents();
        }
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('careerai_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('careerai_session_id', sessionId);
        }
        return sessionId;
    }

    saveEvents() {
        localStorage.setItem('careerai_analytics', JSON.stringify(this.events));
    }

    getAnalytics() {
        return {
            totalEvents: this.events.length,
            sessionDuration: Date.now() - this.sessionStart,
            topEvents: this.getTopEvents(),
            userEngagement: this.calculateEngagement(),
            learningProgress: this.getLearningProgress()
        };
    }

    getTopEvents() {
        const eventCounts = {};
        this.events.forEach(event => {
            eventCounts[event.type] = (eventCounts[event.type] || 0) + 1;
        });

        return Object.entries(eventCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([type, count]) => ({ type, count }));
    }

    calculateEngagement() {
        const recentEvents = this.events.filter(event => 
            Date.now() - event.timestamp < 24 * 60 * 60 * 1000 // Last 24 hours
        );

        return {
            eventsLast24h: recentEvents.length,
            avgSessionTime: this.calculateAverageSessionTime(),
            returnVisits: this.calculateReturnVisits()
        };
    }

    calculateAverageSessionTime() {
        const sessions = {};
        this.events.forEach(event => {
            if (!sessions[event.sessionId]) {
                sessions[event.sessionId] = { start: event.timestamp, end: event.timestamp };
            } else {
                sessions[event.sessionId].end = Math.max(sessions[event.sessionId].end, event.timestamp);
            }
        });

        const sessionTimes = Object.values(sessions).map(session => 
            session.end - session.start
        );

        return sessionTimes.length > 0 ? 
            sessionTimes.reduce((a, b) => a + b, 0) / sessionTimes.length : 0;
    }

    calculateReturnVisits() {
        const uniqueSessions = new Set(this.events.map(event => event.sessionId));
        return uniqueSessions.size;
    }

    getLearningProgress() {
        const learningEvents = this.events.filter(event => 
            ['resource_accessed', 'assessment_completed', 'course_viewed', 'skill_practiced'].includes(event.type)
        );

        return {
            totalLearningEvents: learningEvents.length,
            resourcesAccessed: learningEvents.filter(e => e.type === 'resource_accessed').length,
            assessmentsCompleted: learningEvents.filter(e => e.type === 'assessment_completed').length,
            coursesViewed: learningEvents.filter(e => e.type === 'course_viewed').length
        };
    }

    exportAnalytics() {
        const analytics = this.getAnalytics();
        const exportData = {
            summary: analytics,
            events: this.events,
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `careerai_analytics_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Progress Management System
class ProgressManager {
    constructor() {
        this.progressData = this.loadProgressData();
        this.goals = [];
        this.milestones = this.initializeMilestones();
    }

    loadProgressData() {
        const saved = localStorage.getItem('careerai_progress');
        return saved ? JSON.parse(saved) : {
            skillLevels: {},
            completedCourses: [],
            achievedMilestones: [],
            totalStudyHours: 0,
            streakDays: 0,
            lastActivityDate: null,
            careerGoals: [],
            learningPaths: []
        };
    }

    initializeMilestones() {
        return [
            { id: 1, title: 'First Career Assessment', description: 'Complete your first career assessment', points: 100, icon: '🎯' },
            { id: 2, title: 'Learning Path Created', description: 'Create your personalized learning path', points: 150, icon: '🗺️' },
            { id: 3, title: 'First Resource Accessed', description: 'Access your first learning resource', points: 50, icon: '📚' },
            { id: 4, title: 'Week Streak', description: 'Maintain a 7-day learning streak', points: 300, icon: '🔥' },
            { id: 5, title: 'First Application', description: 'Apply for your first job/internship', points: 200, icon: '📝' },
            { id: 6, title: 'AI Coach Interaction', description: 'Have a conversation with the AI coach', points: 75, icon: '🤖' },
            { id: 7, title: 'Portfolio Project', description: 'Complete your first portfolio project', points: 400, icon: '🚀' },
            { id: 8, title: 'Network Builder', description: 'Connect with 10 professionals', points: 250, icon: '🤝' },
            { id: 9, title: 'Interview Ready', description: 'Complete interview preparation', points: 350, icon: '💼' },
            { id: 10, title: 'Career Goal Achieved', description: 'Achieve your first career goal', points: 1000, icon: '🏆' }
        ];
    }

    trackActivity(activityType, data = {}) {
        const today = new Date().toDateString();
        
        // Update streak
        this.updateStreak(today);
        
        // Track specific activity
        switch (activityType) {
            case 'assessment_completed':
                this.checkMilestone(1);
                break;
            case 'learning_path_created':
                this.checkMilestone(2);
                break;
            case 'resource_accessed':
                this.checkMilestone(3);
                break;
            case 'job_application':
                this.checkMilestone(5);
                break;
            case 'ai_interaction':
                this.checkMilestone(6);
                break;
            case 'project_completed':
                this.checkMilestone(7);
                break;
            case 'interview_prep':
                this.checkMilestone(9);
                break;
            case 'goal_achieved':
                this.checkMilestone(10);
                break;
        }

        // Check streak milestones
        if (this.progressData.streakDays >= 7) {
            this.checkMilestone(4);
        }

        this.saveProgress();
    }

    updateStreak(today) {
        const lastActivity = this.progressData.lastActivityDate;
        
        if (lastActivity !== today) {
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            
            if (lastActivity === yesterday) {
                this.progressData.streakDays += 1;
            } else if (lastActivity !== today) {
                this.progressData.streakDays = 1;
            }
            
            this.progressData.lastActivityDate = today;
        }
    }

    checkMilestone(milestoneId) {
        if (!this.progressData.achievedMilestones.includes(milestoneId)) {
            const milestone = this.milestones.find(m => m.id === milestoneId);
            if (milestone) {
                this.progressData.achievedMilestones.push(milestoneId);
                this.showAchievementNotification(milestone);
                this.saveProgress();
            }
        }
    }

    showAchievementNotification(milestone) {
        // Create and show achievement notification
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${milestone.icon}</div>
                <div class="achievement-text">
                    <h4>🎉 Achievement Unlocked!</h4>
                    <h3>${milestone.title}</h3>
                    <p>${milestone.description}</p>
                    <span class="points">+${milestone.points} points</span>
                </div>
            </div>
        `;

        // Styling
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'var(--gradient-success)',
            color: 'var(--bg-primary)',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: 'var(--glow-success)',
            zIndex: '10000',
            minWidth: '320px',
            animation: 'achievementSlide 0.5s ease-out'
        });

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes achievementSlide {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes achievementSlideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'achievementSlideOut 0.5s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);

        // Click to close
        notification.onclick = () => notification.remove();
    }

    getProgressSummary() {
        const totalPoints = this.calculateTotalPoints();
        const completionPercentage = Math.round((this.progressData.achievedMilestones.length / this.milestones.length) * 100);

        return {
            totalPoints,
            currentStreak: this.progressData.streakDays,
            achievementsUnlocked: this.progressData.achievedMilestones.length,
            totalAchievements: this.milestones.length,
            completionPercentage,
            nextMilestone: this.getNextMilestone(),
            recentActivities: this.getRecentActivities()
        };
    }

    calculateTotalPoints() {
        return this.progressData.achievedMilestones.reduce((total, milestoneId) => {
            const milestone = this.milestones.find(m => m.id === milestoneId);
            return total + (milestone ? milestone.points : 0);
        }, 0);
    }

    getNextMilestone() {
        return this.milestones.find(m => !this.progressData.achievedMilestones.includes(m.id));
    }

    getRecentActivities() {
        // This would return recent user activities based on analytics data
        return [];
    }

    saveProgress() {
        localStorage.setItem('careerai_progress', JSON.stringify(this.progressData));
    }

    exportProgress() {
        const progressSummary = this.getProgressSummary();
        const exportData = {
            summary: progressSummary,
            fullData: this.progressData,
            milestones: this.milestones,
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `careerai_progress_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Resume Builder Advanced Features
class ResumeBuilderPro {
    constructor() {
        this.templates = this.initializeTemplates();
        this.atsKeywords = this.loadATSKeywords();
        this.resumeData = this.initializeResumeData();
    }

    initializeTemplates() {
        return {
            modern: {
                name: 'Modern Professional',
                preview: '/templates/modern.png',
                features: ['ATS-friendly', 'Clean design', 'Two-column layout']
            },
            executive: {
                name: 'Executive',
                preview: '/templates/executive.png',
                features: ['Leadership focused', 'Achievement highlights', 'Premium design']
            },
            technical: {
                name: 'Technical/IT',
                preview: '/templates/technical.png',
                features: ['Skills showcase', 'Project highlights', 'GitHub integration']
            },
            creative: {
                name: 'Creative',
                preview: '/templates/creative.png',
                features: ['Portfolio integration', 'Visual elements', 'Brand focused']
            }
        };
    }

    loadATSKeywords() {
        return {
            'software engineer': [
                'JavaScript', 'Python', 'React', 'Node.js', 'API', 'Database',
                'Git', 'Agile', 'Scrum', 'Testing', 'Debugging', 'Algorithm'
            ],
            'data scientist': [
                'Machine Learning', 'Python', 'R', 'SQL', 'Statistics', 'Analytics',
                'Pandas', 'NumPy', 'Scikit-learn', 'Visualization', 'Big Data'
            ],
            'marketing': [
                'Digital Marketing', 'SEO', 'SEM', 'Analytics', 'Campaign',
                'Brand', 'Content', 'Social Media', 'Lead Generation', 'ROI'
            ]
        };
    }

    initializeResumeData() {
        return {
            personalInfo: {},
            summary: '',
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            achievements: []
        };
    }

    generateAISuggestions(section, currentData) {
        const suggestions = {
            summary: [
                'Start with your years of experience and key expertise',
                'Include quantifiable achievements when possible',
                'Mention specific technologies or methodologies you excel in',
                'Highlight what value you bring to employers'
            ],
            experience: [
                'Use action verbs to start each bullet point',
                'Quantify your achievements with numbers and percentages',
                'Focus on results and impact rather than just responsibilities',
                'Tailor descriptions to match job requirements'
            ],
            skills: [
                'Group skills by category (Technical, Soft Skills, etc.)',
                'Include both hard and soft skills',
                'Prioritize skills mentioned in job descriptions',
                'Keep skill levels realistic and honest'
            ]
        };

        return suggestions[section] || ['Consider adding more specific details', 'Use keywords relevant to your target role'];
    }

    analyzeATSCompatibility(resumeText, jobDescription = '') {
        const analysis = {
            score: 0,
            issues: [],
            suggestions: [],
            keywordMatches: []
        };

        // Basic ATS checks
        let score = 85; // Start with base score

        // Check for problematic elements
        if (resumeText.includes('|') || resumeText.includes('•')) {
            analysis.issues.push('Special characters may not parse correctly');
            score -= 5;
        }

        // Check for contact info
        if (!resumeText.includes('@') || !resumeText.match(/\d{10}/)) {
            analysis.issues.push('Contact information may be incomplete');
            score -= 10;
        }

        // Check for keywords if job description provided
        if (jobDescription) {
            const jobKeywords = jobDescription.toLowerCase().match(/\b\w{4,}\b/g) || [];
            const resumeKeywords = resumeText.toLowerCase().match(/\b\w{4,}\b/g) || [];
            
            const matches = jobKeywords.filter(keyword => resumeKeywords.includes(keyword));
            analysis.keywordMatches = [...new Set(matches)].slice(0, 10);
            
            const keywordScore = Math.min((matches.length / Math.max(jobKeywords.length * 0.3, 1)) * 100, 25);
            score += keywordScore;
        }

        // Generate suggestions
        if (analysis.issues.length === 0) {
            analysis.suggestions.push('Great! Your resume appears to be ATS-friendly');
        } else {
            analysis.suggestions.push('Consider addressing the identified issues for better ATS compatibility');
        }

        if (jobDescription && analysis.keywordMatches.length < 5) {
            analysis.suggestions.push('Try to include more relevant keywords from the job description');
        }

        analysis.score = Math.min(Math.max(Math.round(score), 0), 100);
        return analysis;
    }

    exportToPDF(resumeData, templateName = 'modern') {
        // This would integrate with a PDF generation library
        console.log('Exporting resume to PDF...', { resumeData, templateName });
        
        // Simulated PDF generation
        const blob = new Blob(['Resume PDF content would be here'], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume_${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Utility Functions
const CareerAIUtils = {
    // Format duration in human-readable format
    formatDuration: (months) => {
        if (months < 12) {
            return `${months} month${months !== 1 ? 's' : ''}`;
        } else {
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            let result = `${years} year${years !== 1 ? 's' : ''}`;
            if (remainingMonths > 0) {
                result += ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
            }
            return result;
        }
    },

    // Format salary ranges
    formatSalary: (amount) => {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(1)} Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)} LPA`;
        } else {
            return `₹${amount.toLocaleString()}`;
        }
    },

    // Debounce function for search inputs
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Generate unique IDs
    generateId: (prefix = 'id') => {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // Validate email format
    isValidEmail: (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Calculate reading time for content
    calculateReadingTime: (text) => {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    },

    // Format numbers with appropriate suffixes
    formatNumber: (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    },

    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    },

    // Local storage helpers with expiration
    setStorageWithExpiry: (key, value, ttl) => {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
    },

    getStorageWithExpiry: (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;

        try {
            const item = JSON.parse(itemStr);
            const now = new Date();

            if (now.getTime() > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            return item.value;
        } catch (e) {
            return null;
        }
    }
};

// Initialize Enhanced Features
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 CareerAI Pro Enhanced Features Loading...');
    
    // Initialize core systems
    try {
        window.careerAIManager = new CareerAIProManager();
        window.resumeBuilder = new ResumeBuilderPro();
        window.CareerAIUtils = CareerAIUtils;
        
        console.log('✅ All Enhanced Features Loaded Successfully!');
        
        // Dispatch ready event for React components
        window.dispatchEvent(new CustomEvent('careerai:enhanced:ready', {
            detail: {
                timestamp: Date.now(),
                version: '2.0.0',
                features: [
                    'advanced-ai-engine',
                    'analytics-tracking',
                    'progress-management',
                    'resume-builder-pro',
                    'ats-compatibility-checker',
                    'career-roadmap-generator',
                    'skill-assessment-engine'
                ]
            }
        }));

        // Track initialization
        if (window.careerAIManager) {
            window.careerAIManager.trackInteraction('app_initialized', {
                version: '2.0.0',
                timestamp: Date.now(),
                userAgent: navigator.userAgent
            });
        }

    } catch (error) {
        console.error('❌ Error initializing CareerAI Pro features:', error);
    }
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('CareerAI Pro Error:', event.error);
    
    if (window.careerAIManager) {
        window.careerAIManager.trackInteraction('error_occurred', {
            message: event.error?.message,
            filename: event.filename,
            line: event.lineno,
            timestamp: Date.now()
        });
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`🚀 CareerAI Pro loaded in ${loadTime.toFixed(2)}ms`);
    
    if (window.careerAIManager) {
        window.careerAIManager.trackInteraction('page_load_complete', {
            loadTime: Math.round(loadTime),
            timestamp: Date.now()
        });
    }
});

// Export for ES6 modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CareerAIProManager,
        EnhancedAIEngine,
        AnalyticsTracker,
        ProgressManager,
        ResumeBuilderPro,
        CareerAIUtils
    };
}
