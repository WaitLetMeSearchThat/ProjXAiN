<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';

// Import images (assuming they're in your public or assets folder)
// You'll need to add these images to your project
import erdImage from '@/assets/erd-diagram.png'; // Replace with actual path
import flowchartImage from '@/assets/flowchart.png'; // Replace with actual path
import frontendTechImage from '@/assets/frontend-tech.png';
import backendApiImage from '@/assets/backend-api.png';
import agileScrumImage from '@/assets/agile-scrum.png';
import ganttChartImage from '@/assets/gantt-chart.png';

// --- Consolidated Content Data for All Tabs ---
const allArticles = {
    // Tab 1 Content: System Analyst (Includes ERD and Flow Chart)
    analyst: {
        title: 'System Analyst: The Brain',
        subtitle: 'Transforming requirements into actionable system designs',
        author: 'Feleciano L. Santiago jr., MSIT',
        date: 'December 10, 2025',
        readTime: '8 min read',
        featuredImage: erdImage,
        sections: [
            {
                id: 'analyst_role',
                title: 'The System Analyst: Understanding the Role',
                content: `The **System Analyst** acts as a crucial bridge between business needs and technical solutions. In today's complex digital landscape, they serve as translators who convert vague business objectives into precise technical specifications that developers can implement.`,
                subsections: [
                    {
                        title: 'Key Responsibilities',
                        content: `• **Requirements Gathering**: Conducting interviews, workshops, and surveys to understand stakeholder needs
• **Problem Analysis**: Identifying bottlenecks and inefficiencies in current systems
• **Documentation**: Creating detailed requirement specifications, use cases, and user stories
• **Stakeholder Communication**: Bridging the gap between technical teams and business users`
                    },
                    {
                        title: 'Essential Skills',
                        content: `• Analytical thinking and problem-solving
• Excellent communication and facilitation skills
• Technical understanding of systems and databases
• Business process modeling expertise`
                    }
                ]
            },
            {
                id: 'erd',
                title: 'Entity-Relationship Diagrams (ERD): Visualizing Data Structure',
                content: `An **Entity-Relationship Diagram (ERD)** is more than just a technical drawing—it's a visual language that communicates how data should be organized and connected within a system. Think of it as the blueprint for your database architecture.`,
                image: erdImage,
                imageCaption: 'Figure 1: Sample ERD showing Customer, Order, and Product entities with their relationships',
                subsections: [
                    {
                        title: 'Core Components',
                        content: `**Entities**: Represent real-world objects (e.g., Customer, Product, Order)
**Attributes**: Properties of entities (e.g., Customer Name, Product Price)
**Relationships**: Connections between entities (e.g., Customer places Order)
**Cardinality**: Defines relationship types (One-to-One, One-to-Many, Many-to-Many)`
                    },
                    {
                        title: 'Practical Application',
                        content: `ERDs help prevent data redundancy, ensure data integrity, and provide developers with a clear database structure before writing any code. They're essential for discussions between analysts, developers, and stakeholders.`
                    }
                ]
            },
            {
                id: 'flow_chart',
                title: 'Flow Charts: Mapping Processes and Logic',
                content: `**Flow Charts** transform complex processes into understandable visual diagrams. Whether you're mapping a business workflow or programming logic, flow charts provide clarity and help identify optimization opportunities.`,
                image: flowchartImage,
                imageCaption: 'Figure 2: Sample flow chart showing user registration process with decision points',
                subsections: [
                    {
                        title: 'Standard Symbols and Their Meanings',
                        content: `🟦 **Oval**: Start/End points
🟧 **Rectangle**: Process or action step
⬢ **Diamond**: Decision point (Yes/No questions)
➡️ **Arrow**: Flow direction
📄 **Document**: Document output
💾 **Database**: Data storage`
                    },
                    {
                        title: 'When to Use Flow Charts',
                        content: `• Documenting business processes for training
• Designing algorithm logic before coding
• Troubleshooting complex systems
• Standardizing procedures across departments
• Identifying bottlenecks in workflows`
                    }
                ]
            },
        ],
    },

    // Tab 2 Content: Front-end Developer
    frontend: {
        title: 'Front-end Development: Where design meets functionality in the browser',
        subtitle: 'Nan',
        author: 'Feleciano L. Santiago jr., MSIT',
        date: 'December 10, 2025',
        readTime: '6 min read',
        featuredImage: frontendTechImage,
        sections: [
            {
                id: 'frontend_role',
                title: 'The Art and Science of Front-end Development',
                content: `**Front-end Developers** are the architects of user experience, transforming designs into interactive, accessible, and performant interfaces. They're the bridge between visual design and technical implementation.`,
                subsections: [
                    {
                        title: 'Core Responsibilities',
                        content: `• **UI Implementation**: Converting designs to code with pixel-perfect precision
• **User Experience**: Ensuring intuitive navigation and interactions
• **Performance Optimization**: Minimizing load times and improving responsiveness
• **Cross-browser Compatibility**: Consistent experience across all browsers
• **Mobile Responsiveness**: Adapting layouts for different screen sizes`
                    },
                    {
                        title: 'The Developer-Designer Partnership',
                        content: `Successful front-end development requires close collaboration with UI/UX designers, understanding design systems, and providing technical feedback on feasibility and implementation approaches.`
                    }
                ]
            },
            {
                id: 'frontend_tech',
                title: 'Modern Front-end Stack: Tools of the Trade',
                content: `The front-end landscape has evolved from simple HTML/CSS to sophisticated frameworks and tools that enable complex applications. Here's what's in a modern front-end developer's toolkit.`,
                image: frontendTechImage,
                imageCaption: 'Figure 1: Modern front-end technology stack including frameworks, tools, and workflows',
                subsections: [
                    {
                        title: 'Core Technologies',
                        content: `**HTML5**: Semantic markup and structure
**CSS3**: Styling, layouts (Flexbox, Grid), and animations
**JavaScript (ES6+)**: Interactivity and dynamic content
**TypeScript**: Type-safe JavaScript for larger applications`
                    },
                    {
                        title: 'Frameworks & Libraries',
                        content: `**Vue.js** (as used in this article!): Progressive framework for building UIs
**React**: Component-based library by Facebook
**Angular**: Full-fledged framework by Google
**Svelte**: Compiler approach for efficient runtime`
                    },
                    {
                        title: 'Build Tools & Workflow',
                        content: `**Vite**: Next-generation build tool (fast!)
**Webpack**: Module bundler
**npm/yarn**: Package management
**Git**: Version control and collaboration`
                    }
                ]
            },
            {
                id: 'frontend_goals',
                title: 'Performance, Accessibility, and Best Practices',
                content: `Great front-end development goes beyond making things look good—it's about making them work well for everyone, everywhere.`,
                subsections: [
                    {
                        title: 'Performance Metrics',
                        content: `• **Largest Contentful Paint (LCP)**: < 2.5 seconds
• **First Input Delay (FID)**: < 100 milliseconds
• **Cumulative Layout Shift (CLS)**: < 0.1
• **Core Web Vitals**: Google's performance standards`
                    },
                    {
                        title: 'Accessibility (a11y)',
                        content: `**WCAG Guidelines**: Web Content Accessibility Guidelines
**ARIA Attributes**: Enhancing screen reader compatibility
**Keyboard Navigation**: Full functionality without mouse
**Color Contrast**: Readable text for all users
**Semantic HTML**: Proper element usage for assistive tech`
                    },
                    {
                        title: 'Responsive Design Principles',
                        content: `**Mobile-First Approach**: Design for small screens first
**Fluid Grids**: Flexible layouts using percentages
**Flexible Images**: Images that scale appropriately
**Media Queries**: Conditional styling based on device`
                    }
                ]
            },
        ],
    },

    // Tab 3 Content: Backend Developer
    backend: {
        title: 'Backend Development: The Core of the Systems',
        subtitle: 'Building secure, scalable, and efficient server-side systems',
        author: 'Xian Santiago',
        date: 'December 10, 2025',
        readTime: '7 min read',
        featuredImage: backendApiImage,
        sections: [
            {
                id: 'backend_role',
                title: 'The Invisible Architect: Backend Developer',
                content: `While front-end developers craft what users see, **Backend Developers** build the infrastructure that makes everything work. They're responsible for the logic, data management, and security that power modern applications.`,
                subsections: [
                    {
                        title: 'Core Responsibilities',
                        content: `• **Server-Side Logic**: Processing requests and executing business rules
• **Database Management**: Designing, implementing, and optimizing databases
• **API Development**: Creating endpoints for front-end communication
• **Authentication & Authorization**: Securing user data and access
• **System Integration**: Connecting with third-party services and APIs`
                    }
                ]
            },
            {
                id: 'backend_logic',
                title: 'Application Logic and API Design',
                content: `APIs (Application Programming Interfaces) are the contracts between front-end and back-end, defining how different software components should interact.`,
                image: backendApiImage,
                imageCaption: 'Figure 1: REST API architecture showing client-server communication',
                subsections: [
                    {
                        title: 'API Design Patterns',
                        content: `**RESTful APIs**: Stateless, resource-based architecture
**GraphQL**: Flexible query language for efficient data fetching
**gRPC**: High-performance RPC framework for microservices
**WebSockets**: Real-time bidirectional communication`
                    },
                    {
                        title: 'Best Practices',
                        content: `• **Versioning**: Manage breaking changes gracefully (e.g., /api/v1/users)
• **Pagination**: Handle large datasets efficiently
• **Rate Limiting**: Prevent abuse and ensure fair usage
• **Error Handling**: Consistent error responses and codes
• **Documentation**: Clear API documentation (Swagger/OpenAPI)`
                    }
                ]
            },
            {
                id: 'backend_db',
                title: 'Database Management and Security',
                content: `Data is the lifeblood of applications, and backend developers are its guardians. Proper database design and security practices are non-negotiable.`,
                subsections: [
                    {
                        title: 'Database Types & Choices',
                        content: `**SQL Databases**: Structured, relational (MySQL, PostgreSQL)
**NoSQL Databases**: Flexible, document-based (MongoDB, Firebase)
**In-Memory Databases**: Caching layer (Redis, Memcached)
**Time-Series Databases**: For temporal data (InfluxDB)`
                    },
                    {
                        title: 'Security Imperatives',
                        content: `**Encryption**: Data at rest and in transit (TLS/SSL)
**Input Validation**: Prevent SQL injection and XSS attacks
**Authentication**: OAuth, JWT, session management
**Authorization**: Role-based access control (RBAC)
**Audit Logging**: Track all sensitive operations`
                    },
                    {
                        title: 'Performance Optimization',
                        content: `• **Indexing**: Proper database indexing for faster queries
• **Query Optimization**: Efficient SQL/NoSQL queries
• **Connection Pooling**: Reuse database connections
• **Caching Strategies**: Reduce database load with caching`
                    }
                ]
            },
        ],
    },

    // Tab 4 Content: Project Manager
    pm: {
        title: 'Project Management: Orchestrating Successful Delivery',
        subtitle: 'Leading teams and projects from concept to completion',
        author: 'Xian Santiago',
        date: 'December 10, 2025',
        readTime: '9 min read',
        featuredImage: agileScrumImage,
        sections: [
            {
                id: 'pm_role',
                title: 'The Project Manager: Leader, Communicator, Problem-Solver',
                content: `**Project Managers** are the conductors of the development orchestra, ensuring every team member plays their part at the right time to create harmonious results.`,
                subsections: [
                    {
                        title: 'Core Responsibilities',
                        content: `• **Scope Management**: Defining and controlling what's in/out of the project
• **Timeline Management**: Creating and maintaining project schedules
• **Resource Allocation**: Assigning team members and budget effectively
• **Risk Management**: Identifying and mitigating potential issues
• **Stakeholder Communication**: Keeping everyone informed and aligned`
                    }
                ]
            },
            {
                id: 'pm_planning',
                title: 'Planning, Scheduling, and Resource Management',
                content: `Effective planning separates successful projects from failed ones. Modern PMs use a variety of tools and techniques to keep projects on track.`,
                image: ganttChartImage,
                imageCaption: 'Figure 1: Gantt chart showing project timeline with dependencies',
                subsections: [
                    {
                        title: 'Planning Tools & Techniques',
                        content: `**Gantt Charts**: Visual timeline with task dependencies
**PERT Charts**: Network diagrams showing task relationships
**Critical Path Method**: Identifying the longest dependency chain
**Resource Histograms**: Visualizing resource allocation over time
**Work Breakdown Structure**: Hierarchical decomposition of work`
                    },
                    {
                        title: 'Key Documents',
                        content: `• **Project Charter**: Formal authorization to start
• **Requirements Document**: What needs to be built
• **Project Plan**: How it will be built
• **Risk Register**: Potential issues and mitigation plans
• **Communication Plan**: Who needs what information when`
                    }
                ]
            },
            {
                id: 'pm_methodology',
                title: 'Development Methodologies: Agile vs Waterfall',
                content: `The choice of methodology can make or break a project. Each approach has its strengths and is suited to different types of projects.`,
                image: agileScrumImage,
                imageCaption: 'Figure 2: Agile Scrum process showing sprints and ceremonies',
                subsections: [
                    {
                        title: 'Agile Methodologies',
                        content: `**Scrum**: Iterative sprints (2-4 weeks) with daily standups
**Kanban**: Continuous flow with work-in-progress limits
**Extreme Programming (XP)**: Technical excellence and frequent releases
**Benefits**: Flexibility, customer collaboration, early delivery`
                    },
                    {
                        title: 'Traditional Approaches',
                        content: `**Waterfall**: Sequential phases (Requirements → Design → Implementation → Testing → Deployment)
**V-Model**: Verification and validation at each phase
**Prince2**: Process-driven project management method
**When to Use**: Clear requirements, fixed scope, regulatory projects`
                    },
                    {
                        title: 'Hybrid Approaches',
                        content: `Many organizations now use **Wagile** or **Agilefall**—combining the structure of Waterfall with the flexibility of Agile, tailored to their specific needs and constraints.`
                    }
                ]
            },
        ],
    },
};

// --- Reactive State and Logic ---
const activeTab = ref('analyst');
const activeSectionId = ref(allArticles.analyst.sections[0].id);
const showMobileTOC = ref(false);

const currentArticle = computed(() => {
    return allArticles[activeTab.value];
});

let observer = null;

const setupObserver = () => {
    if (observer) {
        observer.disconnect();
    }

    nextTick(() => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                        activeSectionId.value = entry.target.id;
                    }
                });
            },
            { 
                rootMargin: `-120px 0px -80% 0px`,
                threshold: 0.2
            }
        );

        currentArticle.value.sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });
    });
};

const switchTab = (tabName) => {
    activeTab.value = tabName;
    activeSectionId.value = allArticles[tabName].sections[0].id;
    showMobileTOC.value = false;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setupObserver();
};

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 160;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        activeSectionId.value = id;
        showMobileTOC.value = false;
    }
};

onMounted(() => {
    setupObserver();
});
</script>

<template>
    <Head :title="currentArticle.title" />

    <AuthenticatedLayout>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <!-- Mobile TOC Toggle -->
            <div class="lg:hidden mb-6">
                <button 
                    @click="showMobileTOC = !showMobileTOC"
                    class="w-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 py-3 px-4 rounded-lg flex items-center justify-between"
                >
                    <span>Table of Contents</span>
                    <svg class="w-5 h-5 transform transition-transform" :class="{ 'rotate-180': showMobileTOC }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                
                <div v-if="showMobileTOC" class="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                    <nav class="space-y-1">
                        <button 
                            v-for="section in currentArticle.sections" 
                            :key="section.id"
                            @click="scrollToSection(section.id)"
                            class="w-full text-left p-3 rounded-lg transition duration-150 text-sm"
                            :class="{ 
                                'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium': activeSectionId === section.id,
                                'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700': activeSectionId !== section.id
                            }"
                        >
                            {{ section.title }}
                        </button>
                    </nav>
                </div>
            </div>

            <!-- Tab Navigation -->
            <div class="border-b border-gray-200 dark:border-gray-700 mb-8 sticky top-16 z-40 bg-white dark:bg-gray-900/95 pt-2">
                <nav class="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto" aria-label="Tabs">
                    <button
                        v-for="[key, article] in Object.entries(allArticles)"
                        :key="key"
                        @click="switchTab(key)"
                        :class="[
                            activeTab === key 
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold' 
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500',
                            'whitespace-nowrap py-3 px-2 sm:px-3 border-b-2 text-sm transition duration-150 flex items-center space-x-2'
                        ]"
                    >
                        <span class="text-lg font-bold opacity-70">{{ key === 'analyst' ? '1' : key === 'frontend' ? '2' : key === 'backend' ? '3' : '4' }}</span>
                        <span>{{ key === 'analyst' ? 'Analyst' : key === 'frontend' ? 'Frontend' : key === 'backend' ? 'Backend' : 'PM' }}</span>
                    </button>
                </nav>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <!-- Desktop TOC -->
                <aside class="lg:col-span-1 hidden lg:block">
                    <div class="sticky top-40">
                        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl mb-4">
                            <h3 class="text-lg font-bold mb-2">Currently Reading</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">{{ currentArticle.title }}</p>
                        </div>
                        
                        <h3 class="text-lg font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
                            Contents
                        </h3>
                        <nav class="space-y-1">
                            <button 
                                v-for="section in currentArticle.sections" 
                                :key="section.id"
                                @click="scrollToSection(section.id)"
                                class="w-full text-left p-3 rounded-lg transition duration-150 text-sm group"
                                :class="{ 
                                    'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium shadow-sm': activeSectionId === section.id,
                                    'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:translate-x-1': activeSectionId !== section.id
                                }"
                            >
                                <div class="flex items-center">
                                    <div class="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                                        <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                            {{ String.fromCharCode(65 + currentArticle.sections.findIndex(s => s.id === section.id)) }}
                                        </span>
                                    </div>
                                    {{ section.title }}
                                </div>
                            </button>
                        </nav>
                        
                        <!-- Reading Progress -->
                        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-600 dark:text-gray-400">Progress</span>
                                <span class="font-medium text-indigo-600 dark:text-indigo-400">
                                    {{ Math.round((currentArticle.sections.findIndex(s => s.id === activeSectionId) + 1) / currentArticle.sections.length * 100) }}%
                                </span>
                            </div>
                            <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                    class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                                    :style="{ width: `${(currentArticle.sections.findIndex(s => s.id === activeSectionId) + 1) / currentArticle.sections.length * 100}%` }"
                                ></div>
                            </div>
                        </div>
                    </div>
                </aside>

                <!-- Main Article Content -->
                <article class="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                    <!-- Article Header with Gradient -->
                    <div class="bg-gradient-to-r from-indigo-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-6 sm:p-8">
                        <div class="max-w-3xl mx-auto">
                            <div class="flex items-center space-x-2 mb-4">
                                <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                                    {{ activeTab === 'analyst' ? 'Analysis' : activeTab === 'frontend' ? 'Development' : activeTab === 'backend' ? 'Backend' : 'Management' }}
                                </span>
                                <span class="text-sm text-gray-500 dark:text-gray-400">{{ currentArticle.readTime }}</span>
                            </div>
                            
                            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                                {{ currentArticle.title }}
                            </h1>
                            
                            <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
                                {{ currentArticle.subtitle }}
                            </p>
                            
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {{ currentArticle.author.charAt(0) }}
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-900 dark:text-white">{{ currentArticle.author }}</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentArticle.date }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Featured Image -->
                

                    <!-- Article Content -->
                    <div class="p-6 sm:p-8 md:p-12">
                        <div class="max-w-3xl mx-auto space-y-16">
                            <section 
                                v-for="(section, index) in currentArticle.sections" 
                                :key="section.id" 
                                :id="section.id" 
                                class="scroll-mt-32"
                            >
                                <!-- Section Header -->
                                <div class="flex items-start mb-8">
                                    <div class="mr-4 mt-1">
                                        <div class="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                                            <span class="text-white font-bold text-lg">
                                                {{ String.fromCharCode(65 + index) }}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                            {{ section.title }}
                                        </h2>
                                        <div class="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                                    </div>
                                </div>
                                
                                <!-- Section Content -->
                                <div class="prose prose-lg dark:prose-invert max-w-none space-y-6">
                                    <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                        {{ section.content }}
                                    </p>
                                    
                                    <!-- Image Display -->
                                    <div v-if="section.image" class="my-8">
                                        <div class="relative overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                            <img 
                                                :src="section.image" 
                                                :alt="section.imageCaption"
                                                class="w-full h-auto"
                                            />
                                            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                                <p class="text-white text-sm">{{ section.imageCaption }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Subsections -->
                                    <div v-if="section.subsections" class="space-y-8">
                                        <div v-for="(subsection, subIndex) in section.subsections" :key="subIndex">
                                            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                                                <svg class="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                                </svg>
                                                {{ subsection.title }}
                                            </h3>
                                            <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                                <div class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                                    {{ subsection.content }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Callout Box for Important Points -->
                                    <div v-if="index === 0" class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-indigo-500 p-6 rounded-r-lg my-8">
                                        <div class="flex">
                                            <svg class="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            <div>
                                                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Key Takeaway</h4>
                                                <p class="text-gray-700 dark:text-gray-300 text-sm">
                                                    {{ activeTab === 'analyst' ? 'System analysts translate business needs into technical solutions through careful documentation and modeling.' 
                                                    : activeTab === 'frontend' ? 'Frontend development combines technical skills with design thinking to create accessible, performant user interfaces.'
                                                    : activeTab === 'backend' ? 'Backend developers build the secure, scalable infrastructure that powers modern applications.'
                                                    : 'Project managers orchestrate teams and processes to deliver successful projects on time and within scope.' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            
                            <!-- Article Footer -->
                            <footer class="pt-12 border-t border-gray-200 dark:border-gray-700">
                                <div class="text-center">
                                    <div class="inline-flex items-center space-x-2 mb-4">
                                        <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                        <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    </div>
                                    <p class="text-gray-600 dark:text-gray-400 text-sm">
                                        You've completed <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{ currentArticle.title }}</span>.
                                        {{ activeTab === 'analyst' ? 'Ready to explore frontend development?' 
                                        : activeTab === 'frontend' ? 'Ready to dive into backend systems?' 
                                        : activeTab === 'backend' ? 'Ready to learn about project management?'
                                        : 'Ready to explore system analysis?' }}
                                    </p>
                                    <div class="mt-6 flex justify-center space-x-4">
                                        <button 
                                            v-for="[key, article] in Object.entries(allArticles).filter(([k]) => k !== activeTab)"
                                            :key="key"
                                            @click="switchTab(key)"
                                            class="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Read about {{ key === 'analyst' ? 'System Analyst' : key === 'frontend' ? 'Frontend' : key === 'backend' ? 'Backend' : 'Project Manager' }}
                                        </button>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
/* Smooth transitions */
.scroll-mt-32 {
    scroll-margin-top: 8rem;
}

/* Custom scrollbar for TOC */
aside nav {
    scrollbar-width: thin;
    scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
}

aside nav::-webkit-scrollbar {
    width: 4px;
}

aside nav::-webkit-scrollbar-track {
    background: transparent;
}

aside nav::-webkit-scrollbar-thumb {
    background-color: rgba(99, 102, 241, 0.3);
    border-radius: 20px;
}

/* Gradient text for active tab */
.text-indigo-600 {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Image hover effect */
img {
    transition: transform 0.3s ease;
}

img:hover {
    transform: scale(1.02);
}

/* Custom prose styles */
.prose :deep(a) {
    @apply text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline;
}

.prose :deep(strong) {
    @apply text-gray-900 dark:text-white font-semibold;
}

.prose :deep(ul) {
    @apply space-y-2;
}

.prose :deep(li) {
    @apply text-gray-700 dark:text-gray-300;
}

.prose :deep(code) {
    @apply bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded text-sm;
}
</style>