import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { generateRandom } from '../helpers/genereteRadom';
import { ThemeProvider } from '@emotion/react';
import { tablesTheme } from '../styles/tablestheme';
import { RegisterPointsInputDto } from '../dto/pontoDto';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import isoWeek from 'dayjs/plugin/isoWeek';

type Props = {
  data: RegisterPointsInputDto[] | [];
  isLoading: boolean;
};

const PointTable: React.FC<Props> = ({ data, isLoading }) => {
  dayjs.extend(isoWeek);

  const columns: GridColDef[] = [
    {
      field: '',
      headerName: 'Referencia',
      flex: 2,
      sortable: false,
      hideSortIcons: true,
      renderCell: ({ row }) => {
        const handleDaysOfWeek = () => {
          switch (dayjs(row.dataHoraEntrada).isoWeekday()) {
            case 1:
              return 'Segunda';
            case 2:
              return 'Terça';
            case 3:
              return 'Quarta';
            case 4:
              return 'Quinta';
            case 5:
              return 'Sexta';
            case 6:
              return 'Sábado';
            case 7:
              return 'Domingo';
          }
        };
        return (
          <div className="flex flex-col items-center">
            <Typography className="text-violet-500 font-semibold text-xl">
              {dayjs(row.dataHoraEntrada).format('DD/MM')}
            </Typography>
            <Typography className="text-slate-400 text-xs">{handleDaysOfWeek()}</Typography>
          </div>
        );
      },
    },
    {
      field: 'dataHoraEntrada',
      headerName: 'Entrada',
      flex: 2,
      sortable: false,
      hideSortIcons: true,
      renderCell: ({ row }) => {
        return <p>{dayjs(row.dataHoraEntrada).format('HH:mm:ss')}</p>;
      },
    },
    {
      field: 'dataHoraSaida',
      headerName: 'Saída',
      flex: 2,
      sortable: false,
      hideSortIcons: true,
      renderCell: ({ row }) => {
        return <p>{dayjs(row.dataHoraSaida).format('HH:mm:ss')}</p>;
      },
    },
    {
      field: 'atrasos',
      headerName: 'Atrasos',
      flex: 1,
      sortable: false,
      hideSortIcons: true,
    },
    {
      field: 'faltas',
      headerName: 'Faltas',
      flex: 1,
      sortable: false,
      hideSortIcons: true,
    },
    {
      field: 'horasExtras',
      headerName: 'Horas Extras',
      flex: 1,
      sortable: false,
      hideSortIcons: true,
      headerClassName: 'hideRightSeparator',
    },
  ];

  return (
    <ThemeProvider theme={tablesTheme}>
      <div className="flex h-full w-full p-4">
        <DataGrid
          rowSelection={false}
          disableColumnSelector
          disableColumnMenu
          autoHeight
          columns={columns}
          loading={isLoading}
          rows={!isLoading ? data : []}
          getRowId={generateRandom}
          hideFooter
          sx={{
            '& .hideRightSeparator > .MuiDataGrid-columnSeparator': {
              display: 'none',
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default PointTable;
