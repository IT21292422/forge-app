import Link from "next/link";

export default function LearnerHeader() {
    return (
        <div className="flex justify-evenly items-center flex-wrap gap-5">
            <img src="learner-hero.jpg" className="md:h-[500px] lg:order-2 object-cover" />
            <div className="">
                <h1 className="text-5xl font-semibold leading-[60px]">Unlock Your</h1>
                <h1 className="text-5xl font-semibold leading-[60px] text-main">Potential</h1>
                <h1 className="text-5xl font-semibold leading-[60px]">Learn Anything,</h1>
                <h1 className="text-5xl font-semibold leading-[60px] text-main">Anytime!</h1>
                <button className="btn bg-main text-white mt-5 "><Link href="/learner/allcourse">Start Learning</Link></button>
            </div>
        </div>
    )
}
