"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { authClient } from "../lib/auth-client";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface CategoryContextType {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  user: SessionUser | null;
  isLoggedIn: boolean;
  isSessionLoading: boolean;
  refreshSession: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeCategory, setActiveCategory] = useState("");

  // The session cookie is the source of truth: this refetches on mount,
  // after sign-in/sign-up/sign-out, on window focus and across tabs.
  const {
    data: session,
    isPending: isSessionLoading,
    refetch,
  } = authClient.useSession();

  const user = useMemo<SessionUser | null>(
    () =>
      session?.user
        ? {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          }
        : null,
    [session],
  );

  const refreshSession = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const signOutUser = useCallback(async () => {
    await authClient.signOut();
    await refetch();
  }, [refetch]);

  return (
    <CategoryContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        user,
        isLoggedIn: user !== null,
        isSessionLoading,
        refreshSession,
        signOutUser,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return context;
};
