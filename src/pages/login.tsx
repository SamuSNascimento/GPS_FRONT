/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import loginImg from '../assets/loginIMG.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginInputDto, LoginOutputDto } from '../dto/loginDto';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Checkbox, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MENU_PAGE } from '../config';
import { useQuery } from 'react-query';
import { loginConfirmationRequest } from '../services/usuarioService';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const schema = yup.object({
  email: yup
    .string()
    .required('O login é obrigatório')
    .max(100, 'O login deve ter no máximo 100 caracteres'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .max(100, 'A senha deve ter no máximo 100 caracteres'),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [request, setRequest] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<LoginInputDto>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const handlelogin: SubmitHandler<LoginInputDto> = () => {
    setRequest(true);
  };

  useQuery(['login'], () => loginConfirmationRequest(getValues()) as Promise<LoginOutputDto>, {
    onSuccess: data => {
      navigate(MENU_PAGE);
      localStorage.setItem('page', MENU_PAGE);
      localStorage.setItem('user', data.userName);
      localStorage.setItem('idUsuario', `${data.idUsuario}`);
      toast.success(`Usuario ${data.userName} logado`);
    },
    onError: (error: AxiosError) => {
      toast.error(`${error.response?.data}`);
      setRequest(false);
    },
    refetchOnWindowFocus: false,
    enabled: request,
    retry: false,
  });

  useEffect(() => {
    localStorage.removeItem('page');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
  }, []);

  return (
    <div className="flex h-screen">
      <div className="h-full w-1/2 bg-white flex justify-center items-center">
        <form className="flex gap-5 flex-col h-auto w-80" onSubmit={handleSubmit(handlelogin)}>
          <h1 className="text-primary text-3xl font-medium mb-3">Seja bem-vindo!</h1>
          <div className="flex flex-col gap-4">
            <TextField
              variant="outlined"
              type="text"
              label="Email"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email && <span>{errors.email.message}</span>}
            />
            <div className="relative">
              <TextField
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                {...register('password')}
                label="Password"
                error={!!errors.password}
                helperText={errors.password && <span>{errors.password.message}</span>}
              />
              <IconButton
                className="absolute right-[2%] top-[10%] z-50"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <Checkbox className="p-0 pr-1" />
              <p className="text-primary font-medium">Lembrar senha</p>
            </div>
          </div>
          <Button
            className="bg-primary text-white font-black rounded-lg"
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
      <div className="h-full w-1/2 flex justify-center bg-primary items-center">
        <img src={loginImg} />
      </div>
    </div>
  );
};

export default LoginPage;
