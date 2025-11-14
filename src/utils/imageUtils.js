import imageCompression from "browser-image-compression";

export async function compressImage(file) {
  const options = {
    maxSizeMB: 0.25,
    maxWidthOrHeight: 1000,
    initialQuality: 0.85,
    fileType: "image/webp",
    useWebWorker: true,
  };

  return await imageCompression(file, options);
}
