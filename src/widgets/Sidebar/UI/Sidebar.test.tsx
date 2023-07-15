import { fireEvent, render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { withTranslation } from "react-i18next";
import { ComponentRender } from "../../../../config/tests/ComponentRender/ComponentRender";
import { renderWithTranslation } from "shared/lib/tests/renderWithTranslation/renderWithTranslation";

describe("sidebar", () => {
  test("test", () => {
    ComponentRender(<Sidebar />);
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
