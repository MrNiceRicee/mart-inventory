import { Category } from "@prisma/client";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { FormProvider, useForm } from "react-hook-form";
import FormCombobox from "../components/form-components/Combobox";
import FormTextInput from "../components/form-components/TextInput";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
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

  const methods = useForm();
  const mutation = trpc.category.createCategory.useMutation();
  const onSubmit = async (data: any) => {
    mutation.mutate(data);
    methods.reset();
  };

  const { data: categoriesData } = trpc.category.getAll.useQuery();

  const handleParentChange = ({ id }: Category) => {
    methods.setValue("parentId", id);
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
      <div className="flex flex-col items-center justify-center p-12">
        <h3 className="my-4 text-center text-white">Create new category</h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="my-4">
              <FormTextInput
                placeholder="Category name"
                name="name"
                type="text"
              />
            </div>
            <div className="my-4">
              <FormCombobox<Category>
                name="parentId"
                label="Parent category"
                options={categoriesData || []}
                onChange={handleParentChange}
              />
            </div>
            <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              type="submit"
              disabled={mutation.isLoading}
            >
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Home;

/* const AuthShowcase: React.FC = () => {
	const { data: sessionData } = useSession();

	const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
		undefined, // no input
		{ enabled: sessionData?.user !== undefined }
	);

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<p className="text-center text-2xl text-white">
				{sessionData && <span>Logged in as {sessionData.user?.name}</span>}
				{secretMessage && <span> - {secretMessage}</span>}
			</p>
			<button
				className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
				onClick={sessionData ? () => signOut() : () => signIn()}
			>
				{sessionData ? "Sign out" : "Sign in"}
			</button>
		</div>
	);
}; */
