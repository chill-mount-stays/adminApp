import { storage } from "@/lib/firebase";
import { ImageFile } from "@/type";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
export const uploadImageToFirebase = (image: File) => {
  const storagePath = `images/${image.name}-${Date.now()}`;
  const storageRef = ref(storage, storagePath);

  return {
    storagePath: storagePath,
    firebaseUrl: uploadBytes(storageRef, image)
      .then(() => {
        return getDownloadURL(storageRef); // Return download URL
      })
      .catch((error) => {
        console.error(`Error uploading image ${image.name}:`, error);
        return ""; // Return empty URL on error
      }),
  };
};

export const removeImageFromFirebase = async (storagePath: string) => {
  const storageRef = ref(storage, storagePath);
  try {
    await deleteObject(storageRef);
    return 0;
  } catch (error) {
    console.error("Delete image Error ", error);
    return 1;
  }
};
