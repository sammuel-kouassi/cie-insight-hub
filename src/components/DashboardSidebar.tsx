import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Phone,
  Gift,
  BarChart3,
  CalendarCheck,
  Settings,
  Zap,
  Home,
} from "lucide-react";

const menuItems = [
  { title: "Tableau de bord", url: "/dashboard", icon: LayoutDashboard },
  { title: "Participants", url: "/dashboard/participants", icon: Users },
  { title: "Campagnes", url: "/dashboard/campagnes", icon: Megaphone },
  { title: "Prises de contact", url: "/dashboard/contacts", icon: Phone },
  { title: "Rendez-vous", url: "/dashboard/rdv", icon: CalendarCheck },
  { title: "Gadgets", url: "/dashboard/gadgets", icon: Gift },
  { title: "Statistiques", url: "/dashboard/stats", icon: BarChart3 },
];

const bottomItems = [
  { title: "Paramètres", url: "/dashboard/settings", icon: Settings },
  { title: "Retour au site", url: "/", icon: Home },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg gradient-orange flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-bold text-sm text-sidebar-accent-foreground tracking-tight" style={{ fontFamily: 'Outfit' }}>
              CIE Dashboard
            </span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="hover:bg-sidebar-accent/60"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className="hover:bg-sidebar-accent/60"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
