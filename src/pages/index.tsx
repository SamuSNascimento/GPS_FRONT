import React, { useEffect, useState } from 'react';
import { Wrapper } from '../components/wrapper';
import { Typography } from '@mui/material';
import { MENU_PAGE } from '../config';
import { totalExtraHoursRequest } from '../services/pointService';

const MenuPage: React.FC = () => {
  const [data, setData] = useState<number>(0);

  const user = localStorage.getItem('user');
  const idUserLocal = localStorage.getItem('idUsuario');
  const idUser = idUserLocal == null ? '' : idUserLocal;

  useEffect(() => {
    localStorage.setItem('page', MENU_PAGE);
    handleTotalHours(parseInt(idUser));
  }, []);

  const handleTotalHours = async (idUser: number) => {
    const data = await totalExtraHoursRequest(idUser);
    setData(data);
  };

  return (
    <Wrapper>
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-4xl text-d-two">Olá, {user}</h1>
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-xl text-d-two">Meu Saldo de Horas</h2>
          <div className="bg-white flex w-1/2 border shadow-lg items-center justify-center py-6 text-d-two">
            <Typography className="text-4xl font-medium">{data}</Typography>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default MenuPage;
