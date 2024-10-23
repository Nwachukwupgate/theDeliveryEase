import Icon from '@/assets/image/logo.png';
import Nav from "@/layout/SideBar/Nav"
import { useSnapshot } from 'valtio';
import sidebarStore from '@/utilities/sidebarStore';

const SideBar: React.FC = () => {
  const { isActive } = useSnapshot(sidebarStore);
  return (
    <aside
      aria-label="sidebar"
      className={`fixed top-0 z-[100] h-full w-[250px] overflow-auto bg-[#421342] px-[20px] py-[55px] transition-[left] ${isActive ? "left-0" : "-left-[300px]"} lg:!left-0`}
    >
      <div className="flex justify-center">
        {/* <HomeIcon /> */}
        <div className="p-6 mb-4 md:my-auto">
          <img src={Icon} alt="Delivery Logo" className="w-auto h-6 sm:h-4 lg:h-12" />
        </div>
      </div>
      <Nav />
    </aside>
  );
};

export default SideBar;