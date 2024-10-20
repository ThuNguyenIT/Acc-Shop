import {
  Tag,
  Users,
  Settings,
  Bookmark,
  Square,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

export function getMenuList(pathname: string): Menu[] {
  return [
    {
      href: "/",
      label: "Trang chủ",
      active: pathname.includes("/"),
      icon: LayoutGrid,
      submenus: [],
    },
    {
      href: "/category",
      label: "Thể loại",
      active: pathname.includes("/category"),
      icon: Bookmark,
      submenus: [
        {
          href: "/category/tien-hiep",
          label: "Tiên hiệp",
          active: pathname === "/category/tien-hiep",
        },
        {
          href: "/category/huyen-huyen",
          label: "Huyền huyễn",
          active: pathname === "/category/huyen-huyen",
        },
        {
          href: "/category/do-thi",
          label: "Đô thị",
          active: pathname === "/category/do-thi",
        },
        {
          href: "/category/khoa-huyen",
          label: "Khoa huyễn",
          active: pathname === "/category/khoa-huyen",
        },
        {
          href: "/category/ky-huyen",
          label: "Kỳ huyễn",
          active: pathname === "/category/ky-huyen",
        },
        {
          href: "/category/vo-hiep",
          label: "Võ hiệp",
          active: pathname === "/category/vo-hiep",
        },
        {
          href: "/category/lich-su",
          label: "Lịch sử",
          active: pathname === "/category/lich-su",
        },
        {
          href: "/category/dong-nhan",
          label: "Đồng nhân",
          active: pathname === "/category/dong-nhan",
        },
        {
          href: "/category/quan-su",
          label: "Quân sự",
          active: pathname === "/category/quan-su",
        },
        {
          href: "/category/du-hi",
          label: "Du hí",
          active: pathname === "/category/du-hi",
        },
        {
          href: "/category/canh-ky",
          label: "Canh kỳ",
          active: pathname === "/category/canh-ky",
        },
        {
          href: "/category/linh-di",
          label: "Linh dị",
          active: pathname === "/category/linh-di",
        },
        {
          href: "/category/ngon-tinh",
          label: "Ngôn tình",
          active: pathname === "/category/ngon-tinh",
        },
        {
          href: "/category/nu-cuong",
          label: "Nữ cường",
          active: pathname === "/category/nu-cuong",
        },
        {
          href: "/category/dam-my",
          label: "Đam mỹ",
          active: pathname === "/category/dam-my",
        },
      ],
    },
    {
      href: "/sort",
      label: "Sắp xếp",
      active: pathname.includes("/sort"),
      icon: Square,
      submenus: [],
    },
    {
      href: "#",
      label: "Truyện con trai",
      active: pathname.includes("#"),
      icon: Tag,
      submenus: [],
    },
    {
      href: "#",
      label: "Truyện con gái",
      active: pathname.includes("#"),
      icon: Users,
      submenus: [],
    },
    {
      href: "#",
      label: "Lịch sử",
      active: pathname.includes("#"),
      icon: Users,
      submenus: [],
    },
    {
      href: "#",
      label: "Thảo luận",
      active: pathname.includes("#"),
      icon: Users,
      submenus: [],
    },
    {
      href: "#",
      label: "Fanpage",
      active: pathname.includes("#"),
      icon: Settings,
      submenus: [],
    },
    {
      href: "#",
      label: "Tài khoản",
      active: pathname.includes("#"),
      icon: Users,
      submenus: [],
    },
  ];
}
