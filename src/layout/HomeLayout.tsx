import HomeFooter from './footer/HomeFooter'
import HomeHeader from './header/HomeHeader' 
import { Outlet } from 'react-router-dom'


const HomeLayout = () => {
  return (
    <>
      <HomeHeader />
      <main className="w-full pt-[80px] bg-[#F4E9F4] lg:pt-[180px]">
        <Outlet />
      </main>
      <HomeFooter />
    </>
  )
}

export default HomeLayout