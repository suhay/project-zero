import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

jest.mock("../src/components/Community/Feed", () => ({
  Feed: () => <></>,
}));

describe("Home", () => {
  it("should render the Home page", () => {
    render(<Home />);

    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();
  });
});
