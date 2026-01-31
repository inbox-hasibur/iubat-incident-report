export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    
    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Cloudinary Error:", data);
      return null;
    }
  } catch (error) {
    console.error("Upload Error:", error);
    return null;
  }
};