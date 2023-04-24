import WishList from './Wishlist.js';
import { createMockStore } from './FakeStore.js';
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";


fetch = jest.fn();
describe("wishlist component", () => {
    beforeEach(() => {
        fetch.mockImplementation(() => {
            return new Promise((res, rej) =>
                res({
                    json: () =>
                        new Promise((res, rej) => {
                            res({
                                items: [
                                    {
                                        id: 1,
                                        volumeInfo: {
                                            title: "",
                                            authors: "",
                                            publisher: "",
                                            publishedDate: "",
                                            description: "",
                                            imageLinks: { thumbnail: "" },
                                        },
                                    }
                                ],
                                totalItems: 1,
                                kind: "",
                            });
                        }),
                })
            );
        });
    });
    test("wishlist should remove book from list on button press", () => {
        render(
            <Provider store={createMockStore()}>
                <WishList/>
            </Provider>
        )
        let partOneEl = screen.queryByText("Nothing here");
        expect(partOneEl).not.toBeInTheDocument();
        const partTwoEls = screen.getAllByRole("listitem");
        partTwoEls.forEach((a) => fireEvent.click(a));
        partOneEl = screen.queryByText("Nothing here");
        expect(partOneEl).toBeInTheDocument();
    })
})