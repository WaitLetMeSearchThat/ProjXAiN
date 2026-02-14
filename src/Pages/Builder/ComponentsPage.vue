<script setup>
import { reactive, computed, ref, onMounted, onUnmounted } from 'vue';


// --- 1. Import all Components (Current Focused List) ---
// Headers
import Header1MinimalDark from './Headers/Header1DarkMinimal.vue';
import Header2LightGradient from './Headers/Header2LightGradiant.vue';
import Header3BoldRedSticky from './Headers/Header3BoldRed.vue';
import Header4GreenBorderedCta from './Headers/Header4GreenBoarded.vue';
import Header5AdminNav from './Headers/Header5AdminNav.vue';
// Bodies
import Body1DataViewTabs from './Body/Body1DataViewTabs.vue'; 
import Body1HeroStacked from './Body/Body1HeroStacked.vue'; 
import Body2CustomerReport from './Body/Body2CustomerReport.vue';
import Body3CriticalAlert from './Body/Body3CriticalAlert.vue';
import Body4SuccessMetrics from './Body/Body4SuccessMetrics.vue';
// Footers
import Footer1BasicLinkDate from './Footers/Footer1BasicLinkDate.vue';
import Footer2DownloadButton from './Footers/Footer2DownloadButton.vue';
import Footer3ResolveNowLink from './Footers/Footer3ResolveNowLink.vue';
import Footer4StatusScaleMessage from './Footers/Footer4StatusScaleMessage.vue';

// 🚀 FOCUSED IMPORTS
import LoginForm1Simple from './Forms/LoginForm1Simple.vue';
import LoginForm2CardSocial from './Forms/LoginForm2CardSocial.vue';
import RegisterForm1Simple from './Forms/RegisterForm1Simple.vue'; 
import Sidebar1MinimalIcon from './Sidebars/Sidebar1MinimalIcon.vue';
import Sidebar2FullWidth from './Sidebars/Sidebar2FullWidth.vue';

// --- 2. Component Maps for Dynamic Loading ---
const componentMaps = {
    header: { Header1MinimalDark, Header2LightGradient, Header3BoldRedSticky, Header4GreenBorderedCta, Header5AdminNav },
    body: { Body1DataViewTabs, Body1HeroStacked, Body2CustomerReport, Body3CriticalAlert, Body4SuccessMetrics },
    footer: { Footer1BasicLinkDate, Footer2DownloadButton, Footer3ResolveNowLink, Footer4StatusScaleMessage },
    login: { LoginForm1Simple, LoginForm2CardSocial },
    register: { RegisterForm1Simple },
    sidebar: { Sidebar1MinimalIcon, Sidebar2FullWidth },
};

// --- 3. Reactive State ---
const selectedParts = reactive({
    header: '1', 
    body: '1',   
    footer: '1', 
    login: '1',
    register: '1',
    sidebar: '1',
});

const activeTab = ref('header'); 

// --- STATE FOR CODE MODAL ---
const codeModal = reactive({
    isVisible: false,
    title: '',
    code: '',
    copyStatus: 'Copy Code',
});

// --- RENAMED: NEW STATE FOR FULL PAGE PREVIEW MODAL ---
const fullPagePreviewModal = reactive({
    isVisible: false,
});


// --- 4. Component Data Structure (Unchanged) ---
const components = reactive({
    header: {
        title: '1. Choose Header Style',
        parts: [
            { id: 1, name: 'Minimal Dark', componentName: 'Header1MinimalDark' },
            { id: 2, name: 'Light Gradient', componentName: 'Header2LightGradient' },
            { id: 3, name: 'Bold Red Sticky', componentName: 'Header3BoldRedSticky' },
            { id: 4, name: 'Green Bordered CTA', componentName: 'Header4GreenBorderedCta' },
            { id: 5, name: 'Admin Nav Bar', componentName: 'Header5AdminNav' },
        ],
    },
    body: {
        title: '2. Choose Body Style',
        parts: [
            { id: 1, name: 'Hero Stacked (Abstract)', componentName: 'Body1HeroStacked' }, 
            { id: 2, name: 'Customer Report', componentName: 'Body2CustomerReport' },
            { id: 3, name: 'Critical Alert', componentName: 'Body3CriticalAlert' },
            { id: 4, name: 'Success Metrics', componentName: 'Body4SuccessMetrics' },
            { id: 5, name: 'Data View (Nested Tabs)', componentName: 'Body1DataViewTabs' }, 
        ],
    },
    footer: {
        title: '3. Choose Footer Style',
        parts: [
            { id: 1, name: 'Basic Link/Date', componentName: 'Footer1BasicLinkDate' },
            { id: 2, name: 'Download Button', componentName: 'Footer2DownloadButton' },
            { id: 3, name: 'Resolve Now Link', componentName: 'Footer3ResolveNowLink' },
            { id: 4, name: 'Status/Scale Message', componentName: 'Footer4StatusScaleMessage' },
        ],
    },
    login: {
        title: 'Login Forms',
        parts: [
            { id: 1, name: 'Simple Card', componentName: 'LoginForm1Simple' },
            { id: 2, name: 'Card with Social Buttons', componentName: 'LoginForm2CardSocial' },
        ],
    },
    register: {
        title: 'Registration Forms',
        parts: [
            { id: 1, name: 'Simple Vertical Form', componentName: 'RegisterForm1Simple' },
        ],
    },
    sidebar: {
        title: 'Sidebar Navigation',
        parts: [
            { id: 1, name: 'Minimal Icons + Collapsible', componentName: 'Sidebar1MinimalIcon' },
            { id: 2, name: 'Full Width with Text', componentName: 'Sidebar2FullWidth' },
        ],
    },
});

// --- 5. Computed Properties for Dynamic Preview ---

// Helper function to find the component name from the map
const getComponentName = (type) => {
    const part = components[type].parts.find(p => String(p.id) === selectedParts[type]);
    // The component name must match the key in componentMaps[type]
    // Fix for Header 3 and 4 names used in previous response
    if (part) {
        if (part.componentName === 'Header3BoldRed') return 'Header3BoldRedSticky';
        if (part.componentName === 'Header4GreenBoarded') return 'Header4GreenBorderedCta';
    }
    return part ? part.componentName : null;
};

// Returns the actual Vue component object based on the current active tab selection
const activePreviewComponent = computed(() => {
    const type = activeTab.value;
    const name = getComponentName(type);
    return name ? componentMaps[type][name] : null;
});

const activePreviewTitle = computed(() => {
    const type = activeTab.value;
    const name = components[type].parts.find(p => String(p.id) === selectedParts[type])?.name;
    return name || 'Component Not Selected';
});

// --- 6. Methods ---

// Simplified: Only updates selection
const showPreview = (part) => {
    selectedParts[activeTab.value] = String(part.id);
}

// Launches the full page modal
const launchFullPagePreview = () => {
    fullPagePreviewModal.isVisible = true;
}

const showCodeModal = (part) => {
    codeModal.title = `Raw Code: ${part.componentName}.vue`;
    
    // Placeholder code fetching logic (remains the same)
    let codeContent = `
<template>
    <div class="p-8 bg-gray-50 dark:bg-gray-800">
        <h1 class="text-3xl font-bold text-indigo-600">${part.name}</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
            [Placeholder: Full Vue/HTML/Tailwind code for ${part.componentName} would be here.]
        </p>
    </div>
    </template>
    `;
    
    codeModal.code = codeContent.trim();
    codeModal.copyStatus = 'Copy Code';
    codeModal.isVisible = true;
};

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(codeModal.code);
        codeModal.copyStatus = 'Copied!';
        setTimeout(() => {
            codeModal.copyStatus = 'Copy Code';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
        codeModal.copyStatus = 'Error!';
    }
};

onMounted(() => {});
onUnmounted(() => {});
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Component Catalog" />

        <div class="w-full plain p-4 sm:p-6 lg:p-8 min-h-screen">
            <h1 class="nem text-5xl text-center font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">
                Component Catalog 📚
            </h1>
            <p class="text-gray-600 text-center  dark:text-gray-400 mb-8">
                View, select, and copy reusable UI components for your application.
            </p>

            <div class="mb-10 p-6 plain rounded-xl shadow-2xl border-4 border-indigo-500 dark:border-indigo-600">
                <div class="  shadow-2xl flex justify-center items-center mb-6">
             
                    
                    <button 
                        @click="launchFullPagePreview"
                        class="flex items-center justify-end px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        Full Page Preview
                    </button>
                </div>
                
                <div class="relative bg-gray-100 min-h-[250px] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden p-0">
                    <component :is="activePreviewComponent" v-if="activePreviewComponent" />

                    <div v-else class="flex items-center text-centerjustify-center h-full p-8 text-gray-500 dark:text-gray-400 italic">
                        Select a component from the list below to see the live rendering.
                    </div>
                </div>
                
                <p class="text-sm mt-3 text-gray-500 dark:text-gray-400">
                    *Use the **Full Page Preview** button above for accurate viewing of Sidebars, Headers, and Forms.
                </p>
            </div>
            <div class="mb-8 border-b border-gray-300 dark:border-gray-700 overflow-x-auto">
                <nav class="flex space-x-2 sm:space-x-4 min-w-max" aria-label="Tabs">
                    <button @click="activeTab = 'header'" :class="[activeTab === 'header' ? 'tab-active' : 'tab-inactive', 'tab-base']">Headers</button>
                    <button @click="activeTab = 'body'" :class="[activeTab === 'body' ? 'tab-active' : 'tab-inactive', 'tab-base']">Body/Content</button>
                    <button @click="activeTab = 'footer'" :class="[activeTab === 'footer' ? 'tab-active' : 'tab-inactive', 'tab-base']">Footers</button>
                    <button @click="activeTab = 'login'" :class="[activeTab === 'login' ? 'tab-active' : 'tab-inactive', 'tab-base']">Login Forms</button>
                    <button @click="activeTab = 'register'" :class="[activeTab === 'register' ? 'tab-active' : 'tab-inactive', 'tab-base']">Register Forms</button>
                    <button @click="activeTab = 'sidebar'" :class="[activeTab === 'sidebar' ? 'tab-active' : 'tab-inactive', 'tab-base']">Sidebars</button>
                </nav>
            </div>

            <div class="mt-8">
                <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                    {{ components[activeTab].title }}
                </h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div 
                        v-for="part in components[activeTab].parts" 
                        :key="part.id"
                        class="rounded-xl p-5 border-2 transition duration-200 ease-in-out hover:shadow-lg bg-white dark:bg-gray-900"
                        :class="[
                            selectedParts[activeTab] === String(part.id)
                                ? 'border-indigo-500 ring-4 ring-indigo-200 dark:ring-indigo-800'
                                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                        ]"
                    >
                        <h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                            {{ part.name }}
                        </h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            File: **{{ part.componentName }}.vue**
                        </p>
                        
                        <div 
                            @click.prevent="showPreview(part)"
                            class="mt-4 p-4 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 text-sm italic border border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            <span>Click to Select & Preview</span>
                        </div>
                        
                        <div class="mt-4 flex justify-end items-center">
                            <button 
                                @click.prevent="showCodeModal(part)"
                                class="flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                    <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                </svg>
                                View Code
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-10 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
                <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Current Selections (for reference)</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <p class="text-gray-600 dark:text-gray-300">Header: <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ components.header.parts.find(p => p.id === parseInt(selectedParts.header))?.name }}</span></p>
                    <p class="text-gray-600 dark:text-gray-300">Body: <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ components.body.parts.find(p => p.id === parseInt(selectedParts.body))?.name }}</span></p>
                    <p class="text-gray-600 dark:text-gray-300">Footer: <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ components.footer.parts.find(p => p.id === parseInt(selectedParts.footer))?.name }}</span></p>
                    <p class="text-gray-600 dark:text-gray-300">Login: <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ components.login.parts.find(p => p.id === parseInt(selectedParts.login))?.name }}</span></p>
                    <p class="text-gray-600 dark:text-gray-300">Register: <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ components.register.parts.find(p => p.id === parseInt(selectedParts.register))?.name }}</span></p>
                    <p class="text-gray-600 dark:text-gray-300">Sidebar: <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ components.sidebar.parts.find(p => p.id === parseInt(selectedParts.sidebar))?.name }}</span></p>
                </div>
            </div>
        </div>

        <Transition name="fade">
            <div v-if="fullPagePreviewModal.isVisible" class="fixed inset-0 z-[70] flex flex-col bg-gray-100 dark:bg-gray-900">
                <div class="absolute top-0 right-0 z-[80] p-4">
                    <button @click="fullPagePreviewModal.isVisible = false" class="flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-lg hover:bg-red-700 transition duration-150">
                        <svg class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        Close Full Preview
                    </button>
                </div>
                
                <div class="flex-1 w-full relative overflow-y-auto">
                    <component :is="activePreviewComponent" v-if="activePreviewComponent" class="min-h-full" />
                </div>
            </div>
        </Transition>

        <Transition name="fade">
            <div v-if="codeModal.isVisible" class="fixed inset-0 bg-gray-900 bg-opacity-75 z-[60] flex items-center justify-center p-4">
                <div class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                    <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ codeModal.title }}</h3>
                        <button @click="codeModal.isVisible = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div class="p-6 overflow-y-auto flex-1">
                        <pre class="bg-gray-800 dark:bg-gray-700 text-green-300 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                            {{ codeModal.code }}
                        </pre>
                    </div>

                    <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                        <button 
                            @click="copyToClipboard"
                            :class="{ 
                                'bg-green-600 hover:bg-green-700 focus:ring-green-500': codeModal.copyStatus === 'Copy Code',
                                'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500': codeModal.copyStatus === 'Copied!',
                            }"
                            class="px-5 py-2 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150"
                        >
                            {{ codeModal.copyStatus }}
                        </button>
                        <button @click="codeModal.isVisible = false" class="px-5 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </AuthenticatedLayout>
</template>

<style scoped>
/* Tab Styles */
.tab-base {
    @apply px-3 py-2 font-medium text-sm rounded-t-lg transition duration-150 ease-in-out border-b-2 whitespace-nowrap;
}
.tab-active {
    @apply bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 border-indigo-500;
}
.tab-inactive {
    @apply text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border-transparent;
}

/* Modal Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>