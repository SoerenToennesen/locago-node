import styled from "styled-components";

export const LightButton = styled.button`
    line-height: 1.3em;
    padding: 5px 30px;
    font-size: 0.8em;
    font-weight: bold;
    cursor: pointer;
    background: var(--sidebar);
    border-radius: 25px;
    border-width: 0px;
    color: var(--text-white);
    &:hover {
        background-color: var(--sidebar-accent);
    }
`