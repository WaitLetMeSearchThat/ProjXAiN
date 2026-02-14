<template>
 <div data-part="body" class="bg-[#101419] text-white py-20 overflow-hidden relative min-h-[700px]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="absolute top-0 right-0 p-4">
             <button class="px-5 py-2 bg-green-500 text-black font-bold rounded-lg text-sm hover:bg-green-400 transition">FREE</button>
        </div>

        <div class="text-center pt-16">
            <h1 class="text-6xl md:text-7xl font-extrabold text-[#2DD492] mb-4 leading-tight max-w-4xl mx-auto">
                Simplified credit cards for students
            </h1>
            <p class="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                No more hassle taking loans and making payments. Try Postcrats credit card, make your life simple.
            </p>
            <button class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg text-lg hover:bg-blue-700 transition shadow-lg flex items-center justify-center mx-auto space-x-2">
                Apply for free
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
        </div>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
            <div class="flex flex-col items-center">
                <svg class="w-6 h-6 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354l.707.707a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l.707-.707m1.414 1.414a2 2 0 102.828-2.828l-3.535-3.536a2 2 0 10-2.828 2.828l3.536 3.535zM7.5 17.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path></svg>
                <p class="text-gray-300 text-sm">Over 12,000 students joined</p>
            </div>
            <div class="flex flex-col items-center">
                <svg class="w-6 h-6 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p class="text-gray-300 text-sm">No yearly charges, maximum limits</p>
            </div>
            <div class="flex flex-col items-center">
                <svg class="w-6 h-6 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p class="text-gray-300 text-sm">Secured & safe online payment</p>
            </div>
        </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 top-1/2 flex justify-center items-end transform scale-[0.85] md:scale-90 lg:scale-100">
        <div class="relative w-full h-full max-w-4xl mx-auto">
            <div class="absolute -left-16 -top-16 w-64 h-40 bg-gradient-to-br from-[#E3296B] to-[#9933FF] rounded-xl transform -rotate-12 shadow-2xl p-4 text-white">
                <p class="text-xs font-mono mb-2">Postcrafts</p>
                <p class="text-xl font-mono tracking-widest mb-4">1048 3948 3048 8732</p>
                <p class="text-xs">Cardholder name</p>
                <p class="font-bold">Ronald Richards</p>
                <p class="text-xs absolute bottom-4 right-4">Expiry date: 05/2025</p>
            </div>
            
            <div class="absolute left-1/2 transform -translate-x-1/2 -top-10 w-64 h-40 bg-gradient-to-br from-[#3B82F6] via-[#FACC15] to-[#2DD492] rounded-xl shadow-2xl p-4 text-white z-20">
                <p class="text-xs font-mono mb-2">Postcrafts</p>
                <p class="text-xl font-mono tracking-widest mb-4">8573 3875 5735 3857</p>
                <p class="text-xs">Cardholder name</p>
                <p class="font-bold">Kristin Watson</p>
                <p class="text-xs absolute bottom-4 right-4">Expiry date: 10/2024</p>
            </div>
            
            <div class="absolute -right-20 -top-20 w-64 h-40 bg-gradient-to-br from-[#38BFF8] to-[#10B981] rounded-xl transform rotate-12 shadow-2xl p-4 text-white opacity-70">
                <p class="text-xs font-mono mb-2">Postcrafts</p>
                <p class="text-xl font-mono tracking-widest mb-4">5837 4857 8084 2894</p>
                <p class="text-xs">Cardholder name</p>
                <p class="font-bold">Albert Flores</p>
                <p class="text-xs absolute bottom-4 right-4">Expiry date: 07/2026</p>
            </div>
        </div>
    </div>
</div>
</template>