/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import logo from '../assets/logoGPSSis.png';
import { Button, Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TsunamiOutlinedIcon from '@mui/icons-material/TsunamiOutlined';
import { useNavigate } from 'react-router-dom';
import { HOLIDAYS_PAGE, MENU_PAGE, PAYMENT_PAGE, POINT_PAGE } from '../config';

const NavigationBar: React.FC = () => {
  const [page, setPage] = useState<string | null>('');

  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    localStorage.setItem('page', route);
    navigate(route);
  };

  useEffect(() => {
    setPage(localStorage.getItem('page'));
  });

  return (
    <div className="items-center h-screen w-72 bg-primary shadow-black shadow-lg pt-6 flex flex-col gap-5">
      <img
        className="h-auto w-28 cursor-pointer"
        onClick={() => handleNavigate(MENU_PAGE)}
        src={logo}
      />
      <ul className="flex w-full flex-col ">
        <li
          className={`h-12 border-y-[1px] border-violet-500 ${
            page === MENU_PAGE && 'border-l-4 border-l-d-zero bg-violet-800'
          } hover:border-l-4 border-l-d-zero`}
        >
          <Button
            variant="text"
            onClick={() => handleNavigate(MENU_PAGE)}
            className="text-d-zero h-full w-full justify-start"
          >
            <Typography className="text-white normal-case font-medium text-sm">
              <HomeOutlinedIcon className="mx-2" /> Início
            </Typography>
          </Button>
        </li>
        <li
          className={`h-12 border-y-[1px] border-violet-500 ${
            page === PAYMENT_PAGE && 'border-l-4 border-l-d-zero bg-violet-800'
          } hover:border-l-4 border-l-d-zero`}
        >
          <Button
            variant="text"
            onClick={() => handleNavigate(PAYMENT_PAGE)}
            className="text-d-zero h-full w-full justify-start"
          >
            <Typography className="text-white normal-case font-medium text-sm">
              <AccountBalanceWalletOutlinedIcon className="mx-2" />
              Pagamento
            </Typography>
          </Button>
        </li>
        <li
          className={`h-12 border-y-[1px] border-violet-500 ${
            page === POINT_PAGE && 'border-l-4 border-l-d-zero bg-violet-800'
          } hover:border-l-4 border-l-d-zero`}
        >
          <Button
            variant="text"
            onClick={() => handleNavigate(POINT_PAGE)}
            className="text-d-zero h-full w-full justify-start"
          >
            <Typography className="text-white normal-case font-medium text-sm">
              <AccessTimeOutlinedIcon className="mx-2" /> Ponto
            </Typography>
          </Button>
        </li>
        <li
          className={`h-12 border-y-[1px] border-violet-500 ${
            page === HOLIDAYS_PAGE && 'border-l-4 border-l-d-zero bg-violet-800'
          } hover:border-l-4 border-l-d-zero`}
        >
          <Button
            variant="text"
            onClick={() => handleNavigate(HOLIDAYS_PAGE)}
            className="text-d-zero h-full w-full justify-start"
          >
            <Typography className="text-white normal-case font-medium text-sm">
              <TsunamiOutlinedIcon className="mx-2" />
              Férias
            </Typography>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
