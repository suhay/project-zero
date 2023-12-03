import SignUp from "@/app/signup/page";
import { account } from "@/src/utils/appwrite";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("SignUp", () => {
  it("should have Sign Up text", () => {
    render(<SignUp />);

    const myElem = screen.getByText("Welcome to ZeroIn!");
    expect(myElem).toBeInTheDocument();
  });

  it("should render sign up form", () => {
    render(<SignUp />);

    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("should handle form submission", async () => {
    render(<SignUp />);

    fireEvent.change(screen.getByTestId("username"), {
      target: { value: "test_username" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "test_password1" },
    });
    fireEvent.change(screen.getByTestId("confirmPassword"), {
      target: { value: "test_password1" },
    });

    const userSignUpMock = jest.fn();
    userSignUpMock.mockResolvedValue({ response: "User created" });

    jest.spyOn(account, "create").mockImplementation(userSignUpMock);
    jest.spyOn(account, "createEmailSession").mockImplementation(jest.fn());
    jest.spyOn(account, "createVerification").mockImplementation(jest.fn());

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByText("Sign up"));
    });

    expect(userSignUpMock).toHaveBeenCalledWith(
      expect.any(String),
      "test@test.com",
      "test_password1",
      "test_username",
    );
  });

  it("should direct to verify page", async () => {
    render(
      <MemoryRouter initialEntries={["/verify"]}>
        <SignUp />
      </MemoryRouter>,
    );

    const verifyEmailButton = screen.getByText("Sign up");
    fireEvent.click(verifyEmailButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
