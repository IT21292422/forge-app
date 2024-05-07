import AllCourseCard from "../components/learner/AllCourseCard"
import LearnerHeader from "../components/learner/LearnerHeader"

export default function Home() {

  interface Course {
    courseId: String,
    courseTitle: String,
    publishedDate: Date,
    imgUrl: String,
    price: Number
    chapters: [
      {
        chapterId: Number,
        chapterTitle: String,
        pdfUrl: String,
        videoUrl: String
      }
    ]
  }

  const courses = [
    {
      courseId: "1",
      courseTitle: "C Programming For beginners",
      publishedDate: "12/2/2024",
      price: 100,
      imgUrl: "https://res.cloudinary.com/dhzgmok7k/image/upload/v1714995565/1695299108743_iyb1h1.png",
      chapters: [
        {
          chapterId: "1",
          chapterTitle: "Introduction",
          pdfUrl: "",
          videoUrl: ""
        },
        {
          chapterId: "",
          chapterTitle: "Practical",
          pdfUrl: "",
          videoUrl: ""
        }
      ]
    },
    {
      courseId: "2",
      courseTitle: "C Programming For Advanced",
      publishedDate: "12/2/2024",
      price: 200,
      imgUrl: "https://res.cloudinary.com/dhzgmok7k/image/upload/v1714995565/1695299108743_iyb1h1.png",
      chapters: [
        {
          chapterId: "1",
          chapterTitle: "Introduction",
          pdfUrl: "",
          videoUrl: ""
        }
      ]

    },
    {
      courseId: "3",
      courseTitle: "C Programming For beginners",
      publishedDate: "12/2/2024",
      price: 300,
      imgUrl: "https://res.cloudinary.com/dhzgmok7k/image/upload/v1714995565/1695299108743_iyb1h1.png",
      chapters: [
        {
          chapterId: "1",
          chapterTitle: "Introduction",
          pdfUrl: "",
          videoUrl: ""
        }
      ]

    },
    {
      courseId: "3",
      courseTitle: "C Programming For beginners",
      publishedDate: "12/2/2024",
      price: 200,
      imgUrl: "https://res.cloudinary.com/dhzgmok7k/image/upload/v1714995565/1695299108743_iyb1h1.png",
      chapters: [
        {
          chapterId: "1",
          chapterTitle: "Introduction",
          pdfUrl: "",
          videoUrl: ""
        }
      ]

    }
  ]

  const renderCourses = courses.map((course, index) => {
    return (
      <AllCourseCard key={index} course={course} />
    )
  })


  return (
    <>
      <LearnerHeader />
      <div className="flex w-screen bg-main justify-center p-16 mt-10">
        <label className="input input-bordered flex items-center gap-2 w-[300px] md:w-[80%]">
          <input type="text" className="grow truncate" placeholder="What Do You Want To Learn?" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
      </div>
      <div className="flex justify-center mt-20 mb-20 gap-10 flex-wrap px-5">
        {renderCourses}
      </div>
    </>
  )
}
