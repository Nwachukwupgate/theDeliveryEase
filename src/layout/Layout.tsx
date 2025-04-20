import { Outlet } from 'react-router-dom'
import SideBar from "@/layout/SideBar"
import Header from "./header/Header";


const Layout = () => {
  return (
    <>
      <Header />
      <SideBar />
      <main className="px-3 md:px-16 w-full min-h-full bg-[#F4E9F4CC] pt-[64px] pb-8 lg:pt-[70px] lg:pl-[314px]">
        <Outlet />
      </main>
    </>
  )
}

export default Layout


