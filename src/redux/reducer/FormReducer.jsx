import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  arrSV: [{ maSV: '1', hoTen: 'abc', soDienThoai: '0123456778', email: 'aczxc@gmail.com' }]
}

// JSON.parse(localStorage.getItem('SV')) || [],

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'THEM_SV': {
      state.arrSV.push(payload);
      state.arrSV = [...state.arrSV];
      return { ...state }
    }
    case 'XOA_SV': {
      state.arrSV = state.arrSV.filter((SV) => SV.maSV !== payload);
      return { ...state }
    }
    case 'SUA_SV': {
      state.arrSV = state.arrSV.map((SV, i) => SV.maSV === payload.maSV ? {
        ...SV,
        hoTen: payload.hoTen,
        soDienThoai: payload.soDienThoai,
        email: payload.email
      }
      :SV
      )
      return {...state}
    };
    default:
      return state
  }
}
