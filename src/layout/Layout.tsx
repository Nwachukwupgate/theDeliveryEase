import { Outlet } from 'react-router-dom'
import SideBar from "@/layout/SideBar"
import Header from "./header/Header";


const Layout = () => {
  return (
    <>
      <Header />
      <SideBar />
      <main className="w-full bg-[#F4E9F4CC] pt-[70px] lg:pl-[250px]">
        <Outlet />
      </main>
    </>
  )
}

export default Layout


