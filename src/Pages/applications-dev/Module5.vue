<template>
  <div class="module-container">
    <div class="module-header">
      <h1>Module 5: Mobile Application Development</h1>
      <p class="module-subtitle">Develop mobile applications for iOS and Android platforms</p>
    </div>

    <div class="module-content">
      <section class="learning-section">
        <h2>Mobile Development Approaches</h2>
        <p>Mobile application development offers different approaches, each with its own advantages and use cases.</p>

        <div class="development-approaches">
          <div class="approach-card">
            <h3>Native Development</h3>
            <div class="platforms">
              <div class="platform">
                <h4>iOS Development</h4>
                <ul>
                  <li><strong>Language:</strong> Swift or Objective-C</li>
                  <li><strong>IDE:</strong> Xcode</li>
                  <li><strong>UI Framework:</strong> UIKit or SwiftUI</li>
                  <li><strong>Advantages:</strong> Best performance, full device access</li>
                </ul>
              </div>
              <div class="platform">
                <h4>Android Development</h4>
                <ul>
                  <li><strong>Language:</strong> Kotlin or Java</li>
                  <li><strong>IDE:</strong> Android Studio</li>
                  <li><strong>UI Framework:</strong> XML layouts with Views</li>
                  <li><strong>Advantages:</strong> Large market share, customizable</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="approach-card">
            <h3>Cross-Platform Development</h3>
            <div class="cross-platform-options">
              <div class="option">
                <h4>React Native</h4>
                <p>JavaScript framework for building native apps using React</p>
                <div class="pros-cons">
                  <strong>Pros:</strong> Code reuse, fast development, large community
                  <br><strong>Cons:</strong> Performance overhead, platform-specific issues
                </div>
              </div>
              <div class="option">
                <h4>Flutter</h4>
                <p>Google's UI toolkit for building natively compiled applications</p>
                <div class="pros-cons">
                  <strong>Pros:</strong> Excellent performance, beautiful UI, single codebase
                  <br><strong>Cons:</strong> Learning curve, smaller ecosystem
                </div>
              </div>
              <div class="option">
                <h4>Xamarin</h4>
                <p>Microsoft's framework using C# for cross-platform development</p>
                <div class="pros-cons">
                  <strong>Pros:</strong> Native performance, .NET ecosystem
                  <br><strong>Cons:</strong> Limited to Microsoft tools, smaller community
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Mobile UI/UX Principles</h2>
        <div class="ui-principles">
          <div class="principle-card">
            <h3>Platform Guidelines</h3>
            <div class="guidelines">
              <div class="guideline">
                <h4>Human Interface Guidelines (iOS)</h4>
                <ul>
                  <li>Clear and concise navigation</li>
                  <li>Consistent with iOS design patterns</li>
                  <li>Respect user's attention and time</li>
                  <li>Support all device sizes and orientations</li>
                </ul>
              </div>
              <div class="guideline">
                <h4>Material Design (Android)</h4>
                <ul>
                  <li>Bold, graphic, intentional design</li>
                  <li>Meaningful motion and transitions</li>
                  <li>Adaptive design for all devices</li>
                  <li>Emphasis on touch and gesture</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="principle-card">
            <h3>Mobile-First Design</h3>
            <ul>
              <li>Touch-friendly interface elements</li>
              <li>Thumb-friendly navigation zones</li>
              <li>Readable text without zooming</li>
              <li>Optimized for various screen sizes</li>
              <li>Consider one-handed usage</li>
            </ul>
          </div>

          <div class="principle-card">
            <h3>Performance Considerations</h3>
            <ul>
              <li>Minimize app size and loading times</li>
              <li>Optimize images and assets</li>
              <li>Efficient data fetching and caching</li>
              <li>Smooth animations and transitions</li>
              <li>Battery-efficient operations</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>App Architecture & State Management</h2>
        <div class="architecture-concepts">
          <div class="concept-block">
            <h3>MVVM Pattern (Model-View-ViewModel)</h3>
            <p>Separation of concerns between UI, business logic, and data.</p>
            <div class="architecture-diagram">
              <div class="layer model">Model<br><small>Data & Business Logic</small></div>
              <div class="layer viewmodel">ViewModel<br><small>UI Logic & State</small></div>
              <div class="layer view">View<br><small>User Interface</small></div>
            </div>
          </div>

          <div class="concept-block">
            <h3>State Management</h3>
            <p>Managing application state across components and screens.</p>
            <div class="state-solutions">
              <div class="solution">
                <h4>Redux (React Native)</h4>
                <p>Predictable state container using actions and reducers</p>
              </div>
              <div class="solution">
                <h4>Provider (Flutter)</h4>
                <p>Dependency injection and state management solution</p>
              </div>
              <div class="solution">
                <h4>ViewModel (Android)</h4>
                <p>Store UI-related data that survives configuration changes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Device Features & APIs</h2>
        <div class="device-features">
          <div class="feature-category">
            <h3>Hardware Access</h3>
            <div class="features-grid">
              <div class="feature-item">
                <span class="feature-icon">📷</span>
                <h4>Camera</h4>
                <p>Photo/video capture, QR scanning</p>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📍</span>
                <h4>GPS & Location</h4>
                <p>Location services, geofencing</p>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📞</span>
                <h4>Phone & SMS</h4>
                <p>Calls, messaging, contacts</p>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔊</span>
                <h4>Audio & Media</h4>
                <p>Music, recording, playback</p>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📊</span>
                <h4>Sensors</h4>
                <p>Accelerometer, gyroscope, compass</p>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔒</span>
                <h4>Biometrics</h4>
                <p>Fingerprint, face recognition</p>
              </div>
            </div>
          </div>

          <div class="feature-category">
            <h3>Platform Services</h3>
            <ul>
              <li><strong>Push Notifications:</strong> Engage users with timely updates</li>
              <li><strong>In-App Purchases:</strong> Monetization through digital goods</li>
              <li><strong>Offline Support:</strong> Work without internet connectivity</li>
              <li><strong>Background Tasks:</strong> Perform operations when app is not active</li>
              <li><strong>App Store Integration:</strong> Ratings, reviews, and analytics</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Testing & Deployment</h2>
        <div class="testing-deployment">
          <div class="testing-section">
            <h3>Mobile Testing Strategies</h3>
            <div class="testing-types">
              <div class="testing-type">
                <h4>Unit Testing</h4>
                <p>Test individual functions and components</p>
                <div class="tools">Jest, JUnit, XCTest</div>
              </div>
              <div class="testing-type">
                <h4>Integration Testing</h4>
                <p>Test component interactions and data flow</p>
                <div class="tools">Detox, Espresso, XCUITest</div>
              </div>
              <div class="testing-type">
                <h4>UI Testing</h4>
                <p>Test user interface and user flows</p>
                <div class="tools">Appium, TestFlight, Google Play Beta</div>
              </div>
              <div class="testing-type">
                <h4>Device Testing</h4>
                <p>Test on real devices and various configurations</p>
                <div class="tools">Firebase Test Lab, BrowserStack</div>
              </div>
            </div>
          </div>

          <div class="deployment-section">
            <h3>App Store Deployment</h3>
            <div class="store-process">
              <div class="store">
                <h4>Apple App Store</h4>
                <ul>
                  <li>Developer account ($99/year)</li>
                  <li>App Store Connect submission</li>
                  <li>App Review process (1-2 weeks)</li>
                  <li>TestFlight for beta testing</li>
                </ul>
              </div>
              <div class="store">
                <h4>Google Play Store</h4>
                <ul>
                  <li>Developer account ($25 one-time)</li>
                  <li>Play Console submission</li>
                  <li>Automated review (hours to days)</li>
                  <li>Internal/Closed testing options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Best Practices & Trends</h2>
        <div class="best-practices">
          <div class="practice-area">
            <h3>Security</h3>
            <ul>
              <li>Data encryption at rest and in transit</li>
              <li>Secure authentication methods</li>
              <li>Certificate pinning</li>
              <li>Regular security audits</li>
              <li>Compliance with privacy regulations</li>
            </ul>
          </div>

          <div class="practice-area">
            <h3>Performance</h3>
            <ul>
              <li>Optimize app size and startup time</li>
              <li>Efficient memory management</li>
              <li>Smooth scrolling and animations</li>
              <li>Background task optimization</li>
              <li>Network request optimization</li>
            </ul>
          </div>

          <div class="practice-area">
            <h3>Current Trends</h3>
            <ul>
              <li>Progressive Web Apps (PWAs)</li>
              <li>5G-enabled features</li>
              <li>AI/ML integration</li>
              <li>Augmented Reality (AR)</li>
              <li>Internet of Things (IoT) connectivity</li>
              <li>Voice interfaces and chatbots</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="module-navigation">
      <router-link to="/modules/applications-dev/module4" class="nav-button back-button">
        ← Previous Module
      </router-link>
      <router-link to="/modules" class="nav-button home-button">
        Modules Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Module5'
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

.development-approaches {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.approach-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.approach-card h3 {
  color: #1f2937;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.platforms {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.platform h4 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.platform ul {
  color: #6b7280;
  padding-left: 1.5rem;
}

.platform li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.cross-platform-options {
  display: grid;
  gap: 1.5rem;
}

.option {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.option h4 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.option p {
  color: #6b7280;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.pros-cons {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.4;
}

.ui-principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.principle-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.principle-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.guidelines {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.guideline h4 {
  color: #1f2937;
  margin-bottom: 0.75rem;
  font-weight: bold;
  font-size: 1rem;
}

.guideline ul {
  color: #6b7280;
  padding-left: 1.5rem;
}

.guideline li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
  font-size: 0.9rem;
}

.principle-card ul {
  color: #6b7280;
  padding-left: 1.5rem;
}

.principle-card li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.architecture-concepts {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.architecture-diagram {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.layer {
  background: #4f46e5;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  min-width: 120px;
}

.layer small {
  display: block;
  font-size: 0.8rem;
  opacity: 0.8;
  font-weight: normal;
}

.state-solutions {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.solution {
  background: white;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.solution h4 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
}

.solution p {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.4;
}

.device-features {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.feature-category h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.feature-item {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.feature-item h4 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
}

.feature-item p {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.4;
}

.feature-category ul {
  color: #6b7280;
  padding-left: 1.5rem;
}

.feature-category li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.testing-deployment {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.testing-section, .deployment-section {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.testing-section h3, .deployment-section h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.testing-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.testing-type {
  background: white;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.testing-type h4 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
}

.testing-type p {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.tools {
  font-size: 0.8rem;
  color: #4f46e5;
  font-weight: bold;
}

.store-process {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.store h4 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.store ul {
  color: #6b7280;
  padding-left: 1.5rem;
}

.store li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
  font-size: 0.9rem;
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.practice-area {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.practice-area h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.practice-area ul {
  color: #6b7280;
  padding-left: 1.5rem;
}

.practice-area li {
  margin-bottom: 0.5rem;
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

@media (max-width: 768px) {
  .module-container {
    padding: 1rem;
  }

  .module-header h1 {
    font-size: 2rem;
  }

  .platforms, .guidelines, .architecture-concepts, .device-features, .testing-deployment, .store-process, .best-practices {
    grid-template-columns: 1fr;
  }

  .testing-types {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  .module-navigation {
    flex-direction: column;
  }

  .nav-button {
    text-align: center;
  }
}
</style>
