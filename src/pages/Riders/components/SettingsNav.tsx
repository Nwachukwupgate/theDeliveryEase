import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  
  // TypeScript types for props
  type SettingsNavProps = {
    setActivePage: (page: string) => void;
    activePage: string;
  };
  
  export default function SettingsNav({ setActivePage, activePage }: SettingsNavProps) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
  
          <BreadcrumbItem>
            <BreadcrumbLink 
              href="#" 
              onClick={() => setActivePage('myDetails')}
              style={{ color: activePage === 'myDetails' ? '#9165B0' : 'inherit' }}
            >
              My Details
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator />
  
          <BreadcrumbItem>
            <BreadcrumbLink 
              href="#" 
              onClick={() => setActivePage('profile')}
              style={{ color: activePage === 'profile' ? '#9165B0' : 'inherit' }}
            >
              Profile
            </BreadcrumbLink>
          </BreadcrumbItem>
  
          <BreadcrumbSeparator />
  
          <BreadcrumbItem>
            <BreadcrumbLink 
              href="#" 
              onClick={() => setActivePage('changePassword')}
              style={{ color: activePage === 'changePassword' ? '#9165B0' : 'inherit' }}
            >
              Password
            </BreadcrumbLink>
          </BreadcrumbItem>
  
          <BreadcrumbSeparator />
  
          <BreadcrumbItem>
            <BreadcrumbLink 
              href="#" 
              onClick={() => setActivePage('notifications')}
              style={{ color: activePage === 'notifications' ? '#9165B0' : 'inherit' }}
            >
              Notification
            </BreadcrumbLink>
          </BreadcrumbItem>
  
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  