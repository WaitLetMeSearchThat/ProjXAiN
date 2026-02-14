<template>
  <Header />
  <div class="min-h-screen max-w-7xl mx-auto rounded-xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
    <div class="px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      
      <!-- Hero Section -->
      <div class="text-center rounded-lg mb-8 sm:mb-12 animate-fade-in">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          WEB PAGE BUILDER
        </h1>
        <p class="text-base sm:text-lg text-white max-w-2xl mx-auto px-4">
          Select a style for each component below to see the preview build update.
        </p>
      </div>

      <!-- Component Selection Panel -->
      <div class="mb-8  backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <!-- Main Tabs -->
        <div class="flex border-b justify-center border-white/10 bg-black/20 p-1.5">
          <button
            v-for="(componentData, type) in components"
            :key="type"
            @click="activeMainTab = type; activeSubTab[type] = Object.keys(themeCategories[type])[0]"
            class="relative px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300"
            :class="{
              'text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg': activeMainTab === type,
              'text-gray-400 hover:text-white hover:bg-white/5': activeMainTab !== type
            }"
          >
            {{ componentData.title }}
          </button>
        </div>

        <!-- Sub Tabs (Theme Categories) -->
        <div v-if="activeMainTab" class="border-b border-white/10 bg-black/40 px-4 py-2">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-medium text-gray-500 mr-2">Filter by theme:</span>
            <button
              v-for="theme in Object.keys(themeCategories[activeMainTab])"
              :key="theme"
              @click="activeSubTab[activeMainTab] = theme"
              class="px-4 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 capitalize"
              :class="{
                'bg-blue-500 text-white shadow': activeSubTab[activeMainTab] === theme,
                'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50': activeSubTab[activeMainTab] !== theme
              }"
            >
              <span class="flex items-center gap-1.5">
                <span v-html="getThemeIcon(theme)"></span>
                {{ theme }}
              </span>
            </button>
          </div>
        </div>

        <!-- Component Grid -->
        <div class="p-5">
          <div 
            v-for="(componentData, type) in components"
            :key="type"
            v-show="activeMainTab === type"
            class="transition-all duration-500"
          >
            <!-- No components message -->
            <div v-if="filteredComponents(type).length === 0" class="text-center py-12">
              <div class="text-gray-500 text-sm">
                No components available in this theme category.
              </div>
            </div>

            <div 
              class="grid gap-4" 
              :class="{ 
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': type === 'header',
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': type === 'body',
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': type === 'footer'
              }"
            >
              <label 
                v-for="part in filteredComponents(type)" 
                :key="part.id" 
                class="group relative p-3 rounded-xl cursor-pointer transition-all duration-200 
                       border bg-gray-800/30 backdrop-blur-sm
                       hover:border-blue-500/50 hover:bg-gray-800/50
                       has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500/10"
              >
                <input 
                  type="radio" 
                  :name="`${type}-style`" 
                  :value="String(part.id)" 
                  v-model="selectedParts[type]" 
                  class="hidden part-radio"
                >
                
                <!-- Component Preview Thumbnail -->
                <div class="relative mb-3 rounded-lg overflow-hidden bg-gray-900/50 border border-gray-700/50">
                  <div class="scale-75 origin-top-left w-[133.33%] h-[160px] overflow-hidden"
                       :class="{ 'h-[120px]': type === 'footer' }">
                    <component :is="getComponentMap(type)[part.componentName]" />
                  </div>
                  
                  <!-- Selected Badge -->
                  <div v-if="selectedParts[type] === String(part.id)" 
                       class="absolute top-1 right-1 z-10 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Selected
                  </div>

                  <!-- Theme Badge -->
                  <div class="absolute bottom-1 left-1 z-10">
                    <span class="px-1.5 py-0.5 bg-black/70 text-[10px] rounded text-gray-300 capitalize border border-white/10">
                      {{ part.theme || 'modern' }}
                    </span>
                  </div>
                </div>
                
                <!-- Component Info -->
                <div class="flex items-center justify-between">
                  <div>
                    <span class="font-medium text-white text-sm block">{{ part.name }}</span>
                    <span class="text-xs text-gray-400">{{ part.category }}</span>
                  </div>
                  <button 
                    @click.prevent="openModal(type, part.componentName, part.name)" 
                    class="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600 text-xs text-white rounded-lg 
                           transition-all duration-200 flex items-center gap-1"
                  >
                    <span>Preview</span>
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Preview Section -->
      <div class="mb-10">
        <div class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          
          <!-- Preview Header -->
          <div class="flex items-center justify-between px-5 py-3 bg-black/30 border-b border-white/10">
            <div class="flex items-center gap-2">
              <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div class="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span class="text-xs font-mono text-gray-500">Live Preview</span>
            </div>
            <div class="px-2 py-1 bg-green-500/20 rounded-full text-xs font-medium text-green-400 border border-green-500/30">
              Active
            </div>
          </div>

          <!-- Live Preview Content -->
          <div class="p-0">
            <div class="component-card flex flex-col min-h-[500px] bg-gray-900" id="component-preview">
              <div id="header-slot">
                <component :is="currentHeaderComponentName" />
              </div>
              <div id="body-slot" class="flex-grow flex flex-col">
                <component :is="currentBodyComponentName" />
              </div>
              <div id="footer-slot">
                <component :is="currentFooterComponentName" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Code Export Section -->
      <div class="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        
        <!-- Section Header -->
        <div class="px-6 py-4 bg-black/30 border-b border-white/10">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl font-semibold text-white">
                Export Component
              </h2>
              <p class="text-xs text-gray-400 mt-0.5">
                Choose your preferred styling format
              </p>
            </div>
            
            <!-- Tech Stack Selector -->
            <div class="flex items-center gap-3">
              <div class="flex rounded-lg bg-gray-800/50 p-0.5 border border-gray-700/50">
                <button
                  @click="codeFormat = 'tailwind'"
                  class="px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200"
                  :class="[
                    codeFormat === 'tailwind' 
                      ? 'bg-blue-500 text-white shadow' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  ]"
                >
                  Tailwind
                </button>
                <button
                  @click="codeFormat = 'pure-css'"
                  class="px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200"
                  :class="[
                    codeFormat === 'pure-css' 
                      ? 'bg-blue-500 text-white shadow' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  ]"
                >
                  Pure CSS
                </button>
              </div>

              <button 
                @click="copyCode" 
                class="px-4 py-1.5 bg-green-600 hover:bg-green-700 rounded-md text-xs font-medium text-white 
                       transition-all duration-200 flex items-center gap-1.5"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {{ copyButtonText }}
              </button>
            </div>
          </div>
        </div>

        <!-- Code Output -->
        <div class="p-4 bg-gray-950/50">
          <div class="relative rounded-lg overflow-hidden border border-gray-800">
            <!-- Code Header -->
            <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-900 border-b border-gray-800">
              <div class="flex gap-1">
                <div class="w-2 h-2 rounded-full bg-gray-600" />
                <div class="w-2 h-2 rounded-full bg-gray-600" />
                <div class="w-2 h-2 rounded-full bg-gray-600" />
              </div>
              <span class="text-xs font-mono text-gray-500">code.html</span>
            </div>
            
            <!-- Code Content -->
            <pre id="code-output-target" 
                 class="whitespace-pre-wrap font-mono text-xs p-4 bg-gray-950 text-gray-300 
                        max-h-[300px] overflow-y-auto custom-scrollbar"
              >{{ fullCodeOutput }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Preview -->
    <Transition name="fade">
      <div v-if="modal.isVisible" 
           class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
           @click.self="closeModal">
        
        <!-- Modal Content -->
        <div class="w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden
                    bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl">
          
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-5 py-4 bg-gray-800/50 border-b border-gray-700">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white">{{ modal.title }}</h3>
            </div>
            <button 
              @click="closeModal" 
              class="p-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
            >
              <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Modal Body -->
          <div class="flex-grow overflow-y-auto custom-scrollbar p-5 bg-gray-950/50">
            <div class="min-h-full rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
              <component :is="modal.componentName" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import Header from '../../components/Header.vue';
import LivePreview from '../../components/LivePreview.vue';

// --- Import Components ---
// Headers (10 examples)
import Header1MinimalDark from './Headers/Header1DarkMinimal.vue';
import Header2LightGradient from './Headers/Header2LightGradiant.vue';
import Header3BoldRedSticky from './Headers/Header3BoldRed.vue';
import Header4GreenBorderedCta from './Headers/Header4GreenBoarded.vue';
import Header5AdminNav from './Headers/Header5AdminNav.vue';
import Header6Transparent from './Headers/Header6Transparent.vue';
import Header7SidebarLayout from './Headers/Header7SidebarLayout.vue';
import Header8CenteredLogo from './Headers/Header8CenteredLogo.vue';
import Header9MegaMenu from './Headers/Header9MegaMenu.vue';
import Header10SplitNavigation from './Headers/Header10SplitNavigation.vue';

// Bodies (10 examples)
import Body1HeroStacked from './Body/Body1HeroStacked.vue';
import Body1DataViewTabs from './Body/Body1DataViewTabs.vue';
import Body2CustomerReport from './Body/Body2CustomerReport.vue';
import Body3CriticalAlert from './Body/Body3CriticalAlert.vue';
import Body4SuccessMetrics from './Body/Body4SuccessMetrics.vue';
import Body5FeatureGrid from './Body/Body5FeatureGrid.vue';
import Body6PricingTable from './Body/Body6PricingTable.vue';
import Body7TestimonialSlider from './Body/Body7TestimonialSlider.vue';
import Body8ContactForm from './Body/Body8ContactForm.vue';
import Body9GalleryGrid from './Body/Body9GalleryGrid.vue';
import Body10StatsDashboard from './Body/Body10StatsDashboard.vue';

// Footers (8 examples)
import Footer1BasicLinkDate from './Footers/Footer1BasicLinkDate.vue';
import Footer2DownloadButton from './Footers/Footer2DownloadButton.vue';
import Footer3ResolveNowLink from './Footers/Footer3ResolveNowLink.vue';
import Footer4StatusScaleMessage from './Footers/Footer4StatusScaleMessage.vue';
import Footer5SocialLinks from './Footers/Footer5SocialLinks.vue';
import Footer6NewsletterSignup from './Footers/Footer6NewsletterSignup.vue';
import Footer7SitemapColumns from './Footers/Footer7SitemapColumns.vue';
import Footer8CopyrightMinimal from './Footers/Footer8CopyrightMinimal.vue';

// --- Register Components ---
const headerComponents = { 
  Header1MinimalDark, Header2LightGradient, Header3BoldRedSticky, 
  Header4GreenBorderedCta, Header5AdminNav, Header6Transparent,
  Header7SidebarLayout, Header8CenteredLogo, Header9MegaMenu, Header10SplitNavigation
};

const bodyComponents = { 
  Body1HeroStacked, Body1DataViewTabs, Body2CustomerReport, 
  Body3CriticalAlert, Body4SuccessMetrics, Body5FeatureGrid,
  Body6PricingTable, Body7TestimonialSlider, Body8ContactForm,
  Body9GalleryGrid, Body10StatsDashboard
};

const footerComponents = { 
  Footer1BasicLinkDate, Footer2DownloadButton, Footer3ResolveNowLink, 
  Footer4StatusScaleMessage, Footer5SocialLinks, Footer6NewsletterSignup,
  Footer7SitemapColumns, Footer8CopyrightMinimal
};

const allComponents = { ...headerComponents, ...bodyComponents, ...footerComponents };

const getComponentMap = (type) => {
  if (type === 'header') return headerComponents;
  if (type === 'body') return bodyComponents;
  if (type === 'footer') return footerComponents;
  return {};
};

// --- Theme Categories Configuration ---
const themeCategories = {
  header: {
    'all': 'All Themes',
    'dark': 'Dark Themes',
    'light': 'Light Themes',
    'modern': 'Modern Themes',
    'simple': 'Simple Themes',
    'gradient': 'Gradient Themes',
    'minimal': 'Minimal Themes'
  },
  body: {
    'all': 'All Themes',
    'dark': 'Dark Themes',
    'light': 'Light Themes',
    'modern': 'Modern Themes',
    'simple': 'Simple Themes',
    'dashboard': 'Dashboard Themes',
    'marketing': 'Marketing Themes'
  },
  footer: {
    'all': 'All Themes',
    'dark': 'Dark Themes',
    'light': 'Light Themes',
    'modern': 'Modern Themes',
    'simple': 'Simple Themes',
    'minimal': 'Minimal Themes',
    'cta': 'CTA Themes'
  }
};

// Helper function to get theme icon
const getThemeIcon = (theme) => {
  const icons = {
    'all': '🌐',
    'dark': '🌙',
    'light': '☀️',
    'modern': '✨',
    'simple': '🎯',
    'gradient': '🌈',
    'minimal': '◻️',
    'dashboard': '📊',
    'marketing': '📢',
    'cta': '🎬'
  };
  return icons[theme] || '📁';
};

// --- Vue Reactive State ---
const selectedParts = reactive({
  header: '1',
  body: '1',
  footer: '1',
});

const activeMainTab = ref('header');
const activeSubTab = ref({
  header: 'all',
  body: 'all',
  footer: 'all'
});

const codeFormat = ref('tailwind');
const copyButtonText = ref('Copy Code');

const modal = reactive({
  isVisible: false,
  componentName: null,
  title: '',
});

// Enhanced component data structure with categories and themes
const components = reactive({
  header: {
    title: 'Headers (10)',
    parts: [
      { id: 1, name: 'Minimal Dark', componentName: 'Header1MinimalDark', category: 'Minimal', theme: 'dark' },
      { id: 2, name: 'Light Gradient', componentName: 'Header2LightGradient', category: 'Gradient', theme: 'light' },
      { id: 3, name: 'Bold Red Sticky', componentName: 'Header3BoldRedSticky', category: 'Sticky', theme: 'modern' },
      { id: 4, name: 'Green Bordered', componentName: 'Header4GreenBorderedCta', category: 'Bordered', theme: 'simple' },
      { id: 5, name: 'Admin Nav Bar', componentName: 'Header5AdminNav', category: 'Admin', theme: 'modern' },
      { id: 6, name: 'Transparent', componentName: 'Header6Transparent', category: 'Transparent', theme: 'minimal' },
      { id: 7, name: 'Sidebar Layout', componentName: 'Header7SidebarLayout', category: 'Sidebar', theme: 'modern' },
      { id: 8, name: 'Centered Logo', componentName: 'Header8CenteredLogo', category: 'Centered', theme: 'simple' },
      { id: 9, name: 'Mega Menu', componentName: 'Header9MegaMenu', category: 'Mega Menu', theme: 'modern' },
      { id: 10, name: 'Split Navigation', componentName: 'Header10SplitNavigation', category: 'Split', theme: 'modern' },
    ],
  },
  body: {
    title: 'Body Sections (10)',
    parts: [
      { id: 1, name: 'Hero Stacked', componentName: 'Body1HeroStacked', category: 'Hero', theme: 'marketing' },
      { id: 2, name: 'Data View Tabs', componentName: 'Body1DataViewTabs', category: 'Tabs', theme: 'dashboard' },
      { id: 3, name: 'Customer Report', componentName: 'Body2CustomerReport', category: 'Report', theme: 'dashboard' },
      { id: 4, name: 'Critical Alert', componentName: 'Body3CriticalAlert', category: 'Alert', theme: 'modern' },
      { id: 5, name: 'Success Metrics', componentName: 'Body4SuccessMetrics', category: 'Metrics', theme: 'dashboard' },
      { id: 6, name: 'Feature Grid', componentName: 'Body5FeatureGrid', category: 'Grid', theme: 'marketing' },
      { id: 7, name: 'Pricing Table', componentName: 'Body6PricingTable', category: 'Pricing', theme: 'marketing' },
      { id: 8, name: 'Testimonial Slider', componentName: 'Body7TestimonialSlider', category: 'Testimonials', theme: 'marketing' },
      { id: 9, name: 'Contact Form', componentName: 'Body8ContactForm', category: 'Form', theme: 'simple' },
      { id: 10, name: 'Stats Dashboard', componentName: 'Body10StatsDashboard', category: 'Dashboard', theme: 'dashboard' },
    ],
  },
  footer: {
    title: 'Footers (8)',
    parts: [
      { id: 1, name: 'Basic Link/Date', componentName: 'Footer1BasicLinkDate', category: 'Basic', theme: 'minimal' },
      { id: 2, name: 'Download Button', componentName: 'Footer2DownloadButton', category: 'CTA', theme: 'cta' },
      { id: 3, name: 'Resolve Now Link', componentName: 'Footer3ResolveNowLink', category: 'Action', theme: 'cta' },
      { id: 4, name: 'Status Message', componentName: 'Footer4StatusScaleMessage', category: 'Status', theme: 'modern' },
      { id: 5, name: 'Social Links', componentName: 'Footer5SocialLinks', category: 'Social', theme: 'simple' },
      { id: 6, name: 'Newsletter Signup', componentName: 'Footer6NewsletterSignup', category: 'Newsletter', theme: 'modern' },
      { id: 7, name: 'Sitemap Columns', componentName: 'Footer7SitemapColumns', category: 'Sitemap', theme: 'modern' },
      { id: 8, name: 'Copyright Minimal', componentName: 'Footer8CopyrightMinimal', category: 'Minimal', theme: 'minimal' },
    ],
  },
});

// Filter components based on active sub-tab
const filteredComponents = (type) => {
  const currentTheme = activeSubTab.value[type];
  const parts = components[type].parts;
  
  if (currentTheme === 'all') {
    return parts;
  }
  
  return parts.filter(part => part.theme === currentTheme);
};

const sourceComponents = new Map();

// --- Modal Methods ---
const openModal = (type, componentName, title) => {
  modal.componentName = allComponents[componentName];
  modal.title = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${title}`;
  modal.isVisible = true;
};

const closeModal = () => {
  modal.isVisible = false;
  modal.componentName = null;
  modal.title = '';
};

// --- Computed Properties ---
const currentHeaderComponentName = computed(() => {
  const part = components.header.parts.find(p => String(p.id) === selectedParts.header);
  return part ? headerComponents[part.componentName] : null;
});

const currentBodyComponentName = computed(() => {
  const part = components.body.parts.find(p => String(p.id) === selectedParts.body);
  return part ? bodyComponents[part.componentName] : null;
});

const currentFooterComponentName = computed(() => {
  const part = components.footer.parts.find(p => String(p.id) === selectedParts.footer);
  return part ? footerComponents[part.componentName] : null;
});

const getSourceHtml = (type, id) => {
  const key = `${type}-${id}-${codeFormat.value}`;
  return sourceComponents.get(key) || ``;
};

const currentHeaderHtml = computed(() => {
  const headerPart = components.header.parts.find(p => String(p.id) === selectedParts.header);
  return headerPart ? getSourceHtml('header', headerPart.id) : '';
});

const currentBodyHtml = computed(() => {
  const bodyPart = components.body.parts.find(p => String(p.id) === selectedParts.body);
  return bodyPart ? getSourceHtml('body', bodyPart.id) : '';
});

const currentFooterHtml = computed(() => {
  const footerPart = components.footer.parts.find(p => String(p.id) === selectedParts.footer);
  return footerPart ? getSourceHtml('footer', footerPart.id) : '';
});

const fullCodeOutput = computed(() => {
  const headerHtml = currentHeaderHtml.value.trim();
  const bodyHtml = currentBodyHtml.value.trim();
  const footerHtml = currentFooterHtml.value.trim();

  if (codeFormat.value === 'pure-css') {
    const output = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component Preview</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #111827;
            color: #fff;
            padding: 2rem;
        }
        
        .component-container {
            max-width: 1200px;
            margin: 0 auto;
            background: #1f2937;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
        }
        
        .component-content {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        
        .component-body {
            flex: 1;
            background: linear-gradient(135deg, #1e40af 0%, #1e293b 100%);
        }
    </style>
</head>
<body>
    <div class="component-container">
        <div class="component-content">
            <!-- Header Section -->
            <header class="component-header">
                ${headerHtml}
            </header>
            
            <!-- Body Section -->
            <main class="component-body">
                ${bodyHtml}
            </main>
            
            <!-- Footer Section -->
            <footer class="component-footer">
                ${footerHtml}
            </footer>
        </div>
    </div>
</body>
</html>
    `.trim();
    return output;
  }

  // Tailwind output
  const output = `
<div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
    <div class="max-w-6xl mx-auto">
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            ${headerHtml}
            
            <main class="flex-grow bg-gradient-to-br from-blue-900/20 to-gray-900/20">
                ${bodyHtml}
            </main>
            
            ${footerHtml}
        </div>
    </div>
</div>
  `.trim();
  
  return output;
});

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(fullCodeOutput.value);
    copyButtonText.value = 'Copied! ✅';
    setTimeout(() => {
      copyButtonText.value = 'Copy Code';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
    copyButtonText.value = 'Failed ❌';
    setTimeout(() => {
      copyButtonText.value = 'Copy Code';
    }, 2000);
  }
};

// --- Enhanced Source Components with Pure HTML/CSS ---
const populateSourceComponents = () => {
  // Header Examples (Pure CSS)
  sourceComponents.set('header-1-pure-css', `
<nav class="header-nav" style="background: #1a202c; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2d3748;">
    <div class="logo" style="font-size: 1.5rem; font-weight: bold; color: #4299e1;">
        BrandLogo
    </div>
    <div class="nav-links" style="display: flex; gap: 2rem;">
        <a href="#" style="color: #cbd5e0; text-decoration: none; font-weight: 500;">Home</a>
        <a href="#" style="color: #cbd5e0; text-decoration: none; font-weight: 500;">About</a>
        <a href="#" style="color: #cbd5e0; text-decoration: none; font-weight: 500;">Services</a>
        <a href="#" style="color: #cbd5e0; text-decoration: none; font-weight: 500;">Contact</a>
    </div>
    <button class="cta-btn" style="background: #4299e1; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 0.375rem; font-weight: 600; cursor: pointer;">
        Get Started
    </button>
</nav>
`);

  sourceComponents.set('header-2-pure-css', `
<header class="header-gradient" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem 2rem; position: relative; overflow: hidden;">
    <div style="position: absolute; inset: 0; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);"></div>
    <div style="position: relative; z-index: 10; display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto;">
        <div class="logo" style="font-size: 1.75rem; font-weight: 800; color: white; letter-spacing: -0.025em;">
            GradientPro
        </div>
        <nav style="display: flex; gap: 2rem; align-items: center;">
            <a href="#" style="color: white; text-decoration: none; font-weight: 500; opacity: 0.9; transition: opacity 0.2s;">Features</a>
            <a href="#" style="color: white; text-decoration: none; font-weight: 500; opacity: 0.9; transition: opacity 0.2s;">Pricing</a>
            <a href="#" style="color: white; text-decoration: none; font-weight: 500; opacity: 0.9; transition: opacity 0.2s;">Docs</a>
            <button style="background: white; color: #667eea; border: none; padding: 0.625rem 1.5rem; border-radius: 9999px; font-weight: 600; cursor: pointer; transition: transform 0.2s;">
                Try Free
            </button>
        </nav>
    </div>
</header>
`);

  // Body Examples (Pure CSS)
  sourceComponents.set('body-1-pure-css', `
<section class="hero-section" style="padding: 6rem 2rem; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white;">
    <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
        <span class="badge" style="display: inline-block; background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; margin-bottom: 1.5rem;">
            NEW FEATURE
        </span>
        <h1 style="font-size: 4rem; font-weight: 800; line-height: 1; margin-bottom: 2rem; background: linear-gradient(to right, #60a5fa, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Build Amazing Websites Faster
        </h1>
        <p style="font-size: 1.25rem; color: #cbd5e0; max-width: 48rem; margin: 0 auto 3rem; line-height: 1.6;">
            Create stunning web pages with our drag-and-drop builder. No coding required.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button style="background: #3b82f6; color: white; border: none; padding: 1rem 2.5rem; border-radius: 0.5rem; font-size: 1.125rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                Start Building Free
            </button>
            <button style="background: transparent; color: #cbd5e0; border: 2px solid #4b5563; padding: 1rem 2.5rem; border-radius: 0.5rem; font-size: 1.125rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                View Demo
            </button>
        </div>
    </div>
</section>
`);

  // Footer Examples (Pure CSS)
  sourceComponents.set('footer-1-pure-css', `
<footer class="basic-footer" style="background: #111827; padding: 3rem 2rem; border-top: 1px solid #374151;">
    <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 2rem;">
        <div class="footer-left">
            <div style="font-size: 1.5rem; font-weight: bold; color: #60a5fa; margin-bottom: 0.5rem;">
                WebBuilder
            </div>
            <p style="color: #9ca3af; font-size: 0.875rem;">
                Build beautiful websites faster than ever before.
            </p>
        </div>
        
        <div class="footer-middle">
            <div style="color: #d1d5db; margin-bottom: 0.5rem; font-weight: 500;">
                Quick Links
            </div>
            <div style="display: flex; gap: 1.5rem;">
                <a href="#" style="color: #9ca3af; text-decoration: none; font-size: 0.875rem;">Home</a>
                <a href="#" style="color: #9ca3af; text-decoration: none; font-size: 0.875rem;">About</a>
                <a href="#" style="color: #9ca3af; text-decoration: none; font-size: 0.875rem;">Pricing</a>
                <a href="#" style="color: #9ca3af; text-decoration: none; font-size: 0.875rem;">Contact</a>
            </div>
        </div>
        
        <div class="footer-right">
            <div style="color: #d1d5db; margin-bottom: 0.5rem; font-weight: 500;">
                Contact
            </div>
            <p style="color: #9ca3af; font-size: 0.875rem;">
                contact@webbuilder.com<br>
                +1 (555) 123-4567
            </p>
        </div>
    </div>
    
    <div style="max-width: 1200px; margin: 2rem auto 0; padding-top: 2rem; border-top: 1px solid #374151; text-align: center;">
        <p style="color: #6b7280; font-size: 0.875rem;">
            © 2024 WebBuilder. All rights reserved.
        </p>
    </div>
</footer>
`);

  // Additional Tailwind versions
  sourceComponents.set('header-1-tailwind', `
<nav class="bg-gray-900 px-8 py-4 flex justify-between items-center border-b border-gray-800">
    <div class="text-2xl font-bold text-blue-400">
        BrandLogo
    </div>
    <div class="flex gap-8">
        <a href="#" class="text-gray-300 hover:text-white font-medium">Home</a>
        <a href="#" class="text-gray-300 hover:text-white font-medium">About</a>
        <a href="#" class="text-gray-300 hover:text-white font-medium">Services</a>
        <a href="#" class="text-gray-300 hover:text-white font-medium">Contact</a>
    </div>
    <button class="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
        Get Started
    </button>
</nav>
`);

  sourceComponents.set('body-1-tailwind', `
<section class="bg-gradient-to-br from-gray-900 to-gray-800 py-24 px-4">
    <div class="max-w-6xl mx-auto text-center">
        <span class="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            NEW FEATURE
        </span>
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">
            Build Amazing Websites Faster
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Create stunning web pages with our drag-and-drop builder. No coding required.
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
            <button class="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
                Start Building Free
            </button>
            <button class="bg-transparent text-gray-300 border-2 border-gray-600 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-500 transition">
                View Demo
            </button>
        </div>
    </div>
</section>
`);

  sourceComponents.set('footer-1-tailwind', `
<footer class="bg-gray-950 py-12 px-4 border-t border-gray-800">
    <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="text-center md:text-left">
                <div class="text-2xl font-bold text-blue-400 mb-2">
                    WebBuilder
                </div>
                <p class="text-gray-400 text-sm">
                    Build beautiful websites faster than ever before.
                </p>
            </div>
            
            <div class="text-center">
                <div class="text-gray-300 font-medium mb-2">
                    Quick Links
                </div>
                <div class="flex gap-6">
                    <a href="#" class="text-gray-400 hover:text-white text-sm">Home</a>
                    <a href="#" class="text-gray-400 hover:text-white text-sm">About</a>
                    <a href="#" class="text-gray-400 hover:text-white text-sm">Pricing</a>
                    <a href="#" class="text-gray-400 hover:text-white text-sm">Contact</a>
                </div>
            </div>
            
            <div class="text-center md:text-right">
                <div class="text-gray-300 font-medium mb-2">
                    Contact
                </div>
                <p class="text-gray-400 text-sm">
                    contact@webbuilder.com<br>
                    +1 (555) 123-4567
                </p>
            </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-gray-800 text-center">
            <p class="text-gray-500 text-sm">
                © 2024 WebBuilder. All rights reserved.
            </p>
        </div>
    </div>
</footer>
`);
};

// --- Lifecycle Hook ---
onMounted(() => {
  populateSourceComponents();
  activeMainTab.value = 'header';
  activeSubTab.value = {
    header: 'all',
    body: 'all',
    footer: 'all'
  };
});
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.3);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.8);
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Component Preview Styling */
.component-card {
  min-height: 500px;
  background: linear-gradient(135deg, #111827, #0f172a);
}

/* Animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

/* Responsive Grid */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr !important;
  }
}

/* Selection Styling */
label:has(.part-radio:checked) {
  border-color: rgb(59, 130, 246);
  background-color: rgba(59, 130, 246, 0.1);
}

/* Smooth transitions */
#header-slot,
#body-slot,
#footer-slot {
  transition: all 0.2s ease;
}

/* Sub-tab styling */
button.capitalize {
  text-transform: capitalize;
}
</style>