'use client'

import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

interface ChapterState {
  chapterTitle: string;
  pdfUrl: string | null;
  videoUrl: string | null;
}

interface CourseData {
  courseTitle: string;
  imgUrl: string,
  price: string;
  category: string;
  tags: string;
  description: string;
  whatWillLearn: string[];
  chapters: ChapterState[];
}

export default function Page() {
  const router = useRouter();

  const [courseData, setCourseData] = useState({
    courseTitle: '',
    imgUrl: '',
    price: '',
    category: '',
    tags: '',
    description: '',
    whatWillLearn: [''],
    chapters: [
      {
        chapterTitle: '',
        pdfUrl: '',
        videoUrl: '',
        videoLength: '',
      },
    ],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleChapterChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedChapters = [...courseData.chapters];

    updatedChapters[index] = {
      ...updatedChapters[index],
      [name]: value,
    };

    setCourseData({ ...courseData, chapters: updatedChapters });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO submit data
    console.log(courseData);
  };

  const handleAddWWUL = () => {
    setCourseData({
      ...courseData,
      whatWillLearn: [...courseData.whatWillLearn, '']
    });
  };

  const handleAddChapter = () => {
    setCourseData({
      ...courseData,
      chapters: [...courseData.chapters, { chapterTitle: '', pdfUrl: '', videoUrl: '', videoLength: '' }]
    });
  };

  const handleImgUpload = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
      const updatedCourse = { ...courseData };
      updatedCourse.imgUrl = result.info.secure_url;
      setCourseData(updatedCourse);
    }
  }

  const handlePDFUploadSuccess = (result: CloudinaryUploadWidgetResults, chapterIndex: number) => {
    if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
      const updatedChapters = [...courseData.chapters];
      updatedChapters[chapterIndex] = {
        ...updatedChapters[chapterIndex],
        pdfUrl: result.info.secure_url,
      };
      setCourseData({ ...courseData, chapters: updatedChapters });
    }
  };

  const handleVideoUploadSuccess = (result: CloudinaryUploadWidgetResults, chapterIndex: number) => {
    if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
      const updatedChapters = [...courseData.chapters];
      updatedChapters[chapterIndex] = {
        ...updatedChapters[chapterIndex],
        videoUrl: result.info.secure_url,
      };
      setCourseData({ ...courseData, chapters: updatedChapters });
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="space-y-12 border rounded-lg border-gray-900/10 p-12 w-[95vw] sm:w-[80vw] xl:w-[1024px]">
        <div>
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">New course</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 hover:cursor-pointer underline" onClick={() => router.push('/instructor')}>
            Back
          </p>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="courseTitle" className="block text-base font-medium leading-6 text-gray-900">
            Course Title
          </label>
          <input
            type="text"
            name="courseTitle"
            id="courseTitle"
            value={courseData.courseTitle}
            onChange={handleChange}
            className="block w-full mt-1 border rounded-md shadow-sm border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
            placeholder="Type script course"
          />
        </div>

        {/* img upload */}
        <div>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PERSIST}
            onSuccess={handleImgUpload}
          >
            {({ open }: { open: () => void }) => (
              <div>
                <input
                  type="text"
                  name="imgUrl" // Change this line
                  value={courseData.imgUrl || ''}
                  readOnly
                  className="block w-full mt-1 border rounded-md shadow-sm border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
                  placeholder={`Image Url for Course. Press the upload button.`}
                />
                <br />
                <button className="btn btn-primary" onClick={open}>
                  Upload Image
                </button>
              </div>
            )}
          </CldUploadWidget>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="price" className="block text-base font-medium leading-6 text-gray-900">
            Price (Rs)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={courseData.price}
            onChange={handleChange}
            className="block w-full mt-1 border rounded-md shadow-sm border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
            placeholder="Price"
          />
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="category" className="block text-base font-medium leading-6 text-gray-900">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={courseData.category}
            onChange={handleChange}
            className="block w-full mt-1 border rounded-md shadow-sm border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
            placeholder="Category"
          />
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="tags" className="block text-base font-medium leading-6 text-gray-900">
            Tags (max 3, separated by comma)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={courseData.tags}
            onChange={handleChange}
            className="block w-full mt-1 border rounded-md shadow-sm border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
            placeholder="Tags"
          />
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="description" className="block text-base font-medium leading-6 text-gray-900">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={courseData.description}
            onChange={handleChange}
            rows={3}
            className="block w-full mt-1 border rounded-md shadow-sm border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
            placeholder="Description"
          ></textarea>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="whatWillLearn" className="block text-base font-medium leading-6 text-gray-900">
            What will you learn
          </label>
          {courseData.whatWillLearn.map((item, index) => (
            <input
              key={index}
              type="text"
              name="whatWillLearn"
              value={item}
              onChange={(e) => handleChapterChange(index, e)}
              className="block w-full mt-1 border rounded-md shadow-sm border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
              placeholder={`What will you learn ${index + 1}`}
            />
          ))}
          <button type="button" onClick={handleAddWWUL} className="text-blue-500 hover:text-blue-700 focus:outline-none">
            Add What will you learn
          </button>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="chapters" className="block text-base font-medium leading-6 text-gray-900">
            Chapters
          </label>
          {courseData.chapters.map((chapter, index) => (
            <div key={index} className="space-y-3">
              <br />
              <input
                type="text"
                name="chapterTitle"
                value={chapter.chapterTitle}
                onChange={(e) => handleChapterChange(index, e)}
                className="block w-full mt-1 border rounded-md shadow-sm border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
                placeholder={`Chapter ${index + 1} Title`}
              />
              <div>
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PERSIST}
                  onSuccess={(result) => handlePDFUploadSuccess(result, index)}
                >
                  {({ open }: { open: () => void }) => (
                    <div>
                      <input
                        type="text"
                        name="pdfUrl"
                        value={chapter.pdfUrl || ''}
                        readOnly
                        className="block w-full mt-1 border rounded-md shadow-sm border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
                        placeholder={`PDF Url for Chapter ${index + 1}. Press the upload button.`}
                      />
                      <button className="btn btn-primary" onClick={open}>
                        Upload PDF
                      </button>
                    </div>
                  )}
                </CldUploadWidget>
              </div>
              <div>
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PERSIST}
                  onSuccess={(result) => handleVideoUploadSuccess(result, index)}
                >
                  {({ open }: { open: () => void }) => (
                    <div>
                      <input
                        type="text"
                        name="videoUrl"
                        value={chapter.videoUrl || ''}
                        readOnly
                        className="block w-full mt-1 border rounded-md shadow-sm border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
                        placeholder={`Video Url for Chapter ${index + 1}. Press the upload button.`}
                      />
                      <button className="btn btn-primary" onClick={open}>
                        Upload Video
                      </button>
                    </div>
                  )}
                </CldUploadWidget>
              </div>
              <input
                type="text"
                name="chapterTitle"
                value={chapter.videoLength}
                onChange={(e) => handleChapterChange(index, e)}
                className="block w-full mt-1 border rounded-md shadow-sm border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
                placeholder={`videoLength`}
              />
              <br /><hr />
            </div>
          ))}
          <br />
          <button type="button" onClick={handleAddChapter} className="text-blue-500 hover:text-blue-700 focus:outline-none">
            Add more chapters
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="btn btn-ghost" onClick={() => router.push('/instructor')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}