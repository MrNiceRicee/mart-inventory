import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

const routes: { route: string; label: string }[] = [
  {
    label: "Products",
    route: "/products",
  },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  const handleUserAuth = async () => {
    if (!session) {
      try {
        await signIn("google");
      } catch (error) {
        console.log("sign in error: ", error);
      }
    } else {
      try {
        await signOut();
      } catch (error) {
        console.log("sign out error: ", error);
      }
    }
  };

  return (
    <div className="relative min-h-screen md:flex">
      <div className="sidebar absolute inset-y-0 left-0 w-64 -translate-x-full transform space-y-6 bg-gray-800 py-7 px-2 text-blue-100 transition duration-200 ease-in-out md:relative md:translate-x-0">
        <a href="#" className="flex items-center space-x-2 px-4 text-white">
          <span className="text-xl font-extrabold">
            M-Art Inventory Management
          </span>
        </a>

        <nav>
          {routes.map((route) => (
            <Link
              className="block rounded py-2.5 px-4 transition duration-200 hover:bg-blue-700 hover:text-white"
              href={route.route}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div
          id="user-authentication"
          className="mr-8 flex items-center justify-end pt-4"
        >
          {session && (
            <p className="pr-8 text-xl">Welcome, {session?.user?.name}</p>
          )}
          <button
            onClick={handleUserAuth}
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            {session ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>

      <div className="flex-1 text-2xl font-bold">
        <div className="h-screen bg-gray-700 p-12">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
