import { signIn, signOut } from "@/lib/auth";
import Link from "next/link";
import { auth } from "@/lib/auth";

async function Header() {
  const session = await auth();
  return (
    <header className="bg-blue-500 sticky top-0 left-0 w-full h-20 flex items-start justify-center">
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
              <button className="text-white hover:text-gray-300" type="submit">
                Login
              </button>
            </form>
          ) : (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="text-white hover:text-gray-300" type="submit">
                Log out
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
