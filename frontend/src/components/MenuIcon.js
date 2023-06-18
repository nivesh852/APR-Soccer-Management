import styled from 'styled-components';

const MenuIcon = ({ open, setOpen }) => {
    return (
        <StyledMenuIcon open={open} onClick={() => setOpen(!open)}>
            <div />
            <div />
            <div />
        </StyledMenuIcon>
    )
}

const StyledMenuIcon = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 10;

    width: 3rem;
    height: 1.4rem;
    background-color: transparent;
    cursor: pointer;
    border-width: 0;

    &:active {
        border-style: outset;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        /* transform: scale(1.1); */
    }

    div {
        width: 100%;
        height: 0.2em;
        background-color: ${({ open }) => open ? '#0D0C1D' : '#EFFFFA'};
        border-radius: 0.1em;
        transition: all 0.3s linear;

        :first-child {
            /* transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'}; */
        }

        :nth-child(2) {
            /* display: ${({ open }) => open ? 'none' : 'block'}; */
            /* opacity: ${({ open }) => open ? '0' : '1'}; */
            /* margin-left: ${({ open }) => open ? '1em' : '0'}; */
        }

        :nth-child(3) {
            /* transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'}; */
        }
    }
    `

export default MenuIcon;