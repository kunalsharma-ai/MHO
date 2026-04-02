import { useState } from "react";

export default function useFRFSState(defaultValue) {
    const [state, setState] = useState(defaultValue);
    if (defaultValue instanceof Array)
        return {
            ...state,
            update: (newData) => {
                setState({ ...state, ...newData });
            },
        };
    return {
        value: state,
        update: setState
    }
}