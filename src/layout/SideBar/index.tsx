import HomeIcon from "@/common/icons/HomeIcon";
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
        <HomeIcon />
      </div>
      <Nav />
    </aside>
  );
};

export default SideBar;