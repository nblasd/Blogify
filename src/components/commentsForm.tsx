"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { commentFormSchema } from "@/lib/schemas";
import { FC } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

interface commentsFormProps {
  postId: string;
}

const CommentsForm: FC<commentsFormProps> = ({ postId }) => {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const commentForm = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof commentFormSchema>) {
    try {
      setLoading(true);
      const response = await axios.post("/api/comments", {
        text: values.comment,
        postId,
      });
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Your comment has been posted",
        });
        router.refresh();
      }
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
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="w-full rounded-none shadow-none border-none my-10">
      <Form {...commentForm}>
        <form
          onSubmit={commentForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={commentForm.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add comment</FormLabel>
                <FormControl>
                  <Input placeholder="Comment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!loading ? (
            <Button type="submit">Submit</Button>
          ) : (
            <Button asChild>
              <div>
                <Loading />
              </div>
            </Button>
          )}
        </form>
      </Form>
    </Card>
  );
};

export default CommentsForm;
