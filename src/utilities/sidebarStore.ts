import { proxy } from 'valtio';

const sidebarStore = proxy({
  isActive: false,
  toggleSidebar() {
    sidebarStore.isActive = !sidebarStore.isActive;
  },
  closeSidebar() {
    sidebarStore.isActive = false;
  },
  openSidebar() {
    sidebarStore.isActive = true;
  }
});

export default sidebarStore;
