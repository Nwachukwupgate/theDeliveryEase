import React from 'react';
import './style/rowswiper.css';
import { deliveryOptions } from './DeliveryOptions';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Mousewheel } from 'swiper/modules';

const CardCarousel: React.FC = () => {
    SwiperCore.use([Mousewheel]);

    return (
        <div className='w-full flex flex-col gap-10 p-8 md:p-16 lg:p-24'>
            <div>
                <h1 className='text-2xl md:text-3xl lg:text-5xl font-semibold'>
                    Our Services
                </h1>
            </div>

            <div className='flex items-center justify-center text-accent-2'>
                {/* For mobile and tablet screens */}
                <div className='block lg:hidden'>
                    <div className='grid grid-cols-2 gap-4'>
                        {deliveryOptions.map((item, index) => (
                            <div
                                key={index}
                                className='relative rounded-2xl bg-white hover:bg-primaryColorDarker hover:text-white transition-colors duration-300 p-4 md:p-10'
                            >
                                <div className='flex flex-row justify-between pb-4 md:pb-6'>
                                    <div className='hover:text-white transition-colors duration-300'>{item.icon2}</div>
                                    <div>{item.icon1}</div>
                                </div>
                                <div>
                                    <h3 className='text-base md:text-xl font-semibold pb-6'>{item.title}</h3>
                                    <p className='text-xs md:text-sm'>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* For larger screens */}
                <div className='hidden lg:block pt-12'>
                    <Swiper
                        slidesPerView={2.1}
                        spaceBetween={40}
                        breakpoints={{
                            // 768: {
                            //     slidesPerView: 2,
                            //     spaceBetween: 16,
                            // },
                        }}
                        modules={[Mousewheel]}
                        mousewheel={true}
                        className="mySwiper bg-accent-0 h-auto w-full max-w-full lg:h-[18rem] lg:w-[100%] lg:max-w-[80rem] px-8"
                    >
                        {deliveryOptions.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                className='relative rounded-2xl h-full bg-white hover:bg-primaryColorDarker hover:text-white transition-colors duration-300'
                                style={{
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    width: '2rem'
                                }}
                            >
                                <div className='p-8 lg:flex lg:flex-col space-y-12'>
                                    <div className='flex flex-row justify-between'>
                                        <div className='hover:text-white transition-colors duration-300'>{item.icon2}</div>
                                        <div>{item.icon1}</div>
                                    </div>
                                    <div>
                                        <h3 className='text-2xl font-semibold pb-6'>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default CardCarousel;
