import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Bears, IncreasePopulationButton } from "./bears.store";

const renderBear = () => {
  return render(
    <>
      <Bears />
      <IncreasePopulationButton>
        <span>one up</span>
      </IncreasePopulationButton>
    </>
  );
};

describe("Bears", () => {
  test("should render with initial state of 0", async () => {
    renderBear();

    expect(await screen.findByText(/^0$/)).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /one up/i })
    ).toBeInTheDocument();
  });

  test("should increase bears by clicking a button", async () => {
    const user = userEvent.setup();

    renderBear();

    expect(await screen.findByText(/^0$/)).toBeInTheDocument();

    await act(async () => {
      await user.click(await screen.findByRole("button", { name: /one up/i }));
    });

    expect(await screen.findByText(/^1$/)).toBeInTheDocument();
  });
});
