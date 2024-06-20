import Comments from "@/components/Comments";
import CommentsForm from "@/components/commentsForm";
import React, { FC } from "react";
import { PrismaClient } from "@prisma/client";
import DeletePost from "@/components/deletePost";

interface postDetailPageProps {
  params: {
    id: string;
  };
}
const BlogDetailPage: FC<postDetailPageProps> = async ({ params }) => {
  const prisma = new PrismaClient();
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });

  return (
    <main className="max-w-4xl mx-2 md:mx-auto py-10 flex flex-col items-start justify-center">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold text-4xl my-2">{post?.title}</h1>
        <DeletePost postId={params.id} />
      </div>

      <p>Written by {post?.author?.name}</p>
      <div className="my-10">{post?.content}</div>
      <Comments postId={params.id} />
      <CommentsForm postId={params.id} />
    </main>
  );
};

export default BlogDetailPage;
