import Link from "next/link";

function Header() {
  return (
    <header className="bg-blue-500 sticky top-0 left-0 w-full h-20 flex items-start justify-center">
      <nav className="w-[80%] h-full flex items-center justify-between">
        <Link href={"/"} className="text-3xl font-bold text-white">
          Blogify
        </Link>
        <ul className="flex items-center justify-center gap-10 text-lg">
          <li>
            <Link href={"/blogs"} className="text-white hover:text-gray-300">
              Blogs
            </Link>
          </li>
          <li>
            <Link
              href={"/api/auth/login"}
              className="text-white hover:text-gray-300"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
