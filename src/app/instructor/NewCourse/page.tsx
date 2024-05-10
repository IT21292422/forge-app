'use client'

import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <form action="">
        <div className="space-y-12 border rounded border-gray-900/10 p-12 w-[80vw]">

          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">New course</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 hover:cursor-pointer underline"
              onClick={() => router.back()}
            >
              click to go back
            </p>
          </div>

        </div>
      </form>
    </div>
  )
}