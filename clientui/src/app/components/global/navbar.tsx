import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/state/stores/store";
import { Link, Outlet, useNavigate } from "react-router-dom";

const pages = [{label: 'Users', url: '/'}, {label: 'Roles', url: '/roles'}, {label: 'Help', url: '/help'}]
const settings = ['Logout']

export default observer(function Navbar() {
    const navigate = useNavigate()

    const {accountStore: {isLoggedIn, user, logout}} = useStore()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
      <>
        <AppBar position='static' style={{ maxHeight: '10vh' }}>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1}} />
              <Typography
                  sx={{
                      mr: 5,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.1rem',
                      color: 'inherit',
                      textDecoration: 'none',
                      fontSize: '24px'
                  }}
              >
                  User-Dashboard
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link to={page.url} style={{ color: 'white', textDecoration: 'none'}}>
                          {page.label}
                        </Link>
                        </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                User-Dashboard
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.label}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link to={page.url} style={{ color: 'white', textDecoration: 'none'}}>
                      {page.label}
                    </Link>
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                {isLoggedIn ? (
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                    <Typography fontWeight='bold'>
                      {user?.email}
                    </Typography>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={() => {
                          handleCloseUserMenu()
                          logout(navigate)
                        }}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Stack direction='row'>
                    <Button 
                      color='secondary' 
                      sx={{ my: 2, color: 'white', display: 'block', fontSize: '16px' }}
                    >
                      <Link to='/login' style={{ color: 'white', textDecoration: 'none' }}>
                        Login
                      </Link>
                    </Button>
                    <Button 
                      color='secondary' 
                      sx={{ my: 2, color: 'white', display: 'block', fontSize: '16px' }}
                    >
                      <Link to='/register' style={{ color: 'white', textDecoration: 'none' }}>
                        Register
                      </Link>
                    </Button>
                  </Stack>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        
        <Outlet />
      </>
    )
})