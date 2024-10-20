import { NavItem, Story } from '@/types';


export type User = {
  id: number
  name: string
  company: string
  role: string
  verified: boolean
  status: string
}

export type Employee = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  gender: string
  date_of_birth: string // Consider using a proper date type if possible
  street: string
  city: string
  state: string
  country: string
  zipcode: string
  longitude?: number // Optional field
  latitude?: number // Optional field
  job: string
  profile_picture?: string | null // Profile picture can be a string (URL) or null (if no picture)
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',

    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'User',
    href: '/admin/user',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Employee',
    href: '/admin/employee',
    icon: 'employee',
    label: 'employee'
  },
  {
    title: 'Profile',
    href: '/admin/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Kanban',
    href: '/admin/kanban',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  },
  {
    title: 'Category',
    href: '/admin/category',
    icon: 'folderTree',
    label: 'category'
  }
]


export const sameGenreStories: Story[] = [
  {
    id: '1',
    title: 'Ngã Hữu Chư Thiên Vạn',
    slug: 'nga-huu-chu-thien-van',
    author: 'Kỳ Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder1.png'
  },
  {
    id: '2',
    title: 'Tây Dư Tôi Cường Tô Sư',
    slug: 'tay-du-toi-cuong-to-su',
    author: 'Huyền Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder2.png'
  },
  {
    id: '3',
    title: 'Linh Khí Phục Tô: Úc Vạn',
    slug: 'linh-khi-phuc-to-uc-van',
    author: 'Huyền Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder3.png'
  },
  {
    id: '4',
    title: 'Linh Khí Phục Tô: Úc Vạn',
    slug: 'linh-khi-phuc-to-uc-van',
    author: 'Huyền Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder4.png'
  },
]


