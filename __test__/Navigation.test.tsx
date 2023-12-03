import { render, screen } from "@testing-library/react";
import Navigation from "@/src/components/Navigation";
// import Sidebar from "@/src/components/Navigation/sidebar";
// import Navbar from "@/src/components/Navigation/navbar";

describe("Navigation", () => {
  it("should have two Sign Up texts in navbar and sidebar", () => {
    render(<Navigation />);

    const navElem = screen.getAllByText("Sign Up");
    expect(navElem).toHaveLength(2);
  });
});
//   it("should have Sign In text in navbar and sidebar", () => {
//     render(<Navigation />);

//     const navElem = screen.getAllByText("Sign In");
//     expect(navElem).toHaveLength(2);
//   });
// });

// const setupIsShownAndToggle = (initialState = false) => {
//   let isShown = initialState;
//   const toggle = () => {
//     isShown = !isShown;
//   };
//   return { isShown, toggle };
// };

// describe("Navbar and Sidebar interaction testing", () => {
//   it("should show Navbar when sidebar is hidden (large window)", async () => {
//     const { isShown, toggle } = setupIsShownAndToggle(false);
//     render(
//       <>
//         <Sidebar isShown={isShown} toggle={toggle} />
//         <Navbar />
//       </>,
//     );

//     const sidebar = screen.getByTestId("sidebar");
//     expect(sidebar).toHaveClass("hidden");

//     const navbar = screen.getByTestId("navbar");
//     const computedStyles = getComputedStyle(navbar);
//     const display = computedStyles.getPropertyValue("display");
//     expect(display).toBe("block");
//   });

//   it("should hide Navbar when sidebar window is resized < 640 (small window)", () => {
//     const { isShown, toggle } = setupIsShownAndToggle(true);

//     render(
//       <>
//         <Sidebar isShown={isShown} toggle={toggle} />
//         <Navbar />
//       </>,
//     );

//     window.innerWidth = 600;
//     fireEvent(window, new Event("resize"));

//     const sidebarElem = screen.getByTestId("sidebar");
//     expect(sidebarElem).toHaveClass(
//       "w-full opacity-100 transition-opacity top-0",
//     );

//     const navbar = screen.getByTestId("navbar");
//     const computedStyles = getComputedStyle(navbar);
//     const display = computedStyles.getPropertyValue("display");
//     expect(display).toBe("block");
//   });
// });
