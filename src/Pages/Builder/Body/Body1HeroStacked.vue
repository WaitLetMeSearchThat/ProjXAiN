<template>
    <div class="max-w-4xl w-full bg-[#161B28] rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        <div class="relative hidden lg:block h-full min-h-[500px] overflow-hidden">
            <img src="https://via.placeholder.com/600x800/2563EB/ffffff?text=Professional+Smiling" alt="A professional woman smiling while using a laptop" class="absolute inset-0 w-full h-full object-cover">
        </div>

        <div class="p-8 md:p-12 relative">
            
            <div class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-24 h-24 text-[#3B82F6]/30">
                <svg class="w-full h-full" fill="none" viewBox="0 0 100 100" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M10 10l80 80M10 90l80-80"></path></svg>
            </div>
            
            <h1 class="text-4xl font-extrabold text-white mb-2">Welcome back 🔑</h1>
            <p class="text-gray-400 mb-8 text-sm max-w-sm">Clarity gives you the blocks and components you need to create a truly professional website.</p>
            
            <button class="w-full flex items-center justify-center space-x-2 px-4 py-2 mb-6 bg-gray-700/50 text-white rounded-lg font-medium hover:bg-gray-700 transition border border-gray-600">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google Logo" class="w-5 h-5">
                <span>Sign in with Google</span>
            </button>
            
            <form class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <input type="email" id="email" value="le.davon@mail.com" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-accent-blue focus:border-accent-blue" required>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-400 mb-1">Password</label>
                    <input type="password" id="password" value="********" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-accent-blue focus:border-accent-blue" required>
                </div>
                
                <div class="flex justify-between items-center pt-2">
                    <div class="flex items-center">
                        <input id="remember-me" type="checkbox" class="w-4 h-4 text-accent-blue bg-gray-700 border-gray-600 rounded">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-400">Remember me</label>
                    </div>
                    <svg class="w-6 h-6 text-gray-600 hover:text-white transition cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>

                <button type="submit" class="w-full px-4 py-3 bg-accent-blue text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-lg">Login</button>
            </form>
            
            <p class="text-center text-sm text-gray-500 mt-6">
                Don't have an account? 
                <a href="#" class="text-accent-blue font-medium hover:text-blue-400">Create free account</a>
            </p>
       
    </div>
</div>
</template>