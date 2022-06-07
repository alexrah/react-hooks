import * as React from 'react';

export default function useLocalStorageString(keyName:string, initialState:string = ''):[string, React.Dispatch<React.SetStateAction<string>>]{

    const [state,setState] = React.useState(
        () => {
            return window.localStorage.getItem(keyName)??initialState
        }
    )

    React.useEffect(()=>{
        console.log('useLocalStorage useEffect')

        if(state){
            window.localStorage.setItem(keyName,state);
        } else if(window.localStorage.getItem(keyName)){
            window.localStorage.removeItem(keyName);
        }

    },[state])

    return [state,setState];

}