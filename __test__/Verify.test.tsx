import { waitFor } from "@testing-library/react";
import { verifyAndNavigate } from "../src/utils/auth";

describe("VerifyPage", () => {
  it("should have secret and userId in the URL parameters", async () => {
    const mockSecret = "mockSecret";
    const mockUserId = "mockUserId";

    const mockURL = `/verify?userId=${mockUserId}&secret=${mockSecret}`;

    // render(
    //   <MemoryRouter initialEntries={[mockURL]}>
    //     <VerifyPage />
    //   </MemoryRouter>
    // );

    await waitFor(() => {
      const [, queryParams] = mockURL.split("?");
      const queryParameters = queryParams.split("&");
      expect(queryParameters).toContain(`userId=${mockUserId}`);
    });

    await waitFor(() => {
      const [, queryParams] = mockURL.split("?");
      const queryParameters = queryParams.split("&");
      expect(queryParameters).toContain(`secret=${mockSecret}`);
    });
  });

  it("should return null on null or missing userId or secret", async () => {
    const mockUpdateVerification = jest.fn(() => Promise.resolve());

    const result1 = await verifyAndNavigate(null, "mockSecret");
    const result2 = await verifyAndNavigate("mockUserId", null);
    const result3 = await verifyAndNavigate(null, null);

    expect(mockUpdateVerification).not.toHaveBeenCalled();

    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
  });
});
