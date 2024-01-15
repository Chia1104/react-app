import { FileRoute } from "@tanstack/react-router";
import { Bears } from "@/stores/bears.store";

const Index = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center gap-5 p-2">
      <h3 className="text-3xl">Bears</h3>
      <Bears />
    </div>
  );
};

export const Route = new FileRoute('/bears/').createRoute({
  component: Index,
  errorComponent: () => <p>Ooops</p>,
});
