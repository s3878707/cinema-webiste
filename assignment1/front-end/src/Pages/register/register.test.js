import { getUsers } from "../../Repository/user";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";
import { isValidPassword } from "./Register";
import { MemoryRouter } from "react-router-dom";
let users;
let container;

beforeAll(() => {
  users = getUsers();
});

beforeEach(() => {
  const util = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
  container = util.container;
});

//check if register render in DOM
test("Render register", () => {
  expect(container).toBeInTheDocument();
});

test("Password input meets the specified requirements", () => {
  const passwordInput = screen.getByLabelText("Password");

  // Simulate input with a valid password
  fireEvent.change(passwordInput, { target: { value: "Strong@123" } });

  // Expect the password input value to be what you set
  expect(passwordInput.value).toBe("Strong@123");

  // Expect the password to meet the specified requirements
  expect(isValidPassword(passwordInput.value)).toBe(true);
});
