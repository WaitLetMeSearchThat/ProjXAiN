<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6">
            <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white">
                Sign in to your account
            </h2>
            <form @submit.prevent="login" class="space-y-6">
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
                        placeholder="********"
                        class="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                            Remember me
                        </label>
                    </div>
                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                            Forgot password?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
// Minimal script for form components as they are primarily presentation.
const login = () => {
    // Placeholder for actual login logic (e.g., Inertia.post)
    console.log('Login attempt simulated.');
};
</script>