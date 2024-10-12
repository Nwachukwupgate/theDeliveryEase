import React from 'react'

const ProfilePage = () => {
  return (
    <>
        <div className="my-8">
            <div> 
                <p className="font-bold text-xl">Profile</p> 
                <p className="text-[#667085]">Update your photo and personal details here.</p>
            </div>
        </div>

        <div>
            <div className='flex justify-end'>
                <p className='text-[#6941C6]'>Update</p>
            </div>

            <div className='space-y-8'>
                <div className="flex justify-between items-center">
                    <div className="basis-3/12">
                        <p>Your photo</p>
                        <p className='text-[#667085]'>This will be displayed on your profile.</p>
                    </div>

                    <div className="flex basis-9/12 p-4 rounded-lg">
                        <img
                            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100"
                            alt="Profile Preview"
                            className="h-24 w-24 rounded-full"
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="basis-3/12">
                        Name:
                    </div>

                    <div className="flex basis-9/12 bg-white p-4 rounded-lg">
                        Oliva Rhye
                    </div>
                </div>

                <div className="w-full border my-4"></div>
                <div className="flex justify-between items-center">
                    <div className="basis-3/12">
                        Email:
                    </div>

                    <div className="flex basis-9/12 bg-white p-4 rounded-lg">
                        www.untitledui.com
                    </div>
                </div>

                <div className="w-full border my-4"></div>
                <div className="flex justify-between items-center">
                    <div className="basis-3/12">
                        Occupation:
                    </div>

                    <div className="flex basis-9/12 bg-white p-4 rounded-lg">
                        Product Designer
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfilePage