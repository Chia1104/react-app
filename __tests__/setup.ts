import { cleanup, act } from "@testing-library/react";
import * as matchers from "vitest-dom/matchers";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import * as zustand from "zustand";
import "@testing-library/jest-dom";

expect.extend(matchers);

export const handlers = [
  http.get("/test/v1/me", () => {
    return HttpResponse.json({
      createTime: "2022-04-06T04:08:09+00:00",
      email: "foo@bar.com",
      id: "95fed9d7-2d9f-4c79-9617-4012708e09e0",
      updateTime: "2022-05-06T10:33:51+00:00",
    });
  }),
];
export const server = setupServer(...handlers);

const { create: actualCreate, createStore: actualCreateStore } =
  await vi.importActual<typeof zustand>("zustand");

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
  console.log("zustand create mock");

  // to support curried version of create
  return typeof stateCreator === "function"
    ? createUncurried(stateCreator)
    : createUncurried;
}) as typeof zustand.create;

const createStoreUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
  console.log("zustand createStore mock");

  // to support curried version of createStore
  return typeof stateCreator === "function"
    ? createStoreUncurried(stateCreator)
    : createStoreUncurried;
}) as typeof zustand.createStore;

// Enable the API mocking before tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
  cleanup();
});
// Disable the API mocking after the tests finished.
afterAll(() => server.close());
