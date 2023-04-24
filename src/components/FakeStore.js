import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../redux/slices/searchSlice";
import wishlistSlice from "../redux/slices/wishlistSlice";

export const createMockStore = (
    preloadedState = {
        searchSlice: {
            keyword: "",
            isLoading: false,
            list: [],
            totalPages: 1,
            currentPage: 1,
            itemsPerPage: 10,
        },
        wishlistSlice: { list: [
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
        ] },
    }
) => {
    return configureStore({
        reducer: {
            searchSlice,
            wishlistSlice,
        },
        preloadedState,
    });
};