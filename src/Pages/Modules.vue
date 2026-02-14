<template>
  <div class="modules-overview ">
    <div class="hero-section bg-gray-100 p-4  backdrop-blur-2xl shadow-2xl">
      <h1>📚APP DEV: APPLICATIONS DEVELOPMENT</h1>
      <p class="subtitle">Instructor: Feleciano L. Santiago Jr.,MSIT</p>
    </div>

    <div class="modules-grid max-w-6xl bg-gray-100 p-4 backdrop-blur-2xl shadow-2xl">
      <!-- Existing Modules -->
      

     

      <!-- Applications Development Modules -->
      <div class="module-card featured" @click="navigateTo('/modules/applications-dev/module1')">
        <div class="module-icon">🚀</div>
        <h3>Module 1: Introduction to Applications Development</h3>
        <p>Discover the fundamentals of application development, including types of applications and development environments.</p>
        <div class="module-meta">
          <span class="difficulty">Beginner</span>
          <span class="duration">2-3 hours</span>
        </div>
      </div>

      <div class="module-card featured" @click="navigateTo('/modules/applications-dev/module2')">
        <div class="module-icon">🔄</div>
        <h3>Module 2: Software Development Life Cycle (SDLC)</h3>
        <p>Explore the complete software development process from planning to deployment and maintenance.</p>
        <div class="module-meta">
          <span class="difficulty">Intermediate</span>
          <span class="duration">3-4 hours</span>
        </div>
      </div>

      <div class="module-card featured" @click="navigateTo('/modules/applications-dev/module3')">
        <div class="module-icon">🧩</div>
        <h3>Module 3: Programming Fundamentals</h3>
        <p>Master core programming concepts including variables, control structures, functions, and object-oriented programming.</p>
        <div class="module-meta">
          <span class="difficulty">Beginner to Intermediate</span>
          <span class="duration">4-5 hours</span>
        </div>
      </div>

      <div class="module-card featured" @click="navigateTo('/modules/applications-dev/module4')">
        <div class="module-icon">🌐</div>
        <h3>Module 4: Web Application Development</h3>
        <p>Learn to build modern web applications using frameworks, APIs, and best practices for scalability.</p>
        <div class="module-meta">
          <span class="difficulty">Intermediate</span>
          <span class="duration">5-6 hours</span>
        </div>
      </div>

      <div class="module-card featured" @click="navigateTo('/modules/applications-dev/module5')">
        <div class="module-icon">📱</div>
        <h3>Module 5: Mobile Application Development</h3>
        <p>Develop mobile applications for iOS and Android platforms, covering native and cross-platform solutions.</p>
        <div class="module-meta">
          <span class="difficulty">Intermediate to Advanced</span>
          <span class="duration">6-8 hours</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'ModulesOverview',
  setup() {
    const router = useRouter()

    const navigateTo = (path) => {
      router.push(path)
    }

    return {
      navigateTo
    }
  }
}
</script>

<style scoped>
.modules-overview {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 3rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.module-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.module-card.featured {
  border-color: #4f46e5;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.module-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.module-card h3 {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.module-card p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.module-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.difficulty {
  background: #e5e7eb;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  color: #374151;
}

.duration {
  color: #6b7280;
  font-weight: 500;
}

@media (max-width: 768px) {
  .modules-grid {
    grid-template-columns: 1fr;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .module-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
