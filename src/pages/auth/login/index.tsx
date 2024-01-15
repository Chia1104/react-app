import { FileRoute } from "@tanstack/react-router";

const Index = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center gap-5 p-2">
      <h3 className="text-3xl">You are not logged in</h3>
    </div>
  );
};

export const Route = new FileRoute('/auth/login/').createRoute({
  component: Index,
  errorComponent: () => <p>Ooops</p>,
});
