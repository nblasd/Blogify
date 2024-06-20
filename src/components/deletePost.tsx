"use client";
import axios from "axios";
import React, { FC } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface deletePostParams {
  postId: string;
}

const DeletePost: FC<deletePostParams> = ({ postId }) => {
  const router = useRouter();
  const { toast } = useToast();
  const deletePost = async () => {
    try {
      const res = await axios.post("/api/deletePost", {
        postId,
      });
      toast({
        title: "Success",
        description: res.data,
      });
      router.push("/blogs");
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
    <div className="hover:text-red-700" onClick={deletePost}>
      <RiDeleteBin5Line />
    </div>
  );
};

export default DeletePost;
