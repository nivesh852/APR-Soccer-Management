import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: #FFFFFF;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    height: 41em;
    text-align: left;
    width: 25vw;
    border-top-right-radius: 0.25em;
    border-bottom-right-radius: 0.25em;
    box-shadow: 0px 0px 10px black;
    /* padding: 2rem; */
    position: absolute;
    top: ${props => props.menuTop};
    left: 0;
    transition: transform 0.3s ease-in-out;

    @media (max-width: 576px) {
        width: 100%;
    }

    div {
        font-size: 1rem;
        text-transform: uppercase;
        /* padding: 2rem 0; */
        font-weight: bold;
        letter-spacing: 0.5rem;
        color: #0D0C1D;
        text-decoration: none;
        transition: color 0.3s linear;

        @media (max-width: 576px) {
            font-size: 1.5rem;
            text-align: center;
        }

        &:hover {
            color: #343078;
        }
        
        &.closeBtn {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            margin-top: 0.25rem;
            margin-right: 0.25rem;
            margin-bottom: 0.5rem
        }
    
        &.menuContent {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: start;
            margin-top: 0.5rem;
            padding: 1em
    
        }
        .menuContentInnerBlock {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-top: 2rem;
        }
        .menuContentText {
            margin-left: 1em;
        }
    }
`

const HamburgerMenu = ({ open, menuTop }) => {
    return (
        <StyledMenu open={open} menuTop={menuTop}>
            {/* <div className="closeBtn">
                <CloseRoundedIcon fontSize="large" color="action" style={{
                    cursor: 'pointer',
                    display: open ? 'block' : 'none',
                    zIndex: 10
                }} />
            </div> */}
            <div className="menuContent">
                <div className="menuContentInnerBlock">
                    <div>💁🏻‍♂️</div>
                    <div className='menuContentText'>TEAMS</div>
                </div>
                <div className="menuContentInnerBlock">
                    <div>💸</div>
                    <div className='menuContentText'>ENROLMENT FEES</div>
                </div>
                {/* <div className="menuContentInnerBlock">
                    <div>📩</div>
                    <div>Contact</div>
                </div> */}
            </div>
            {/* <a href="/">
                <span role="img" aria-label="about us">💁🏻‍♂️</span>
                About us
            </a>
            <a href="/">
                <span role="img" aria-label="price">💸</span>
                Pricing
            </a>
            <a href="/">
                <span role="img" aria-label="contact">📩</span>
                Contact
            </a> */}
        </StyledMenu>
    )
}

export default HamburgerMenu;