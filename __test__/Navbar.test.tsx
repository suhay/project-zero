import { render, screen } from "@testing-library/react";
import Navbar from "@/src/components/Navigation/Navbar";
import React from "react";

// const resizeWindow = (width: number) => {
//   window.innerWidth = width;
//   window.dispatchEvent(new Event("resize"));
// };

describe("Navbar", () => {
  it.skip("should render navbar class name", () => {
    render(
      <Navbar hideNavbar={false} profileStatus={{ name: "username" } as any} />,
    );

    const navbarElem = screen.getByTestId("navbar");
    expect(navbarElem).toHaveClass("navbar");
  });

  // it.skip("navbar div element is visible in normal window size", () => {
  //   render(<Navbar hideNavbar={false} profileStatus={"username"} />);
  //   const divElement = screen.getByTestId("navbar");
  //   expect(divElement).toBeVisible();
  // });

  // it.skip("navbar div element is hidden in small window size", async () => {
  //   render(<Navbar hideNavbar={true} profileStatus={"username"} />);
  //   const navElement = screen.getByTestId("navbar");

  //   act(() => {
  //     resizeWindow(500);
  //   });

  //   expect(navElement).toHaveClass("hidden sm:block");
  // });
});
