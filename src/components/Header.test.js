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

    const searchLinkEl = screen.getByText("Search");
    fireEvent.click(searchLinkEl);
    expect(global.window.location.pathname).toContain("/search");
  });

  test("header should navigate to search component when search is clicked", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const wishlistLinkEl = screen.getByText("Wishlist");
    fireEvent.click(wishlistLinkEl);
    expect(global.window.location.pathname).toContain("/wishlist");
  });
});