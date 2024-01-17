import { useBears } from "@/stores/bears.store";
import { Link, Outlet } from "@tanstack/react-router";

const Page = () => {
  const { bears } = useBears();
  return (
    <div className="container mx-auto flex w-full flex-col justify-center gap-5 p-2">
      <h3 className="text-3xl">Bears</h3>
      {bears > 0 &&
        Array.from(Array(bears).keys()).map((bear) => (
          <div key={bear}>
            <Link
              to="/bears/$id"
              params={{
                id: bear.toString(),
              }}>
              Bear {bear}
            </Link>
          </div>
        ))}
      <hr />
      <Outlet />
    </div>
  );
};

export default Page;
