import { db, storage } from "@/lib/firebase";
import { ImageFile, StayVendor, StayVendorDetails } from "@/type";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const generateDocRef = (colletionName: string): DocumentReference => {
  const newDocRef = doc(collection(db, colletionName));
  return newDocRef;
};

//Post Functions

export const addFormData = async (
  docRef: DocumentReference,
  clientData: StayVendor,
  adminData: StayVendorDetails
) => {
  try {
    await setDoc(docRef, clientData);
    const newDocRef = await addDoc(collection(db, "Vendors"), adminData);
    console.log(newDocRef.id);
  } catch (e) {
    console.error(e);
  }
};

export const uploadImageToFirebase = (
  image: File,
  parentCalledFrom: string
) => {
  const storagePath = `images/${parentCalledFrom}/${image.name}-${Date.now()}`;
  const storageRef = ref(storage, storagePath);

  return {
    storagePath: storagePath,
    firebaseUrl: uploadBytes(storageRef, image)
      .then(() => {
        return getDownloadURL(storageRef); // Return download URL
      })
      .catch((error) => {
        console.error(`Error uploading image ${image.name}:`, error);
        return "";
      }),
  };
};

//Get Functions

export const getData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: any = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
    console.log(doc.id, " => ", doc.data());
  });
  return data;
};

//Delete Functions

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
