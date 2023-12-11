import React, { useEffect, useState } from 'react';
import { Wrapper } from '../components/wrapper';
import { POINT_PAGE } from '../config';
import { Typography } from '@mui/material';
import Datepicker from 'react-tailwindcss-datepicker';
import { useForm } from 'react-hook-form';
import { DateOutputDto, RegisterPointsInputDto } from '../dto/pontoDto';
import dayjs from 'dayjs';
import PointTable from '../components/pointTable';
import { useQuery } from 'react-query';
import { pointRecordsRequest, totalExtraHoursRequest } from '../services/pointService';

const PointPage: React.FC = () => {
  const [request, setRequest] = useState<boolean>(true);

  const idUserLocal = localStorage.getItem('idUsuario');
  const idUser = idUserLocal == null ? '' : idUserLocal;
  const [extraHours, setExtraHours] = useState<number>(0);
  const [data, setData] = useState<RegisterPointsInputDto[]>([]);
  const endDate = dayjs().add(14, 'day').month(dayjs().month()).format('YYYY-MM-DD');
  const startDate = dayjs(endDate).day(-30).format('YYYY-MM-DD');

  const { watch, setValue, getValues } = useForm<DateOutputDto>({
    mode: 'onSubmit',
    defaultValues: {
      dataInicio: `${startDate} 00:00:00`,
      dataFim: `${endDate} 00:00:00`,
    },
  });

  const { isLoading } = useQuery(
    ['point'],
    () => pointRecordsRequest(getValues(), parseInt(idUser)) as Promise<RegisterPointsInputDto[]>,
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

  const handleTotalHours = async (idUser: number) => {
    const response = await totalExtraHoursRequest(idUser);
    setExtraHours(response);
  };

  useEffect(() => {
    localStorage.setItem('page', POINT_PAGE);
    handleTotalHours(parseInt(idUser));
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col h-full gap-10 w-full">
        <h1 className="text-d-two text-4xl">Meu Ponto</h1>
        <div className="flex h-[90%] flex-col border gap-10 pt-6">
          <div className="flex gap-5 w-96 pl-9 items-center">
            <Typography className="text-d-two font-semibold">Periodo</Typography>
            <Datepicker
              value={{ startDate: watch('dataInicio'), endDate: watch('dataFim') }}
              onChange={event => {
                setValue('dataInicio', `${dayjs(event?.startDate).format('YYYY-MM-DD')} 00:00:00`);
                setValue('dataFim', `${dayjs(event?.endDate).format('YYYY-MM-DD')} 23:59:59`);
                {
                  watch('dataInicio') !== 'Invalid Date 00:00:00' && setRequest(true);
                }
              }}
              i18n="pt-br"
              configs={{
                shortcuts: {
                  today: 'Hoje',
                  yesterday: 'Ontem',
                  past: period => `Últimos ${period} dias`,
                  currentMonth: 'Mês atual',
                  pastMonth: 'Mês passado',
                },
              }}
              showShortcuts
              inputClassName="w-full h-10 text-violet-700 shadow-inner-custom border-[#cccccc98] border-2 rounded-md font-normal text-base placeholder:text-violet-700 hover:border-[#000] py-4 px-3"
              toggleClassName="absolute right-0 h-full px-3 text-violet-700 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              separator="-"
              displayFormat={'DD/MM/YYYY'}
              primaryColor={'purple'}
              useRange={false}
            />
          </div>
          <div className="flex justify-evenly">
            <div className="flex flex-col justify-center items-center gap-1">
              <Typography className="text-xs font-medium text-slate-400">SALDO ANTERIOR</Typography>
              <Typography className="text-2xl font-semibold">{data[0]?.horasExtras}</Typography>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <Typography className="text-xs font-medium text-slate-400">SALDO PERÍODO</Typography>
              <Typography className="text-2xl font-semibold">{data[0]?.horasExtras}</Typography>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <Typography className="text-xs font-medium text-slate-400">TOTAL BANCO</Typography>
              <Typography className="text-2xl font-semibold">{extraHours}</Typography>
            </div>
          </div>
          <div className="flex w-full h-[75%]">
            <PointTable data={data} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PointPage;
