import AppTextField from '@/common/form/AppTextField'
import { Button } from '@mui/material'
import { useForm } from "react-hook-form";
import WhatsAppIcon from '@/common/icons/WhatsAppIcon';
import InstagramIcon from '@/common/icons/InstagramIcon';
import TwitterIcon from '@/common/icons/TwitterIcon';

type FormValues = {
  firstName: string;
  email: string;
};

const HomeFooter = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("submit", data);
    console.log("errors", errors); // If you want to log the errors
  };  

  return (
    <div className='bg-primaryColorDarker text-white'>
        <div className='flex flex-col lg:flex-row justify-between mx-6 lg:mx-20 py-14 lg:py-28 gap-y-12'>

          <div className='space-y-8'>
            <p className='text-3xl lg:text-[3rem] lg:leading-[3.5rem]'>Delivery with ease <span className='block'>and secured</span> </p>
            <div>
              <div className='flex gap-8 items-center'>
                <div className='flex-1'>
                <AppTextField
                  fullWidth
                  control={control as any}
                  name="firstName"
                  size="small"
                  placeholder="Enter your email"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white', // Default border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'white', // Border color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white', // Border color when focused
                      },
                      '& input': {
                        color: 'white', // Text color inside the input
                      },
                    },
                    width: '100%'
                  }}
                />

                </div>
                <div onClick={handleSubmit(onSubmit)}> <Button sx={{backgroundColor: 'white', color: 'black', width: '100%'}} fullWidth size='small' >Subscribe</Button></div>
              </div>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-y-8 lg:gap-x-10'>
            <div className="lg:space-y-2">
              <p className='font-bold text-lg'>About Us</p>
              <p>Our Services</p>
            </div>

            <div className="lg:space-y-2">
              <p className='font-bold text-lg'>Track Order</p>
              <p>Calculate</p>
            </div>

            <div className="lg:space-y-2">
              <p className='font-bold text-lg'>Contact Us</p>
              <p>Thedeliveryeaselogistics@gmail.com</p>
              <p>+234 904 049 9422 | 08035327006</p>
            </div>
          </div>

        </div>

        <div className='text-center flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:text-left text-lg gap-y-4 pb-4 lg:mx-20'>
          <p>All Rights Reserved &copy; {new Date().getFullYear()} Delivery Ease</p>
          <div className='flex gap-x-4'>
          <a 
            href="https://wa.me/2349040499422" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-semibold text-blue-600 hover:underline"
            >
            <WhatsAppIcon />
            </a>
            <InstagramIcon />
            <TwitterIcon />
          </div>
        </div>
    </div>
  )
}

export default HomeFooter