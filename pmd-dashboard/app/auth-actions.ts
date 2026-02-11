'use server'

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { compare } from "bcryptjs";

export async function login(formData: FormData) {
  const email = (formData.get('email') as string).trim();
  const password = (formData.get('password') as string).trim();

  if (!email || !password) {
    return { success: false, error: "Email y contraseña requeridos" };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log(`Login failed: User not found for email '${email}'`);
    return { success: false, error: "Credenciales inválidas" };
  }

  // Secure comparison using bcrypt
  const passwordsMatch = await compare(password, user.password);

  if (!passwordsMatch) {
    console.log(`Login failed: Invalid password for user '${email}'`);
    return { success: false, error: "Credenciales inválidas" };
  }

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set('session_user_id', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session_user_id');
  redirect('/login');
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('session_user_id')?.value;

  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    return null;
  }
}
