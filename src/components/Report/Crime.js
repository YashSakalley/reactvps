import React from 'react'

export default function Crime({ changed, name }) {
    let onChangeHandler = (name) => {
        changed(name);
    }
    return (
        <p>
            <label>
                <input
                    name="crime"
                    type="radio"
                    onChange={() => onChangeHandler(name)}
                    required />
                <span>{name}</span>
            </label>
        </p>
    );
}
