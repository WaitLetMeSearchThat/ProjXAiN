import { h } from 'vue'

const icon = (children) => ({
  render() {
    return h(
      'svg',
      { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' },
      children
    )
  }
})

const DashboardIcon = icon([
  h('path', { d: 'M3 12l9-9 9 9' }),
  h('path', { d: 'M9 21V9h6v12' })
])

const AnnouncementsIcon = icon([
  h('path', { d: 'M4 4h16v12H4z' }),
  h('path', { d: 'M4 8h16' }),
  h('path', { d: 'M8 16h8' })
])

const GradesIcon = icon([
  h('path', { d: 'M4 19h16' }),
  h('path', { d: 'M7 16V8' }),
  h('path', { d: 'M12 16V5' }),
  h('path', { d: 'M17 16v-6' })
])

const ToolsIcon = icon([
  h('path', { d: 'M3 7h18' }),
  h('path', { d: 'M7 7l-4 10' }),
  h('path', { d: 'M17 7l4 10' }),
  h('path', { d: 'M5 17h14' })
])

const UsersIcon = icon([
  h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
  h('circle', { cx: '9', cy: '7', r: '4' }),
  h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }),
  h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
])

const ClassesIcon = icon([
  h('path', { d: 'M4 4h16v12H4z' }),
  h('path', { d: 'M8 20h8' }),
  h('path', { d: 'M12 16v4' })
])

const RecordsIcon = icon([
  h('path', { d: 'M4 4h16v16H4z' }),
  h('path', { d: 'M8 8h8' }),
  h('path', { d: 'M8 12h8' }),
  h('path', { d: 'M8 16h5' })
])

const CalendarIcon = icon([
  h('path', { d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
])

const ProfileIcon = icon([
  h('path', { d: 'M20 21a8 8 0 0 0-16 0' }),
  h('circle', { cx: '12', cy: '7', r: '4' })
])

export const ROLE_NAVIGATION = {
  role_admin: [
    { label: 'Overview', to: '/admin', icon: DashboardIcon, description: 'System summary and admin controls.' },
    { label: 'User Profile', to: '/user/profile', icon: ProfileIcon, description: 'Manage your profile, posts, and notifications.' },
    { label: 'Student Management', to: '/admin/students', icon: UsersIcon, description: 'Manage students, grades, and subjects.' },
    { label: 'Announcements', to: '/admin/announcements', icon: AnnouncementsIcon, description: 'Post and manage campus updates.' },
    { label: 'Tools', to: '/admin/tools', icon: ToolsIcon, description: 'Utilities and system tools.' },
    { label: 'Calendar of Activities', to: '/admin/calendar', icon: CalendarIcon, description: 'View and manage school events and activities.' }
  ],
  role_instructor: [
    { label: 'Overview', to: '/faculty', icon: DashboardIcon, description: 'Teaching overview and schedules.' },
    { label: 'User Profile', to: '/user/profile', icon: ProfileIcon, description: 'Manage your profile, posts, and notifications.' },
    {
      label: 'Classes',
      to: '/faculty/classes',
      icon: ClassesIcon,
      description: 'Your sections and classroom updates.',
      children: [
        { label: 'Classes Schedule', to: '/faculty/classes?view=schedule' },
        { label: 'V-Classroom', to: '/faculty/classes?view=vclass' }
      ]
    },
    { label: 'Grades', to: '/faculty/grades', icon: GradesIcon, description: 'Review and encode grades.' },
    { label: 'Announcements', to: '/faculty/announcements', icon: AnnouncementsIcon, description: 'Campus updates and notices.' },
    { label: 'Calendar of Activities', to: '/faculty/calendar', icon: CalendarIcon, description: 'View and manage school events and activities.' }
  ],
  role_student: [
    { label: 'Overview', to: '/student', icon: DashboardIcon, description: 'Your academic summary.' },
    { label: 'User Profile', to: '/student/profile', icon: ProfileIcon, description: 'Manage your profile, posts, and notifications.' },
    { label: 'Grades', to: '/student/grades', icon: GradesIcon, description: 'Check grades and submit inquiries.' },
    {
      label: 'Classes',
      to: '/student/classes',
      icon: ClassesIcon,
      description: 'Enrolled subjects and rooms.',
      children: [
        { label: 'Classes Schedule', to: '/student/classes?view=schedule' },
        { label: 'V-Classroom', to: '/student/classes?view=vclass' }
      ]
    },
    { label: 'Announcements', to: '/student/announcements', icon: AnnouncementsIcon, description: 'Campus updates and reminders.' },
    { label: 'Calendar of Activities', to: '/student/calendar', icon: CalendarIcon, description: 'View school events and activities.' }
  ],
  role_registrar: [
    { label: 'Overview', to: '/registrar', icon: DashboardIcon, description: 'Enrollment and records overview.' },
    { label: 'User Profile', to: '/user/profile', icon: ProfileIcon, description: 'Manage your profile, posts, and notifications.' },
    { label: 'Student Records', to: '/registrar/records', icon: RecordsIcon, description: 'Maintain student records.' },
    { label: 'Student Accounts', to: '/registrar/accounts', icon: UsersIcon, description: 'View student login account registration status.' },
    { label: 'Grades', to: '/registrar/records?tab=grades', icon: GradesIcon, description: 'View submitted grades.' },
    { label: 'Enrollment', to: '/registrar/enrollment', icon: UsersIcon, description: 'Process enrollment requests.' },
    { label: 'Announcements', to: '/registrar/announcements', icon: AnnouncementsIcon, description: 'Publish updates and notices.' },
    { label: 'Calendar of Activities', to: '/registrar/calendar', icon: CalendarIcon, description: 'View and manage school events and activities.' }
  ]
}

export const getRoleNavigation = (role) => ROLE_NAVIGATION[role] || []
export const getRoleDefaultRoute = (role) => {
  const items = ROLE_NAVIGATION[role] || []
  return items.length ? items[0].to : '/'
}
