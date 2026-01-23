'use server'

import prisma from "@/lib/prisma";
import { ActivityStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

export async function updateActivityStatus(id: string, status: ActivityStatus) {
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
  return updateActivityStatus(id, ActivityStatus.APPROVED);
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
