import { FileRoute } from "@tanstack/react-router";
import { useBears } from "@/stores/bears.store";

const Index = () => {
  const bears = useBears((state) => state.bears);
  return (
    <div className="container mx-auto flex w-full flex-col justify-center gap-5 p-2">
      <h3 className="text-3xl">Bears</h3>
      <p>{bears ?? 0}</p>
    </div>
  );
};

export const Route = new FileRoute('/bears/').createRoute({
  component: Index,
  errorComponent: () => <p>Ooops</p>,
});
