import { useState, useEffect } from "react"; 
// Import React hooks: useState (for state) and useEffect (to run side effects when state changes).

const useLocalStorage = (key, defaultValue) => {
    // Custom hook takes:
    //   key → string name under which data will be stored in localStorage.
    //   defaultValue → value to use if nothing is found in localStorage.

    const [value, setValue] = useState(() => {
        // Initialize state by checking if the key exists in localStorage.
        let jsonValue = window.localStorage.getItem(key); 
        // Get the raw stored string (or null if key does not exist).

        return jsonValue !== null 
            ? JSON.parse(jsonValue)   // If key exists, parse JSON back into its original type.
            : defaultValue;           // If key doesn't exist, use the provided default value.
    });

    useEffect(() => { 
        // This effect runs every time "key" or "value" changes.

        if (value === null || value === undefined) {
            // If the state is null/undefined (e.g., user logged out),
            // remove the key completely from localStorage.
            window.localStorage.removeItem(key);
        } else {
            // Otherwise, save the value to localStorage,
            // converting it to a JSON string so it can be restored later.
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]); 
    // Dependency array → run the effect whenever "key" or "value" changes.

    return [value, setValue]; 
    // Return the state and its setter so components can read/update it
    // just like useState, but with automatic localStorage persistence.
};

export default useLocalStorage; 
// Export the hook so it can be used in other components (e.g., App.jsx).