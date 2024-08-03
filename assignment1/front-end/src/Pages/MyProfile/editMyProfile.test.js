import { getUsers, getUser } from "../../Repository/user";
import { render, screen, fireEvent } from "@testing-library/react";
import EditMyProfile from "./EditMyProfile";
import {MemoryRouter} from "react-router-dom";
jest.mock("../../Repository/user"); 
let users;
let container;

beforeAll(() => {
    users = getUsers();
  });
  
  beforeEach(() => {
    // Mock getUser to return user data
    getUser.mockReturnValue({
      username: "testuser",
      email: "testuser@example.com",
      password: "testpassword",
      date: "2023-10-17",
    });
  
    const util = render(
      <MemoryRouter>
        <EditMyProfile />
      </MemoryRouter>
    );
    container = util.container;
  });
 
  test("Render myprofile", () => {
    expect(container).toBeInTheDocument();
  });

  