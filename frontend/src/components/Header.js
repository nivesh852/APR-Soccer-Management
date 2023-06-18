import { AppBar, Toolbar } from "@material-ui/core";
import { Box } from "@mui/system";
import './../css/header.css';

export default function Header() {
    return (
        <AppBar className='appBar'>
            <Toolbar className='toolbar' style={{
                height: "4em",
                flexShrink: 0,
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
                justifyContent: "space-evenly",
                fontWeight: "500"
            }}>
                <a href="./home" className="headerMenu"><Box>HOME</Box></a>
                <a href="./aboutus" className="headerMenu"><Box>ABOUT</Box></a>
                <a href="./teamregistration" className="headerMenu"><Box>APPLY</Box></a>
                <a href="./rulesandregulations" className="headerMenu"><Box>FAQs</Box></a>
                <a href="./schedule" className="headerMenu"><Box>TEAMS, SCHEDULES & SCORES</Box></a>
                <a href="./maps" className="headerMenu"><Box>MAPS</Box></a>
                <a href="./forms" className="headerMenu"><Box>FORMS</Box></a>
                <a href="./sponsors" className="headerMenu"><Box>SPONSORS</Box></a>
                <a href="./referee" className="headerMenu"><Box>REFEREE</Box></a>
                {/* <MenuRoundedIcon fontSize="large" sx={{ color: blue[50] }} style={{
                    cursor: 'pointer',
                    display: open ? 'none' : 'block',
                    zIndex: 10,
                }} onClick={() => setOpen(!open)} /> */}

                {/* <HamburgerMenu open={open} menuTop='8.6vh' setOpen={setOpen}></HamburgerMenu> */}

                {/* <CloseRoundedIcon fontSize="large" color="action" sx={{ color: blue[50] }} style={{
                    cursor: 'pointer',
                    display: open ? 'block' : 'none',
                    zIndex: 10
                }} onClick={() => setOpen(!open)} /> */}

                {/* <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: '#BF360C' }}>M</Avatar>
                </IconButton> */}

                {/* <MenuIcon open={open} setOpen={setOpen}></MenuIcon> */}

                {/* <Menu
                    anchorEl={anchorEl}
                    open={openRightMenu}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <Avatar /> Profile
                    </MenuItem>
                    <MenuItem>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu> */}
            </Toolbar>
        </AppBar>
    );
}