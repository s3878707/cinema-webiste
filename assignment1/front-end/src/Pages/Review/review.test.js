import { getUsers } from "../../Repository/user";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Review from "./Review";
import { MemoryRouter } from "react-router-dom";

let users;
let container;

beforeAll(() => {
  users = getUsers();
});
beforeEach(() => {
    const util = render(
      <MemoryRouter>
        <Review />
      </MemoryRouter>
    );
    container = util.container;
  });

//check if register render in DOM
test("Check the riview working as expected when logged in", async () => {
  expect(screen.queryByText("You review as")).toBeInTheDocument();
});
