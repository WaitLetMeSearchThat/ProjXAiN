<template>
  <div class="module-container">
    <div class="module-header">
      <h1>Module 4: Web Application Development</h1>
      <p class="module-subtitle">Learn to build modern web applications</p>
    </div>

    <div class="module-content">
      <section class="learning-section">
        <h2>Web Technologies Overview</h2>
        <p>Modern web development involves multiple technologies working together to create interactive, responsive, and scalable web applications.</p>

        <div class="tech-stack">
          <div class="tech-layer">
            <h3>Frontend (Client-Side)</h3>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-name">HTML5</span>
                <span class="tech-desc">Structure and content</span>
              </div>
              <div class="tech-item">
                <span class="tech-name">CSS3</span>
                <span class="tech-desc">Styling and layout</span>
              </div>
              <div class="tech-item">
                <span class="tech-name">JavaScript</span>
                <span class="tech-desc">Interactivity and logic</span>
              </div>
              <div class="tech-item">
                <span class="tech-name">Frameworks</span>
                <span class="tech-desc">React, Vue, Angular</span>
              </div>
            </div>
          </div>

          <div class="tech-layer">
            <h3>Backend (Server-Side)</h3>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-name">Node.js</span>
                <span class="tech-desc">JavaScript runtime</span>
              </div>
              <div class="tech-item">
                <span class="tech-name">Express.js</span>
                <span class="tech-desc">Web framework</span>
              </div>
              <div class="tech-item">
                <span class="tech-name">Databases</span>
                <span class="tech-desc">MongoDB, PostgreSQL</span>
              </div>
              <div class="tech-item">
                <span class="tech-name">APIs</span>
                <span class="tech-desc">REST, GraphQL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Frontend Development</h2>
        <div class="frontend-concepts">
          <div class="concept-block">
            <h3>Responsive Design</h3>
            <p>Creating websites that work well on all devices and screen sizes.</p>
            <div class="code-example">
              <pre><code>/* CSS Media Queries */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

/* CSS Grid & Flexbox */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}</code></pre>
            </div>
          </div>

          <div class="concept-block">
            <h3>Modern JavaScript</h3>
            <p>ES6+ features that make JavaScript more powerful and easier to use.</p>
            <div class="code-example">
              <pre><code>// Arrow functions
const greet = (name) => `Hello, ${name}!`;

// Async/await
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();
  return user;
}

// Destructuring
const { name, age } = user;</code></pre>
            </div>
          </div>

          <div class="concept-block">
            <h3>Component-Based Architecture</h3>
            <p>Building UIs with reusable, self-contained components.</p>
            <div class="code-example">
              <pre><code>// React Component Example
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}

// Usage
<Button onClick={handleClick}>
  Click me!
</Button></code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Backend Development</h2>
        <div class="backend-concepts">
          <div class="concept-block">
            <h3>RESTful APIs</h3>
            <p>Designing APIs that follow REST principles for reliable communication.</p>
            <div class="api-endpoints">
              <div class="endpoint">
                <code>GET /api/users</code>
                <span>Retrieve all users</span>
              </div>
              <div class="endpoint">
                <code>POST /api/users</code>
                <span>Create new user</span>
              </div>
              <div class="endpoint">
                <code>PUT /api/users/:id</code>
                <span>Update user</span>
              </div>
              <div class="endpoint">
                <code>DELETE /api/users/:id</code>
                <span>Delete user</span>
              </div>
            </div>
          </div>

          <div class="concept-block">
            <h3>Database Design</h3>
            <p>Creating efficient database schemas and relationships.</p>
            <div class="code-example">
              <pre><code>// User Schema Example
const userSchema = {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
};

// Relationships
const postSchema = {
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
};</code></pre>
            </div>
          </div>

          <div class="concept-block">
            <h3>Authentication & Security</h3>
            <p>Implementing secure user authentication and authorization.</p>
            <ul>
              <li>JWT (JSON Web Tokens)</li>
              <li>Password hashing (bcrypt)</li>
              <li>Input validation and sanitization</li>
              <li>CORS configuration</li>
              <li>Rate limiting</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Full-Stack Development</h2>
        <div class="fullstack-overview">
          <div class="stack-section">
            <h3>MERN Stack Example</h3>
            <div class="stack-components">
              <div class="component">
                <span class="component-name">MongoDB</span>
                <span class="component-role">Database</span>
              </div>
              <div class="component">
                <span class="component-name">Express.js</span>
                <span class="component-role">Backend Framework</span>
              </div>
              <div class="component">
                <span class="component-name">React</span>
                <span class="component-role">Frontend Library</span>
              </div>
              <div class="component">
                <span class="component-name">Node.js</span>
                <span class="component-role">Runtime Environment</span>
              </div>
            </div>
          </div>

          <div class="development-workflow">
            <h3>Development Workflow</h3>
            <div class="workflow-steps">
              <div class="workflow-step">
                <div class="step-number">1</div>
                <h4>Setup Development Environment</h4>
                <p>Install Node.js, set up project structure</p>
              </div>
              <div class="workflow-step">
                <div class="step-number">2</div>
                <h4>Create Backend API</h4>
                <p>Build REST endpoints and database models</p>
              </div>
              <div class="workflow-step">
                <div class="step-number">3</div>
                <h4>Develop Frontend Components</h4>
                <p>Create UI components and implement logic</p>
              </div>
              <div class="workflow-step">
                <div class="step-number">4</div>
                <h4>Integration & Testing</h4>
                <p>Connect frontend to backend, test functionality</p>
              </div>
              <div class="workflow-step">
                <div class="step-number">5</div>
                <h4>Deployment</h4>
                <p>Deploy to production environment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Best Practices & Tools</h2>
        <div class="best-practices">
          <div class="practice-category">
            <h3>Development Tools</h3>
            <ul>
              <li><strong>Version Control:</strong> Git & GitHub</li>
              <li><strong>Package Management:</strong> npm, yarn</li>
              <li><strong>Build Tools:</strong> Webpack, Vite</li>
              <li><strong>Testing:</strong> Jest, Cypress</li>
              <li><strong>Code Quality:</strong> ESLint, Prettier</li>
            </ul>
          </div>

          <div class="practice-category">
            <h3>Performance Optimization</h3>
            <ul>
              <li>Code splitting and lazy loading</li>
              <li>Image optimization</li>
              <li>Caching strategies</li>
              <li>Minification and compression</li>
              <li>CDN usage</li>
            </ul>
          </div>

          <div class="practice-category">
            <h3>Security Considerations</h3>
            <ul>
              <li>HTTPS implementation</li>
              <li>Input validation</li>
              <li>XSS prevention</li>
              <li>CSRF protection</li>
              <li>Secure headers</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="module-navigation">
      <router-link to="/modules/applications-dev/module3" class="nav-button back-button">
        ← Previous Module
      </router-link>
      <router-link to="/modules" class="nav-button home-button">
        Modules Home
      </router-link>
      <router-link to="/modules/applications-dev/module5" class="nav-button next-button">
        Next Module →
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Module4'
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

.tech-stack {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.tech-layer {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.tech-layer h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;
}

.tech-items {
  display: grid;
  gap: 1rem;
}

.tech-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tech-name {
  font-weight: bold;
  color: #1f2937;
}

.tech-desc {
  color: #6b7280;
  font-size: 0.9rem;
}

.frontend-concepts, .backend-concepts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.concept-block {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.concept-block h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.concept-block p {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.code-example {
  background: #1f2937;
  border-radius: 5px;
  padding: 1rem;
  margin-top: 1rem;
}

.code-example pre {
  margin: 0;
  color: #e5e7eb;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.api-endpoints {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
}

.endpoint {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.endpoint code {
  background: #4f46e5;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-weight: bold;
}

.endpoint span {
  color: #6b7280;
  font-size: 0.9rem;
}

.concept-block ul {
  color: #6b7280;
  padding-left: 1.5rem;
}

.concept-block li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.fullstack-overview {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 2rem;
}

.stack-section {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.stack-section h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;
}

.stack-components {
  display: grid;
  gap: 0.75rem;
}

.component {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.component-name {
  font-weight: bold;
  color: #1f2937;
}

.component-role {
  color: #6b7280;
  font-size: 0.9rem;
}

.development-workflow {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.development-workflow h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;
}

.workflow-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.workflow-step {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 30px;
  height: 30px;
  background: #4f46e5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 0.75rem;
}

.workflow-step h4 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
}

.workflow-step p {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.4;
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.practice-category {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.practice-category h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.practice-category ul {
  color: #6b7280;
  padding-left: 1.5rem;
}

.practice-category li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.practice-category li strong {
  color: #1f2937;
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

  .tech-stack, .frontend-concepts, .backend-concepts, .fullstack-overview, .best-practices {
    grid-template-columns: 1fr;
  }

  .workflow-steps {
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
