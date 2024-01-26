// a react functional component that renders a text input field with a label

import React from 'react';

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
}
export default function ValidatedTextInput({label, value, onChange}: Props) {
    return (
        <div className="flex flex-col">
            <label htmlFor="numberInput">{label}</label>
            <input
                type="text"
                id="numberInput"
                className="border rounded-md p-2"
                placeholder="Enter a description"
                value={value}
                onChange={(event) => {
                    onChange(event.target.value || "")
                }}
            />
        </div>
    )
}