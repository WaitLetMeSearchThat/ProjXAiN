<template>
  <div class="module-container">
    <div class="module-header">
      <h1>Module 1: Introduction to Applications Development</h1>
      <p class="module-subtitle">Discover the fundamentals of application development</p>
    </div>

    <div class="module-content">
      <section class="learning-section">
        <h2>What is Applications Development?</h2>
        <p>Applications development refers to the process of creating software applications that run on various platforms and devices. This includes web applications, mobile apps, desktop software, and more.</p>

        <div class="content-grid">
          <div class="content-card">
            <h3>Types of Applications</h3>
            <ul>
              <li><strong>Web Applications:</strong> Run in web browsers</li>
              <li><strong>Mobile Applications:</strong> Designed for smartphones and tablets</li>
              <li><strong>Desktop Applications:</strong> Installed on computers</li>
              <li><strong>Cloud Applications:</strong> Hosted on remote servers</li>
            </ul>
          </div>

          <div class="content-card">
            <h3>Development Environments</h3>
            <ul>
              <li><strong>Integrated Development Environment (IDE):</strong> Comprehensive tools for coding</li>
              <li><strong>Text Editors:</strong> Lightweight coding tools</li>
              <li><strong>Version Control:</strong> Track changes and collaborate</li>
              <li><strong>Testing Frameworks:</strong> Ensure code quality</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Key Concepts</h2>
        <div class="concept-grid">
          <div class="concept-item">
            <h4>Programming Languages</h4>
            <p>Languages like JavaScript, Python, Java, C#, and more are used to write application code.</p>
          </div>
          <div class="concept-item">
            <h4>Frameworks & Libraries</h4>
            <p>Pre-built tools that speed up development and provide common functionality.</p>
          </div>
          <div class="concept-item">
            <h4>User Interface (UI)</h4>
            <p>The visual part of the application that users interact with.</p>
          </div>
          <div class="concept-item">
            <h4>User Experience (UX)</h4>
            <p>How users feel when using the application - ease of use and satisfaction.</p>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Development Process</h2>
        <div class="process-steps">
          <div class="step">
            <div class="step-number">1</div>
            <h4>Planning</h4>
            <p>Define requirements and create a development plan.</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h4>Design</h4>
            <p>Create wireframes and design the user interface.</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h4>Development</h4>
            <p>Write code and implement features.</p>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <h4>Testing</h4>
            <p>Test the application for bugs and issues.</p>
          </div>
          <div class="step">
            <div class="step-number">5</div>
            <h4>Deployment</h4>
            <p>Release the application to users.</p>
          </div>
        </div>
      </section>
    </div>

    <div class="module-navigation">
      <router-link to="/modules" class="nav-button back-button">
        ← Back to Modules
      </router-link>
      <router-link to="/modules/applications-dev/module2" class="nav-button next-button">
        Next Module →
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Module1'
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

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.content-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid #4f46e5;
}

.content-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.content-card ul {
  list-style: none;
  padding: 0;
}

.content-card li {
  color: #6b7280;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.content-card li strong {
  color: #1f2937;
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.concept-item {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
}

.concept-item h4 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.concept-item p {
  color: #6b7280;
  line-height: 1.5;
}

.process-steps {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.step {
  flex: 1;
  min-width: 200px;
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #4f46e5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.step h4 {
  color: #1f2937;
  margin-bottom: 0.75rem;
  font-weight: bold;
}

.step p {
  color: #6b7280;
  line-height: 1.5;
}

.module-navigation {
  max-width: 1200px;
  margin: 3rem auto 0;
  display: flex;
  justify-content: space-between;
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

  .process-steps {
    flex-direction: column;
  }

  .module-navigation {
    flex-direction: column;
  }

  .nav-button {
    text-align: center;
  }
}
</style>
