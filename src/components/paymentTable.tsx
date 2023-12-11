import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import React, { useState } from 'react';
import { generateRandom } from '../helpers/genereteRadom';
import { ThemeProvider } from '@emotion/react';
import { tablesTheme } from '../styles/tablestheme';
import { useQuery } from 'react-query';
import { listPayrollRequest } from '../services/paymentService';
import dayjs from 'dayjs';

const PaymentTable: React.FC = () => {
  const [request, setrequest] = useState<boolean>(true);

  const idUserLocal = localStorage.getItem('idUsuario');
  const idUser = idUserLocal == null ? '' : idUserLocal;

  const { data, isLoading } = useQuery(['payment'], () => listPayrollRequest(parseInt(idUser)), {
    onSuccess: () => {
      setrequest(false);
    },
    onError: () => {
      setrequest(false);
    },
    enabled: request,
    refetchOnWindowFocus: false,
  });

  const customExport = () => {
    return (
      <GridToolbarContainer className="flex justify-end pb-5">
        <GridToolbarExport
          style={{ backgroundColor: 'rgb(109, 40, 217)', color: 'rgb(255, 255, 255)' }}
          printOptions={{
            allColumns: true,
            hideToolbar: true,
          }}
        />
      </GridToolbarContainer>
    );
  };

  const rows: GridRowsProp = data ? data : [];

  const columns: GridColDef[] = [
    {
      field: 'dataFolhaPagamento',
      headerName: 'Data Pagamento',
      flex: 1,
      sortable: false,
      hideSortIcons: true,
      renderCell: ({ row }) => {
        return <p>{dayjs(row.dataFolhaPagamento).format('DD/MM/YYYY')}</p>;
      },
    },
    {
      field: 'salarioBase',
      headerName: 'Salário Base',
      flex: 1,
      sortable: false,
      hideSortIcons: true,
      renderCell: ({ row }) => {
        return new Intl.NumberFormat('pt-br', { maximumFractionDigits: 2 }).format(row.salarioBase);
      },
    },
    {
      field: 'adicionais',
      headerName: 'Adicionais',
      flex: 1,
      sortable: false,
      hideSortIcons: true,
      renderCell: ({ row }) => {
        return new Intl.NumberFormat('pt-br', { maximumFractionDigits: 2 }).format(row.adicionais);
      },
    },
    {
      field: 'impostos',
      headerName: 'Impostos',
      flex: 1,
      sortable: false,
      hideSortIcons: true,
      renderCell: ({ row }) => {
        return new Intl.NumberFormat('pt-br', { maximumFractionDigits: 2 }).format(row.impostos);
      },
    },
    {
      field: 'contribuicoesPrevidenciarias',
      headerName: 'Previdencia',
      flex: 1,
      sortable: false,
      hideSortIcons: true,
      renderCell: ({ row }) => {
        return new Intl.NumberFormat('pt-br', { maximumFractionDigits: 2 }).format(
          row.contribuicoesPrevidenciarias,
        );
      },
    },
    {
      field: 'liquido',
      headerName: 'Líquido (R$)',
      flex: 1,
      sortable: false,
      hideSortIcons: true,
      renderCell: ({ row }) => {
        const liquido =
          row.salarioBase +
          row.adicionais +
          row.beneficios -
          row.impostos -
          row.contribuicoesPrevidenciarias;
        return new Intl.NumberFormat('pt-br', { maximumFractionDigits: 2 }).format(liquido);
      },
    },
    // {
    //   field: 'visualizar',
    //   headerName: 'Visualizar',
    //   flex: 1,
    //   headerAlign: 'center',
    //   align: 'center',
    //   sortable: false,
    //   hideSortIcons: true,
    //   headerClassName: 'hideRightSeparator',
    //   renderCell: () => {
    //     return (
    //       <IconButton>
    //         <Visibility className="text-primary" />
    //       </IconButton>
    //     );
    //   },
    // },
  ];

  return (
    <ThemeProvider theme={tablesTheme}>
      <div className="flex h-full w-full">
        <DataGrid
          slots={{ toolbar: customExport }}
          rowSelection={false}
          disableColumnSelector
          disableColumnMenu
          autoHeight
          loading={isLoading}
          columns={columns}
          rows={!isLoading ? rows : []}
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

export default PaymentTable;
