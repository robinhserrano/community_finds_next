import { auth, firestore, postToJSON } from "../lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState(null);
  // const [ products, setProducts ] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setEmail(doc.data()?.email);
      });
    } else {
      setEmail(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, email };
}
