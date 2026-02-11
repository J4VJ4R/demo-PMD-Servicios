'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";

export async function createProject(formData: FormData) {
  const name = formData.get('name') as string;
  const clientName = formData.get('clientName') as string;
  
  if (!name || !clientName) {
    return { success: false, error: "Missing fields" };
  }

  try {
    await prisma.project.create({
      data: {
        name,
        clientName,
        status: "ACTIVE",
      },
    });
    revalidatePath('/projects');
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateActivityStatus(id: string, status: string) {
  try {
    await prisma.activity.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/activities');
    revalidatePath('/overview');
    return { success: true };
  } catch (error) {
    console.error("Failed to update activity status:", error);
    return { success: false, error: "Failed to update activity status" };
  }
}

// Deprecated: Keeping for backward compatibility if needed, but redirects to updateActivityStatus logic
export async function approveActivity(id: string) {
  return updateActivityStatus(id, "APPROVED");
}

export async function uploadDocument(activityId: string, fileName: string) {
  try {
    await prisma.document.create({
      data: {
        name: fileName,
        url: `/mock-files/${fileName}`,
        activityId: activityId,
      },
    });
    revalidatePath('/documents');
    return { success: true };
  } catch (error) {
    console.error("Failed to upload document:", error);
    return { success: false, error: "Failed to upload document" };
  }
}

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;

  if (!name || !email || !password || !role) {
    return { success: false, error: "Todos los campos son requeridos" };
  }

  try {
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    revalidatePath('/users');
    return { success: true };
  } catch (error) {
    console.error("Failed to create user:", error);
    return { success: false, error: "Error al crear usuario. Verifique si el correo ya existe." };
  }
}
