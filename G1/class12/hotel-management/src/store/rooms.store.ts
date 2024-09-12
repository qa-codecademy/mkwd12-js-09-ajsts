import { state } from "@angular/animations";
import { Room } from "../types/room.interface";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'
import { computed } from "@angular/core";
import { SearchRoomQuery } from "../types/search-room-query.interface";

export interface RoomsState {
    rooms: Room[];
    searchTerm: string;
    page: number;
    pageSize: number;
    total: number;
    isLoading: boolean;
};

const defaultState: RoomsState = {
    rooms: [],
    searchTerm: '',
    page: 0,
    pageSize: 10,
    total: 0,
    isLoading: false,
};

export const RoomsStore = signalStore(
    { providedIn: 'root'},
    withState(defaultState),
    withMethods((state) => ({
        setRooms: (rooms: Room[]) => {
            patchState(state, { rooms })
        },
        setSearchTerm: (searchTerm: string) => {
            patchState(state, { searchTerm, page: 0 })
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
        setLoading: (isLoading: boolean) => {
            patchState(state, { isLoading })
        },
        resetSearchQueryParams: () => {
            patchState(state, {
                page: 0,
                pageSize: 10,
                searchTerm: ''
            })
        }

    })),
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
            state.resetSearchQueryParams();
        }
    })
)