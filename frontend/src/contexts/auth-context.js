import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider
} from '@firebase/auth';
import { auth } from 'src/utils/firebase';
import httpService from 'src/utils/http-client';

export const AuthContext = createContext({ undefined });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ email: null, uid: null, accessToken: null, profile: null, name: null, photo: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("token:", user.accessToken)
        setUser({ email: user.email, uid: user.uid, accessToken: user.accessToken, name: user.displayName, photo: user.photoURL });
      } else {
        setUser({ email: null, uid: null, accessToken: null });
      }
      console.log(user);
    });

    setLoading(false);
    return () => unsubscribe();
  },[]);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  }

  const logout = () => {
    setUser({ email: null, uid: null, accessToken: null });
    return signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        logout,
        signInWithGoogle,
      }}
    >
      { loading ? null : children }
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);