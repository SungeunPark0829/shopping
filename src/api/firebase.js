// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import {v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATEBASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const dbRef = ref(getDatabase());

export function signInWithGoogle() {
  signInWithPopup(auth, provider).catch(console.error);
}

export async function logout() {
  return signOut(auth).catch(console.error);
}

export function onUserChange(callback) {
  onAuthStateChanged(auth, async (user) =>{
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user){
  return await get(child(dbRef, 'admins')).then((snapshot) => {
    if(snapshot.exists()) {
      const isAdmin = snapshot.val().includes(user.uid);
      return {...user, isAdmin};
    }
    return user;
  }).catch(console.error);
}

export async function addNewProduct(product, image){
  const id = uuid();
  const db = getDatabase();
  console.log(product);
  return set(ref(db, 'products/' + id), {
    ...product,
    id,
    price : parseInt(product.price),
    image,
    options : product.options ? product.options.split(',').map((option) => option.trim()) : []
  });
}

export async function getProducts() {
  return get(child(dbRef, 'products')).then((snapshot) => {
    if(snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  }).catch(console.error);
}

export async function getCarts(userId) {
  return get(child(dbRef, `carts/${userId}`)).then((snapshot) => {
    if(snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  }).catch(console.error);
}

export async function addOrUpdateCart(product, userId) {
  const db = getDatabase();
  return set(ref(db, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(id, userId) {
  const db = getDatabase();
  return remove(ref(db, `carts/${userId}/${id}`)).catch(console.error);
}