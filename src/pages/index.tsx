import { FileRoute, Link } from "@tanstack/react-router";
import { useBears } from "@/stores/bears.store";

type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
};

const Index = () => {
  const data = Route.useLoaderData();
  const increasePopulation = useBears((state) => state.increasePopulation);
  const bears = useBears((state) => state.bears);
  return (
    <div className="container mx-auto flex w-full flex-col justify-center gap-5 p-2">
      <h3 className="text-3xl">Welcome Home!</h3>
      {!!data &&
        data.abilities.map((ability) => (
          <div key={ability.ability.name}>{ability.ability.name}</div>
        ))}
      <button
        className="rounded-md bg-gray-500 p-2"
        type="button"
        onClick={increasePopulation}>
        Increase Population
      </button>
      {bears > 0 && <Link to="/bears">Go to bears</Link>}
    </div>
  );
};

export const Route = new FileRoute('/').createRoute({
  component: Index,
  errorComponent: () => <p>Ooops</p>,
  loader: async ({ context }) => {
    try {
      return await context.queryClient.ensureQueryData({
        queryKey: ["pokemon"],
        queryFn: () => {
          return {
            abilities: [
              {
                ability: {
                  name: "limber",
                  url: "https://pokeapi.co/api/v2/ability/7/",
                },
                is_hidden: false,
                slot: 1,
              },
              {
                ability: {
                  name: "imposter",
                  url: "https://pokeapi.co/api/v2/ability/150/",
                },
                is_hidden: true,
                slot: 3,
              },
            ],
          } satisfies Pokemon;
        },
      });
    } catch (error) {}
  },
});
