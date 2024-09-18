import { Room } from "../types/room.interface";
import { SortDirection } from "../types/sort-direction.enum";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'
import { computed } from "@angular/core";
import { SearchRoomQuery } from "../types/search-room-query.interface";

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
    setSearchTerm: (searchTerm: string) => {
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
    resetSerchQueryParams: () => {
      patchState(state, {
        page: 0,
        pageSize: 10,
        searchTerm: '',
        sortBy: 'name',
        sortDirection: SortDirection.Asc
      })
    }
  })),

  // withComputed: Adds derived state or computed properties to the store.
  // It allows you to define properties that depend on the existing state values. 
  // Whenever these state values change, the computed property will automatically update to reflect the new values.
  // In our case, whenever searchTerm is changed, the searchParams gets new value
  withComputed((state) => ({
    searchParams: computed(() => {
      const searchParams: SearchRoomQuery = {
        page: state.page(),
        pageSize: state.pageSize()
      };
      if (state.searchTerm()) {
        searchParams.searchTerm = state.searchTerm();
      }
      return searchParams;
    })
  })),

  withHooks({
    onInit: (state) => {
      state.resetSerchQueryParams();
    }
  })
)



