import { act, fireEvent, screen } from "@testing-library/react";
import renderWithProviders from "../../testUtil";
import LoginForm from "./LoginForm";
import userEvent from "@testing-library/user-event";
import { UserCredentials } from "../../hooks/useUser/types";
import { ThemeProvider } from "styled-components";
import theme from "../../styles/Theme";

const mockLoginUser = jest.fn();

jest.mock("../../hooks/useUser/useUser", () => () => ({
  loginUser: mockLoginUser,
}));

describe("Given a LoginForm component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a label with the text 'Password'", () => {
      const labelText = "Password";

      renderWithProviders(
        <ThemeProvider theme={theme}>
          <LoginForm />
        </ThemeProvider>
      );

      const expectedLabel = screen.getByLabelText(labelText);

      expect(expectedLabel).toBeInTheDocument();
    });

    test("Then it should show a button with the text 'Log in'", () => {
      const buttonText = "Log in";

      renderWithProviders(
        <ThemeProvider theme={theme}>
          <LoginForm />
        </ThemeProvider>
      );

      const expectedButton = screen.getByRole("button", {
        name: buttonText,
      });

      expect(expectedButton).toBeInTheDocument();
    });

    test("Then it should show a label with the text 'Email'", () => {
      const labelText = "Email";

      renderWithProviders(
        <ThemeProvider theme={theme}>
          <LoginForm />
        </ThemeProvider>
      );

      const expectedLabel = screen.getByLabelText(labelText);

      expect(expectedLabel).toBeInTheDocument();
    });
  });

  describe("When the user writes in the email input", () => {
    test("Then it changes the value of this input", async () => {
      const emailLabel = "Email";
      const emailText = "jordi@gmail.com";

      renderWithProviders(
        <ThemeProvider theme={theme}>
          <LoginForm />
        </ThemeProvider>
      );

      const emailInput = screen.getByLabelText(emailLabel);

      await act(async () => await userEvent.type(emailInput, emailText));

      expect(emailInput).toHaveValue(emailText);
    });
  });

  describe("When the user wirtes in the password input", () => {
    test("Then it changes the value of this input", async () => {
      const passwordLabel = "Password";
      const passwordText = "12345678";

      renderWithProviders(
        <ThemeProvider theme={theme}>
          <LoginForm />
        </ThemeProvider>
      );

      const passwordInput = screen.getByLabelText(passwordLabel);

      await act(async () => await userEvent.type(passwordInput, passwordText));

      expect(passwordInput).toHaveValue(passwordText);
    });
  });

  describe("When the user submits the form", () => {
    test("The loginUser function should be called", async () => {
      const emailText = "abc@email.com";
      const passwordText = "Introduce your password";
      const mockUser: UserCredentials = {
        email: "",
        password: "",
      };

      renderWithProviders(
        <ThemeProvider theme={theme}>
          <LoginForm />
        </ThemeProvider>
      );

      const emailInput = screen.getByPlaceholderText(emailText);
      const passwordInput = screen.getByPlaceholderText(passwordText);
      const submitButton = screen.getByRole("button");

      fireEvent.change(emailInput, mockUser.email);
      fireEvent.change(passwordInput, mockUser.password);
      fireEvent.click(submitButton);

      expect(mockLoginUser).toHaveBeenCalledWith(mockUser);
    });
  });
});
