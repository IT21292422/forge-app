'use client'

import { Course, getAllCourses } from "@/app/instructor/apiFunctions";
import { useUserStore } from "@/app/stores/user.store";
import { useEffect, useState } from "react";

export default function ApprovedCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState<Course[]>([]);

  const instructor = useUserStore(state => state.user?._id)
  console.log('instructor: ', instructor);


  useEffect(() => {
    async function fetchData() {
      const response = await getAllCourses();

      // Filter cards based on instructor
      let data = response.data.filter((c) => { return c.instructorId === instructor });

      // Filter cards based on isApproved prop
      data = data.filter(c => c.isApproved === true);

      setCards(data);
      console.log('data:', data);
    }
    fetchData()
  }, [instructor]);

  // Filter cards based on search query
  const approvedCards = cards.filter(card =>
    card.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Course Title"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* section header */}
      <div className="text-white font-semibold py-2 mb-4 text-xl bg-main3 rounded flex items-center justify-center">
        <h1>Approved Courses</h1>
      </div>

      {/* cards */}
      <div className="max-w-[100vw] justify-items-center grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
        {approvedCards.map((card, index) => (
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
