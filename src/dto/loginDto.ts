export interface LoginInputDto {
  email: string;
  password: string;
}

export interface LoginOutputDto {
  idUsuario: number;
  userName: string;
  email: string;
  nivelDeAcesso: number;
}
