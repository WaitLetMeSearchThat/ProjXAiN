<template>
    <div class=" rounded-lg relative mt-4 flex flex-col h-full">
        <div class="rounded-lg min-h-screen min-w-full font-sans ">
            <div class="max-w-7xl mx-auto rounded-xl bg-white m-2 justify-center p-6">

                <!-- 1. POST DETAIL VIEW (Conditional Rendering) -->
                <div v-if="currentPath.startsWith('/blog/') && currentPath !== '/blog'" class="p-8 rounded-xl shadow-2xl bg-white">
                    <button @click="goBack" class="nem timeline-box p-4 rounded-lg hover:text-blue-600 mb-6 flex items-center font-semibold text-sm transition duration-150">
                        <svg class="nem w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to All Sections
                    </button>
                    <h1 class="nem sm:text-5xl font-extrabold text-gray-900 mb-4">{{ currentPost.title }}</h1>
                    <p class="text-md h1 mb-8">Published on: {{ currentPost.date }}</p>

                    <!-- Placeholder Image/Content Area -->
                    <div class="timeline-box shadow-2xl h-64 sm:h-96 rounded-lg mb-8 flex items-center justify-center overflow-hidden">
                         <img 
                            :src="currentPost.imageUrl" 
                            :alt="currentPost.alt" 
                            class="w-full h-full object-cover rounded-lg"
                            onerror="this.onerror=null; this.src='https://placehold.co/800x400/3B82F6/FFFFFF?text=Web+Programming+Topic';"
                        />
                    </div>
                    
                    <!-- UNIQUE CONTENT RENDERING: Check currentPost.id to load different UI structures. -->
                    <div class="h1 max-w-none text-gray-700">
                        
                        <!-- Unique Content for Post ID 1 (Introduction to PHP) -->
                        <template v-if="currentPost.id === 1">
                            <h2 class="text-blue-600 font-bold text-2xl mb-4">🚀 Introduction to PHP: Server-Side Scripting Power</h2>
                            <p class="text-lg mb-4">PHP (Hypertext Preprocessor) is a powerful server-side scripting language designed for web development. It's embedded within HTML and executed on the server, making it perfect for creating dynamic web pages.</p>
                            
                            <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md my-6">
                                <h3 class="mt-0 text-blue-800 font-semibold mb-2">Key PHP Concepts for Beginners</h3>
                                <ul class="list-disc list-inside ml-4 text-blue-700">
                                    <li><strong>Server-Side Execution:</strong> PHP code runs on the server before sending HTML to the browser</li>
                                    <li><strong>Database Integration:</strong> Seamlessly works with MySQL, PostgreSQL, and other databases</li>
                                    <li><strong>Cross-Platform:</strong> Runs on Windows, Linux, macOS with Apache or Nginx</li>
                                    <li><strong>Open Source:</strong> Free to use with extensive community support</li>
                                </ul>
                            </div>
                            
                            <h3 class="font-bold text-xl mt-6 mb-3">Basic PHP Syntax Example</h3>
                            <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
<code>&lt;?php
// Simple PHP script
$name = "Web Developer";
echo "Hello, " . $name . "! Welcome to PHP programming.";

// Conditional statement
$age = 25;
if ($age >= 18) {
    echo " You are eligible to vote.";
} else {
    echo " You are not eligible to vote.";
}
?&gt;</code>
                            </pre>
                            <p>PHP is essential for building interactive websites, handling forms, managing sessions, and creating content management systems like WordPress.</p>
                        </template>
                        
                        <!-- Unique Content for Post ID 2 (HTML Fundamentals) -->
                        <template v-else-if="currentPost.id === 2">
                            <h2 class="text-green-600 font-bold text-2xl mb-4">📝 HTML Fundamentals: Building Web Page Structure</h2>
                            <p class="text-lg mb-4">HTML (HyperText Markup Language) is the backbone of every webpage. It provides the structure and content that browsers render into what users see and interact with.</p>
                            
                            <div class="p-4 bg-green-50 border-l-4 border-green-500 rounded-md my-6">
                                <h3 class="mt-0 text-green-800 font-semibold mb-2">Essential HTML Elements</h3>
                                <ul class="list-disc list-inside ml-4 text-green-700">
                                    <li><strong>Semantic Tags:</strong> &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;, &lt;footer&gt;</li>
                                    <li><strong>Text Elements:</strong> Headings (&lt;h1&gt;-&lt;h6&gt;), paragraphs (&lt;p&gt;), lists (&lt;ul&gt;, &lt;ol&gt;)</li>
                                    <li><strong>Media Elements:</strong> Images (&lt;img&gt;), audio (&lt;audio&gt;), video (&lt;video&gt;)</li>
                                    <li><strong>Forms:</strong> Input fields, buttons, dropdowns for user interaction</li>
                                </ul>
                            </div>
                            
                            <h3 class="font-bold text-xl mt-6 mb-3">Basic HTML Document Structure</h3>
                            <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
<code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
    &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;h1&gt;Welcome to Web Programming&lt;/h1&gt;
        &lt;nav&gt;
            &lt;a href="#home"&gt;Home&lt;/a&gt;
            &lt;a href="#about"&gt;About&lt;/a&gt;
        &lt;/nav&gt;
    &lt;/header&gt;
    
    &lt;main&gt;
        &lt;article&gt;
            &lt;h2&gt;Getting Started with HTML&lt;/h2&gt;
            &lt;p&gt;HTML is easy to learn and essential for web development.&lt;/p&gt;
        &lt;/article&gt;
    &lt;/main&gt;
    
    &lt;footer&gt;
        &lt;p&gt;&copy; 2024 Web Programming Guide&lt;/p&gt;
    &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</code>
                            </pre>
                            <p>Cross Platform - Mobile Application Development</p>
                        </template>

                        <!-- Unique Content for Post ID 3 (CSS Styling) -->
                        <template v-else-if="currentPost.id === 3"><h2 class="text-purple-600 font-bold text-2xl mb-4">📱 Mobile Application Development: Building Apps for Modern Users</h2>
<p class="text-lg mb-4">Mobile Application Development focuses on creating interactive, user-friendly apps for smartphones and tablets. It transforms ideas into powerful applications that run smoothly on Android and iOS devices.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
    <div class="p-4 bg-purple-50 rounded-lg">
        <h4 class="font-semibold text-purple-800 mb-2">Core Components</h4>
        <ul class="list-disc list-inside ml-4 text-purple-700 text-sm">
            <li>User Interface (UI) Components</li>
            <li>Navigation & Routing</li>
            <li>State Management</li>
            <li>API Integration (REST/GraphQL)</li>
            <li>Authentication & Security</li>
        </ul>
    </div>
    <div class="p-4 bg-purple-50 rounded-lg">
        <h4 class="font-semibold text-purple-800 mb-2">Development Approaches</h4>
        <ul class="list-disc list-inside ml-4 text-purple-700 text-sm">
            <li>Native Development (Java/Kotlin, Swift)</li>
            <li>Cross-Platform (Flutter, React Native)</li>
            <li>Hybrid Apps (Ionic)</li>
            <li>Backend Integration (Firebase, Node.js)</li>
        </ul>
    </div>
</div>

<h3 class="font-bold text-xl mt-6 mb-3">Mobile App Example with React Native</h3>
<pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
<code>// Simple React Native Component
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    &lt;View style={styles.container}&gt;
      &lt;View style={styles.card}&gt;
        &lt;Text style={styles.title}&gt;Welcome to Mobile Development&lt;/Text&gt;
        &lt;TouchableOpacity style={styles.button}&gt;
          &lt;Text style={styles.buttonText}&gt;Get Started&lt;/Text&gt;
        &lt;/TouchableOpacity&gt;
      &lt;/View&gt;
    &lt;/View&gt;
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#667eea',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#764ba2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});</code>
</pre>
<p>Mobile application development enables the creation of responsive, secure, and high-performance apps that deliver seamless user experiences across devices.</p>

</template>

                        <!-- Generic Fallback Content for all other posts -->
                        <template v-else>
                            <h2 class="text-2xl font-bold mb-4">Web Programming Article: {{ currentPost.title }}</h2>
                            <p class="text-lg mb-4">This article covers essential web programming concepts. The current path is: <code class="bg-gray-100 px-2 py-1 rounded">{{ currentPath }}</code></p>
                            <p class="mb-4">Web programming combines three core technologies:</p>
                            <ol class="list-decimal list-inside ml-4 mb-4">
                                <li><strong>HTML</strong> for structure and content</li>
                                <li><strong>CSS</strong> for presentation and styling</li>
                                <li><strong>PHP/JavaScript</strong> for behavior and interactivity</li>
                            </ol>
                            <p>Whether you're building a simple static website or a complex web application, understanding these fundamental technologies is crucial for success in web development.</p>
                        </template>
                    </div>
                </div>

                <!-- 2. MAIN LIST VIEW (Conditional Rendering) -->
                <div v-else>
                    <!-- Control Buttons -->
                    <div class="flex items-left justify mb-8 space-x-3 items-center">
                        <button @click="expandAll" class="rounded-full bg-blue-600 hover:bg-blue-700 hover:shadow-lg font-semibold text-white px-4 py-1.5 text-sm transition duration-150 ease-in-out">
                            Expand All
                        </button>
                        <button @click="collapseAll" class="rounded-full bg-blue-600 hover:bg-blue-700 hover:shadow-lg font-semibold text-white px-4 py-1.5 text-sm transition duration-150 ease-in-out">
                            Collapse All
                        </button>
                    </div>

                    <!-- Section A: Getting Started with Web Programming -->
                    <section class="mb-12 p-6 rounded-xl shadow-2xl pt-4 bg-white" :aria-expanded="isOpen.a" aria-controls="section-a">
                        <header class="flex items-center justify-between cursor-pointer" @click="toggle('a')">
                            <h2 class="nem text-2xl font-semibold text-gray-900">Section A: Getting Started with Web Programming</h2>
                            <span class="text-sm rounded-full bg-gray-100 text-gray-700 border border-gray-300 px-5 py-1.5 transition duration-150">{{ isOpen.a ? 'Hide' : 'Show' }}</span>
                        </header> 
                        <div class="my-6 border-b border-gray-200"> </div>
                        <div id="section-a" v-show="isOpen.a" class="mt-6">
                            
                            <div class="a lg:flex lg:space-x-10">
                                <div class="lg:w-1/2 mb-10 lg:mb-0 pt-4 sm:pt-8">
                                    <h1 class="nem text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-lg leading-snug lg:leading-tight">
                                        Introduction to Web Development
                                    </h1>
                                    
                                    <p class="h1 text-base text-gray-600 mb-4 max-w-md">
                                        Start your journey into web programming! Learn the fundamental building blocks of the web: HTML for structure, CSS for styling, and PHP for server-side logic.
                                    </p>
                                    <p class="h1 text-sm text-right text-gray-500 max-w-md sm:mb-6 mb-4">
                                        posted by: Web Programming Guide
                                    </p>
                                </div>

                                <!-- Right Column: Blog Grid (First two posts) -->
                                <div class="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <a
                                        v-for="post in mockBlogPosts.slice(0, 2)"
                                        :key="post.id"
                                        :href="'#' + post.href"
                                        @click.prevent="navigate($event, post.href)"
                                        @mouseenter="setGlow(post.id, true)"
                                        @mouseleave="setGlow(post.id, false)"
                                        :style="getShadowStyle(post.id)"
                                        class="rounded-xl p-3 shadow-lg border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-[1.05] cursor-pointer bg-white"
                                    >
                                        <div class="h-32 bg-gray-100 rounded-lg overflow-hidden">
                                            <img
                                                :src="post.imageUrl"
                                                :alt="post.alt"
                                                class="w-full h-full object-cover"
                                                onerror="this.onerror=null; this.src='https://placehold.co/300x128/3B82F6/FFFFFF?text=PHP+Programming';"
                                            />
                                        </div>
                                        <div class="p-3">
                                            <h3 class="h1 text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                                                {{ post.title }}
                                            </h3>
                                            <p class="h1 text-sm text-blue-500">
                                                {{ post.date }}
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Section B: Frontend Development -->
                   <section class="mb-12 p-6 rounded-xl shadow-2xl pt-4 bg-white" :aria-expanded="isOpen.b" aria-controls="section-b">
                         <header class="flex items-center justify-between cursor-pointer" @click="toggle('b')">
                            <h2 class="nem text-2xl font-semibold text-gray-900">Section B: Frontend Development Essentials</h2>
                            <span class="text-sm rounded-full bg-gray-100 text-gray-700 border border-gray-300 px-5 py-1.5 transition duration-150">{{ isOpen.b ? 'Hide' : 'Show' }}</span>
                        </header>
                        <div class="my-6 border-b border-gray-200"> </div>
                        <div id="section-b" v-show="isOpen.b" class="mt-4">
                            <div class="lg:flex lg:space-x-10">
                                <!-- Left Column: Hero Text -->
                                <div class="lg:w-1/2 mb-10 lg:mb-0 pt-4 sm:pt-8">
                                    <h1 class="nem text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 max-w-lg leading-snug lg:leading-tight">
                                        Mastering HTML & CSS for Modern Web Design
                                    </h1>
                                    
                                    <p class="h1 text-base text-gray-600 mb-4 max-w-md">
                                        Learn how to create responsive, accessible, and beautiful websites using semantic HTML and modern CSS techniques including Flexbox, Grid, and CSS custom properties.
                                    </p>
                                </div>

                                <!-- Right Column: Blog Grid (Posts 3 and 4) -->
                                <div class="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <a
                                        v-for="post in mockBlogPosts.slice(2, 4)"
                                        :key="post.id"
                                        :href="'#' + post.href"
                                        @click.prevent="navigate($event, post.href)"
                                        @mouseenter="setGlow(post.id, true)"
                                        @mouseleave="setGlow(post.id, false)"
                                        :style="getShadowStyle(post.id)"
                                        class="rounded-xl p-3 shadow-lg border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-[1.05] cursor-pointer bg-white"
                                    >
                                        <div class="h-32 bg-gray-100 rounded-lg overflow-hidden">
                                            <img
                                                :src="post.imageUrl"
                                                :alt="post.alt"
                                                class="w-full h-full object-cover"
                                                onerror="this.onerror=null; this.src='https://placehold.co/300x128/10B981/FFFFFF?text=CSS+Styling';"
                                            />
                                        </div>
                                        <div class="p-3">
                                            <h3 class="h1 text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                                                {{ post.title }}
                                            </h3>
                                            <p class="h1 text-sm text-green-500">
                                                {{ post.date }}
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Section C: Backend Development -->
                     <section class="mb-12 p-6 rounded-xl shadow-2xl pt-4 bg-white" :aria-expanded="isOpen.c" aria-controls="section-c">
                         <header class="flex items-center justify-between cursor-pointer" @click="toggle('c')">
                            <h2 class="nem text-2xl font-semibold text-gray-900">Section C: Backend Development & Database</h2>
                            <span class="text-sm rounded-full bg-gray-100 text-gray-700 border border-gray-300 px-5 py-1.5 transition duration-150">{{ isOpen.c ? 'Hide' : 'Show' }}</span>
                        </header>
                        <div class="my-6 border-b border-gray-200"> </div>
                        <div id="section-c" v-show="isOpen.c" class="mt-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <a
                                    v-for="post in mockBlogPosts.slice(4)"
                                    :key="post.id"
                                    :href="'#' + post.href"
                                    @click.prevent="navigate($event, post.href)"
                                    @mouseenter="setGlow(post.id, true)"
                                    @mouseleave="setGlow(post.id, false)"
                                    :style="getShadowStyle(post.id)"
                                    class="rounded-xl p-3 shadow-lg border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-[1.05] cursor-pointer bg-white"
                                >
                                    <div class="h-32 bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            :src="post.imageUrl"
                                            :alt="post.alt"
                                            class="w-full h-full object-cover"
                                            onerror="this.onerror=null; this.src='https://placehold.co/300x128/8B5CF6/FFFFFF?text=Database+Design';"
                                        />
                                    </div>
                                    <div class="p-3">
                                        <h3 class="h1 text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                                            {{ post.title }}
                                        </h3>
                                        <p class="h1 text-sm text-purple-500">
                                            {{ post.date }}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </section>

                    <!-- Section D: External Resources -->
                    <section class="mb-12 p-6 rounded-xl shadow-2xl pt-4 bg-white" :aria-expanded="isOpen.d" aria-controls="section-d">
                        <header class="flex items-center justify-between cursor-pointer" @click="toggle('d')">
                            <h2 class="nem text-2xl font-semibold text-gray-900">Section D: External Resources & Tools</h2>
                            <span class="text-sm rounded-full bg-gray-100 text-gray-700 border border-gray-300 px-5 py-1.5 transition duration-150">{{ isOpen.d ? 'Hide' : 'Show' }}</span>
                        </header> 
                        <div class="my-6 border-b border-gray-200"> </div>
                        <div id="section-d" v-show="isOpen.d" class="mt-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <a
                                    v-for="link in mockExternalLinks"
                                    :key="link.id"
                                    :href="link.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="rounded-xl p-4 shadow-lg border border-gray-300 overflow-hidden transform transition duration-300 hover:scale-[1.03] hover:border-blue-500 cursor-pointer bg-white flex flex-col justify-between"
                                >
                                    <div class="flex items-center space-x-3 mb-2">
                                        <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                        <h3 class="h1 text-lg font-semibold text-gray-800 line-clamp-1">
                                            {{ link.title }}
                                        </h3>
                                    </div>
                                    <p class="h1 text-sm text-gray-500">
                                        {{ link.description }}
                                    </p>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
// Mock data for the blog cards - Now focused on web programming
const mockBlogPosts = [
    { id: 1, href: "/blog/introduction-to-php", title: "Introduction to PHP: Server-Side Scripting Fundamentals", date: "March 15, 2024", imageUrl: "images/php-icon.png", alt: "PHP Programming" },
    { id: 2, href: "/blog/html-fundamentals", title: "HTML Fundamentals: Building Web Page Structure", date: "March 10, 2024", imageUrl: "images/html-icon.png", alt: "HTML Structure" },
    { id: 3, href: "/blog/css-styling-techniques", title: "CSS Styling Techniques: From Basics to Advanced", date: "March 5, 2024", imageUrl: "images/css-icon.png", alt: "CSS Styling" },
    { id: 4, href: "/blog/responsive-web-design", title: "Responsive Web Design with CSS Grid and Flexbox", date: "February 28, 2024", imageUrl: "images/responsive-icon.png", alt: "Responsive Design" },
    { id: 5, href: "/blog/php-database-connection", title: "PHP & MySQL: Database Connection and CRUD Operations", date: "February 25, 2024", imageUrl: "images/database-icon.png", alt: "Database Connection" },
    { id: 6, href: "/blog/web-forms-validation", title: "Creating and Validating Web Forms with PHP", date: "February 20, 2024", imageUrl: "images/form-icon.png", alt: "Web Forms" },
    { id: 7, href: "/blog/session-management", title: "Session Management and User Authentication in PHP", date: "February 15, 2024", imageUrl: "images/session-icon.png", alt: "Session Management" },
    { id: 8, href: "/blog/web-security-best-practices", title: "Web Security Best Practices for PHP Developers", date: "February 10, 2024", imageUrl: "images/security-icon.png", alt: "Web Security" }
];

const mockExternalLinks = [
    { id: 101, title: "PHP Official Documentation", url: "https://www.php.net/docs.php", description: "Complete PHP manual and reference" },
    { id: 102, title: "MDN Web Docs", url: "https://developer.mozilla.org", description: "HTML, CSS, JavaScript documentation" },
    { id: 103, title: "W3Schools Tutorials", url: "https://www.w3schools.com", description: "Beginner-friendly web tutorials" },
    { id: 104, title: "CodePen Projects", url: "https://codepen.io", description: "Frontend code playground" },
    { id: 105, title: "GitHub Learning Lab", url: "https://lab.github.com", description: "Learn Git and GitHub" },
    { id: 106, title: "FreeCodeCamp Curriculum", url: "https://www.freecodecamp.org", description: "Free coding tutorials and projects" }
];

// --- State Management ---
const glowState = ref({});
const isOpen = ref({ a: true, b: true, c: true, d: true });
const currentPath = ref(window.location.hash.slice(1) || '/blog');

// --- Computed Properties for Routing ---
const allPostsMap = computed(() => {
    return mockBlogPosts.reduce((acc, post) => {
        acc[post.href] = post;
        return acc;
    }, {});
});

const currentPost = computed(() => {
    return allPostsMap.value[currentPath.value] || { id: -1, title: '404 - Article Not Found', date: 'N/A', alt: 'Error', imageUrl: '' };
});

// --- Methods ---
const toggle = (key) => {
    isOpen.value[key] = !isOpen.value[key];
};

const expandAll = () => {
    isOpen.value = { a: true, b: true, c: true, d: true };
};

const collapseAll = () => {
    isOpen.value = { a: false, b: false, c: false, d: false };
};

const setGlow = (id, state) => {
    glowState.value[id] = state;
};

const getShadowStyle = (id) => {
    const isHovered = glowState.value[id];
    return {
        '--tw-shadow': isHovered
            ? '0 0 10px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.4)'
            : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'box-shadow': isHovered 
            ? 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)' 
            : 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'border-color': isHovered ? '#3B82F6' : '#e5e7eb'
    };
};

const navigate = (event, href) => {
    event.preventDefault();
    window.location.hash = href;
    currentPath.value = href;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goBack = () => {
    window.location.hash = '/blog';
    currentPath.value = '/blog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- Lifecycle Hook ---
onMounted(() => {
    if (!window.location.hash) {
        window.location.hash = '/blog';
        currentPath.value = '/blog';
    } else {
        currentPath.value = window.location.hash.slice(1);
    }

    window.addEventListener('hashchange', () => {
        currentPath.value = window.location.hash.slice(1) || '/blog';
    });
});
</script>

<style scoped>
pre {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
}

code {
    font-family: inherit;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
