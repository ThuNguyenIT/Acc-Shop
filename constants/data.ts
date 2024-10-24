import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",

    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Customer",
    href: "/admin/customer",
    icon: "user",
    label: "user",
  },
  {
    title: "Employee",
    href: "/admin/employee",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Platform",
    href: "/admin/platform",
    icon: "laptop",
    label: "laptop",
  },
  {
    title: "Profile",
    href: "/admin/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/admin/kanban",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "Login",
    href: "/",
    icon: "login",
    label: "login",
  },
  {
    title: "Category",
    href: "/admin/category",
    icon: "folderTree",
    label: "category",
  },
];
