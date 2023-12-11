import { PaymentOutPutDto } from '../dto/paymentDto';
import api from './api';

export const listPayrollRequest = async (idUser: number): Promise<PaymentOutPutDto[]> => {
  const { data } = await api.get(`/FolhaDePagamento/${idUser}`);

  return data;
};
