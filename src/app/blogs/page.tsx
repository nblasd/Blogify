import Link from "next/link";
import { posts } from "@/lib/posts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function BlogsPage() {
  return (
    <main className="max-w-4xl mx-auto flex flex-col items-center justify-center py-10">
      <h1 className="font-bold text-4xl my-10">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {posts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>{post.content}</CardContent>
              <CardFooter>Written by {post.userName}</CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default BlogsPage;
