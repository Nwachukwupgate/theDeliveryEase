import home1 from '@/assets/image/home1.png'
import home2 from '@/assets/image/home2.png'
import home3 from '@/assets/image/home3.png'
import home4 from '@/assets/image/home4.png'
import home5 from '@/assets/image/home5.png'
import home6 from '@/assets/image/image6.png'
import home7 from '@/assets/image/home7.png'
import { Button } from '@mui/material'
import CardCarousel from './common/carousel/CardCarousel'
import AppTextField from './common/form/AppTextField'
import { useForm, SubmitHandler } from "react-hook-form";
import SearchInput from './common/form/SearchInput'
import ViewIcon from './common/icons/ViewIcon'
import ScheduledIcon from './common/icons/ScheduledIcon'


type FormValues = {
  firstName: string;
  email: string;
};


const Home = () => {
  
  const { handleSubmit, control, formState: { errors } } = useForm<FormValues>();

  return (
    <>
      <div className=' flex flex-col gap-8 lg:gap-16 justify-center'>
        <div className="flex flex-col gap-8 px-4 md:px-16 lg:px-32">
          <div className="grid grid-cols-3">
            <div className="col-span-2 flex text-left">
              <h1 className="font-medium text-xl xs:text-2xl xbs:text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] lg:tracking-wider">Delivery made easy</h1>
            </div>

            <div className="col-span-1 text-[6px] xs:text-[7px] xbs:text-[9px] sm:text-[10px] md:text-sm lg:text-xl font-bold text-primaryColorDarker flex flex-col items-start justify-self-end">
              <p>Establishing new standards</p>
              <p>logistics with eco-friendly</p>
              <p>and effecient delivery.</p>
            </div>

            <div className="col-span-3 ">
              <h1 className="font-semibold text-xl xs:text-2xl xbs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-end lg:justify-self-end lg:tracking-wider">with real time tracking </h1>
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
      <div className=' flex flex-col justify-center pt-8 md:pt-16 lg:py-0'>
        <div className='bg-primaryColorLight  border-b border-black border-dashed '>
          <CardCarousel />
        </div>
        

        <div className='bg-primaryColorLight p-4 md:p-8 lg:grid lg:grid-cols-5 gap-8'>
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
          <div className='hidden lg:block relative lg:col-span-2 h-full w-full content-center overflow-hidden'>
            
            <div className=' w-full flex items-center justify-center absolute top-[2%]'>
              <div className="w-[30vw] h-[30vw]">
                <div 
                  className="w-full h-full bg-no-repeat bg-contain bg-center rounded-lg" 
                  style={{ backgroundImage: `url(${home2})` }}
                >
                </div>
              </div>
            </div>

            <div className='w-full flex items-center justify-center mt-[10.5rem]'>
              <div className="w-[53vw] h-[53vw]">
                <div 
                  className="w-full h-full bg-no-repeat bg-contain bg-center rounded-lg" 
                  style={{ backgroundImage: `url(${home3})` }}
                >
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <div style={{ backgroundImage: `url(${home4})` }} className="flex justify-center md:justify-end items-center bg-cover bg-center bg-no-repeat relative h-[calc(80vh-30px)] md:h-[calc(90vh-30px)] lg:h-[calc(98vh-40px)]">
          {/* Content goes here */}
          <div 
            className="w-[90%] md:w-[50%] bg-white lg:w-[40%] bg-opacity-64 rounded-[16px] shadow-md border border-white/66 p-6 lg:p-12 md:mr-16 lg:mr-24 space-y-8"
            style={{
              backdropFilter: 'blur(11.6px)',
              WebkitBackdropFilter: 'blur(11.6px)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className='border-b-2 border-dashed border-black py-6'> 
              <p className='text-xl lg:text-4xl font-bold'>Calculate your delivery fee based on weight</p>                         
            </div>

            <div>
              <AppTextField
                fullWidth
                control={control as any}
                name="firstName"
                label={<div className="text-[#52525C]">Weight (Kg)</div>}
                size="small"
                placeholder="Input Weight"
              />
            </div>

            <div>
              <Button fullWidth>Estimate</Button>
            </div>
          </div>
        </div>

        <div className="relative  bg-primaryColorDarker">
          <div className='md:flex md:items-center md:justify-between w-full'>
            {/* Image */}
            <div className="md:w-1/2 w-full h-[75vh] bg-cover bg-center bg-no-repeat md:order-last md:mt-8" style={{ backgroundImage: `url(${home5})` }}>
              {/* Overlay text for small screens */}
              <div className="absolute inset-0 flex items-center justify-center md:hidden text-white text-xl font-bold">
                <div className='space-y-20'>
                  <p className='text-3xl text-center'>Track your package now</p>
                  <div><SearchInput type='outline' placeholder='help' /></div>
                  <div className='text-center'> <Button sx={{backgroundColor: 'white', color: 'black', width: '50%'}}  >Estimate</Button></div>
                </div>
              </div>
            </div>

            {/* Text for larger screens (md and up) */}
            <div className="hidden md:block md:w-1/2 p-8 text-left space-y-8 ml-16">
              <p className="text-6xl font-bold text-white">Track your</p>
              <p className="text-6xl font-bold text-white">package now</p>
              <div className='flex gap-8'>
                <div className='w-[60%]'><SearchInput type='outline' placeholder='Input Order ID' /></div>
                <div> <Button sx={{backgroundColor: 'white', color: 'black', width: '100%'}} fullWidth size='small' >Track</Button></div>
              </div>
              
            </div>
          </div>

          <div className='text-white p-8 flex gap-2 md:ml-16'>
            <div>
              <ViewIcon className='h-26 w-26 '  stroke='#ffffff'/>
            </div>

            <div className='md:hidden'>
              <p>Stay updated with real time status of your delivery by adding your generated tracking code</p>
            </div>

            <div className='hidden md:block'>
              <p>Stay updated with real time status of your</p> <p> delivery by adding your generated tracking code</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row justify-center items-center bg-primaryColorDarker lg:bg-inherit lg:mx-28 lg:my-14'>
          <div className="relative w-[90%] lg:w-[70%] h-auto text-center p-4 lg:order-last lg:flex-1">
            <img src={home6} alt="" className="object-cover w-full h-auto" />
            
            {/* Vertical Line */}
            <div className="hidden lg:block absolute inset-0">
              <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-[8px] bg-white"></div>
            </div>
          </div>

          <div className='text-center lg:text-left text-white mt-6 lg:mt-0 mx-8 lg:bg-primaryColorDarker lg:flex-1'>
            <div className='space-y-6 lg:space-y-16 lg:p-12 mb-16 lg:mb-0'>
              <p className='text-3xl lg:text-4xl font-bold'>We are here to serve and support you</p>
              <p className='text-xl'>Reach out to us today and let's start a conversation about how we can help you. Our team is here to answer any questions and provide the support you need. Contact us now for personalized assistance tailored to your requirements. Your satisfaction is our priority."</p>
              <Button
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  width: '100%',
                  '@media (min-width: 1024px)': {
                    width: '35%',
                    backgroundColor: '#EFDFEE'
                  }
                }}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        <div style={{ backgroundImage: `url(${home7})` }} className="flex justify-center items-center bg-cover bg-center bg-no-repeat relative h-screen"> 
          {/* Content goes here */}
          <div className='border-2 border-dashed border-white p-2 lg:p-6 rounded-lg mx-8 lg:mx-auto lg:w-[35%]'>
            <div 
              className="bg-gradient-to-b from-primaryColor  to-successActiveColor rounded-xl shadow-md border border-white/66 p-6 lg:p-4  space-y-8 text-white"
              // style={{
              //   backdropFilter: 'blur(11.6px)',
              //   WebkitBackdropFilter: 'blur(11.6px)',
              //   boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              // }}
            >
              <div className='p-4 lg:p-4'>
                <div className='flex mb-6 items-center gap-2'>
                  <div className='w-14 h-14 rounded-full bg-successActiveColor flex justify-center items-center'> <ScheduledIcon stroke='#ffffff' className='lg:h-7 lg:w-7'/> </div>
                  <p className='text-2xl font-bold'>Seamless Delivery</p>
                </div>
                
                <p className='text-lg'>Effortlessly manage and track your logistics with our user friendly platform, ensuring timely and secure transportation of your package.</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Home