'use client'

import { LoginInstructorResponseDTO } from "@/app/interfaces/auth/auth.interface";
import { useUserStore } from "@/app/stores/user.store";
import { useState } from "react";
import { cardsMockData } from "./mockData/cardsMockData";

interface CourseListProps {
  title: string;
  isApproved: boolean;
}

export default function CourseList({ title, isApproved }: CourseListProps) {
  // const [approvedCards, setApprovedCards] = useState<Course[]>([]);
  const [userData, setUserData] = useState<LoginInstructorResponseDTO | null>();

  const instructor = useUserStore(state => state.user)
  console.log(instructor);


  // useEffect(() => {
  //    const res = await getAllCourses()
  // }, [])


  // Filter cards based on isApproved prop
  const approvedCards = cardsMockData.filter(card => card.isApproved === isApproved);

  return (
    <div>
      {/* section header */}
      <div className="text-white font-semibold py-2 mb-4 text-xl bg-main3 rounded flex items-center justify-center">
        <h1>{title}</h1>
      </div>

      {/* cards */}
      <div className="overflow-x-auto flex flex-row max-w-[90vw]">
        {approvedCards.map((card, index) => (
          <div key={index} className="card bg-base-100 shadow-xl mx-6 mt-5 mb-10 min-w-80 max-w-80">
            <figure><img src={card.imgUrl} alt="img" /></figure>

            <div className="card-body">
              <h2 className="card-title">
                {card.courseTitle}
                <div className="badge badge-secondary">{card.category}</div>
              </h2>

              <p>Rs: {card.price}</p>

              <div className="card-actions justify-end">
                {/* Map over tags */}
                {card.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="badge badge-outline">{tag}</div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
