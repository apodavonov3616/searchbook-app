import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

describe("header component", () => {
  test("header should navigate to search component when search is clicked", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);
    expect(global.window.location.pathname).toContain("/search");
  });

  test("header should navigate to wishlist component when wishlist is clicked", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const wishListButton = screen.getByText("Wishlist");
    fireEvent.click(wishListButton);
    expect(global.window.location.pathname).toContain("/wishlist");
  });
});