import { PERSONAL_DATA_API_URL as URL, PERSONAL_DATA_API_KEY as KEY } from '../config';

export function getPersonalDataByCpf(cpf) {
  if (!URL || !KEY) {
    return new Promise((resolve, reject) => reject(new Error('Serviço não configurado.')));
  }
  const url = `${URL}/?chave=${KEY}&cpf=${cpf}&formato=json`;
  return fetch(url).then(res => res.json());
}

export function getPersonalDataByCpfFake(cpf) {
  if (!URL || !KEY) {
    return new Promise((resolve, reject) => reject(new Error('Serviço não configurado.')));
  }
  const result = {
    RetornoCpf: {
      DadosObito: {
        AnoObito: '',
        msgObito: '',
      },
      DadosTitular: {
        CodigoControle: 'A1A2-B1B2-C1C2-D1D2',
        Cpf: '352.879.878-54',
        DataConsulta: '10/04/2018',
        DataInscricao: '00/00/0000',
        DataNascimento: '29/05/****',
        DigitoVerificador: '00',
        Genero: 'MASCULINO',
        HoraConsulta: '14:14:14',
        NomeMae: 'M**** D* F***** S**** D* B*****',
        Situacao: '******',
        Titular: 'C******** S**** P****** D* B*****',
      },
      EnderecoTitular: {
        Bairro: 'ROCHDALE',
        Cep: '06226-125',
        Cidade: 'OSASCO',
        Complemento: '******',
        Logradouro: '******',
        Numero: '******',
        UF: 'SP',
      },
      msg: {
        Creditos: '08',
        Resultado: '1',
        ResultadoTXT: 'CPF encontrado',
        TempoConsulta: '2.102195',
      },
    },
  };
  return new Promise((resolve, reject) => setTimeout(() => resolve(result), 500));
}
