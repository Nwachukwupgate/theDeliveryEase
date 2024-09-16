import HomeHeader from './header/HomeHeader' 
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <>
      <main className="h-[100vh] w-full bg-[#F9F9F9] pt-[70px]">
        <Outlet />
      </main>
    </>
  )
}

export default HomeLayout