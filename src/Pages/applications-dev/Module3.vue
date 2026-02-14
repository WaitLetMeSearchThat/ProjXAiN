<template>
  <div class="module-container">
    <div class="module-header">
      <h1>Module 3: Programming Fundamentals</h1>
      <p class="module-subtitle">Master core programming concepts and principles</p>
    </div>

    <div class="module-content">
      <section class="learning-section">
        <h2>Core Programming Concepts</h2>
        <p>Programming fundamentals form the foundation of all software development. Understanding these concepts is essential for writing efficient, maintainable, and scalable code.</p>

        <div class="concept-showcase">
          <div class="concept-card">
            <div class="concept-icon">📊</div>
            <h3>Variables & Data Types</h3>
            <p>Containers for storing data values. Different types include integers, strings, booleans, arrays, and objects.</p>
            <div class="code-example">
              <pre><code>// JavaScript example
let name = "John";        // String
let age = 25;            // Number
let isStudent = true;    // Boolean
let scores = [85, 92, 78]; // Array</code></pre>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-icon">🔀</div>
            <h3>Control Structures</h3>
            <p>Statements that control the flow of execution in a program.</p>
            <div class="control-types">
              <div class="control-type">
                <h4>Conditional Statements</h4>
                <pre><code>if (condition) {
  // execute if true
} else {
  // execute if false
}</code></pre>
              </div>
              <div class="control-type">
                <h4>Loops</h4>
                <pre><code>for (let i = 0; i < 5; i++) {
  console.log(i);
}</code></pre>
              </div>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-icon">📦</div>
            <h3>Functions</h3>
            <p>Reusable blocks of code that perform specific tasks.</p>
            <div class="code-example">
              <pre><code>function calculateArea(width, height) {
  return width * height;
}

let area = calculateArea(10, 5);
console.log(area); // Output: 50</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Object-Oriented Programming (OOP)</h2>
        <div class="oop-concepts">
          <div class="oop-card">
            <h3>Classes & Objects</h3>
            <p>Classes are blueprints for creating objects. Objects are instances of classes.</p>
            <div class="code-example">
              <pre><code>class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  start() {
    console.log("Engine started");
  }
}

let myCar = new Car("Toyota", "Camry");
myCar.start();</code></pre>
            </div>
          </div>

          <div class="oop-card">
            <h3>Encapsulation</h3>
            <p>Bundling data and methods that operate on that data within a single unit (class).</p>
          </div>

          <div class="oop-card">
            <h3>Inheritance</h3>
            <p>Creating new classes from existing classes, inheriting properties and methods.</p>
            <div class="code-example">
              <pre><code>class ElectricCar extends Car {
  constructor(make, model, batteryLife) {
    super(make, model);
    this.batteryLife = batteryLife;
  }

  charge() {
    console.log("Charging battery");
  }
}</code></pre>
            </div>
          </div>

          <div class="oop-card">
            <h3>Polymorphism</h3>
            <p>The ability of objects to take on multiple forms, typically through method overriding.</p>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Data Structures</h2>
        <div class="data-structures">
          <div class="ds-card">
            <h3>Arrays</h3>
            <p>Ordered collections of elements that can be accessed by index.</p>
            <div class="code-example">
              <pre><code>let fruits = ["apple", "banana", "orange"];
console.log(fruits[0]); // "apple"
fruits.push("grape");   // Add element</code></pre>
            </div>
          </div>

          <div class="ds-card">
            <h3>Objects/Dictionaries</h3>
            <p>Collections of key-value pairs for storing structured data.</p>
            <div class="code-example">
              <pre><code>let person = {
  name: "John",
  age: 30,
  city: "New York"
};
console.log(person.name); // "John"</code></pre>
            </div>
          </div>

          <div class="ds-card">
            <h3>Stacks & Queues</h3>
            <p>Linear data structures with specific access patterns.</p>
            <ul>
              <li><strong>Stack:</strong> Last In, First Out (LIFO)</li>
              <li><strong>Queue:</strong> First In, First Out (FIFO)</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Best Practices</h2>
        <div class="best-practices">
          <div class="practice-card">
            <h3>Code Readability</h3>
            <ul>
              <li>Use meaningful variable and function names</li>
              <li>Add comments for complex logic</li>
              <li>Follow consistent indentation</li>
              <li>Keep functions small and focused</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>Error Handling</h3>
            <ul>
              <li>Use try-catch blocks for potential errors</li>
              <li>Validate input data</li>
              <li>Provide meaningful error messages</li>
              <li>Handle edge cases gracefully</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>Performance</h3>
            <ul>
              <li>Avoid unnecessary computations</li>
              <li>Use efficient algorithms</li>
              <li>Minimize memory usage</li>
              <li>Profile and optimize bottlenecks</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="learning-section">
        <h2>Common Programming Paradigms</h2>
        <div class="paradigms">
          <div class="paradigm-card">
            <h3>Procedural Programming</h3>
            <p>Focuses on procedures or functions that operate on data. Code is organized around procedures.</p>
          </div>

          <div class="paradigm-card">
            <h3>Object-Oriented Programming</h3>
            <p>Organizes code around objects that contain both data and behavior.</p>
          </div>

          <div class="paradigm-card">
            <h3>Functional Programming</h3>
            <p>Treats computation as the evaluation of mathematical functions and avoids changing state.</p>
          </div>
        </div>
      </section>
    </div>

    <div class="module-navigation">
      <router-link to="/modules/applications-dev/module2" class="nav-button back-button">
        ← Previous Module
      </router-link>
      <router-link to="/modules" class="nav-button home-button">
        Modules Home
      </router-link>
      <router-link to="/modules/applications-dev/module4" class="nav-button next-button">
        Next Module →
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Module3'
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

.concept-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.concept-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid #4f46e5;
}

.concept-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.concept-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.concept-card p {
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

.control-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.control-type h4 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
}

.control-type pre {
  background: #1f2937;
  color: #e5e7eb;
  padding: 0.75rem;
  border-radius: 5px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
  line-height: 1.3;
}

.oop-concepts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.oop-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.oop-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.oop-card p {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.data-structures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.ds-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.ds-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.ds-card p {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.ds-card ul {
  color: #6b7280;
  padding-left: 1.5rem;
}

.ds-card li {
  margin-bottom: 0.5rem;
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.practice-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.practice-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.practice-card ul {
  color: #6b7280;
  padding-left: 1.5rem;
}

.practice-card li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.paradigms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.paradigm-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
}

.paradigm-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: bold;
}

.paradigm-card p {
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

  .concept-showcase, .oop-concepts, .data-structures, .best-practices, .paradigms {
    grid-template-columns: 1fr;
  }

  .control-types {
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
