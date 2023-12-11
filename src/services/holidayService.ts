/* eslint-disable @typescript-eslint/no-explicit-any */
import { HolidaysOutputDto } from '../dto/holidayDto';
import api from './api';

export const holidaysRequest = async (idUser: number): Promise<HolidaysOutputDto[]> => {
  const { data } = await api.get(`/Ferias/${idUser}`);

  return data;
};

export const holidaysSolicitationRequest = async (idFerias: number): Promise<any> => {
  const { data } = await api.get(`/Ferias/SolicitarFerias/${idFerias}`);

  return data;
};
