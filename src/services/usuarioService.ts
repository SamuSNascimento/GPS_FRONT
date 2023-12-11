/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginInputDto, LoginOutputDto } from '../dto/loginDto';
import { NewPasswordDto } from '../dto/newPasswordDto';
import api from './api';

export const loginConfirmationRequest = async (input: LoginInputDto): Promise<LoginOutputDto> => {
  const { data } = await api.get('/Usuario/BuscarUsuario', {
    params: {
      email: input.email,
      senha: input.password,
    },
  });
  return data;
};

export const changePasswordRequest = async (
  input: NewPasswordDto,
  idUsuario: number,
): Promise<any> => {
  const { data } = await api.get('/Usuario/AlterarSenha', {
    params: {
      idUsuario,
      novaSenha: input.password,
    },
  });

  return data;
};
