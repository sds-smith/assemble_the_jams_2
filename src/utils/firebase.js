import { initializeApp } from 'firebase/app'

import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    // collection,
    // writeBatch,
    // query,
    // getDocs
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6DyFmuQFs__IHI76tsrLQvdDsDgCziRs",
  authDomain: "spotify-auth-90412.firebaseapp.com",
  projectId: "spotify-auth-90412",
  storageBucket: "spotify-auth-90412.appspot.com",
  messagingSenderId: "898491969892",
  appId: "1:898491969892:web:d6c02746041c03b4808a71"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const db = getFirestore()

export const getUserDocRef = (user) => {
    return doc(db, 'users', user.name)
}

export const getUserSnapshot = async (userDocRef) => {
    const userSnapshot = await getDoc(userDocRef)
    return userSnapshot
}

export const isUnregisteredUser = async (userDocRef) => {
    const userSnapshot = await getUserSnapshot(userDocRef)
    return userSnapshot.data().isRegistered === undefined
}

export const setName = async (user, name) => {
    const userDocRef = getUserDocRef(user)
    try {
        await setDoc(userDocRef, {
        name,
        },
        {
            merge: true
        })
    } catch(error) {
        console.log('error adding name to document', error)
    }
    return userDocRef
}

export const createUserDocumentFromReg = async (userReg) => {
    const userDocRef = getUserDocRef(userReg)

    const userSnapshot = await getUserSnapshot(userDocRef)

    if (!userSnapshot.exists()) {
        const { name, email } = userReg
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                name, 
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error)
        }
    }

    return userDocRef
}

export const createAuthDocumentFromSession = async (sessionData) => {
    const authDocRef = doc(db, 'auth', sessionData.authSession)

    const authSnapshot = await getDoc(authDocRef)

    if (!authSnapshot.exists()) {
        const { authSession, state, codeVerifier } = sessionData
        const createdAt = new Date()

        try {
            await setDoc(authDocRef, {
                authSession,
                state, 
                codeVerifier,
                createdAt
            })
        } catch(error) {
            console.log('error creating auth doc ', error)
        }
    }
}
// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    // const collectionRef = collection(db, collectionKey)
    // const batch = writeBatch(db)
// 
    // objectsToAdd.forEach((object) => {
        // const docRef = doc(collectionRef, object.title.toLowerCase())
        // batch.set(docRef, object)
    // })
    // await batch.commit()
    // console.log('done')
// }
// 
// export const getCategoriesAndDocuments = async () => {
    // const collectionRef = collection(db, 'categories')
    // const q = query(collectionRef)
// 
    // const querySnapshot = await getDocs(q)
    // return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
// }
