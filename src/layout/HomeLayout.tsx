import HomeFooter from './footer/HomeFooter'
import HomeHeader from './header/HomeHeader' 
import { Outlet } from 'react-router-dom'


const HomeLayout = () => {
  return (
    <>
      <HomeHeader />
      <main className="w-full bg-[#F9F9F9] pt-[100px] lg:pt-[180px]">
        <Outlet />
      </main>
      <HomeFooter />
    </>
  )
}

export default HomeLayout