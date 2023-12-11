import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Menu, MenuItem } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE, NEWPASSWORD_PAGE } from '../config';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Wrapper: React.FC<Props> = ({ children, className }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <NavigationBar />
      <div className={`flex flex-col overflow-y-scroll pl-12 w-full h-full ${className}`}>
        <div className="text-end pt-6 pr-10 h-24">
          <IconButton
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <PersonIcon className="text-violet-700" fontSize="large" />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem className="text-violet-700" onClick={() => navigate(NEWPASSWORD_PAGE)}>
              <LockOutlinedIcon color="disabled" />
              Alterar Senha
            </MenuItem>
            <MenuItem onClick={() => navigate(LOGIN_PAGE)}>
              <LogoutOutlinedIcon color="error" />
              Sair
            </MenuItem>
          </Menu>
        </div>
        {children}
      </div>
    </div>
  );
};
