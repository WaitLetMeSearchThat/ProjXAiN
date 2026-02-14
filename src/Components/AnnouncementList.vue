<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-lg font-bold text-slate-900 dark:text-white">Announcements</h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Stay updated with the latest news</p>
      </div>
      <div v-if="canCreateAnnouncement">
        <button
          @click="showCreateModal = true"
          class="px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center gap-2 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          New
        </button>
      </div>
    </div>

    <!-- Search and Filter -->
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search announcements..."
          class="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
        <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
      <select
        v-model="selectedCategory"
        class="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      >
        <option value="">All Categories</option>
        <option value="academic">Academic</option>
        <option value="administrative">Administrative</option>
        <option value="events">Events</option>
        <option value="health">Health & Safety</option>
        <option value="general">General</option>
      </select>
    </div>

    <!-- Announcements List -->
    <div class="grid gap-4">
      <div
        v-for="announcement in filteredAnnouncements"
        :key="announcement.id"
        class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Announcement Thumbnail (if exists) -->
          <div v-if="announcement.thumbnail" class="lg:w-1/4">
            <div class="relative rounded-xl overflow-hidden aspect-video lg:aspect-square bg-slate-100 dark:bg-slate-800">
              <img
                :src="announcement.thumbnail"
                :alt="announcement.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                @click="viewImage(announcement.thumbnail)"
              >
              <button
                v-if="canEditAnnouncement(announcement)"
                @click="removeThumbnail(announcement.id)"
                class="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Remove image"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div v-if="announcement.images && announcement.images.length > 1" class="flex gap-1 mt-2">
              <div
                v-for="(image, index) in announcement.images.slice(0, 4)"
                :key="index"
                class="relative flex-1 aspect-square rounded-md overflow-hidden cursor-pointer"
                @click="viewImage(image)"
              >
                <img :src="image" class="w-full h-full object-cover">
                <div v-if="index === 3 && announcement.images.length > 4" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xs">
                  +{{ announcement.images.length - 4 }}
                </div>
              </div>
            </div>
          </div>

          <!-- Announcement Content -->
          <div :class="announcement.thumbnail ? 'lg:w-3/4' : 'flex-1'">
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <span
                :class="getCategoryColor(announcement.category)"
                class="px-3 py-1 text-xs font-semibold rounded-full"
              >
                {{ formatCategory(announcement.category) }}
              </span>
              <span class="text-sm text-slate-500 dark:text-slate-400">
                {{ formatDate(announcement.createdAt) }}
              </span>
              <span v-if="announcement.isPinned" class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-full text-xs">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Pinned
              </span>
            </div>
            
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
              {{ announcement.title }}
            </h3>
            <p class="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
              {{ announcement.content }}
            </p>
            
            <!-- Stats and Actions -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <!-- Heart Reaction -->
                <button
                  @click="toggleLike(announcement.id)"
                  class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg 
                    class="w-5 h-5 transition-transform hover:scale-110" 
                    :class="isLiked(announcement.id) ? 'text-red-500 fill-red-500' : 'text-slate-400 dark:text-slate-500'"
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {{ announcement.likes || 0 }}
                  </span>
                </button>
                
                <!-- Views -->
                <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <span>{{ announcement.views }} views</span>
                </div>
                
                <!-- Comments Count -->
                <button
                  @click="toggleComments(announcement.id)"
                  class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span>{{ getCommentCount(announcement.id) }} comments</span>
                </button>
              </div>
              
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {{ getInitials(announcement.author) }}
                  </div>
                  <span class="hidden sm:inline">By {{ announcement.author }}</span>
                </div>
                
                <div v-if="canEditAnnouncement(announcement) || canDeleteAnnouncement(announcement)" class="flex gap-1">
                  <button
                    v-if="canEditAnnouncement(announcement)"
                    @click="editAnnouncement(announcement)"
                    class="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    title="Edit"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2v5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                    v-if="canDeleteAnnouncement(announcement)"
                    @click="deleteAnnouncement(announcement.id)"
                    class="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    title="Delete"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Comments Section -->
            <div v-if="showComments === announcement.id" class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div class="space-y-4">
                <!-- Existing Comments -->
                <div v-for="comment in getComments(announcement.id)" :key="comment.id" class="flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-r from-slate-500 to-slate-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {{ getInitials(comment.author) }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-medium text-slate-900 dark:text-white text-sm">{{ comment.author }}</span>
                      <span class="text-xs text-slate-500">{{ formatTimeAgo(comment.createdAt) }}</span>
                    </div>
                    <p class="text-slate-600 dark:text-slate-300 text-sm">{{ comment.content }}</p>
                  </div>
                </div>
                
                <!-- Add Comment (Admin Only) -->
                <div v-if="userRole === 'admin'" class="flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {{ getInitials(userDisplayName) }}
                  </div>
                  <div class="flex-1">
                    <textarea
                      v-model="newComments[announcement.id]"
                      @keydown.enter.prevent="addComment(announcement.id)"
                      placeholder="Add a comment as admin..."
                      class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows="2"
                    ></textarea>
                    <div class="flex justify-end mt-2">
                      <button
                        @click="addComment(announcement.id)"
                        :disabled="!newComments[announcement.id]?.trim()"
                        class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Non-admin message -->
                <div v-else class="text-center py-4 text-slate-500 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-700">
                  Only administrators can comment on announcements.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredAnnouncements.length === 0" class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-full flex items-center justify-center">
        <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">No announcements found</h3>
      <p class="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
        {{ searchQuery || selectedCategory ? 'Try adjusting your search or filter criteria.' : 'Check back later for new announcements.' }}
      </p>
      <button
        v-if="canCreateAnnouncement"
        @click="showCreateModal = true"
        class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
      >
        Create First Announcement
      </button>
    </div>

    <!-- Create/Edit Announcement Modal -->
    <div
      v-if="showCreateModal || editingAnnouncement"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">
            {{ editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement' }}
          </h3>
          <button
            @click="closeModal"
            class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveAnnouncement" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Title *
            </label>
            <input
              v-model="announcementForm.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter announcement title"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Category *
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                v-for="category in categories"
                :key="category.value"
                @click.prevent="announcementForm.category = category.value"
                :class="announcementForm.category === category.value ? 
                  `${category.class} ring-2 ring-offset-2 ring-blue-500` : 
                  'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'"
                class="px-4 py-3 rounded-lg text-sm font-medium transition-all text-center"
              >
                {{ category.label }}
              </button>
            </div>
            <input
              v-model="announcementForm.category"
              type="text"
              required
              class="hidden"
            >
          </div>

          <!-- Image Upload Section -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Images (Optional)
            </label>
            <div class="space-y-3">
              <!-- Image Preview -->
              <div v-if="announcementForm.images.length > 0" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div
                  v-for="(image, index) in announcementForm.images"
                  :key="index"
                  class="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 group"
                >
                  <img :src="image.url || image" class="w-full h-full object-cover">
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2">
                    <button
                      type="button"
                      @click="setAsThumbnail(index)"
                      :title="announcementForm.thumbnail === (image.url || image) ? 'Current thumbnail' : 'Set as thumbnail'"
                      class="p-1.5 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
                      :class="announcementForm.thumbnail === (image.url || image) ? 'opacity-100 bg-blue-600' : ''"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      @click="removeImage(index)"
                      class="p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      title="Remove image"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  <div v-if="announcementForm.thumbnail === (image.url || image)" class="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                    Thumbnail
                  </div>
                </div>
              </div>

              <!-- Upload Area -->
              <div
                @click="triggerFileInput"
                :class="announcementForm.images.length > 0 ? 'border-dashed' : ''"
                class="border-2 border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-slate-50 dark:bg-slate-800/50"
              >
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
                >
                <div class="space-y-2">
                  <svg class="w-12 h-12 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Drop images here or click to upload
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Supports JPG, PNG, GIF. Max 5MB per image.
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      First image will be used as thumbnail.
                    </p>
                  </div>
                  <button
                    type="button"
                    @click="triggerFileInput"
                    class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    Upload Images
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Content *
            </label>
            <textarea
              v-model="announcementForm.content"
              required
              rows="6"
              class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Write your announcement details here..."
            ></textarea>
          </div>

          <div class="flex flex-wrap gap-4">
            <label class="flex items-center gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
              <input
                v-model="announcementForm.isPinned"
                type="checkbox"
                class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              >
              <div>
                <div class="font-medium text-slate-700 dark:text-slate-300">Pin this announcement</div>
                <div class="text-xs text-slate-500 dark:text-slate-400">Will appear at the top of the list</div>
              </div>
            </label>
          </div>

          <div class="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all shadow-md"
            >
              <span v-if="saving">
                <svg class="w-5 h-5 animate-spin inline mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Saving...
              </span>
              <span v-else>{{ editingAnnouncement ? 'Update' : 'Create' }} Announcement</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Image Viewer Modal -->
    <div
      v-if="viewingImage"
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4"
      @click="viewingImage = null"
    >
      <div class="relative max-w-4xl max-h-[90vh]">
        <button
          @click="viewingImage = null"
          class="absolute -top-12 right-0 p-2 text-white hover:text-slate-300 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <img
          :src="viewingImage"
          class="max-w-full max-h-[90vh] object-contain rounded-lg"
          @click.stop
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import {
  subscribeAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement as deleteAnnouncementDoc,
  toggleLike as toggleLikeDoc,
  addComment as addCommentDoc,
  uploadAnnouncementImages
} from '@/firebase/announcementService'

// Props
const props = defineProps({
  userRole: {
    type: String,
    default: 'patient'
  }
})

// Reactive data
const { user, userProfile } = useAuth()

const searchQuery = ref('')
const selectedCategory = ref('')
const showCreateModal = ref(false)
const editingAnnouncement = ref(null)
const saving = ref(false)
const showComments = ref(null)
const newComments = ref({})
const viewingImage = ref(null)
const fileInput = ref(null)
const announcements = ref([])

const announcementForm = ref({
  title: '',
  category: '',
  content: '',
  isPinned: false,
  images: [],
  thumbnail: ''
})

const categories = [
  { value: 'academic', label: 'Academic', class: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' },
  { value: 'administrative', label: 'Administrative', class: 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200' },
  { value: 'events', label: 'Events', class: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' },
  { value: 'health', label: 'Health', class: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' },
  { value: 'general', label: 'General', class: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' }
]


// Computed properties
const userDisplayName = computed(() => {
  return user.value?.displayName?.split(' ')[0] || 'User'
})

const userRole = computed(() => {
  return userProfile.value?.role || props.userRole
})

const canCreateAnnouncement = computed(() => {
  return ['admin', 'staff'].includes(userRole.value)
})

const filteredAnnouncements = computed(() => {
  let filtered = announcements.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(announcement =>
      announcement.title.toLowerCase().includes(query) ||
      announcement.content.toLowerCase().includes(query) ||
      announcement.author.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(announcement => announcement.category === selectedCategory.value)
  }

  return filtered.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
})

// Methods
const getCategoryColor = (category) => {
  const colorMap = {
    academic: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    administrative: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    events: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    health: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    general: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  }
  return colorMap[category] || colorMap.general
}

const formatCategory = (category) => {
  const categoryMap = {
    academic: 'Academic',
    administrative: 'Administrative',
    events: 'Events',
    health: 'Health & Safety',
    general: 'General'
  }
  return categoryMap[category] || category
}

const toDate = (value) => {
  if (!value) return null
  return value?.toDate ? value.toDate() : value
}

const formatDate = (date) => {
  const resolved = toDate(date)
  if (!resolved) return ''
  return new Date(resolved).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTimeAgo = (date) => {
  const resolved = toDate(date)
  if (!resolved) return ''
  const now = new Date()
  const diffInSeconds = Math.floor((now - new Date(resolved)) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return formatDate(date)
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const isLiked = (announcementId) => {
  const announcement = announcements.value.find(a => a.id === announcementId)
  if (!announcement || !user.value?.uid) return false
  return Array.isArray(announcement.likedBy) && announcement.likedBy.includes(user.value.uid)
}

const toggleLike = async (announcementId) => {
  if (!user.value?.uid) {
    alert('Please sign in to like announcements.')
    return
  }
  const announcement = announcements.value.find(a => a.id === announcementId)
  if (!announcement) return

  const currentlyLiked = isLiked(announcementId)
  await toggleLikeDoc(announcementId, user.value.uid, currentlyLiked)
}

const getComments = (announcementId) => {
  const announcement = announcements.value.find(a => a.id === announcementId)
  return announcement?.comments || []
}

const getCommentCount = (announcementId) => {
  return getComments(announcementId).length
}

const toggleComments = (announcementId) => {
  showComments.value = showComments.value === announcementId ? null : announcementId
}

const addComment = async (announcementId) => {
  if (!newComments.value[announcementId]?.trim() || userRole.value !== 'admin') return

  const comment = {
    id: Date.now(),
    announcementId,
    author: user.value?.displayName || 'Admin',
    content: newComments.value[announcementId].trim(),
    createdAt: new Date()
  }

  await addCommentDoc(announcementId, comment)
  newComments.value[announcementId] = ''
}

const canEditAnnouncement = (announcement) => {
  return ['admin', 'staff'].includes(userRole.value) ||
         announcement.author === user.value?.displayName
}

const canDeleteAnnouncement = (announcement) => {
  return ['admin'].includes(userRole.value) ||
         announcement.author === user.value?.displayName
}

const viewImage = (imageUrl) => {
  viewingImage.value = imageUrl
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event) => {
  const files = event.target.files
  if (!files.length) return

  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload image files only')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size should be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      announcementForm.value.images.push({
        url: e.target.result,
        file: file
      })

      // Set first image as thumbnail if not already set
      if (!announcementForm.value.thumbnail && announcementForm.value.images.length === 1) {
        announcementForm.value.thumbnail = e.target.result
      }
    }
    reader.readAsDataURL(file)
  })

  // Reset file input
  event.target.value = ''
}

const setAsThumbnail = (index) => {
  const image = announcementForm.value.images[index]
  announcementForm.value.thumbnail = image.url || image
}

const removeImage = (index) => {
  const removedImage = announcementForm.value.images[index]
  
  // If removing the thumbnail, set a new one
  if (announcementForm.value.thumbnail === (removedImage.url || removedImage)) {
    if (announcementForm.value.images.length > 1) {
      // Set first available image as new thumbnail
      const nextImageIndex = index === 0 ? 1 : 0
      announcementForm.value.thumbnail = announcementForm.value.images[nextImageIndex].url || announcementForm.value.images[nextImageIndex]
    } else {
      announcementForm.value.thumbnail = ''
    }
  }
  
  announcementForm.value.images.splice(index, 1)
}

const removeThumbnail = async (announcementId) => {
  const announcement = announcements.value.find(a => a.id === announcementId)
  if (!announcement) return
  const remainingImages = announcement.images?.slice(1) || []
  await updateAnnouncement(announcementId, {
    thumbnail: remainingImages[0] || '',
    images: remainingImages
  })
}

const editAnnouncement = (announcement) => {
  editingAnnouncement.value = announcement
  announcementForm.value = {
    title: announcement.title,
    category: announcement.category,
    content: announcement.content,
    isPinned: announcement.isPinned,
    images: announcement.images || [],
    thumbnail: announcement.thumbnail || ''
  }
}

const deleteAnnouncement = async (id) => {
  if (confirm('Are you sure you want to delete this announcement?')) {
    await deleteAnnouncementDoc(id)
  }
}

const saveAnnouncement = async () => {
  saving.value = true

  try {
    const basePayload = {
      title: announcementForm.value.title,
      category: announcementForm.value.category,
      content: announcementForm.value.content,
      isPinned: announcementForm.value.isPinned,
      author: user.value?.displayName || 'Anonymous'
    }

    const extractUploads = () => {
      const toUpload = []
      const existing = []
      announcementForm.value.images.forEach((image) => {
        if (image?.file) {
          toUpload.push({ file: image.file, localUrl: image.url })
        } else {
          const url = image?.url || image
          if (typeof url === 'string') existing.push(url)
        }
      })
      return { toUpload, existing }
    }

    if (editingAnnouncement.value) {
      const announcementId = editingAnnouncement.value.id
      const { toUpload, existing } = extractUploads()
      const uploadedUrls = toUpload.length
        ? await uploadAnnouncementImages(toUpload.map(item => item.file), announcementId)
        : []
      const allImages = [...existing, ...uploadedUrls]

      let thumbnailUrl = announcementForm.value.thumbnail
      if (!thumbnailUrl) {
        thumbnailUrl = allImages[0] || ''
      } else if (!thumbnailUrl.startsWith('http')) {
        const matchIndex = toUpload.findIndex(item => item.localUrl === thumbnailUrl)
        thumbnailUrl = matchIndex > -1 ? uploadedUrls[matchIndex] : allImages[0] || ''
      }

      await updateAnnouncement(announcementId, {
        ...basePayload,
        images: allImages,
        thumbnail: thumbnailUrl
      })
    } else {
      const docRef = await createAnnouncement({
        ...basePayload,
        views: 0,
        likes: 0,
        likedBy: [],
        comments: [],
        images: [],
        thumbnail: ''
      })

      const { toUpload, existing } = extractUploads()
      const uploadedUrls = toUpload.length
        ? await uploadAnnouncementImages(toUpload.map(item => item.file), docRef.id)
        : []
      const allImages = [...existing, ...uploadedUrls]

      let thumbnailUrl = announcementForm.value.thumbnail
      if (!thumbnailUrl) {
        thumbnailUrl = allImages[0] || ''
      } else if (!thumbnailUrl.startsWith('http')) {
        const matchIndex = toUpload.findIndex(item => item.localUrl === thumbnailUrl)
        thumbnailUrl = matchIndex > -1 ? uploadedUrls[matchIndex] : allImages[0] || ''
      }

      await updateAnnouncement(docRef.id, {
        images: allImages,
        thumbnail: thumbnailUrl
      })
    }

    closeModal()
  } catch (error) {
    console.error('Error saving announcement:', error)
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingAnnouncement.value = null
  announcementForm.value = {
    title: '',
    category: '',
    content: '',
    isPinned: false,
    images: [],
    thumbnail: ''
  }
}

// Initialize
onMounted(() => {
  subscribeAnnouncements((items) => {
    announcements.value = items
  })
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for modal */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.dark ::-webkit-scrollbar-track {
  background: #2d3748;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4a5568;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #718096;
}
</style>
