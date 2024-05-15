import Image from "next/image";
import LandingHero from "./components/Landing/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <LandingHero />
      <div
        style={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
          clipPath: 'inset(0 0 0 0)',

        }}
      >
        <div
          style={{
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            left: '0',
            top: '0',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="flex flex-1 flex-col justify-center items-center">

            <div className="text-center ">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Unlock Your Potential</h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700">Embark on a journey of discovery and growth with Forge. Learn anything, anytime, anywhere.</p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700">Our platform offers curated courses, expert instructors, and limitless opportunities for learning. </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700">Whether you're a beginner or an expert, Forge has something for everyone. Start your learning adventure today!</p>
            </div>
            <div className="flex flex-1 w-[100vw] px-10 gap-x-8 my-10">
              <Image src="/LandingHero.svg" alt="hero-image" layout="fill"
                objectFit="cover"
                sizes="100vw" className="md:h-[500px] lg:order-2 -z-10" />

              <div className="flex flex-1 mockup-window bg-blue-800   ">
                <h2 className="flex justify-center px-4 py-16 bg-base-200 text-3xl font-semibold ">Over 50 Categories!</h2>
              </div>
              <div className="flex flex-1 mockup-window   bg-blue-800">
                <div className="flex justify-center px-4 py-16 bg-base-200 text-3xl font-semibold ">Quizes and competions</div>
              </div>
              <div className="flex flex-1 mockup-window   bg-blue-800">
                <div className="flex justify-center px-4 py-16 bg-base-200 text-3xl font-semibold ">Chapters</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
