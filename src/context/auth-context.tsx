"use client";

import type { User, AuthError } from 'firebase/auth';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/client';
import type { SignInFormValues, SignUpFormValues } from '@/components/auth/auth-card';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (data: SignInFormValues) => Promise<{ error?: AuthError }>;
  signUp: (data: SignUpFormValues) => Promise<{ error?: AuthError }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (data: SignInFormValues) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      return {};
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signUp = async (data: SignUpFormValues) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      return {};
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
