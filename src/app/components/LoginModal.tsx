"use client";

import { X } from "lucide-react";
import Image from 'next/image';
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import loginSvg from '../../../public/login2-svg.svg';
import { useLoginUser } from "../hooks/use-users";
import { LoginSchema } from "../interfaces/auth/auth.interface";
import { useUserStore } from "../stores/user.store";

type Props = {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setOpenSignUpModal: Dispatch<SetStateAction<boolean>>;
};
const LoginModal = ({ openModal, setOpenModal, setOpenSignUpModal }: Props) => {
    const { register, handleSubmit, formState, reset, setValue, trigger, setError, clearErrors } = useForm<LoginSchema>({
        defaultValues: {
            email: "",
            password: "",
            role: "",
            serverError: "",
        },
    });

    const { data, mutateAsync, isPending, reset: resetMutation, } = useLoginUser()

    // useEffect(() => {
    //     // reset()
    // }, [])


    const onSubmit = async (formData: LoginSchema, e?: React.BaseSyntheticEvent) => {
        try {

            e?.preventDefault();
            console.log('Data from mutation ~ outside if', data);
            console.log('FORM DATA', formData);
            await mutateAsync(formData);
            localStorage.removeItem('token')

            // resetMutation()
            if (data) {

                if (data.statusCode === 401) {
                    setError('serverError', { message: `${data.message}`, type: 'server' })
                    console.log('Inavlid password');
                    // setValue('password', '')
                    // setValue('email', '')
                    return
                }
                else if (data.statusCode === 404) {
                    setError('serverError', { message: `${data.message}`, type: 'server' })
                    console.log('Inavlid email ');
                    // setValue('password', '')
                    // setValue('email', '')
                    return
                }

                setOpenModal(false);
                localStorage.removeItem('token')
                console.log('Data from mutation ~ inside if', data);
                useUserStore.getState().setUser(data);
                localStorage.setItem('token', data.token)
                // reset()

            }
            // setOpenModal(false);
            reset()
        } catch (error) {
            console.log('Onsubmit Error', error);

        }
    };

    // console.log('Form errors', formState.errors);


    return (
        <dialog id="my_modal_1" className="modal p-5" open={openModal}>
            <div className="modal-box flex flex-col ">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="font-bold text-lg">Welcome back</h3>

                    <button className="btn" onClick={() => setOpenModal(false)}>
                        <X size={24} />
                    </button>
                </div>
                <p className="py-4">Let&apos;s get back to where you left</p>
                <div className="flex  modal-action">
                    <Image className="lg:flex md:flex flex-1 lg:items-start lg:justify-start hidden" src={loginSvg} alt="login" width={130} height={130} />
                    <form method="dialog" onSubmit={(e) => {
                        clearErrors()
                        handleSubmit(onSubmit)(e)
                    }} className="flex flex-col">
                        {formState.errors.serverError ?
                            <p className="text-red-500 block border p-3">{formState.errors.serverError?.message}</p> : null}


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
                        <div className="flex flex-col  mb-4">
                            <label
                                className="block text-neutral-800 text-sm font-bold mb-2"
                                htmlFor="role"
                            >
                                I am a
                            </label>

                            <div className="join">
                                <input className="join-item btn" type="radio" aria-label="Student" value='student'
                                    {...register("role", {
                                        required: { message: "Please select a role", value: true },
                                    })
                                    }
                                />
                                <input className="join-item btn" type="radio" aria-label="Teacher" value='instructor' {...register("role", {
                                    required: { message: "Please select a role", value: true },
                                })
                                } />
                            </div>
                            <p className="pl-3 text-red-500">{formState.errors.role?.message}</p>
                        </div>
                        {/* if there is a button in form, it will close the modal */}
                        <div className="flex flex-1 my-5 justify-end">
                            <button

                                className=" px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                            >
                                Login
                            </button>
                            {/* {isPending ?
                                <button

                                    className="loading loading-spinner px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                                    type="submit"
                                /> : null} */}

                        </div>
                    </form>
                </div>
                <div className="flex justify-center">
                    <p>Don&apos;t have an account?</p>
                    <button
                        onClick={() => {
                            setOpenModal(false);
                            setOpenSignUpModal(true);
                        }}
                        className="text-indigo-500 ml-2"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default LoginModal