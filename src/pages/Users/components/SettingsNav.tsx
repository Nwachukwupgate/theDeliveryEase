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
            My Profile
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            onClick={() => setActivePage('changePassword')}
            style={{ color: activePage === 'changePassword' ? '#9165B0' : 'inherit' }}
          >
           Change Password
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
