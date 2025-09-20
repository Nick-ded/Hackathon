class EnhancedCareerDataManager {
    constructor() {
        this.studyMaterials = this.loadStudyMaterials();
        this.internships = this.loadInternships();
        this.jobListings = this.loadJobListings();
        this.analyticsData = this.loadAnalyticsData();
        this.userProgress = this.loadUserProgress();
        this.resumeTemplates = this.loadResumeTemplates();
        this.init();
    }

    loadStudyMaterials() {
        return {
            ca: {
                totalBooks: 15,
                totalOnlinePlatforms: 8,
                totalYouTubeChannels: 12,
                avgRating: 4.6,
                totalMockTests: 145
            },
            engineering: {
                totalBooks: 20,
                totalOnlinePlatforms: 6,
                totalYouTubeChannels: 15,
                avgRating: 4.7,
                totalMockTests: 200
            },
            upsc: {
                totalBooks: 18,
                totalOnlinePlatforms: 10,
                totalYouTubeChannels: 20,
                avgRating: 4.5,
                totalMockTests: 300
            },
            medical: {
                totalBooks: 16,
                totalOnlinePlatforms: 7,
                totalYouTubeChannels: 18,
                avgRating: 4.8,
                totalMockTests: 180
            },
            software: {
                totalBooks: 25,
                totalOnlinePlatforms: 12,
                totalYouTubeChannels: 30,
                avgRating: 4.6,
                totalPracticePlatforms: 15
            }
        };
    }

    loadInternships() {
        return {
            totalActive: 47,
            byField: {
                software: 25,
                ca: 8,
                medical: 6,
                government: 8
            },
            avgStipend: {
                software: 65000,
                ca: 23500,
                medical: 32500,
                government: 13500
            },
            urgentCount: 12,
            todayApplications: 156
        };
    }

    loadJobListings() {
        return {
            totalJobs: 2847,
            newToday: 73,
            trending: [
                "Software Engineer",
                "Data Scientist", 
                "Product Manager",
                "Full Stack Developer",
                "DevOps Engineer"
            ],
            salaryRanges: {
                "0-5": 847,
                "5-15": 1245,
                "15-30": 621,
                "30+": 134
            }
        };
    }

    loadAnalyticsData() {
        return {
            userEngagement: {
                dailyActiveUsers: 15847,
                studyMaterialsAccessed: 3421,
                internshipApplications: 245,
                resumesBuilt: 89,
                assessmentsTaken: 167
            },
            successMetrics: {
                placementRate: 78,
                averageTimeToPlacement: 4.2,
                userSatisfaction: 4.7,
                platformGrowth: 23
            }
        };
    }

    loadUserProgress() {
        const saved = localStorage.getItem('careerai_enhanced_progress');
        return saved ? JSON.parse(saved) : {
            studyHours: 0,
            materialsBookmarked: [],
            internshipsApplied: [],
            resumesCreated: 0,
            assessmentsCompleted: 0,
            skillsImproved: [],
            achievements: [],
            learningStreak: 0,
            lastActivity: null
        };
    }

    loadResumeTemplates() {
        return [
            {
                id: 'modern',
                name: 'Modern Professional',
                description: 'Clean, modern design perfect for tech roles',
                color: '#00d4ff',
                popularity: 85
            },
            {
                id: 'classic',
                name: 'Classic Business',
                description: 'Traditional format for corporate positions',
                color: '#8b5cf6',
                popularity: 72
            },
            {
                id: 'creative',
                name: 'Creative Designer',
                description: 'Vibrant design for creative professionals',
                color: '#ff6b35',
                popularity: 68
            },
            {
                id: 'minimal',
                name: 'Minimal Clean',
                description: 'Simple, elegant design for any field',
                color: '#00ff88',
                popularity: 79
            }
        ];
    }

    init() {
        this.trackUserActivity();
        this.initializeNotifications();
        this.setupPerformanceMonitoring();
        console.log('🚀 Enhanced CareerAI Data Manager initialized');
    }

    trackUserActivity() {
        const activity = {
            timestamp: Date.now(),
            page: window.location.pathname,
            userAgent: navigator.userAgent,
            sessionId: this.generateSessionId()
        };
        
        this.logActivity('page_view', activity);
    }

    logActivity(type, data) {
        const activities = JSON.parse(localStorage.getItem('careerai_activities') || '[]');
        activities.push({
            type,
            data,
            timestamp: Date.now()
        });
        
        // Keep only last 100 activities
        if (activities.length > 100) {
            activities.splice(0, activities.length - 100);
        }
        
        localStorage.setItem('careerai_activities', JSON.stringify(activities));
    }

    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    initializeNotifications() {
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    setupPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                this.logActivity('performance', { loadTime });
            }, 0);
        });
    }

    bookmarkStudyMaterial(field, material) {
        this.userProgress.materialsBookmarked.push({
            field,
            material,
            timestamp: Date.now()
        });
        this.saveUserProgress();
        this.showNotification('📚 Study Material Bookmarked!', `Added ${material.title || material.platform} to your bookmarks`);
    }

    applyToInternship(internship) {
        this.userProgress.internshipsApplied.push({
            internship,
            timestamp: Date.now(),
            status: 'applied'
        });
        this.saveUserProgress();
        this.logActivity('internship_application', { internshipId: internship.id });
        this.showNotification('🎉 Application Submitted!', `Applied to ${internship.title} at ${internship.company}`);
    }

    trackResumeCreation(resumeData) {
        this.userProgress.resumesCreated += 1;
        this.userProgress.achievements.push({
            type: 'resume_created',
            timestamp: Date.now(),
            data: resumeData
        });
        this.saveUserProgress();
        this.showNotification('📄 Resume Created!', 'Your professional resume is ready to download');
    }

    showNotification(title, body) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body,
                icon: '/favicon.ico',
                tag: 'careerai-notification'
            });
        }
    }

    saveUserProgress() {
        localStorage.setItem('careerai_enhanced_progress', JSON.stringify(this.userProgress));
    }

    getInsights() {
        return {
            totalActivities: this.userProgress.materialsBookmarked.length + this.userProgress.internshipsApplied.length,
            favoriteField: this.getMostAccessedField(),
            weeklyProgress: this.getWeeklyProgress(),
            recommendations: this.getPersonalizedRecommendations()
        };
    }

    getMostAccessedField() {
        const fieldCounts = {};
        this.userProgress.materialsBookmarked.forEach(item => {
            fieldCounts[item.field] = (fieldCounts[item.field] || 0) + 1;
        });
        
        return Object.keys(fieldCounts).reduce((a, b) => 
            fieldCounts[a] > fieldCounts[b] ? a : b, 'software'
        );
    }

    getWeeklyProgress() {
        const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const recentActivity = [
            ...this.userProgress.materialsBookmarked,
            ...this.userProgress.internshipsApplied
        ].filter(item => item.timestamp > weekAgo);
        
        return recentActivity.length;
    }

    getPersonalizedRecommendations() {
        const favoriteField = this.getMostAccessedField();
        const recommendations = {
            ca: ['Take CA Foundation Mock Test', 'Watch Accounting Fundamentals Videos', 'Apply for Audit Internships'],
            engineering: ['Solve JEE Practice Problems', 'Build a Programming Project', 'Apply for Tech Internships'],
            software: ['Complete a Coding Challenge', 'Build Portfolio Website', 'Apply for Developer Roles'],
            medical: ['Study NEET Biology Chapters', 'Take Medical Mock Tests', 'Apply for Hospital Internships'],
            upsc: ['Read Current Affairs Daily', 'Practice Answer Writing', 'Apply for Government Internships']
        };
        
        return recommendations[favoriteField] || recommendations.software;
    }
}

// Advanced Analytics Engine
class AdvancedAnalyticsEngine {
    constructor() {
        this.charts = {};
        this.metrics = this.loadMetrics();
        this.initialized = false;
    }

    loadMetrics() {
        return {
            realTimeData: {
                activeUsers: Math.floor(Math.random() * 1000) + 500,
                onlineStudents: Math.floor(Math.random() * 300) + 100,
                internshipApplications: Math.floor(Math.random() * 50) + 20,
                resumesDownloaded: Math.floor(Math.random() * 25) + 10
            },
            trends: {
                mostPopularField: 'Software Engineering',
                fastestGrowingSkill: 'Machine Learning',
                highestPayingInternship: 'Google SWE Intern',
                topUniversity: 'IIT Bombay'
            }
        };
    }

    initializeCharts() {
        if (this.initialized) return;

        const chartConfigs = {
            jobMarket: {
                type: 'doughnut',
                data: {
                    labels: ["Software Engineering", "CA/Finance", "Medical", "Government", "Others"],
                    datasets: [{
                        data: [35, 20, 15, 20, 10],
                        backgroundColor: ["#00d4ff", "#00ff88", "#8b5cf6", "#ff6b35", "#ffdd00"],
                        borderWidth: 0,
                        hoverBorderWidth: 3,
                        hoverBorderColor: '#ffffff'
                    }]
                }
            },
            salary: {
                type: 'pie',
                data: {
                    labels: ["0-5 LPA", "5-15 LPA", "15-30 LPA", "30+ LPA"],
                    datasets: [{
                        data: [30, 40, 25, 5],
                        backgroundColor: ["#ff4757", "#ffdd00", "#00ff88", "#00d4ff"],
                        borderWidth: 0
                    }]
                }
            },
            skills: {
                type: 'polarArea',
                data: {
                    labels: ["Programming", "Finance", "Healthcare", "Management", "Design"],
                    datasets: [{
                        data: [40, 25, 15, 15, 5],
                        backgroundColor: ["#00d4ff", "#00ff88", "#8b5cf6", "#ff6b35", "#ff0080"],
                        borderWidth: 2,
                        borderColor: '#1a1a1a'
                    }]
                }
            },
            progress: {
                type: 'doughnut',
                data: {
                    labels: ["Completed", "In Progress", "Not Started"],
                    datasets: [{
                        data: [45, 35, 20],
                        backgroundColor: ["#00ff88", "#ffdd00", "#ff4757"],
                        borderWidth: 0
                    }]
                }
            },
            internships: {
                type: 'pie',
                data: {
                    labels: ["Tech", "Finance", "Healthcare", "Government", "Others"],
                    datasets: [{
                        data: [50, 20, 15, 10, 5],
                        backgroundColor: ["#00d4ff", "#00ff88", "#8b5cf6", "#ff6b35", "#ffdd00"],
                        borderWidth: 0
                    }]
                }
            }
        };

        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        padding: 20,
                        font: {
                            size: 12,
                            family: 'FKGroteskNeue, sans-serif'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(45, 45, 48, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#00d4ff',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value}% (${percentage}% of total)`;
                        }
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: 0,
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#ffffff'
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            interaction: {
                intersect: false,
                mode: 'nearest'
            }
        };

        Object.entries(chartConfigs).forEach(([key, config]) => {
            const canvas = document.querySelector(`canvas[data-chart="${key}"]`);
            if (canvas) {
                const ctx = canvas.getContext('2d');
                this.charts[key] = new Chart(ctx, {
                    ...config,
                    options: commonOptions
                });
            }
        });

        this.initialized = true;
        this.startRealTimeUpdates();
    }

    startRealTimeUpdates() {
        setInterval(() => {
            this.updateRealTimeMetrics();
        }, 30000); // Update every 30 seconds
    }

    updateRealTimeMetrics() {
        this.metrics.realTimeData = {
            activeUsers: Math.floor(Math.random() * 1000) + 500,
            onlineStudents: Math.floor(Math.random() * 300) + 100,
            internshipApplications: Math.floor(Math.random() * 50) + 20,
            resumesDownloaded: Math.floor(Math.random() * 25) + 10
        };

        // Emit event for UI updates
        window.dispatchEvent(new CustomEvent('careerai:metrics:updated', {
            detail: this.metrics
        }));
    }

    generateReport() {
        return {
            timestamp: Date.now(),
            totalUsers: this.metrics.realTimeData.activeUsers,
            engagement: this.calculateEngagement(),
            topPerformingContent: this.getTopContent(),
            userJourney: this.analyzeUserJourney(),
            recommendations: this.getSystemRecommendations()
        };
    }

    calculateEngagement() {
        const { activeUsers, onlineStudents } = this.metrics.realTimeData;
        return {
            engagementRate: ((onlineStudents / activeUsers) * 100).toFixed(1),
            averageSessionTime: Math.floor(Math.random() * 45) + 15,
            pageViewsPerSession: Math.floor(Math.random() * 8) + 3
        };
    }

    getTopContent() {
        return [
            { type: 'Study Material', title: 'Physics Wallah JEE', views: 1247, engagement: 89 },
            { type: 'Internship', title: 'Google SWE Intern', applications: 456, success: 12 },
            { type: 'Career Guide', title: 'Software Development Path', views: 892, rating: 4.8 },
            { type: 'Resume Template', title: 'Modern Professional', downloads: 234, satisfaction: 4.7 }
        ];
    }

    analyzeUserJourney() {
        return {
            commonPaths: [
                'Welcome → Study Materials → Internships → Apply',
                'Welcome → Career Fields → Assessment → Roadmap',
                'Welcome → Resume Builder → Job Portal → Apply',
                'Welcome → AI Coach → Study Materials → Internships'
            ],
            dropOffPoints: [
                { step: 'Assessment', rate: 23 },
                { step: 'Resume Builder Step 3', rate: 18 },
                { step: 'Internship Application', rate: 15 }
            ],
            conversionFunnels: {
                studyMaterialToInternship: 34,
                assessmentToRoadmap: 67,
                resumeBuilderToJobApplication: 45
            }
        };
    }

    getSystemRecommendations() {
        return [
            'Optimize Assessment flow to reduce 23% drop-off rate',
            'Add more CA study materials - highest user demand',
            'Implement push notifications for internship deadlines',
            'Create guided tour for new users',
            'Add video tutorials for resume builder'
        ];
    }
}

// Enhanced AI Coach Engine
class EnhancedAICoachEngine {
    constructor() {
        this.responseDatabase = this.initializeResponseDatabase();
        this.conversationContext = new Map();
        this.userProfiles = new Map();
        this.learningPatterns = this.loadLearningPatterns();
    }

    initializeResponseDatabase() {
        return {
            studyMaterials: [
                "Great choice exploring study materials! For {field}, I highly recommend starting with {topResource}. It has a {rating} rating and covers all fundamentals.",
                "Based on your profile, {field} study materials would be perfect for you. The {platform} platform offers excellent {features} that match your learning style.",
                "I see you're interested in {field}! Here are the top 3 resources I recommend: {resource1}, {resource2}, and {resource3}. Each has unique strengths."
            ],
            internships: [
                "Excellent! Looking at internships in {field}. The {company} internship offers ₹{stipend}/month and great learning opportunities. Application deadline is {deadline}.",
                "Based on your skills in {skills}, I recommend applying to {internshipCount} internships in {field}. Your profile matches well with {topMatch}.",
                "That's a smart move! The {field} field has {growthRate}% growth. I suggest targeting internships at {companies} for the best experience."
            ],
            resumeBuilder: [
                "Let's build an amazing resume! For your {field} background, I recommend the {template} template. It highlights {strengths} effectively.",
                "Perfect timing to build your resume! Based on current job market trends, emphasize these skills: {skills}. They're in high demand.",
                "Great decision! A well-crafted resume increases your chances by 60%. For {experience} level professionals, focus on {keyAreas}."
            ],
            careerGuidance: [
                "The {field} field is experiencing {trend}. With your {background}, I see great potential in {specificRoles}. Here's your personalized roadmap...",
                "Based on your assessment results, you show strong aptitude for {strengths}. Consider exploring {recommendedFields} for the best career fit.",
                "Your career journey in {field} looks promising! The average salary is {salary}, job growth is {growth}%, and top employers are {employers}."
            ],
            jobMarket: [
                "The current job market for {field} is {marketCondition}. There are {jobCount} active openings with average salary of {avgSalary}.",
                "Excellent timing! {field} professionals are in high demand. Top hiring companies include {companies}. I recommend applying to {recommendedJobs}.",
                "Market insights for {field}: {insights}. Your profile strength is {strength}. Focus on {recommendations} to maximize opportunities."
            ],
            motivation: [
                "You're making excellent progress! Your learning streak is {streak} days. Keep building those skills - every expert was once a beginner.",
                "I can see your dedication paying off! You've completed {achievements} and are on track to reach {nextGoal}. Stay motivated!",
                "Remember, career success is a journey, not a destination. You've already accomplished {progress}. Your next milestone is within reach!"
            ]
        };
    }

    loadLearningPatterns() {
        return {
            visualLearner: {
                resources: ['video_tutorials', 'infographics', 'diagrams'],
                studyTips: 'Use mind maps and visual aids',
                recommendedFormats: ['youtube', 'interactive_demos']
            },
            auditoryLearner: {
                resources: ['podcasts', 'audio_books', 'lectures'],
                studyTips: 'Discuss concepts with peers',
                recommendedFormats: ['audio_courses', 'webinars']
            },
            kinestheticLearner: {
                resources: ['hands_on_projects', 'labs', 'simulations'],
                studyTips: 'Learn by doing and practicing',
                recommendedFormats: ['coding_challenges', 'practical_assignments']
            }
        };
    }

    generateEnhancedResponse(message, userContext) {
        const intent = this.classifyIntent(message);
        const personalizedContext = this.buildPersonalizedContext(userContext);
        const response = this.selectContextualResponse(intent, personalizedContext);
        
        // Store conversation context
        this.updateConversationContext(userContext.userId, message, response, intent);
        
        return {
            response,
            suggestions: this.generateSuggestions(intent, personalizedContext),
            quickActions: this.getQuickActions(intent),
            confidence: this.calculateConfidence(intent, message)
        };
    }

    classifyIntent(message) {
        const intents = {
            studyMaterials: ['study', 'material', 'book', 'course', 'learn', 'resource'],
            internships: ['internship', 'intern', 'apply', 'company', 'opportunity'],
            resumeBuilder: ['resume', 'cv', 'build', 'template', 'format'],
            careerGuidance: ['career', 'path', 'guidance', 'advice', 'field', 'future'],
            jobMarket: ['job', 'market', 'hiring', 'salary', 'demand', 'employment'],
            motivation: ['motivation', 'encourage', 'difficult', 'struggle', 'support'],
            assessment: ['assessment', 'skill', 'test', 'evaluate', 'strengths'],
            technical: ['technical', 'programming', 'coding', 'development', 'software']
        };

        const messageLower = message.toLowerCase();
        const scores = {};

        Object.entries(intents).forEach(([intent, keywords]) => {
            scores[intent] = keywords.reduce((score, keyword) => {
                return score + (messageLower.includes(keyword) ? 1 : 0);
            }, 0);
        });

        return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    }

    buildPersonalizedContext(userContext) {
        return {
            field: userContext.selectedField || 'software',
            experience: userContext.experience || 'beginner',
            interests: userContext.interests || [],
            goals: userContext.goals || '',
            completedAssessments: userContext.assessmentResults || null,
            learningStyle: this.detectLearningStyle(userContext),
            preferredTopics: this.extractPreferredTopics(userContext),
            activityHistory: this.getUserActivity(userContext.userId)
        };
    }

    detectLearningStyle(userContext) {
        // Simple heuristic based on user behavior
        if (userContext.videoWatchTime > userContext.readingTime) {
            return 'visual';
        } else if (userContext.practiceTime > userContext.theoryTime) {
            return 'kinesthetic';
        } else {
            return 'auditory';
        }
    }

    selectContextualResponse(intent, context) {
        const responses = this.responseDatabase[intent] || this.responseDatabase.careerGuidance;
        const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
        
        return this.personalizeResponse(selectedResponse, context);
    }

    personalizeResponse(template, context) {
        let response = template;
        
        // Replace placeholders with personalized data
        const replacements = {
            field: this.formatFieldName(context.field),
            experience: context.experience,
            rating: this.getFieldRating(context.field),
            topResource: this.getTopResource(context.field),
            platform: this.getRecommendedPlatform(context.field),
            features: this.getPlatformFeatures(context.field),
            company: this.getTopCompany(context.field),
            stipend: this.getAverageStipend(context.field),
            skills: context.interests.join(', ') || this.getFieldSkills(context.field),
            template: this.getRecommendedTemplate(context.experience),
            strengths: this.getStrengths(context),
            trend: this.getFieldTrend(context.field),
            salary: this.getAverageSalary(context.field),
            growth: this.getGrowthRate(context.field)
        };

        Object.entries(replacements).forEach(([key, value]) => {
            const regex = new RegExp(`{${key}}`, 'g');
            response = response.replace(regex, value);
        });

        return response;
    }

    generateSuggestions(intent, context) {
        const suggestions = {
            studyMaterials: [
                `Show me ${context.field} books`,
                'Find free online courses',
                'YouTube channels for beginners',
                'Mock test platforms'
            ],
            internships: [
                `${context.field} internships`,
                'Internships near me',
                'High-paying internships',
                'Remote internship opportunities'
            ],
            resumeBuilder: [
                'Create my resume',
                'Resume templates',
                'ATS-friendly format',
                'Industry-specific resume'
            ],
            careerGuidance: [
                'Career assessment',
                'Learning roadmap',
                'Industry trends',
                'Salary expectations'
            ]
        };

        return suggestions[intent] || suggestions.careerGuidance;
    }

    getQuickActions(intent) {
        const actions = {
            studyMaterials: [
                { text: '📚 Browse Materials', action: 'goto:study-materials' },
                { text: '🎯 Take Assessment', action: 'goto:assessment' }
            ],
            internships: [
                { text: '💼 View Internships', action: 'goto:internships' },
                { text: '📄 Build Resume', action: 'goto:resume-builder' }
            ],
            resumeBuilder: [
                { text: '📄 Start Resume', action: 'goto:resume-builder' },
                { text: '⚡ Check ATS Score', action: 'goto:ats-checker' }
            ],
            careerGuidance: [
                { text: '🌟 Explore Fields', action: 'goto:fields' },
                { text: '📊 Take Assessment', action: 'goto:assessment' }
            ]
        };

        return actions[intent] || actions.careerGuidance;
    }

    calculateConfidence(intent, message) {
        const keywordMatches = this.countKeywordMatches(intent, message);
        const messageLength = message.split(' ').length;
        const contextRelevance = this.assessContextRelevance(intent);
        
        // Simple confidence calculation
        const confidence = Math.min(100, (keywordMatches * 30) + (messageLength * 2) + (contextRelevance * 20));
        return Math.max(60, confidence); // Minimum 60% confidence
    }

    countKeywordMatches(intent, message) {
        const intents = {
            studyMaterials: ['study', 'material', 'book', 'course', 'learn'],
            internships: ['internship', 'apply', 'company', 'opportunity'],
            resumeBuilder: ['resume', 'cv', 'build', 'template'],
            careerGuidance: ['career', 'advice', 'guidance', 'path']
        };

        const keywords = intents[intent] || [];
        const messageLower = message.toLowerCase();
        return keywords.filter(keyword => messageLower.includes(keyword)).length;
    }

    // Helper methods for generating personalized content
    formatFieldName(field) {
        const names = {
            ca: 'CA (Chartered Accountant)',
            engineering: 'Engineering',
            upsc: 'UPSC/Civil Services',
            medical: 'Medical/Healthcare',
            software: 'Software Engineering'
        };
        return names[field] || field;
    }

    getFieldRating(field) {
        const ratings = { ca: 4.6, engineering: 4.7, upsc: 4.5, medical: 4.8, software: 4.6 };
        return ratings[field] || 4.5;
    }

    getTopResource(field) {
        const resources = {
            ca: 'Unacademy CA Foundation Course',
            engineering: 'Physics Wallah JEE Course',
            upsc: 'Vision IAS Study Material',
            medical: 'Physics Wallah NEET Course',
            software: 'freeCodeCamp Full Stack Course'
        };
        return resources[field] || 'Professional Course';
    }

    getAverageStipend(field) {
        const stipends = { software: 65000, ca: 23500, medical: 32500, government: 13500 };
        return stipends[field] || 35000;
    }

    getFieldSkills(field) {
        const skills = {
            software: 'JavaScript, Python, React',
            ca: 'Accounting, Taxation, Audit',
            medical: 'Clinical Skills, Patient Care',
            engineering: 'Problem Solving, Mathematics'
        };
        return skills[field] || 'Core Skills';
    }

    updateConversationContext(userId, message, response, intent) {
        if (!this.conversationContext.has(userId)) {
            this.conversationContext.set(userId, []);
        }
        
        const context = this.conversationContext.get(userId);
        context.push({
            message,
            response: response.response || response,
            intent,
            timestamp: Date.now()
        });
        
        // Keep only last 10 exchanges
        if (context.length > 10) {
            context.splice(0, context.length - 10);
        }
    }
}

// Enhanced Resume Builder Engine
class EnhancedResumeBuilder {
    constructor() {
        this.templates = this.loadTemplates();
        this.sections = this.initializeSections();
        this.atsKeywords = this.loadATSKeywords();
        this.industryStandards = this.loadIndustryStandards();
    }

    loadTemplates() {
        return {
            modern: {
                name: 'Modern Professional',
                style: 'clean, modern design with accent colors',
                sections: ['header', 'summary', 'experience', 'education', 'skills', 'projects'],
                colors: { primary: '#00d4ff', secondary: '#8b5cf6' },
                fonts: { primary: 'FKGroteskNeue', secondary: 'Arial' }
            },
            classic: {
                name: 'Classic Business',
                style: 'traditional format for corporate positions',
                sections: ['header', 'objective', 'experience', 'education', 'skills'],
                colors: { primary: '#2d2d30', secondary: '#626262' },
                fonts: { primary: 'Times New Roman', secondary: 'Arial' }
            },
            creative: {
                name: 'Creative Designer',
                style: 'vibrant design for creative professionals',
                sections: ['header', 'portfolio', 'experience', 'education', 'skills', 'projects'],
                colors: { primary: '#ff6b35', secondary: '#ff0080' },
                fonts: { primary: 'Montserrat', secondary: 'Open Sans' }
            }
        };
    }

    initializeSections() {
        return {
            personalInfo: {
                required: ['name', 'email', 'phone'],
                optional: ['linkedin', 'github', 'portfolio', 'location']
            },
            summary: {
                maxLength: 150,
                tips: ['Start with your years of experience', 'Highlight key skills', 'Mention career goals']
            },
            experience: {
                fields: ['title', 'company', 'location', 'startDate', 'endDate', 'description'],
                tips: ['Use action verbs', 'Quantify achievements', 'Include relevant keywords']
            },
            education: {
                fields: ['degree', 'institution', 'location', 'graduationDate', 'gpa'],
                tips: ['Include relevant coursework', 'Mention honors/awards', 'Add certifications']
            },
            skills: {
                categories: ['technical', 'soft', 'languages', 'tools'],
                tips: ['Group similar skills', 'Use industry keywords', 'Rate proficiency levels']
            }
        };
    }

    loadATSKeywords() {
        return {
            software: [
                'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'API', 'Frontend',
                'Backend', 'Full Stack', 'Agile', 'Scrum', 'DevOps', 'Cloud', 'Testing'
            ],
            business: [
                'Management', 'Leadership', 'Strategy', 'Analysis', 'Project Management',
                'Communication', 'Teamwork', 'Problem Solving', 'Excel', 'Data Analysis'
            ],
            healthcare: [
                'Patient Care', 'Clinical', 'Medical', 'Healthcare', 'Nursing', 'Treatment',
                'Diagnosis', 'Emergency', 'Compliance', 'Documentation', 'Teamwork'
            ]
        };
    }

    buildResume(data, templateId) {
        const template = this.templates[templateId] || this.templates.modern;
        const optimizedData = this.optimizeForATS(data);
        const formattedResume = this.formatResume(optimizedData, template);
        
        return {
            html: formattedResume.html,
            css: formattedResume.css,
            atsScore: this.calculateATSScore(optimizedData),
            recommendations: this.getOptimizationTips(optimizedData)
        };
    }

    optimizeForATS(data) {
        const optimized = { ...data };
        
        // Optimize job descriptions with keywords
        if (optimized.experience) {
            optimized.experience = optimized.experience.map(job => ({
                ...job,
                description: this.enhanceDescription(job.description, job.industry)
            }));
        }
        
        // Optimize skills section
        if (optimized.skills) {
            optimized.skills = this.optimizeSkills(optimized.skills);
        }
        
        return optimized;
    }

    enhanceDescription(description, industry) {
        if (!description) return description;
        
        const keywords = this.atsKeywords[industry] || this.atsKeywords.software;
        let enhanced = description;
        
        // Add relevant keywords naturally
        keywords.forEach(keyword => {
            if (!enhanced.toLowerCase().includes(keyword.toLowerCase())) {
                // Try to incorporate keyword naturally
                if (Math.random() > 0.7) { // 30% chance to add each keyword
                    enhanced += ` Utilized ${keyword} effectively.`;
                }
            }
        });
        
        return enhanced;
    }

    calculateATSScore(data) {
        let score = 0;
        let maxScore = 100;
        
        // Check required sections
        if (data.personalInfo?.name) score += 10;
        if (data.personalInfo?.email) score += 10;
        if (data.personalInfo?.phone) score += 10;
        if (data.experience?.length > 0) score += 20;
        if (data.education?.length > 0) score += 15;
        if (data.skills?.length > 0) score += 15;
        
        // Check for keywords
        const industryKeywords = this.atsKeywords.software; // Default to software
        const contentText = JSON.stringify(data).toLowerCase();
        const keywordMatches = industryKeywords.filter(keyword => 
            contentText.includes(keyword.toLowerCase())
        ).length;
        
        score += Math.min(20, keywordMatches * 2); // Up to 20 points for keywords
        
        return Math.round(score);
    }

    getOptimizationTips(data) {
        const tips = [];
        
        if (!data.personalInfo?.linkedin) {
            tips.push('Add LinkedIn profile URL to increase visibility');
        }
        
        if (!data.summary || data.summary.length < 50) {
            tips.push('Add a compelling professional summary (50-150 words)');
        }
        
        if (!data.skills || data.skills.length < 5) {
            tips.push('Include more relevant technical and soft skills');
        }
        
        if (data.experience && data.experience.some(job => !job.description)) {
            tips.push('Add detailed descriptions for all work experiences');
        }
        
        return tips;
    }

    formatResume(data, template) {
        const html = this.generateHTML(data, template);
        const css = this.generateCSS(template);
        
        return { html, css };
    }

    generateHTML(data, template) {
        return `
            <div class="resume-container">
                <header class="resume-header">
                    <h1>${data.personalInfo?.name || 'Your Name'}</h1>
                    <div class="contact-info">
                        <span>${data.personalInfo?.email || 'email@example.com'}</span>
                        <span>${data.personalInfo?.phone || 'Phone Number'}</span>
                    </div>
                </header>
                
                ${data.summary ? `<section class="summary">
                    <h2>Professional Summary</h2>
                    <p>${data.summary}</p>
                </section>` : ''}
                
                ${data.experience ? `<section class="experience">
                    <h2>Experience</h2>
                    ${data.experience.map(job => `
                        <div class="job">
                            <h3>${job.title}</h3>
                            <div class="job-details">
                                <span>${job.company}</span>
                                <span>${job.startDate} - ${job.endDate || 'Present'}</span>
                            </div>
                            <p>${job.description}</p>
                        </div>
                    `).join('')}
                </section>` : ''}
                
                ${data.skills ? `<section class="skills">
                    <h2>Skills</h2>
                    <div class="skills-list">
                        ${data.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
                    </div>
                </section>` : ''}
            </div>
        `;
    }

    generateCSS(template) {
        return `
            .resume-container {
                font-family: ${template.fonts.primary}, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 40px;
                color: #333;
                line-height: 1.6;
            }
            
            .resume-header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid ${template.colors.primary};
                padding-bottom: 20px;
            }
            
            .resume-header h1 {
                color: ${template.colors.primary};
                font-size: 2.5rem;
                margin: 0;
            }
            
            .contact-info {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 10px;
            }
            
            section {
                margin-bottom: 30px;
            }
            
            section h2 {
                color: ${template.colors.primary};
                font-size: 1.4rem;
                border-bottom: 1px solid ${template.colors.secondary};
                padding-bottom: 5px;
            }
            
            .job {
                margin-bottom: 20px;
            }
            
            .job h3 {
                color: ${template.colors.secondary};
                margin: 0;
            }
            
            .job-details {
                display: flex;
                justify-content: space-between;
                font-style: italic;
                margin-bottom: 10px;
            }
            
            .skills-list {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .skill {
                background: ${template.colors.primary}20;
                color: ${template.colors.primary};
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
            }
        `;
    }
}

// Job Search Engine
class JobSearchEngine {
    constructor() {
        this.jobDatabase = this.initializeJobDatabase();
        this.searchHistory = this.loadSearchHistory();
        this.savedJobs = this.loadSavedJobs();
    }

    initializeJobDatabase() {
        return [
            {
                id: 1,
                title: "Senior Software Engineer",
                company: "Google",
                location: "Bangalore",
                salary: "₹25-40 LPA",
                experience: "3-5 years",
                skills: ["JavaScript", "React", "Node.js", "Python"],
                description: "Build scalable web applications used by millions of users.",
                posted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                applicationLink: "https://careers.google.com/",
                type: "Full-time",
                remote: false,
                urgency: "high"
            },
            {
                id: 2,
                title: "Data Scientist",
                company: "Microsoft",
                location: "Hyderabad",
                salary: "₹20-35 LPA",
                experience: "2-4 years",
                skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
                description: "Develop AI solutions for enterprise customers.",
                posted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                applicationLink: "https://careers.microsoft.com/",
                type: "Full-time",
                remote: true,
                urgency: "medium"
            },
            {
                id: 3,
                title: "Product Manager",
                company: "Amazon",
                location: "Bangalore",
                salary: "₹30-50 LPA",
                experience: "4-7 years",
                skills: ["Product Strategy", "Analytics", "Leadership", "Agile"],
                description: "Lead product development for Amazon's next generation services.",
                posted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                applicationLink: "https://amazon.jobs/",
                type: "Full-time",
                remote: false,
                urgency: "high"
            },
            {
                id: 4,
                title: "Frontend Developer",
                company: "Flipkart",
                location: "Bangalore",
                salary: "₹12-20 LPA",
                experience: "1-3 years",
                skills: ["React", "JavaScript", "CSS", "HTML"],
                description: "Create beautiful, responsive user interfaces for e-commerce platform.",
                posted: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                applicationLink: "https://www.flipkartcareers.com/",
                type: "Full-time",
                remote: true,
                urgency: "medium"
            },
            {
                id: 5,
                title: "DevOps Engineer",
                company: "Zomato",
                location: "Gurgaon",
                salary: "₹15-25 LPA",
                experience: "2-5 years",
                skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
                description: "Manage infrastructure and deployment pipelines for food delivery platform.",
                posted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                applicationLink: "https://www.zomato.com/careers",
                type: "Full-time",
                remote: false,
                urgency: "low"
            }
        ];
    }

    searchJobs(query, filters = {}) {
        let results = this.jobDatabase;
        
        // Text search
        if (query) {
            const queryLower = query.toLowerCase();
            results = results.filter(job => 
                job.title.toLowerCase().includes(queryLower) ||
                job.company.toLowerCase().includes(queryLower) ||
                job.skills.some(skill => skill.toLowerCase().includes(queryLower)) ||
                job.description.toLowerCase().includes(queryLower)
            );
        }
        
        // Apply filters
        if (filters.location) {
            results = results.filter(job => 
                job.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }
        
        if (filters.experience) {
            results = results.filter(job => 
                job.experience.includes(filters.experience)
            );
        }
        
        if (filters.remote !== undefined) {
            results = results.filter(job => job.remote === filters.remote);
        }
        
        if (filters.salary) {
            results = results.filter(job => this.matchesSalaryRange(job.salary, filters.salary));
        }
        
        // Sort by relevance and date
        results = this.sortJobs(results, query);
        
        // Save search
        this.saveSearch(query, filters, results.length);
        
        return {
            jobs: results,
            totalCount: results.length,
            searchTime: Date.now(),
            suggestions: this.generateSearchSuggestions(query, results)
        };
    }

    sortJobs(jobs, query) {
        return jobs.sort((a, b) => {
            // Prioritize urgency
            const urgencyWeight = { high: 3, medium: 2, low: 1 };
            const urgencyDiff = urgencyWeight[b.urgency] - urgencyWeight[a.urgency];
            if (urgencyDiff !== 0) return urgencyDiff;
            
            // Then by relevance (if query exists)
            if (query) {
                const aRelevance = this.calculateRelevance(a, query);
                const bRelevance = this.calculateRelevance(b, query);
                if (aRelevance !== bRelevance) return bRelevance - aRelevance;
            }
            
            // Finally by date posted (newest first)
            return b.posted - a.posted;
        });
    }

    calculateRelevance(job, query) {
        const queryLower = query.toLowerCase();
        let score = 0;
        
        // Title match (highest weight)
        if (job.title.toLowerCase().includes(queryLower)) score += 10;
        
        // Company match
        if (job.company.toLowerCase().includes(queryLower)) score += 5;
        
        // Skills match
        job.skills.forEach(skill => {
            if (skill.toLowerCase().includes(queryLower)) score += 3;
        });
        
        // Description match
        if (job.description.toLowerCase().includes(queryLower)) score += 2;
        
        return score;
    }

    saveSearch(query, filters, resultCount) {
        this.searchHistory.push({
            query,
            filters,
            resultCount,
            timestamp: Date.now()
        });
        
        // Keep only last 50 searches
        if (this.searchHistory.length > 50) {
            this.searchHistory.splice(0, this.searchHistory.length - 50);
        }
        
        localStorage.setItem('careerai_search_history', JSON.stringify(this.searchHistory));
    }

    generateSearchSuggestions(query, results) {
        const suggestions = [];
        
        // Popular searches
        suggestions.push(...[
            'Software Engineer',
            'Data Scientist',
            'Product Manager',
            'Frontend Developer',
            'Backend Developer'
        ]);
        
        // Location-based suggestions
        const locations = [...new Set(results.map(job => job.location))];
        suggestions.push(...locations.map(loc => `Jobs in ${loc}`));
        
        // Company suggestions
        const companies = [...new Set(results.map(job => job.company))];
        suggestions.push(...companies.slice(0, 3));
        
        return suggestions.slice(0, 8); // Limit to 8 suggestions
    }

    saveJob(jobId) {
        const job = this.jobDatabase.find(j => j.id === jobId);
        if (job && !this.savedJobs.find(saved => saved.id === jobId)) {
            this.savedJobs.push({
                ...job,
                savedAt: Date.now()
            });
            localStorage.setItem('careerai_saved_jobs', JSON.stringify(this.savedJobs));
            return true;
        }
        return false;
    }

    getSavedJobs() {
        return this.savedJobs.sort((a, b) => b.savedAt - a.savedAt);
    }

    loadSearchHistory() {
        const saved = localStorage.getItem('careerai_search_history');
        return saved ? JSON.parse(saved) : [];
    }

    loadSavedJobs() {
        const saved = localStorage.getItem('careerai_saved_jobs');
        return saved ? JSON.parse(saved) : [];
    }

    matchesSalaryRange(jobSalary, filterSalary) {
        // Simple salary matching logic
        const jobRange = this.parseSalaryRange(jobSalary);
        const filterRange = this.parseSalaryRange(filterSalary);
        
        return jobRange.min <= filterRange.max && jobRange.max >= filterRange.min;
    }

    parseSalaryRange(salaryString) {
        const matches = salaryString.match(/₹(\d+)-(\d+)/);
        if (matches) {
            return {
                min: parseInt(matches[1]),
                max: parseInt(matches[2])
            };
        }
        return { min: 0, max: 100 };
    }
}

// Application Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoadTime: 0,
            apiResponseTimes: [],
            userInteractions: [],
            errors: [],
            memoryUsage: []
        };
        this.startTime = performance.now();
        this.init();
    }

    init() {
        this.measurePageLoad();
        this.trackUserInteractions();
        this.monitorErrors();
        this.trackMemoryUsage();
        this.setupPeriodicReporting();
    }

    measurePageLoad() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadTime = performance.now() - this.startTime;
                this.metrics.pageLoadTime = loadTime;
                this.reportMetric('page_load_time', loadTime);
            }, 0);
        });
    }

    trackUserInteractions() {
        ['click', 'scroll', 'keydown'].forEach(eventType => {
            document.addEventListener(eventType, (event) => {
                this.metrics.userInteractions.push({
                    type: eventType,
                    target: event.target.tagName,
                    timestamp: performance.now()
                });
            }, { passive: true });
        });
    }

    monitorErrors() {
        window.addEventListener('error', (event) => {
            this.metrics.errors.push({
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                timestamp: Date.now()
            });
            this.reportError(event);
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.metrics.errors.push({
                message: 'Unhandled Promise Rejection',
                reason: event.reason,
                timestamp: Date.now()
            });
        });
    }

    trackMemoryUsage() {
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memoryUsage.push({
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    timestamp: Date.now()
                });
            }, 30000); // Every 30 seconds
        }
    }

    setupPeriodicReporting() {
        setInterval(() => {
            this.generateReport();
        }, 300000); // Every 5 minutes
    }

    reportMetric(name, value) {
        console.log(`📊 Performance Metric - ${name}: ${value.toFixed(2)}ms`);
    }

    reportError(error) {
        console.error('🚨 Application Error:', error);
    }

    generateReport() {
        const report = {
            pageLoadTime: this.metrics.pageLoadTime,
            totalInteractions: this.metrics.userInteractions.length,
            totalErrors: this.metrics.errors.length,
            averageMemoryUsage: this.calculateAverageMemory(),
            timestamp: Date.now()
        };

        console.log('📈 Performance Report:', report);
        return report;
    }

    calculateAverageMemory() {
        if (this.metrics.memoryUsage.length === 0) return 0;
        
        const total = this.metrics.memoryUsage.reduce((sum, reading) => sum + reading.used, 0);
        return total / this.metrics.memoryUsage.length;
    }
}

// Initialize enhanced features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced CareerAI Platform Loading...');
    
    // Initialize core systems
    window.enhancedCareerDataManager = new EnhancedCareerDataManager();
    window.advancedAnalyticsEngine = new AdvancedAnalyticsEngine();
    window.enhancedAICoachEngine = new EnhancedAICoachEngine();
    window.enhancedResumeBuilder = new EnhancedResumeBuilder();
    window.jobSearchEngine = new JobSearchEngine();
    window.performanceMonitor = new PerformanceMonitor();
    
    // Initialize charts when analytics page is visited
    const initializeChartsOnView = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('chart-container')) {
                    window.advancedAnalyticsEngine.initializeCharts();
                    observer.disconnect();
                }
            });
        });

        document.querySelectorAll('.chart-container').forEach(container => {
            observer.observe(container);
        });
    };

    // Wait for React to render charts
    setTimeout(() => {
        initializeChartsOnView();
    }, 1000);
    
    // Setup global event listeners
    setupGlobalEventListeners();
    initializeKeyboardShortcuts();
    initializeAccessibilityFeatures();
    setupServiceWorker();
    
    console.log('✅ Enhanced CareerAI Platform Loaded Successfully!');
    
    // Dispatch ready event
    window.dispatchEvent(new CustomEvent('careerai:enhanced:ready', {
        detail: {
            timestamp: Date.now(),
            features: [
                'enhanced-data-management',
                'advanced-analytics',
                'enhanced-ai-coach',
                'enhanced-resume-builder',
                'job-search-engine',
                'performance-monitoring'
            ]
        }
    }));
});

// Global Event Listeners
function setupGlobalEventListeners() {
    // Handle study material bookmarking
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('bookmark-material')) {
            const field = e.target.dataset.field;
            const materialData = JSON.parse(e.target.dataset.material);
            window.enhancedCareerDataManager.bookmarkStudyMaterial(field, materialData);
        }
    });

    // Handle internship applications
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('apply-btn')) {
            const internshipData = JSON.parse(e.target.dataset.internship || '{}');
            if (internshipData.id) {
                window.enhancedCareerDataManager.applyToInternship(internshipData);
            }
        }
    });

    // Handle job saving
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('save-job')) {
            const jobId = parseInt(e.target.dataset.jobId);
            const saved = window.jobSearchEngine.saveJob(jobId);
            if (saved) {
                e.target.textContent = '✅ Saved';
                e.target.disabled = true;
            }
        }
    });
}

// Enhanced Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    const shortcuts = {
        'ctrl+k': () => focusSearchInput(),
        'ctrl+h': () => goToHome(),
        'ctrl+1': () => navigateToSection('study-materials'),
        'ctrl+2': () => navigateToSection('internships'),
        'ctrl+3': () => navigateToSection('resume-builder'),
        'ctrl+4': () => navigateToSection('job-portal'),
        'ctrl+5': () => navigateToSection('coach'),
        'escape': () => closeModals()
    };

    document.addEventListener('keydown', (e) => {
        const key = (e.ctrlKey || e.metaKey ? 'ctrl+' : '') + e.key.toLowerCase();
        if (shortcuts[key]) {
            e.preventDefault();
            shortcuts[key]();
        }
    });
}

function focusSearchInput() {
    const searchInputs = document.querySelectorAll('input[type="search"], .job-search-input, .chat-form input');
    const visibleInput = Array.from(searchInputs).find(input => 
        input.offsetParent !== null && !input.disabled
    );
    if (visibleInput) visibleInput.focus();
}

function goToHome() {
    const homeButton = document.querySelector('.logo');
    if (homeButton) homeButton.click();
}

function navigateToSection(section) {
    const navButton = document.querySelector(`[data-section="${section}"]`);
    if (navButton) navButton.click();
}

function closeModals() {
    document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
        modal.classList.add('hidden');
    });
}

// Enhanced Accessibility Features
function initializeAccessibilityFeatures() {
    // Add ARIA labels to dynamic content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    enhanceAccessibility(node);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial enhancement
    enhanceAccessibility(document.body);
}

function enhanceAccessibility(element) {
    // Add ARIA labels to cards
    element.querySelectorAll('.field-card, .material-card, .internship-card, .job-card').forEach((card, index) => {
        if (!card.getAttribute('aria-label')) {
            const title = card.querySelector('h3, h4')?.textContent || `Card ${index + 1}`;
            card.setAttribute('aria-label', title);
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            
            // Add keyboard navigation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        }
    });

    // Add screen reader announcements
    element.querySelectorAll('[data-announce]').forEach(el => {
        if (!el.getAttribute('aria-live')) {
            el.setAttribute('aria-live', 'polite');
        }
    });
}

// Service Worker Setup
function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('📱 Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    }
}

// Utility Functions
window.CareerAIUtils = {
    // Format numbers with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // Format dates
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Calculate time ago
    timeAgo: (date) => {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now - past;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    },

    // Generate unique IDs
    generateId: (prefix = 'id') => {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // Debounce function
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

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Copy to clipboard
    copyToClipboard: (text) => {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return Promise.resolve();
        }
    },

    // Download file
    downloadFile: (content, filename, type = 'text/plain') => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // Local storage helpers
    storage: {
        get: (key) => {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch {
                return localStorage.getItem(key);
            }
        },
        set: (key, value) => {
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
        },
        remove: (key) => {
            localStorage.removeItem(key);
        }
    },

    // Validation helpers
    validation: {
        email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        phone: (phone) => /^\d{10}$/.test(phone.replace(/\D/g, '')),
        url: (url) => {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        }
    }
};

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EnhancedCareerDataManager,
        AdvancedAnalyticsEngine,
        EnhancedAICoachEngine,
        EnhancedResumeBuilder,
        JobSearchEngine,
        PerformanceMonitor
    };
}
