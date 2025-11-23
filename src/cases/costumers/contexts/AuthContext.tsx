import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react"; 
import { supabase } from "@/lib/client";
import type { User, Session, AuthError, AuthChangeEvent } from "@supabase/supabase-js";

interface CustomerData {
  name: string;
  address: string;
  zipcode: string;
  cityIdId: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, pass: string, customerData: CustomerData) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then((response) => {
      const sessionData = response.data?.session ?? null;
      if (sessionData) {
        setSession(sessionData);
        setUser(sessionData.user);
      } else {
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    return { error };
  };

  const signUp = async (email: string, pass: string, customerData: CustomerData) => {
    const safeEmail = String(email).trim();
    const safePassword = String(pass).trim();

    console.log(`1. Iniciando cadastro. Email: [${safeEmail}] Senha: [${safePassword.length} chars]`);

    const { data, error: authError } = await supabase.auth.signUp({
      email: safeEmail,
      password: safePassword,
    });

    if (authError) {
        console.error("Erro no Auth (Email/Senha):", authError);
        return { error: authError };
    }

    if (data.user) {
      console.log("2. Usuário criado:", data.user.id);
      
      const { error: dbError } = await supabase.from('customer').insert({
        id: data.user.id,
        name: customerData.name,
        address: customerData.address,
        zipcode: customerData.zipcode,
        cityIdId: customerData.cityIdId 
      });

      if (dbError) {
        console.error("ERRO BANCO DE DADOS:", dbError);
        return { error: { message: `Erro ao salvar dados: ${dbError.message}` } as AuthError };
      }
      
      console.log("3. Sucesso total.");
    }
    
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};