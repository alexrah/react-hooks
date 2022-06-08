import * as React from 'react';

namespace locTypes {
    export type initVal<T> = T[] | ( () => T[] );
    export type serialize<U> = (val:initVal<U>) => string;
    export type unserialize<I> = (val:string) => initVal<I>;
}

function useLocalStorageGeneric<T>(
    keyName: string,
    initialState: locTypes.initVal<T> = [],
    serialize: locTypes.serialize<T> = JSON.stringify,
    unserialize: locTypes.unserialize<T> = JSON.parse
    ):[T[], React.Dispatch<React.SetStateAction<T[]>>]
    {
        // @ts-ignore
        const [state,setState]:[T[],React.Dispatch<React.SetStateAction<T[]>>] = React.useState(
            () => {
                const localStorageValue = localStorage.getItem(keyName);
                if(localStorageValue){
                    return unserialize(localStorageValue);
                }
                return typeof initialState === 'function' ? initialState() : initialState;
            }
        )

        React.useEffect(()=>{
            console.log('useLocalStorage useEffect',state);

            if(state.length > 0){
                window.localStorage.setItem( keyName, serialize(state) );
            } else {
                window.localStorage.removeItem(keyName);
            }

        },[state])

        return [state,setState];

}

export {useLocalStorageGeneric}