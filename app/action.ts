import { db, storage } from "@/lib/firebase";
import {
  Food,
  ImageFile,
  StayVendor,
  StayVendorDetails,
  TravelVendor,
  TravelVendorDetails,
} from "@/type";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
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
  clientData: StayVendor | TravelVendor,
  adminData: StayVendorDetails | TravelVendorDetails
) => {
  try {
    await setDoc(docRef, clientData);
    const newDocRef = await addDoc(collection(db, "Vendors"), adminData);
    console.log(newDocRef.id);
  } catch (e) {
    console.error(e);
  }
};

export const addFoodFormData = async (
  docRef: DocumentReference,
  clientData: Food
) => {
  try {
    await setDoc(docRef, clientData);
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
    data.push(doc.data());
    console.log(doc.id, " => ", doc.data());
  });
  return data;
};

export const getVendorDetails = async (id: string, collectionName: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
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
