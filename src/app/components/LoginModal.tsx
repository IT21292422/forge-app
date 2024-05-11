import { X } from "lucide-react";
import Image from 'next/image';
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import loginSvg from '../../../public/login-svg.svg';
import { useLoginUser } from "../hooks/use-users";
import { LoginSchema } from "../interfaces/auth/auth.interface";
import { useUserStore } from "../stores/user.store";

type Props = {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
};
const LoginModal = ({ openModal, setOpenModal }: Props) => {
    const { register, handleSubmit, formState } = useForm<LoginSchema>({
        defaultValues: {
            email: "",
            password: "",
            role: "instructor",
        },
    });

    const { data, mutate, isPending } = useLoginUser()

    // useEffect(() => {
    //     console.log('Data from mutation', data);
    //     if (data) {
    //         if (data.token) {
    //             localStorage.setItem('token', data.token)
    //         }

    //     }
    // }, [data])


    const onSubmit = async (formData: LoginSchema) => {
        console.log(formData);
        mutate(formData);
        if (data) {
            console.log('Data from mutation', data);
            useUserStore.setState({ user: data });
            localStorage.setItem('token', data.token)
            setOpenModal(false);
        }

    };
    return (
        <dialog id="my_modal_1" className="modal" open={openModal}>
            <div className="modal-box">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="font-bold text-lg">Welcome back</h3>

                    <button className="btn" onClick={() => setOpenModal(false)}>
                        <X size={24} />
                    </button>
                </div>
                <p className="py-4">Let&apos;s get back to where you left</p>
                <div className="flex  modal-action">
                    <Image className="lg:flex md:flex flex-1 lg:items-start lg:justify-start hidden" src={loginSvg} alt="login" width={150} height={150} />
                    <form method="dialog" onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                        {data?.message ?
                            <label
                                className="block border p-3 text-red-500 text-sm font-bold mb-2"

                            >
                                {data.message}
                            </label>
                            : null}

                        <div className="flex flex-col  mb-4">
                            <label
                                className="block text-neutral-800 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="flex w-['90vh'] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: { message: "Please enter an email", value: true },
                                    maxLength: {
                                        message: "Email has to be lower than 100 characters",
                                        value: 100,
                                    },
                                    pattern: {
                                        value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter an valid email",
                                    },
                                })}
                            />
                            <p className="pl-3 text-red-500">{formState.errors.email?.message}</p>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-neutral-800 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="w-full px-3 py-2 border  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: {
                                        message: "Password is required",
                                        value: true,
                                    },
                                    minLength: {
                                        message: "Password must have atleast 8 charcters",
                                        value: 8,
                                    },

                                })}
                            />
                            <p className="pl-3 text-red-500">
                                {formState.errors.password?.message}
                            </p>
                        </div>
                        {/* if there is a button in form, it will close the modal */}
                        <div className="flex flex-1 my-5 justify-end">
                            {!isPending ?
                                <button

                                    className=" px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                                    type="submit"
                                >
                                    Login
                                </button> : null}
                            {isPending ?
                                <button

                                    className="loading loading-spinner px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                                    type="submit"
                                /> : null}
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default LoginModal