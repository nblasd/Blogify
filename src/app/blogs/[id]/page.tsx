import Comments from "@/components/Comments";
import CommentsForm from "@/components/commentsForm";
import React from "react";

function BlogDetailPage() {
  return (
    <main className="max-w-4xl mx-auto py-10 flex flex-col items-start justify-center">
      <h1 className="font-bold text-4xl my-2">Blog 1 </h1>
      <p>Written by john doe</p>
      <div className="my-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quaerat
        porro, explicabo possimus ea tempora. Minus, nesciunt laboriosam! Illum
        unde voluptatum adipisci, aliquam sapiente praesentium temporibus
        deserunt labore ad eum.
      </div>
      <Comments />
      <CommentsForm />
    </main>
  );
}

export default BlogDetailPage;
