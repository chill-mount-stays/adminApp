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
  query,
  setDoc,
  where,
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
    const newVendorsRef = await addDoc(collection(db, "Vendors"), adminData);
    await setDoc(docRef, { ...clientData, vendorsRefId: newVendorsRef.id });
    return 0;
  } catch (e) {
    console.error(e);
    return 1;
  }
};

export const addFoodFormData = async (
  docRef: DocumentReference,
  clientData: Food
) => {
  try {
    await setDoc(docRef, clientData);
    return 0;
  } catch (e) {
    console.error(e);
    return 1;
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
    const docVendorRef = doc(db, collectionName, docSnap.data().vendorId);
    const docVendorSnap = await getDoc(docVendorRef);
    const responseData = { ...docSnap.data(), ...docVendorSnap.data() }; //here i want to combine both vendorResource and VendorDetails
    return responseData;
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
