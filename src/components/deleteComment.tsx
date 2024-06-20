"use client";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { FC } from "react";
import axios from "axios";
interface deleteCommentProps {
  commentId: string;
}
const DeleteComment: FC<deleteCommentProps> = ({ commentId }) => {
  const router = useRouter();
  const { toast } = useToast();

  const deleteComment = async () => {
    try {
      const deleteComment = await axios.post("/api/deleteComment", {
        commentId,
      });
      toast({
        title: "Success",
        description: deleteComment.data,
      });
      router.refresh();
    } catch (error: any) {
      if (error.response.status == 401) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "Please login first!!",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: `${error}`,
        });
      }
    }
  };

  return (
    <div className="hover:text-red-700" onClick={deleteComment}>
      <RiDeleteBin5Line />
    </div>
  );
};

export default DeleteComment;
