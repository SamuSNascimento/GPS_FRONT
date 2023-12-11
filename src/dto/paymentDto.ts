export interface PaymentOutPutDto {
  idFolhaPagemento: number;
  salarioBase: number;
  beneficios: number;
  horasExtras: number;
  adicionais: number;
  deducoes: number;
  impostos: number;
  contribuicoesPrevidenciarias: number;
  dataFolhaPagamento: string;
  funcionario: null;
  registroPonto: null;
}
