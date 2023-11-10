import { act, render, screen } from "@testing-library/react";
import Navbar from "@/src/components/navigation/navbar";
import React from "react";

const resizeWindow = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event("resize"));
};

describe("Navbar", () => {
  it("should render navbar class name", () => {
    render(<Navbar hideNavbar={false} />);

    const navbarElem = screen.getByTestId("navbar");
    expect(navbarElem).toHaveClass("navbar");
  });

  it("navbar div element is visible in normal window size", () => {
    render(<Navbar hideNavbar={false} />);
    const divElement = screen.getByTestId("navbar");
    expect(divElement).toBeVisible();
  });

  it("navbar div element is hidden in small window size", async () => {
    render(<Navbar hideNavbar={true} />);
    const navElement = screen.getByTestId("navbar");

    act(() => {
      resizeWindow(500);
    });

    expect(navElement).toHaveClass("hidden sm:block");
  });
});
