import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useBears, IncreasePopulationButton } from "@/stores/bears.store";

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
  const { bears } = useBears();
  return (
    <div className="container mx-auto flex w-full flex-col justify-center gap-5 p-2">
      <h3 className="text-3xl">Welcome Home!</h3>
      {!!data &&
        data.abilities.map((ability) => (
          <div key={ability.ability.name}>{ability.ability.name}</div>
        ))}
      <IncreasePopulationButton>Increase Population</IncreasePopulationButton>
      {bears > 0 && <Link to="/bears">Go to bears</Link>}
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
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
    }),
  beforeLoad: async ({ location, context }) => {
    const me = await context.queryClient.ensureQueryData({
      queryKey: ["me"],
      queryFn: () => {
        return {
          name: "Bob",
          email: "bob@example.com",
        };
      },
    });
    if (!me) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
    return null;
  },
});
