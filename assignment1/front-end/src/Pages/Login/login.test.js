import { getUsers } from "../../Repository/user";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

let users;
let container;

beforeAll(() => {
  users = getUsers();
});
beforeEach(() => {
  const util = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  container = util.container;
});

//check if register render in DOM
test("Render login", () => {
  expect(container).toBeInTheDocument();
});
