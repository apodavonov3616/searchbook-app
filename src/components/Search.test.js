import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Search from "./Search";
import { Provider } from "react-redux";
import { createMockStore } from './FakeStore.js';

//user story
//accessibility

fetch = jest.fn(); //dummy function
describe("search component", () => {
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
                                    },
                                    {
                                        id: 2,
                                        volumeInfo: {
                                            title: "",
                                            authors: "",
                                            publisher: "",
                                            publishedDate: "",
                                            description: "",
                                            imageLinks: { thumbnail: "" },
                                        },
                                    },
                                ],
                                totalItems: 2,
                                kind: "",
                            });
                        }),
                })
            );
        });
    });
    test("search input should respond to user key press", () => {
        //mock store

        render(
            <Provider store={createMockStore()}>
                <Search />
            </Provider>
        );
        const inputEl = screen.getByRole("textbox");
        expect(inputEl).toBeInTheDocument();
        fireEvent.change(inputEl, { target: { value: "ab" } });
        expect(inputEl).toHaveValue("ab");
    });

    test("search result should show up after type some keyword, and clicking the submit button ", async () => {
        render(
            <Provider store={createMockStore()}>
                <Search />
            </Provider>
        );
        let liEls;
        const placeHolderEl = screen.getByText("Nothing here");
        expect(placeHolderEl).toBeInTheDocument();
        const inputEl = screen.getByRole("textbox");
        expect(fetch).toHaveBeenCalledTimes(0);
        fireEvent.change(inputEl, { target: { value: "ab" } });
        expect(inputEl).toHaveValue("ab");
        
        liEls = screen.queryAllByRole("listitem");
        expect(liEls).toHaveLength(0);

        const submitBtnEl = screen.getByText("Submit");
        fireEvent.click(submitBtnEl);
        liEls = await screen.findAllByRole("listitem"); //what makes code async, promise, async await, settimeout
        expect(liEls).toHaveLength(2);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("loader should show up when the data is loading after clicking submit button", async () => {
        render(
            <Provider store={createMockStore()}>
                <Search />
            </Provider>
        );
        let loaderEl = screen.queryByTestId("loader");
        expect(loaderEl).not.toBeInTheDocument();
        const inputEl = screen.getByRole("textbox");
        fireEvent.change(inputEl, { target: { value: "ab" } });
        const submitBtnEl = screen.getByText("Submit");
        fireEvent.click(submitBtnEl);
        loaderEl = screen.queryByTestId("loader");
        expect(loaderEl).toBeInTheDocument();
        //wait the request to be fulfilled, get the loader element again
        await waitFor(() => {
            const loader = screen.queryByTestId("loader");
            expect(loader).not.toBeInTheDocument();
        });
    });
});
