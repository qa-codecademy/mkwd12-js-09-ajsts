import { Room } from "../types/room.interface";
import { SortDirection } from "../types/sort-direction.enum";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

// Interface that will represent the store object
export interface RoomsState {
  rooms: Room[];
  searchTerm: string;
  page: number;
  pageSize: number;
  total: number;
  isLoading: boolean;
  sortBy: string;
  sortDirection: SortDirection;
};

// This constant defines the initial or default state of the RoomsState 
const deafultState: RoomsState = {
  rooms: [],
  searchTerm: '',
  page: 0,
  pageSize: 10,
  total: 0,
  isLoading: false,
  sortBy: 'name',
  sortDirection: SortDirection.Asc,
};

// This is the main store that holds the state and methods for managing rooms.
// signalStore method creates the store with the provided configuration.
export const RoomsStore = signalStore(
  { providedIn: 'root' },

  // withState(defaultState): Initializes the store with the defaultState.
  withState(deafultState), // Specifies that this store is provided at the root level, making it available throughout the application.

  // withMethods: Adds methods to the store to allow updates to the state.
  withMethods((state) => ({
    setRooms: (rooms: Room[]) => {
      patchState(state, {rooms})
    },
    setSerchTerm: (searchTerm: string) => {
      patchState(state, {searchTerm, page: 0})
    },
    setPage: (page: number) => {
      patchState(state, { page })
    },
    setPageSize: (pageSize: number) => {
      patchState(state, { pageSize })
    },
    setTotal: (total: number) => {
      patchState(state, { total })
    },
    setSort: (sortBy: string) => {
      patchState(state, { sortBy })
    },
    setLoading: (isLoading: boolean) => {
      patchState(state, { isLoading })
    },
  }))
)



