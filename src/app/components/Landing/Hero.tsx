"use client"
import { useRouter } from "next/navigation"


const LandingHero = () => {
    const router = useRouter()
    return (
        <div className="flex justify-evenly items-center flex-wrap gap-5 z-50">

            <img src="learner-hero.jpg" className="md:h-[500px] lg:order-2 object-cover" />

            <div className="">
                <h1 className="text-5xl font-semibold leading-[70px]">Fuel Your</h1>
                <h1 className="text-5xl font-semibold leading-[60px] text-main">Passion</h1>
                <h1 className="text-5xl font-semibold leading-[70px]">Ignite Your </h1>
                <h1 className="text-5xl font-semibold leading-[60px] text-main">Potential</h1>
                <button onClick={() => router.push('/learner')} className="btn bg-main btn-lg text-white mt-5 ">Forge your path</button>
            </div>
        </div>
    )
}

export default LandingHero