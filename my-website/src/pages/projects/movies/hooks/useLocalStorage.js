import { useEffect, useState } from "react";

export default (key, initialValue = 0) => {
    // State to store the value
    const [value, setValue] = useState(() => {
        // Retrieve the value from LocalStorage if it exists
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    // Update LocalStorage when the value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // Function to update the value

    const updateValue = (newValue) => {
        setValue((prev) => prev + newValue);
    };
    // Function to clear the value from LocalStorage
    const clearValue = () => {
        localStorage.removeItem(key);
        setValue(initialValue);
    };

    return [value, updateValue, clearValue];
};
