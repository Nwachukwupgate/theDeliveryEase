import {useState} from "react"
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@mui/material";
import Input from "@/common/form/Input";

interface AccountReq {
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
    occupation: string;
    address: string;
}

const MyDetails = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<AccountReq>();

    const [preview, setPreview] = useState<string | null>(null);

    // Handle image upload and preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        setPreview(URL.createObjectURL(file));
        }
    };
  return (
    <>     
      <div className="my-8">
            <div> 
                <p className="font-bold text-xl">Personal Info</p> 
                <p className="text-[#667085]">Update your photo and personal details here.</p>
            </div>
      </div>

      <form>
      <div className="w-full border my-4"></div>
        <div className="flex justify-between items-center">
            <div className="basis-3/12">
                Name:
            </div>

            <div className="flex basis-9/12">
                <div className="mr-6">
                    <Input
                        placeholder="First Name"
                        name="firstName"
                        register={register}
                        error={errors.firstName}
                        type="text"
                    />
                </div>

                <Input
                    placeholder="Last Name"
                    name="lastName"
                    register={register}
                    error={errors.lastName}
                    type="text"
                />
            </div>
        </div>
        
        <div className="w-full border my-4"></div>
        <div className="flex justify-between items-center">
            <div>
                Email:
            </div>

            <div className="basis-9/12">
                <Input
                    placeholder="Email"
                    name="email"
                    register={register}
                    error={errors.email}
                    type="email"
                />
            </div>
            
        </div>      

        <div className="w-full border my-4"></div>
        <div className="mb-4 flex items-center">
            <div>
                <label htmlFor="photo" className="block font-bold text-gray-700">
                    Your Photo
                </label>
                <p className="text-[#667085]">
                    This will be displayed on your profile.
                </p>
            </div>

            <div className="basis-9/12 flex ml-4">
                <div>
                    {preview && (
                        <div className="mt-4">
                            <img
                                src={preview}
                                alt="Profile Preview"
                                className="h-32 w-32 rounded-full"
                            />
                        </div>
                    )}
                </div>
            
                <div>
                    <input
                        id="photo"
                        type="file"
                        accept="image/*"
                        {...register("photo")}
                        className="w-full px-3 py-2 border rounded-3xl shadow-sm focus:outline-none bg-primaryActiveColorLight"
                        onChange={handleImageChange}
                    />
                </div>  
            </div>        
          
        </div>

        <div className="w-full border my-4"></div>
        <div className="flex">
            <div className="basis-3/12">
                <p>Occupation</p>
            </div>
            
            <div className="basis-9/12">
                <Input
                    placeholder="Occupation"
                    name="occupation"
                    register={register}
                    error={errors.occupation}
                    type="text"
                />
            </div>
        </div>
        
        <div className="w-full border my-4"></div>
        <div className="flex">
            <div className="basis-3/12">
                <p>Address</p>
            </div>
            
            <div className="basis-9/12">
                <Input
                    placeholder="Address"
                    name="address"
                    register={register}
                    error={errors.address}
                    type="text"
                />
            </div>
        </div>

        <div className="flex justify-end">
            <Button variant="contained" >
                Save
            </Button>
        </div>       
      </form>
    </>
  )
}

export default MyDetails