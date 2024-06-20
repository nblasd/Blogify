"use client";
import axios from "axios";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPostSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Loading from "./loading";

function NewPost() {
  const [loading, setLoading] = React.useState(false);
  const route = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof newPostSchema>>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newPostSchema>) {
    try {
      setLoading(true);
      const response = await axios.post("/api/posts", {
        title: values.title,
        content: values.content,
      });
      toast({
        title: "Success",
        description: "Your post has been submitted successfully!!",
      });
      route.push(`/blogs/${response.data?.id}`);
    } catch (error: any) {
      if (error.response.status == 401) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "Please login first!!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: `${error}`,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="lg:min-w-[700px] md:min-w-[500px]">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="content" {...field} />
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
      </CardContent>
    </Card>
  );
}

export default NewPost;
