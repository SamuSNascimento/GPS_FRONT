export interface DateOutputDto {
  dataInicio: string;
  dataFim: string;
}

export interface RegisterPointsInputDto {
  idRegistroPonto: number;
  dataHoraEntrada: string;
  dataHoraSaida: string;
  horasExtras: number;
  faltas: number;
  atrasos: number;
  funcionario: null;
  folhaPagamento: null;
}
