import MessageIcon from "@/common/icons/MessageIcon"
import ChatIcon from "@/common/icons/ChatIcon"
import PhoneIcon from "@/common/icons/PhoneIcon"
import AddressIcon from "@/common/icons/AddressIcon"

const ContactPage = () => {
  return (
    <div className="h-screen flex flex-col justify-between ">
        <div className="p-6">
            <div className="flex justify-between border-b border-gray-400 mb-12 pb-4">
                <div className="font-bold text-xl">Contact</div>
            </div>

            <div>
                <div>
                    <p className='text-3xl font-bold mb-4'>We’d love to hear from you</p>
                    <p className='text-[#667085] text-lg'>Our friendly team is always here to chat.</p>
                </div>

                <div className="w-full flex justify-between gap-x-6 my-10">
                    <div className="flex-1 bg-white p-8">
                        <div className='mb-6'>
                            <div className="bg-[#751F72] w-fit p-3 rounded-lg"><MessageIcon /></div>
                        </div>

                        <div className='space-y-2'>
                            <p className='font-semibold'>Chat to sales</p>
                            <p>Speak to our friendly team.</p>
                            <p className='font-semibold'>sales@deliveryease.com</p>
                        </div>
                    </div>

                    <div className="flex-1 bg-white p-8">
                        <div className='mb-6'>
                            <div className="bg-[#751F72] w-fit p-3 rounded-lg"><ChatIcon /></div>
                        </div>

                        <div className='space-y-2'>
                            <p className='font-semibold'>Chat on whatsapp</p>
                            <p>We’re here to help.</p>
                            <p className='font-semibold'>http/whatsapplink......</p>
                        </div>
                    </div>

                    <div className="flex-1 bg-white p-8">
                        <div className='mb-6'>
                            <div className="bg-[#751F72] w-fit p-3 rounded-lg"><PhoneIcon /></div>
                        </div>

                        <div className='space-y-2'>
                            <p className='font-semibold'>Call us</p>
                            <p>Mon-Fri from 8am to 5pm.</p>
                            <p className='font-semibold'>+1 (555) 000-0000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='flex justify-between bg-white mb-8 p-20'>
            <div className='space-y-6'>
                <p className='text-2xl font-bold'>Our Location</p>
                <p className='text-lg'>Come visit our friendly team at our office.</p>
            </div>

            <div className='h-full border border-dashed border-black'></div>

            <div className='flex gap-x-8 items-center'>
                <div className='self-center'>
                    <p className="bg-[#751F72] w-fit p-3 rounded-lg"><AddressIcon /></p>
                </div>

                <div className='space-y-6'>
                    <p className='font-bold text-lg'>Our Location</p>
                    <p className='text-lg'>Come visit our friendly team at our office.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactPage