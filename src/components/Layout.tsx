import { signIn, signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";

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
    <div className="h-screen bg-gray-700">
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
      {children}
    </div>
  );
};

export default Layout;
