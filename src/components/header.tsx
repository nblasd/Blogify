import { signIn, signOut } from "@/lib/auth";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "./ui/button";

async function Header() {
  const session = await auth();
  return (
    <header className="bg-blue-500 sticky top-0 left-0 w-full h-20 flex items-start justify-center z-10">
      <nav className="w-[80%] h-full flex items-center justify-between">
        <Link href={"/"} className="text-3xl font-bold text-white">
          Blogify
        </Link>
        <div className="flex items-center justify-center gap-10 text-lg">
          <Link href={"/blogs"} className="text-white hover:text-gray-300">
            Blogs
          </Link>
          {!session?.user ? (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button variant={"outline"} type="submit">
                Login
              </Button>
            </form>
          ) : (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button variant={"outline"} type="submit">
                Log out
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
