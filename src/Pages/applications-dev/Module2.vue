<template>
  <div class="module-container">
    <div class="module-header">
      <h1>Module 2: Software Development Life Cycle (SDLC)</h1>
      <p class="module-subtitle">Explore the complete software development process</p>
    </div>

    <div class="module-content">
      <section class="learning-section">
        <h2>What is SDLC?</h2>
        <p>The Software Development Life Cycle (SDLC) is a systematic process for planning, creating, testing, and deploying software applications. It provides a structured approach to ensure quality and efficiency in software development.</p>

        <div class="sdlc-overview">
          <div class="sdlc-diagram">
            <div class="phase planning">
              <h4>Planning</h4>
              <p>Define scope, requirements, and resources</p>
            </div>
            <div class="phase analysis">
              <h4>Analysis</h4>
              <p>Gather and analyze requirements</p>
            </div>
            <div class="phase design">
              <h4>Design</h4>
              <p>Create system and software design</p>
            </div>
            <div class="phase implementation">
              <h4>Implementation</h4>
              <p>Write and integrate code</p>
            </div>
            <div class="phase testing">
              <h4>Testing</h4>
              <p>Verify and validate the software</p>
            </div>
            <div class="phase deployment">
              <h4>Deployment</h4>
              <p>Release to production environment</p>
            </div>
            <div class="phase maintenance">
              <h4>Maintenance</h4>
              <p>Monitor, update, and support</p>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>SDLC Models</h2>
        <div class="model-grid">
          <div class="model-card">
            <h3>Waterfall Model</h3>
            <p>Linear sequential approach where each phase must be completed before moving to the next.</p>
            <div class="model-pros-cons">
              <div class="pros">
                <strong>Pros:</strong> Simple, easy to understand, clear milestones
              </div>
              <div class="cons">
                <strong>Cons:</strong> Inflexible, late testing, high risk
              </div>
            </div>
          </div>

          <div class="model-card">
            <h3>Agile Model</h3>
            <p>Iterative approach with short development cycles called sprints.</p>
            <div class="model-pros-cons">
              <div class="pros">
                <strong>Pros:</strong> Flexible, customer feedback, faster delivery
              </div>
              <div class="cons">
                <strong>Cons:</strong> Less predictability, requires experienced team
              </div>
            </div>
          </div>

          <div class="model-card">
            <h3>Spiral Model</h3>
            <p>Combines iterative development with systematic aspects of waterfall model.</p>
            <div class="model-pros-cons">
              <div class="pros">
                <strong>Pros:</strong> Risk assessment, flexible, suitable for large projects
              </div>
              <div class="cons">
                <strong>Cons:</strong> Complex, expensive, requires expertise
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Key Activities in Each Phase</h2>
        <div class="phase-details">
          <div class="phase-detail">
            <h4>📋 Planning Phase</h4>
            <ul>
              <li>Define project scope and objectives</li>
              <li>Conduct feasibility study</li>
              <li>Estimate resources and timeline</li>
              <li>Create project plan</li>
            </ul>
          </div>

          <div class="phase-detail">
            <h4>🔍 Analysis Phase</h4>
            <ul>
              <li>Gather functional requirements</li>
              <li>Analyze user needs</li>
              <li>Create use cases</li>
              <li>Define system requirements</li>
            </ul>
          </div>

          <div class="phase-detail">
            <h4>🎨 Design Phase</h4>
            <ul>
              <li>Create system architecture</li>
              <li>Design user interface</li>
              <li>Design database schema</li>
              <li>Create detailed specifications</li>
            </ul>
          </div>

          <div class="phase-detail">
            <h4>💻 Implementation Phase</h4>
            <ul>
              <li>Write code according to specifications</li>
              <li>Code review and integration</li>
              <li>Unit testing</li>
              <li>Version control management</li>
            </ul>
          </div>

          <div class="phase-detail">
            <h4>🧪 Testing Phase</h4>
            <ul>
              <li>System testing</li>
              <li>Integration testing</li>
              <li>User acceptance testing</li>
              <li>Performance testing</li>
            </ul>
          </div>

          <div class="phase-detail">
            <h4>🚀 Deployment Phase</h4>
            <ul>
              <li>Prepare deployment environment</li>
              <li>Data migration</li>
              <li>User training</li>
              <li>Go-live support</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Best Practices</h2>
        <div class="best-practices">
          <div class="practice-item">
            <h4>Documentation</h4>
            <p>Maintain comprehensive documentation throughout the SDLC for future reference and maintenance.</p>
          </div>
          <div class="practice-item">
            <h4>Version Control</h4>
            <p>Use version control systems like Git to track changes and enable collaboration.</p>
          </div>
          <div class="practice-item">
            <h4>Quality Assurance</h4>
            <p>Implement quality checks at every phase to prevent defects from propagating.</p>
          </div>
          <div class="practice-item">
            <h4>Stakeholder Communication</h4>
            <p>Regular communication with stakeholders ensures alignment and early feedback.</p>
          </div>
        </div>
      </section>
    </div>

    <div class="module-navigation">
      <router-link to="/modules/applications-dev/module1" class="nav-button back-button">
        ← Previous Module
      </router-link>
      <router-link to="/modules" class="nav-button home-button">
        Modules Home
      </router-link>
      <router-link to="/modules/applications-dev/module3" class="nav-button next-button">
        Next Module →
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Module2'
}
</script>

<style scoped>
.module-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.module-header {
  text-align: center;
  margin-bottom: 3rem;
}

.module-header h1 {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: bold;
}

.module-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
}

.module-content {
  max-width: 1200px;
  margin: 0 auto;
}

.learning-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.learning-section h2 {
  color: #1f2937;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.learning-section p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.sdlc-overview {
  margin-top: 2rem;
}

.sdlc-diagram {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.phase {
  background: #4f46e5;
  color: white;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  min-width: 150px;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
}

.phase h4 {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.phase p {
  font-size: 0.9rem;
  opacity: 0.9;
}

.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.model-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid #4f46e5;
}

.model-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.model-card p {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.model-pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.pros, .cons {
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 0.9rem;
}

.pros {
  background: #dcfce7;
  color: #166534;
}

.cons {
  background: #fef2f2;
  color: #991b1b;
}

.phase-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.phase-detail {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.phase-detail h4 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.phase-detail ul {
  list-style: none;
  padding: 0;
}

.phase-detail li {
  color: #6b7280;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.phase-detail li:before {
  content: "•";
  color: #4f46e5;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.practice-item {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
}

.practice-item h4 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.practice-item p {
  color: #6b7280;
  line-height: 1.5;
}

.module-navigation {
  max-width: 1200px;
  margin: 3rem auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.back-button {
  background: rgba(255, 255, 255, 0.9);
  color: #4f46e5;
  border: 2px solid #4f46e5;
}

.back-button:hover {
  background: #4f46e5;
  color: white;
}

.home-button {
  background: rgba(255, 255, 255, 0.9);
  color: #6b7280;
  border: 2px solid #6b7280;
}

.home-button:hover {
  background: #6b7280;
  color: white;
}

.next-button {
  background: #4f46e5;
  color: white;
  border: 2px solid #4f46e5;
}

.next-button:hover {
  background: #3730a3;
  border-color: #3730a3;
}

@media (max-width: 768px) {
  .module-container {
    padding: 1rem;
  }

  .module-header h1 {
    font-size: 2rem;
  }

  .sdlc-diagram {
    flex-direction: column;
    align-items: center;
  }

  .phase {
    min-width: 200px;
  }

  .model-grid, .phase-details {
    grid-template-columns: 1fr;
  }

  .module-navigation {
    flex-direction: column;
  }

  .nav-button {
    text-align: center;
  }
}
</style>
