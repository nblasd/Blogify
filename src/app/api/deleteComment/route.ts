import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = auth(async function deleteComment(req) {
  if (req.auth) {
    try {
      const { commentId } = await req.json();
      const deleteComment = await prisma.comment.delete({
        where: {
          id: commentId,
          author: req.auth.user,
        },
      });
      return NextResponse.json("Your comment has been deleted");
    } catch (error) {
      return NextResponse.json(error);
    }
  } else {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
});
