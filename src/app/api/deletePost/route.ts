import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = auth(async function deletePost(req) {
  if (req.auth) {
    try {
      const { postId } = await req.json();
      console.log(postId);
      const deletePost = await prisma.post.delete({
        where: {
          id: postId,
          author: req.auth.user,
        },
      });
      return NextResponse.json("Your Post has been deleted");
    } catch (error) {
      return NextResponse.json(error);
    }
  } else {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
});
