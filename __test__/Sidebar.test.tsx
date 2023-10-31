import { fireEvent, render, screen } from "@testing-library/react";
import Sidebar from "@/app/components/navigation/sidebar/sidebar";

const setupIsShownAndToggle = (initialState = false) => {
  let isShown = initialState;
  const toggle = () => {
    isShown = !isShown;
  };
  return { isShown, toggle };
};

describe("Sidebar Component", () => {
  it("render sidebar menu correctly when shown", () => {
    render(<Sidebar isShown={true} toggle={() => {}} />);
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveClass("w-full opacity-100 transition-opacity top-0");
    expect(sidebar).toBeVisible();
  });

  it("toggles sidebar visibility when expand button is clicked", () => {
    const { isShown, toggle } = setupIsShownAndToggle();

    render(<Sidebar isShown={isShown} toggle={toggle} />);
    const button = screen.getByText("⪙");
    fireEvent.click(button);

    const sideBarMenuSignUp = screen.getByText("Sign Up");
    const sideBarMenuSignIn = screen.getByText("Sign In");
    expect(sideBarMenuSignUp).toBeInTheDocument();
    expect(sideBarMenuSignIn).toBeInTheDocument();
  });

  it("toggles sidebar visibility when close button is clicked", () => {
    let isShown = true;
    const toggle = () => {
      isShown = !isShown;
    };

    render(<Sidebar isShown={isShown} toggle={toggle} />);
    const closeButton = screen.getByText("✕");
    fireEvent.click(closeButton);

    expect(isShown).toBeFalsy();
  });

  it("sidebar section is invisible", () => {
    const { isShown, toggle } = setupIsShownAndToggle();

    render(<Sidebar isShown={isShown} toggle={toggle} />);

    const sidebarElem = screen.getByTestId("sidebar");
    expect(sidebarElem).toHaveClass("hidden");
  });

  it("sidebar section is visible", () => {
    const { isShown, toggle } = setupIsShownAndToggle(true);

    render(<Sidebar isShown={isShown} toggle={toggle} />);

    window.innerWidth = 600;
    fireEvent(window, new Event("resize"));

    const sidebarElem = screen.getByTestId("sidebar");
    expect(sidebarElem).toHaveClass(
      "w-full opacity-100 transition-opacity top-0",
    );
  });

  it("sidebar section is visible", () => {
    const { isShown, toggle } = setupIsShownAndToggle(true);

    render(<Sidebar isShown={isShown} toggle={toggle} />);

    window.innerWidth = 1200;
    fireEvent(window, new Event("resize"));

    const sidebarElem = screen.getByTestId("sidebar");
    expect(sidebarElem).toHaveClass(
      "w-full opacity-100 transition-opacity top-0",
    );
  });
});
