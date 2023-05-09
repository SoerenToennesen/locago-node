import React, {} from "react";


export function SearchField (props: any) {
    const {placeholder, searchValue, setSearch} = props;
    return (
        <input
            style={{color: "#4C5C60", maxWidth: "300px", borderRadius: "3px", borderBottom: "solid #385A5E 2px"}}
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => {
                setSearch(e.currentTarget.value)
            }}
        />
    )
}