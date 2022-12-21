import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import { Autocomplete } from "../components/Autocomplete";
import { type Category } from "@prisma/client";
import { useForm } from "react-hook-form";

const Home: NextPage = () => {
  const { data: categoriesData, isLoading: categoriesLoading } =
    trpc.category.getAll.useQuery({
      text: "askldfsalkdfhasdklfakshdfsadf",
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const [localCategories, setLocalCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();

  useEffect(() => {
    if (!categoriesLoading && categoriesData) {
      setLocalCategories(categoriesData);
    }
  }, [categoriesLoading, categoriesData]);

  const handleCategoryChange = (value: Category) => {
    setSelectedCategory(value);
  };

  return categoriesLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-screen bg-gray-700">
      <div className="flex items-center justify-center p-12">
        <div className="fixed top-16 w-72">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Autocomplete
              options={localCategories}
              {...register("category")}
              name="category"
              selected={selectedCategory}
              label="Category"
              onChange={handleCategoryChange}
            />
            <input type="submit" />
          </form>
        </div>
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
