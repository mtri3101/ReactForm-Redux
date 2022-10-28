import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  arrSV: JSON.parse(localStorage.getItem('data')) || []
}



export default (state = initialState, { type, payload }) => {
  let data = [...state.arrSV];
  switch (type) {
    case 'THEM_SV': {
      data.push(payload);
      localStorage.setItem('data', JSON.stringify(data))
      console.log(data);
      return{
        ...state, arrSV:data,
      }
    }
    case 'XOA_SV': {
      data = data.filter((SV) => SV.maSV !== payload);
      let updateList = JSON.stringify(data)
      localStorage.setItem('data',updateList)
      return { ...state, arrSV:data }
    }
    case 'SUA_SV': {
      data = data.map((SV,i) => SV.maSV === payload.maSV ? {
        ...SV,
        hoTen: payload.hoTen,
        soDienThoai: payload.soDienThoai,
        email: payload.email
      }
      :SV
      )
      return {...state,arrSV:data}
    } case 'FIND_SV': {
      data = data.filter((SV)=> SV.hoTen.toLowerCase().includes(payload))
      return { ...state, arrSV:data }
    }
    default:
      return state
  }
}
