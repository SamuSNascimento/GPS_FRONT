import React, { useEffect, useState } from 'react';
import { Wrapper } from '../components/wrapper';
import { CircularProgress, Typography } from '@mui/material';
import HolidaysInfo from '../components/holidaysInfo';
import { HOLIDAYS_PAGE } from '../config';
import { useQuery } from 'react-query';
import { holidaysRequest, holidaysSolicitationRequest } from '../services/holidayService';
import { HolidaysOutputDto } from '../dto/holidayDto';
import { generateRandom } from '../helpers/genereteRadom';
import { toast } from 'react-toastify';

const HolidaysPage: React.FC = () => {
  const [request, setRequest] = useState<boolean>(true);
  const [data, setData] = useState<HolidaysOutputDto[]>([]);
  const [idFerias, setIdFerias] = useState<number>(0);
  const idUserLocal = localStorage.getItem('idUsuario');
  const idUser = idUserLocal == null ? '' : idUserLocal;

  const { isLoading } = useQuery(
    ['holidays'],
    () => holidaysRequest(parseInt(idUser)) as Promise<HolidaysOutputDto[]>,
    {
      onSuccess: data => {
        setData(data);
        setRequest(false);
      },
      onError: () => {
        setRequest(false);
      },
      enabled: request,
      refetchOnWindowFocus: false,
    },
  );

  const handleSolicitation = async (idFerias: number) => {
    const data = await holidaysSolicitationRequest(idFerias);
    if (data) {
      toast.success(data);
      setRequest(true);
    }
  };

  useEffect(() => {
    if (idFerias !== 0) {
      handleSolicitation(idFerias);
    }
  }, [idFerias]);

  useEffect(() => {
    localStorage.setItem('page', HOLIDAYS_PAGE);
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col w-full gap-8">
        <h1 className="text-4xl text-d-two">Férias</h1>
        <div className="flex flex-col gap-4">
          <Typography className="text-xl font-medium text-d-two">
            Solicite suas próximas férias
          </Typography>
          <div className="flex flex-col border gap-2 p-5">
            <Typography className="text-xl font-medium text-d-two">
              Períodos aquisitivos disponíveis
            </Typography>
            <div className="flex justify-center">
              {!isLoading ? (
                data.map(element => {
                  return (
                    <HolidaysInfo
                      key={generateRandom()}
                      status={element.status}
                      dataInicio={element.dataInicio}
                      dataFim={element.dataFim}
                      idFerias={element.idFerias}
                      setIdFerias={setIdFerias}
                    />
                  );
                })
              ) : (
                <CircularProgress />
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default HolidaysPage;
