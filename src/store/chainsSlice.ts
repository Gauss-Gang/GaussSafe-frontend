import { type ChainInfo } from '@safe-global/safe-gateway-typescript-sdk'
import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '.'
import { makeLoadableSlice } from './common'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: ChainInfo[] = []

const { slice, selector } = makeLoadableSlice('chains', initialState)

export const chainsSlice = slice
export const selectChains = selector

export const selectChainById = createSelector(
  [selectChains, (_: RootState, chainId: string) => chainId],
  (chains, chainId) => {
    return chains.data.find((item: ChainInfo) => item.chainId === chainId)
  },
)

const { initialState: chainsInitialState } = makeLoadableSlice('chains', initialState);

const chainsWrapperSlice = createSlice({
  name: 'chainsWrapper',
  initialState: chainsInitialState,
  reducers: {
    addChain: (state, action: PayloadAction<{ pin: number; chain: any }>) => {
      const { pin, chain } = action.payload;
      if (state.data.length < pin) {
        state.data.push(chain);
      } else {
        console.error('Pin already exists');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chainsSlice.actions.set, (state, action) => {
      state.data = action.payload.data ?? chainsInitialState.data;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    });
  },
});

export { chainsWrapperSlice };
