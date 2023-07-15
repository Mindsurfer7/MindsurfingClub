import { render, screen } from "@testing-library/react";
import Button, { ButtonTheme } from "shared/UI/Button/Button";

describe("button", () => {
  test("test", () => {
    render(<Button>reality check</Button>);
    expect(screen.getByText("reality check")).toBeInTheDocument();
  });

  test("addin theme", () => {
    render(<Button theme={ButtonTheme.UNCLEAR}>reality check</Button>);
    expect(screen.getByText("reality check")).toHaveClass("unclear");
    screen.debug();
  });
});
