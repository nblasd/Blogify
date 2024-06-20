import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = auth(async function POST(req) {
  try {
    if (req.auth) {
      const { title, content } = await req.json();

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          authorEmail: req.auth.user?.email,
        },
      });

      return NextResponse.json(newPost);
    } else {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
});
