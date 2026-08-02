export interface SidebarSubItem {
  title: string;
  url: string;
}

export interface SidebarNavigationItem {
  title: string;
  url: string;
  icon: string;
  isActive?: boolean;
  items?: SidebarSubItem[];
}

export interface SidebarProject {
  name: string;
  url: string;
  icon: string;
}

export interface SidebarUser {
  name: string;
  email: string;
  initials: string;
}

export const sidebarData: {
  user: SidebarUser;
  navMain: SidebarNavigationItem[];
  navSecondary: SidebarNavigationItem[];
  projects: SidebarProject[];
} = {
  user: {
    name: 'Hien Pham',
    email: 'hi@hien.page',
    initials: 'HP',
  },
  navMain: [
    {
      title: 'Playground',
      url: '.',
      icon: 'lucideSquareTerminal',
      isActive: true,
      items: [
        { title: 'History', url: '.' },
        { title: 'Starred', url: '.' },
        { title: 'Settings', url: '.' },
      ],
    },
    {
      title: 'Models',
      url: '.',
      icon: 'lucideBot',
      items: [
        { title: 'Genesis', url: '.' },
        { title: 'Explorer', url: '.' },
        { title: 'Quantum', url: '.' },
      ],
    },
    {
      title: 'Products',
      url: '.',
      icon: 'lucideBookOpen',
      items: [
        { title: 'Product Management', url: '/products' },
        { title: 'Get Started', url: '.' },
        { title: 'Tutorials', url: '.' },
        { title: 'Changelog', url: '.' },
      ],
    },
    {
      title: 'Settings',
      url: '.',
      icon: 'lucideSettings2',
      items: [
        { title: 'General', url: '/settings' },
        { title: 'Team', url: '.' },
        { title: 'Billing', url: '.' },
        { title: 'Limits', url: '.' },
      ],
    },
  ],
  navSecondary: [
    { title: 'Support', url: '.', icon: 'lucideLifeBuoy' },
    { title: 'Feedback', url: '.', icon: 'lucideSend' },
  ],
  projects: [
    { name: 'Design Engineering', url: '.', icon: 'lucideFrame' },
    { name: 'Sales & Marketing', url: '.', icon: 'lucideChartPie' },
    { name: 'Travel', url: '.', icon: 'lucideMap' },
  ],
};
