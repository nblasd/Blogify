import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";

async function BlogsPage() {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });
  prisma.$disconnect();
  return (
    <main className="max-w-4xl mx-auto flex flex-col items-center justify-center py-10">
      <h1 className="font-bold text-4xl my-10">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {posts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}`}>
            <Card className="hover:bg-blue-500 hover:text-white duration-500 ease-in-out min-h-[200px] pb-0">
              <CardHeader>
                <CardTitle className="text-lg truncate">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="truncate text-sm">
                {post.content}
              </CardContent>
              <CardFooter className="text-[10px] font-semibold">
                Written by {post.author?.name}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default BlogsPage;
