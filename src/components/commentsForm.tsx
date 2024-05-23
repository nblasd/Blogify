"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Card } from "@/components/ui/card";

import { commentFormSchema } from "@/lib/schemas";

function CommentsForm() {
  const commentForm = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof commentFormSchema>) {
    console.log(values);
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
}

export default CommentsForm;
