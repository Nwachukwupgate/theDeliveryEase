import home1 from '@/assets/image/home1.png'
import home2 from '@/assets/image/home2.png'
import home3 from '@/assets/image/home3.png'
import home4 from '@/assets/image/home4.png'
import { Button } from '@mui/material'
import CardCarousel from './common/carousel/CardCarousel'
// import DeliveryOptions from './common/carousel/DeliveryOptions'
const Home = () => {
  return (
    <>
      <div className=' flex flex-col gap-8 lg:gap-16 justify-center'>
        <div className="flex flex-col gap-8 px-4 md:px-16 lg:px-32">
          <div className="grid grid-cols-3">
            <div className="col-span-2 flex items-end  text-left">
              <h1 className="font-medium text-[22px] md:text-5xl lg:text-7xl">Delivery made easy</h1>
            </div>

            <div className="col-span-1 text-[7px] md:text-sm lg:text-xl font-bold text-primaryColorDarker flex flex-col items-start">
              <p>Establishing new standards</p>
              <p>logistics with eco-friendly</p>
              <p>and effecient delivery.</p>
            </div>

            <div className="col-span-3 ">
              <h1 className="font-semibold text-[22px] md:text-5xl lg:text-7xl text-center">with real time tracking </h1>
            </div>
          </div>

          <div className="w-full md:h-[calc(85vh-30px)] lg:h-[calc(95vh-40px)]">
            <img 
              src={home1} 
              alt="bike" 
              className="w-full h-full rounded-lg"  
            />
          </div>
        </div>

        <div className='px-4 md:px-16 lg:px-0'>
          <div className='bg-primaryActiveColorLight p-8  md:p-12 lg:p-28 grid grid-cols-1  lg:grid-cols-2 gap-8 rounded-b-lg lg:rounded-none '>
              <div>
                <h1 className='text-2xl md:text-4xl lg:text-6xl font-medium pb-4'>Who We are</h1>
                <p className='text-xs md:text-base lg:text-xl leading-6 pb-4 md:pb-6 lg:pb-8'>We excels in fast and reliable deliveries, offering top-notch services to their clients. Their real-time tracking system ensures transparency and peace of mind throughout the shipping process. Trusted by businesses and individuals alike, We are the go-to choice for efficient logistics solutions.
                </p>
                <Button>
                  GET STARTED
                </Button>
              </div>

              <div className='grid grid-cols-2 items-center rounded-b-lg'>
                <div className='flex flex-col justify-center border-r border-b border-black border-dashed p-4 md:p-6 lg:p-8 text-center'>
                  <h1 className='text-3xl md:text-5xl lg:text-7xl font-semibold md:font-medium '> 100%</h1>
                  <p className='text-xs md:text-base lg:text-xl  font-semibold'>Customer satisfaction</p>
                </div>

                <div className='flex flex-col justify-center border-b border-black border-dashed p-4 text-center md:p-6 lg:p-8'>
                  <h1  className='text-3xl md:text-5xl lg:text-7xl font-semibold md:font-medium'> 500+</h1>
                  <p className='text-xs md:text-base lg:text-xl  font-semibold'>Delivered packages</p>
                </div>

                <div className='flex flex-col justify-center border-r border-black border-dashed p-4 text-center md:p-6 lg:p-8'>
                  <h1  className='text-3xl md:text-5xl lg:text-7xl font-semibold md:font-medium'> 24/7</h1>
                  <p className='text-xs md:text-base lg:text-xl  font-semibold'>Round the clock support</p>
                </div>

                <div className='flex flex-col justify-center border-black border-dashed p-4 text-center md:p-6 lg:p-8'>
                  <h1  className='text-3xl md:text-5xl lg:text-7xl font-semibold md:font-medium'> 100%</h1>
                  <p className='text-xs md:text-base lg:text-xl  font-semibold'>Real time tracker</p>
                </div>

              </div>
          </div>
        </div>

      
      </div>
      <div className=' flex flex-col justify-center py-8 md:py-16 lg:py-0'>
        <div className='bg-primaryColorLight  border-b border-black border-dashed '>
          <CardCarousel />
        </div>
        

        <div className='bg-primaryColorLight p-4 md:p-8 lg:grid lg:grid-cols-5'>
          <div className='flex flex-col justify-center  items-center text-center lg:text-left gap-6 md:gap-8 px-6 md:px-16 lg:col-span-3'>
            <div className='border-b border-dashed border-black p-4'>
              <h1 className='font-medium text-xl md:text-2xl lg:text-4xl pb-3 '>01 Booking</h1>
              <p className='text-xs md:text-base lg:text-lg  leading-6 md:leading-7 lg:leading-9'>To initiate a delivery, visit our website or contact our customer service. Provide us with necessary details, including pick up location, delivery address and package weight. A unique package and tracking number will be generated, enabling you to monitor its progress.</p>
            </div>

            <div className='border-b border-dashed border-black p-4'>
              <h1 className='font-medium text-xl md:text-2xl lg:text-4xl pb-3'>02 Pickup & Packaging</h1>
              <p className='text-xs md:text-base lg:text-lg  leading-6 md:leading-7 lg:leading-9'>Our professional delivery personnel will arrive at the designated pick up location to collect your package. They will ensure that the package is properly packaged and secures for safe transportation. At this stage you will recieve the <span className='text-primaryColorDarker'>TRACKING NUMBER</span>, which can be used to track the package journey.</p>
            </div>

            <div className='p-4'>
              <h1 className='font-medium text-xl md:text-2xl lg:text-4xl p-3 '>03 Delivery And Confirmation</h1>
              <p className='text-xs md:text- lg:text-lg  leading-6 md:leading-7 lg:leading-9'>Once the package is in transit, its movement can be tracked using the provided tracking number. Upon successful delivery, you will recieve a confirmation notification.</p>
            </div>

          </div>
          <div className='hidden lg:grid grid-cols-1 relative lg:col-span-2'>
            <div className="w-full lg:h-[calc(100vh-60px)]">
              <img 
                src={home2} 
                alt="bike" 
                className="w-full h-full rounded-lg"  
              />
            </div>

            <div className="w-[30rem] absolute bottom-[-19rem] lg:h-[calc(100vh-50px)] ">
              <img 
                src={home3} 
                alt="bike" 
                className="w-full h-full rounded-lg"  
              />
            </div>
          </div>
        </div>

        <div style={{ backgroundImage: `url(${home4})` }} className="bg-cover bg-center relative h-64 md:h-[calc(85vh-30px)] lg:h-[calc(95vh-40px)]">
          {/* Content goes here */}
        </div>
        
      </div>
    </>
  )
}

export default Home