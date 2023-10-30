import { render, screen } from "@testing-library/react";
import Navigation from "@/app/components/navigation";

describe("Navigation", () => {
  it("should have two Sign Up texts in navbar and sidebar", () => {
    render(<Navigation />);

    const navElem = screen.getAllByText("Sign Up");
    expect(navElem).toHaveLength(2);
  });

  it("should have Sign In text in navbar and sidebar", () => {
    render(<Navigation />);

    const navElem = screen.getAllByText("Sign In");
    expect(navElem).toHaveLength(2);
  });
});
