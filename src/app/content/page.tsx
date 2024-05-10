"use client"
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary'; // Adjust import for CloudinaryUploadWidgetResults
import { useState } from 'react'; // Import useState hook

export default function Content() {
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null); // State to store uploaded image URL
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null); // State to store uploaded video URL

    const handleImageUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
            setUploadedImageUrl(result.info.secure_url);
        }
    };

    const handleVideoUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
            setUploadedVideoUrl(result.info.secure_url);
        }
    };

    return (
        <div className="grid justify-items-center">
            <div>View and Upload content</div>
            <div>
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PERSIST}
                    onSuccess={handleImageUploadSuccess}
                >
                    {({ open }: { open: () => void }) => (
                        <button className='btn btn-primary' onClick={open}>Open Uploader</button>
                    )}
                </CldUploadWidget>
            </div>
            {/* Display the uploaded image URL */}
            {uploadedImageUrl && (
                <div>
                    <img src={uploadedImageUrl} alt="Uploaded" />
                    <div>Uploaded Image URL: {uploadedImageUrl}</div>
                </div>
            )}
            <div>View and Upload content</div>
            <div>
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PERSIST}
                    onSuccess={handleVideoUploadSuccess}
                >
                    {({ open }: { open: () => void }) => (
                        <button className='btn btn-primary' onClick={open}>Open Video Uploader</button>
                    )}
                </CldUploadWidget>
            </div>
            {/* Display the uploaded video URL */}
            {uploadedVideoUrl && (
                <div>
                    <video controls>
                        <source src={uploadedVideoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div>Uploaded Video URL: {uploadedVideoUrl}</div>
                </div>
            )}
        </div>
    );
}
