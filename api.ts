import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";

export async function getProjectByCode(code: string) {
  const q = query(
    collection(db, "projects"),
    where("shareCode", "==", code)
  );

  const snap = await getDocs(q);

  if (snap.empty) return null;

  return snap.docs[0].data();
}