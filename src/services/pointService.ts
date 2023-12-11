import { DateOutputDto, RegisterPointsInputDto } from '../dto/pontoDto';
import api from './api';

export const totalExtraHoursRequest = async (idUser: number): Promise<number> => {
  const { data } = await api.get(`/RegistroPonto/BuscarHorasExtrasPorIdUsuario/${idUser}`);

  return data;
};

export const pointRecordsRequest = async (
  input: DateOutputDto,
  idUser: number,
): Promise<RegisterPointsInputDto[]> => {
  const { data } = await api.get('/RegistroPonto', {
    params: {
      idUsuario: idUser,
      dataInicio: input.dataInicio,
      dataFim: input.dataFim,
    },
  });

  return data;
};
