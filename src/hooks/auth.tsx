import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLoggingIn: boolean;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLECTION = "@lapizza:users";

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert("Erro no Login", "Informe e-mail e senha.");
    }

    setIsLoggingIn(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        firestore()
          .collection("users")
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as User;

            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin,
              };

              await AsyncStorage.setItem(
                USER_COLLECTION,
                JSON.stringify(userData)
              );
              setUser(userData);
            }
          })
          .catch(() =>
            Alert.alert(
              "Erro na autenticação",
              "Não foi possível realizar a autenticação, tente novamente."
            )
          );
      })
      .catch((error) => {
        const { code } = error;

        if (code === "auth/user-not-found" || code === "auth/wrong-password") {
          return Alert.alert(
            "Usuário Inválido",
            "E-mail e/ou senha inválidos."
          );
        } else {
          return Alert.alert(
            "Erro de autenticação",
            "Não foi possível realizar o ligin."
          );
        }
      })
      .finally(() => setIsLoggingIn(false));
  }

  async function loadUserStorageData() {
    setIsLoggingIn(true);

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
    }

    setIsLoggingIn(false);
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert("Redefinição de senha", "Informe seu e-mail.");
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          "Redefinição de senha",
          "Verifique a caixa de entrada do seu e-mail, enviamos um link para você conseguir mudar sua senha."
        )
      )
      .catch(() =>
        Alert.alert(
          "Ocorreu um erro",
          "Não foi possível redefinir sua senha, caso tenha digitado seu e-mail corretamente, tente novamente mais tarde."
        )
      );
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, forgotPassword, isLoggingIn, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
