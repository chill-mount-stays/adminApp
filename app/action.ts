import { db, storage } from "@/lib/firebase";
import {
  Food,
  StayVendor,
  StayVendorDetails,
  TravelVendor,
  TravelVendorDetails,
} from "@/type";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
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
  adminData: StayVendorDetails | TravelVendorDetails,
  collectionName: string
) => {
  try {
    if (!clientData.vendorsRefId) {
      const newVendorsRef = await addDoc(collection(db, "Vendors"), {
        ...adminData,
        vendorId: docRef.id,
      });
      await setDoc(docRef, {
        ...clientData,
        vendorId: docRef.id,
        vendorsRefId: newVendorsRef.id,
      });
    } else {
      const docVendorRefId = clientData.vendorsRefId;
      const docVendorOwnerRef = doc(collection(db, "Vendors"), docVendorRefId);
      const docVendorRef = doc(
        collection(db, collectionName),
        clientData.vendorId
      );
      await updateDoc(docVendorOwnerRef, { ...adminData });
      await updateDoc(docVendorRef, { ...clientData });
      console.log(docVendorRef, docRef);
    }
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
    if (!clientData.foodId) {
      await setDoc(docRef, { ...clientData, foodId: docRef.id });
      console.log("new food", docRef.id);
    } else {
      const docFoodRefId = clientData.foodId;
      const docFoodRef = doc(collection(db, "Foods"), docFoodRefId);
      await updateDoc(docFoodRef, { ...clientData });
      console.log("old food", clientData.foodId);
    }
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
  const storagePath = `tests/${parentCalledFrom}/${
    image.name
  }-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
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

export const getOrderDetails = async () => {
  const dataRef = collection(db, "Orders");
  // const data = db
  const queryCondition = query(dataRef, orderBy("bookingDate", "desc"));
  const querySnapshot = await getDocs(queryCondition);
  const data: any = [];
  querySnapshot.forEach((doc) => {
    const BKdata = doc.data();
    data.push(BKdata);
  });
  return data;
};

export const getData = async (collectionName: string) => {
  const dataRef = collection(db, collectionName);
  const querySnapshot = await getDocs(dataRef);
  const data: any = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });
  return data;
};

export const getVendorDetails = async (id: string, collectionName: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    const vendorsRefId = docSnap.data()?.vendorsRefId;
    const docVendorRef = doc(db, "Vendors", vendorsRefId);
    const docVendorSnap = await getDoc(docVendorRef);
    // const responseData = { ...docSnap.data(), ...docVendorSnap.data() }; //here i want to combine both vendorResource and VendorDetails
    // console.log("responseData => ", responseData);
    const vendorData = docSnap.data();
    const vendorDetailsData = docVendorSnap.data();
    return { vendorData, vendorDetailsData };
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return [];
  }
};

export const getFood = async (foodId: string) => {
  const docRef = doc(db, "Foods", foodId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return [];
  }
};

//Update Functions

export const updateOrderRead = async (orderId: string, bool: boolean) => {
  const docOrderRef = doc(collection(db, "Orders"), orderId);
  await updateDoc(docOrderRef, { isNew: !bool });
};

//Delete Functions

export const removeImageFromFirebase = async (storagePath: string) => {
  const storageRef = ref(storage, storagePath);
  try {
    await deleteObject(storageRef);
    return 1;
  } catch (error) {
    console.error("Delete image Error ", error);
    return 0;
  }
};

export const removeRecordFromDB = async (
  storagePaths: string[],
  recordId: string,
  collectionName: string,
  vendorRef?: string
) => {
  try {
    console.log(storagePaths);
    const removeResults = await Promise.all(
      storagePaths.map((path) => removeImageFromFirebase(path))
    );
    console.log(removeResults);
    if (removeResults.some((result) => !result)) {
      throw new Error("Failed to remove one or more images.");
    }
    await deleteDoc(doc(db, collectionName, recordId));
    if (vendorRef) await deleteDoc(doc(db, "Vendors", vendorRef));
    return 1;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

//General Functions

export const localStringToDateObject = (dateTimeString: string): Date => {
  const [datePart, timePart] = dateTimeString?.split(", ");
  const [day, month, year] = datePart?.split("/").map(Number);
  const dateObject = new Date(year, month - 1, day);
  console.log(dateObject);
  return dateObject;
};
