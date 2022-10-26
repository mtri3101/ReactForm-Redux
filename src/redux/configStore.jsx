import {configureStore} from '@reduxjs/toolkit'
import FormReducer from './reducer/FormReducer'


export const store = configureStore({
    reducer: {
        FormReducer:FormReducer,
    }
    
})