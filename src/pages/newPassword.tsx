import React, { useState } from 'react';
import recuperarSenha from '../assets/recuperarSenhaIMG.png';
import { Button, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NewPasswordDto } from '../dto/newPasswordDto';
import { useQuery } from 'react-query';
import { changePasswordRequest } from '../services/usuarioService';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  password: yup
    .string()
    .required('A senha é obrigatória')
    .max(100, 'A senha deve ter no máximo 100 caracteres'),
  confirmationPassword: yup
    .string()
    .required('A senha é obrigatória')
    .max(100, 'A senha deve ter no máximo 100 caracteres')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
});

const NewPassword: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmationPassword: false,
  });

  const [request, setRequest] = useState<boolean>(false);

  const idUserLocal = localStorage.getItem('idUsuario');
  const idUser = idUserLocal == null ? '' : idUserLocal;

  const handleClickShowPassword = () => {
    setShowPassword({ ...showPassword, password: !showPassword.password });
  };
  const handleClickShowConfirmationPassword = () => {
    setShowPassword({ ...showPassword, confirmationPassword: !showPassword.confirmationPassword });
  };

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<NewPasswordDto>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const { data } = useQuery(
    ['newPassword'],
    () => changePasswordRequest(getValues(), parseInt(idUser)),
    {
      onSuccess: () => {
        toast.success(data);
        setRequest(false);
        navigate(-1);
      },
      onError: (error: AxiosError) => {
        toast.error(`${error.response?.data}`);
        setRequest(false);
      },
      refetchOnWindowFocus: false,
      enabled: request,
    },
  );

  const handlelogin: SubmitHandler<NewPasswordDto> = () => {
    setRequest(true);
  };

  return (
    <div className="flex h-screen">
      <div className="h-full w-1/2 flex justify-center bg-primary items-center">
        <img src={recuperarSenha} />
      </div>
      <div className="h-full w-1/2 bg-white flex justify-center items-center">
        <form className="flex gap-5 flex-col h-auto w-80" onSubmit={handleSubmit(handlelogin)}>
          <h1 className="text-primary text-3xl font-medium mb-3">Redefinir Senha!</h1>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <TextField
                variant="outlined"
                type={showPassword.password ? 'text' : 'password'}
                fullWidth
                {...register('password')}
                label="Nova Senha"
                error={!!errors.password}
                helperText={errors.password && <span>{errors.password.message}</span>}
              />
              <IconButton
                className="absolute right-[2%] top-[10%] z-50"
                onClick={handleClickShowPassword}
              >
                {showPassword.password ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            <div className="relative ">
              <TextField
                variant="outlined"
                type={showPassword.confirmationPassword ? 'text' : 'password'}
                fullWidth
                {...register('confirmationPassword')}
                label="Confirmar Senha"
                error={!!errors.confirmationPassword}
                helperText={
                  errors.confirmationPassword && <span>{errors.confirmationPassword.message}</span>
                }
              />
              <IconButton
                className="absolute right-[2%] top-[10%] z-50"
                onClick={handleClickShowConfirmationPassword}
              >
                {showPassword.confirmationPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>
          <Button
            className="bg-primary text-white font-black rounded-lg"
            variant="contained"
            type="submit"
          >
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
