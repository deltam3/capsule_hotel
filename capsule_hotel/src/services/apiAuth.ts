import supabase, { supabaseUrl } from "./supabase";

interface LoginParams {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

interface SignupParams {
  fullName: string;
  email: string;
  password: string;
}

export async function signup({ fullName, email, password }: SignupParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}
