
import React, {createContext, useRef} from 'react';

export const btCtx = createContext('');

export const btProvider = ({children}) => {
    const bookingFormRef = useRef(null);

    return(
        <btCtx.Provider value={bookingFormRef}>
            {children}
        </btCtx.Provider>
    );
};
