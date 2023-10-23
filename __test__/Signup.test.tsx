import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUp from "@/app/signup/page";
import { MemoryRouter } from "react-router-dom";
import { account } from "@/app/utils/appwrite";
import React from "react";

describe("SignUp", () => {
  it("should have Sign up text", () => {
    render(<SignUp />);
    const myElem = screen.getByText("Sign up");
    expect(myElem).toBeInTheDocument();
  });

  it("should render sign up form", () => {
    const { getByTestId, getByText } = render(<SignUp />);

    expect(getByTestId("username")).toBeInTheDocument();
    expect(getByTestId("email")).toBeInTheDocument();
    expect(getByTestId("password")).toBeInTheDocument();
    expect(getByText("Verify Email")).toBeInTheDocument();
  });

  it("should handle form submission", async () => {
    const { getByTestId, getByText } = render(<SignUp />);
    fireEvent.change(getByTestId("username"), {
      target: { value: "test_username" },
    });
    fireEvent.change(getByTestId("email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(getByTestId("password"), {
      target: { value: "test_password" },
    });

    const userSignUpMock = jest.fn();
    userSignUpMock.mockResolvedValue({ response: "User created" });

    jest.spyOn(account, "create").mockImplementation(userSignUpMock);
    fireEvent.click(getByText("Verify Email"));

    expect(userSignUpMock).toHaveBeenCalledWith(
      expect.any(String),
      "test@test.com",
      "test_password",
      "test_username"
    );
  });

  it("should direct to verify page", async () => {
    render(
      <MemoryRouter initialEntries={["/verify"]}>
        <SignUp />
      </MemoryRouter>
    );

    const verifyEmailButton = screen.getByText("Verify Email");
    fireEvent.click(verifyEmailButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
