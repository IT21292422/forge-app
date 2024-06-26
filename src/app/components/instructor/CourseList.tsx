'use client'

import { Course } from "@/app/instructor/apiFunctions";
import { useUserStore } from "@/app/stores/user.store";
import { useEffect, useState } from "react";

interface CourseListProps {
  title: string;
  isApproved: boolean;
  courses: Course[];
}

export default function CourseList({ title, isApproved, courses }: CourseListProps) {
  const [cards, setCards] = useState<Course[]>([]);

  const instructor = useUserStore(state => state.user?._id)
  console.log('instructor: ', instructor);


  useEffect(() => {
    async function filterData() {

      // Filter cards based on isApproved prop
      const data = courses.filter(c => c.isApproved === isApproved);

      setCards(data);
      console.log('data:', data);
    }
    filterData()
  }, [instructor, courses]);

  return (
    <div>
      {/* section header */}
      <div className="text-white font-semibold py-2 mb-4 text-xl bg-main3 rounded flex items-center justify-center">
        <h1>{title}</h1>
      </div>

      {/* cards */}
      <div className="overflow-x-auto flex flex-row max-w-[90vw]">
        {cards.map((card, index) => (
          <div key={index} className="card bg-base-100 shadow-xl mx-6 mt-5 mb-10 min-w-80 max-w-80">
            <figure><img src={card.imgUrl} alt="img" /></figure>

            <div className="card-body">
              <h2 className="card-title">
                {card.courseTitle}
                <div className="badge badge-secondary">{card.categories}</div>
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
