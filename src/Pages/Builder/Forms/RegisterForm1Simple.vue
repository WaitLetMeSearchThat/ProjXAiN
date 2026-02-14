<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div class="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6">
            <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white">
                Create a New Account
            </h2>
            <form @submit.prevent="register" class="space-y-6">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                    </label>
                    <input 
                        id="name" 
                        name="name" 
                        type="text" 
                        required 
                        placeholder="John Doe"
                        class="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email address
                    </label>
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        placeholder="you@example.com"
                        class="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                    </label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        required 
                        placeholder="Must be at least 8 characters"
                        class="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                
                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm Password
                    </label>
                    <input 
                        id="password_confirmation" 
                        name="password_confirmation" 
                        type="password" 
                        required 
                        placeholder="Repeat your password"
                        class="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
                        Register
                    </button>
                </div>
                
                <p class="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account? 
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Sign in
                    </a>
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
const register = () => {
    // Placeholder for actual registration logic (e.g., Inertia.post)
    console.log('Registration attempt simulated.');
};
</script>