import { FC } from "react";
import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeleteComment from "./deleteComment";

interface commentsProps {
  postId: string;
}
const Comments: FC<commentsProps> = async ({ postId }) => {
  const prisma = new PrismaClient();
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
    },
  });
  return (
    <div className="w-full flex flex-col items-start justify-center">
      <h3 className="text-lg font-bold mb-5">Comments</h3>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-start justify-between py-2 gap-2  bg-blue-200 w-full rounded-lg mb-2"
          >
            <div>
              <div className="flex items-center justify-start px-5 gap-5 w-full">
                <p className="font-semibold">{comment.author?.name}</p>
                <span className="text-sm">
                  {format(comment.createdAt, "MMMM d, yyyy")}
                </span>
              </div>
              <span className="px-5">{comment.text}</span>
            </div>
            <div className="mx-5 cursor-pointer">
              <DeleteComment commentId={comment.id} />
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Comments;
