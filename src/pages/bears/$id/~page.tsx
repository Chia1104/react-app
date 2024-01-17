import { Route } from "./route";

const Page = () => {
  const { id } = Route.useParams();
  return (
    <div className="container mx-auto flex w-full flex-col justify-center gap-5 p-2">
      <h3 className="text-3xl">Bear {id}</h3>
    </div>
  );
};

export default Page;
