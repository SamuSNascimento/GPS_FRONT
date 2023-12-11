import { Button, Divider, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

type Props = {
  dataInicio: string;
  dataFim: string;
  status: boolean;
  idFerias: number;
  setIdFerias: (value: number) => void;
};

const HolidaysInfo: React.FC<Props> = ({ dataInicio, dataFim, status, setIdFerias, idFerias }) => {
  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex justify-between w-2/3">
          <div>
            <Typography className="text-sm text-slate-500 font-medium">Saldo disponível</Typography>
            <Typography className="text-d-two font-semibold">
              {dayjs(dataFim).diff(dataInicio, 'day') + ' Dias'}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-slate-500 font-medium">Status</Typography>
            <Typography className="text-d-two font-semibold">
              {status ? 'Solicitado' : 'Não solicitado'}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-slate-500 font-medium">
              Início das férias
            </Typography>
            <Typography className="text-d-two font-semibold">
              {dayjs(dataInicio).format('DD/MM/YYYY')}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-slate-500 font-medium">Final das férias</Typography>
            <Typography className="text-d-two font-semibold">
              {dayjs(dataFim).format('DD/MM/YYYY')}
            </Typography>
          </div>
        </div>
        <Button
          onClick={() => setIdFerias(idFerias)}
          disabled={status}
          variant="contained"
          className="normal-case bg-violet-700"
          sx={{
            '&.Mui-disabled': {
              color: 'rgb(203, 213, 225)',
              backgroundColor: 'rgb(139, 92, 246) !important',
            },
          }}
        >
          Solicitar Férias
        </Button>
      </div>
      <Divider />
    </>
  );
};

export default HolidaysInfo;
