import { fireEvent, render, screen } from "@testing-library/react";
import Button, { ThemeButton } from "shared/UI/Button/Button";
import Sidebar from "./Sidebar";
import { withTranslation } from "react-i18next";
import { renderWithTranslation } from "shared/lib/tests/renderWithTranslation/renderWithTranslation";

describe("sidebar", () => {
  test("test", () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });
  test("bar wrapping", () => {
    renderWithTranslation(<Sidebar />);
    const btn = screen.getByTestId("sidebar-btn");
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.getByTestId("sidebar")).toHaveClass("collapse");
  });
});
