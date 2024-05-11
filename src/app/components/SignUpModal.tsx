import { X } from "lucide-react";
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import signInLogo from '../../../public/signup-svg.svg';
import { useSignUpUser } from "../hooks/use-users";
import { CreateInstructorRequestDTO, CreateStudentRequestDTO } from "../interfaces/user/dto/users.dto";
import { useUserStore } from "../stores/user.store";

type Props = {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setOpenLoginModal: Dispatch<SetStateAction<boolean>>;
};
const SignUpModal = ({ openModal, setOpenModal, setOpenLoginModal }: Props) => {
    const { register, handleSubmit, formState, watch } = useForm<CreateStudentRequestDTO | CreateInstructorRequestDTO>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "",
            enrolledCourses: [],
            publishedCourses: [],
            year: "",
        },
    });


    const { data, mutateAsync, isPending, error } = useSignUpUser()
    const selectedRole = watch('role')

    useEffect(() => {
        console.log('Data from mutation changed', data);
        console.log("🚀 ~ SignUpModal ~ mutation error:", error)

    }, [data, error])

    const onSubmit = async (formData: CreateStudentRequestDTO | CreateInstructorRequestDTO) => {

        if (formData.role === 'student') {
            const studentData = formData as CreateStudentRequestDTO;

            const { firstName, lastName, email, password, role, year } = studentData;
            const student = {
                firstName,
                lastName,
                email,
                password,
                role,
                year,
                enrolledCourses: [],
            };
            mutateAsync(student);
            if (data) {
                localStorage.removeItem('token')
                console.log('Data from student create mutation', data);
                useUserStore.getState().setUser(student);
                localStorage.setItem('token', data.token)
                setOpenModal(false);
            }
        }
        else {
            const instructorData = formData as CreateInstructorRequestDTO;
            const { firstName, lastName, email, password, role } = instructorData;
            const instructor = {
                firstName,
                lastName,
                email,
                password,
                role,
                publishedCourses: [],
            };
            mutateAsync(instructor);
            if (data) {
                localStorage.removeItem('token')
                console.log('Data from instructor create mutation', data);
                useUserStore.getState().setUser(instructor);
                localStorage.setItem('token', data.token)
                setOpenModal(false);
            }
        }
    };
    return (
        <dialog id="my_modal_1" className="modal" open={openModal}>
            <div className="modal-box">
                <div className="flex flex-row  justify-between items-center">
                    <h3 className="font-bold text-lg">Welcome to Forge</h3>

                    <button className="btn" onClick={() => setOpenModal(false)}>
                        <X size={24} />
                    </button>
                </div>
                <p className="py-4">Let&apos;s begin your new journey with Forge</p>
                <div className="flex  modal-action">
                    <Image className="lg:flex md:flex flex-1 lg:items-start lg:justify-start hidden" src={signInLogo} alt="login" width={150} height={150} />
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
                                htmlFor="firstname"
                            >
                                Firstname
                            </label>
                            <input
                                className="flex w-['90vh'] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                type="text"
                                id="firstname"
                                {...register("firstName", {
                                    required: { message: "Please enter your firstname", value: true },
                                    maxLength: {
                                        message: "Firstname has to be lower than 50 characters",
                                        value: 50,
                                    },
                                })}
                            />
                            <p className="pl-3 text-red-500">{formState.errors.firstName?.message}</p>
                        </div>
                        <div className="flex flex-col  mb-4">
                            <label
                                className="block text-neutral-800 text-sm font-bold mb-2"
                                htmlFor="lastname"
                            >
                                Lastname
                            </label>
                            <input
                                className="flex w-['90vh'] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                type="text"
                                id="lastname"
                                {...register("lastName", {
                                    required: { message: "Please enter your lastname", value: true },
                                    maxLength: {
                                        message: "Lastname has to be lower than 50 characters",
                                        value: 50,
                                    },
                                })}
                            />
                            <p className="pl-3 text-red-500">{formState.errors.lastName?.message}</p>
                        </div>
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
                        {selectedRole === 'student' ?
                            <div className="flex flex-col  mb-4">
                                <label
                                    className="block text-neutral-800 text-sm font-bold mb-2"
                                    htmlFor="year"
                                >
                                    Please select your academic year
                                </label>
                                <div className="join">
                                    <input className="join-item btn" type="radio" aria-label="Year 1" value='1'
                                        {...register("year", {
                                            required: { message: "Please select a year", value: true },
                                        })
                                        }
                                    />
                                    <input className="join-item btn" type="radio" aria-label="Year 2" value='2' {...register("year", {
                                        required: { message: "Please select a year", value: true },
                                    })
                                    } />
                                    <input className="join-item btn" type="radio" aria-label="Year 3" value='3' {...register("year", {
                                        required: { message: "Please select a year", value: true },
                                    })
                                    } />
                                    <input className="join-item btn" type="radio" aria-label="Year 4" value='4' {...register("year", {
                                        required: { message: "Please select a year", value: true },
                                    })
                                    } />
                                </div>
                                <p className="pl-3 text-red-500">{formState.errors.role?.message}</p>
                            </div> : null}

                        {/* if there is a button in form, it will close the modal */}
                        <div className="flex flex-1 my-5 justify-end">
                            {!isPending ?
                                <button

                                    className=" px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                                    type="submit"
                                >
                                    SignUp
                                </button> : null}
                            {isPending ?
                                <button

                                    className="loading loading-spinner px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                                    type="submit"
                                /> : null}
                        </div>
                    </form>
                </div>
                <div className="flex justify-center">
                    <p>Already have an account?</p>
                    <button
                        onClick={() => {
                            setOpenModal(false);
                            setOpenLoginModal(true);
                        }}
                        className="text-indigo-500 ml-2"
                    >
                        Login
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default SignUpModal