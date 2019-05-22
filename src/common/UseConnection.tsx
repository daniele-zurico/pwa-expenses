import React from 'react';

const useConnection = () => {
    const [isConnected, setConnection] = React.useState<boolean>(navigator.onLine);
    const updateOnlineStatus = () => {
        setConnection(navigator.onLine);
    }

    React.useEffect(() => {
        window.addEventListener('online',  updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        return () => {
            window.removeEventListener('online',  updateOnlineStatus);
            window.removeEventListener('offline',  updateOnlineStatus);
          };
    }, []);
    return isConnected;
}


export default useConnection;