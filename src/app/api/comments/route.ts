import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = auth(async function commentPost(req) {
  if (req.auth) {
    try {
      const { text, postId } = await req.json();
      const commentPost = await prisma.comment.create({
        data: {
          text,
          postId,
          authorEmail: req.auth.user?.email,
        },
      });
      return NextResponse.json(commentPost);
    } catch (error) {
      return NextResponse.json(error);
    }
  } else {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
});
