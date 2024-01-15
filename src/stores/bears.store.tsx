import { create, type StateCreator, type StoreApi, createStore } from "zustand";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { unstable_batchedUpdates } from "react-dom";
import { cn } from "@/utils";

export interface BearStore {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

export const bearsCreator: StateCreator<BearStore> = (set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
});

export const useBears = create<BearStore>(bearsCreator);

export const increasePopulation = () => {
  unstable_batchedUpdates(() => {
    useBears.getState().increasePopulation();
  });
};

export const createBearStore = () => {
  return createStore<BearStore>(bearsCreator);
};

export const BearStoreContext = createContext<StoreApi<BearStore>>(
  null as never
);

export type BearStoreProviderProps = PropsWithChildren;

export const BearStoreProvider = ({ children }: BearStoreProviderProps) => {
  const bearStoreRef = useRef(createBearStore());

  return (
    <BearStoreContext.Provider value={bearStoreRef.current}>
      {children}
    </BearStoreContext.Provider>
  );
};

export type UseBearStoreContextSelector<T> = (store: BearStore) => T;

export const useBearStoreContext = <T,>(
  selector: UseBearStoreContextSelector<T>
): T => {
  const bearStoreContext = useContext(BearStoreContext);

  if (bearStoreContext === undefined) {
    throw new Error(
      "useBearStoreContext must be used within BearStoreProvider"
    );
  }

  return useStoreWithEqualityFn(bearStoreContext, selector, shallow);
};

export const Bears: FC = () => {
  const { bears } = useBears();
  return bears;
};

export const IncreasePopulationButton: FC<
  ComponentPropsWithoutRef<"button">
> = ({ className, children, ...props }) => {
  const { increasePopulation } = useBears();
  return (
    <button
      className={cn("rounded-md bg-gray-500 p-2", className)}
      type="button"
      onClick={increasePopulation}
      {...props}>
      {children}
    </button>
  );
};
