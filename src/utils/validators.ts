const isEmail = (v: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  const minLen = (v: string, n: number) => {
return (v ?? '').trim().length >= n;
}

const tamanhoCNPJWithoutDV = 12;
const regexCNPJWithoutDV = /^([A-Z\d]){12}$/;
const regexCNPJ = /^([A-Z\d]){12}(\d){2}$/;
const regexTakeOutMask = /[./-]/g;
const regexCaractersNotPermited = /[^A-Z\d./-]/i;
const valorBase = "0".charCodeAt(0);
const pesosDV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const cnpjZerado = "00000000000000";
const cpfZerado = "00000000000";


const validateCPF = (cpf: string): boolean => {
  let Soma = 0;
  let Resto;

  if (cpf === cpfZerado) return false;

  for (let i = 1; i <= 9; i++) {
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10)) ) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;

  return true;
}

const validateCNPJ = (cnpj: string): boolean => {
  if (!regexCaractersNotPermited.test(cnpj)) {
    if (regexCNPJ.test(cnpj) && cnpj !== cnpjZerado) {
      const dvInformado = cnpj.substring(tamanhoCNPJWithoutDV);
      const dvCalculado = calculateDV(cnpj.substring(0, tamanhoCNPJWithoutDV));
      return dvInformado === dvCalculado;
    }
  }
  return false;
}

const calculateDV = (cnpj: string): string => {
  if (!regexCaractersNotPermited.test(cnpj)) {
    if (regexCNPJWithoutDV.test(cnpj) && cnpj !== cnpjZerado.substring(0, tamanhoCNPJWithoutDV)) {
      let somatorioDV1 = 0;
      let somatorioDV2 = 0;
      for (let i = 0; i < tamanhoCNPJWithoutDV; i++) {
        const asciiDigito = cnpj.charCodeAt(i) - valorBase;
        somatorioDV1 += asciiDigito * pesosDV[i + 1];
        somatorioDV2 += asciiDigito * pesosDV[i];
      }
      const dv1 = somatorioDV1 % 11 < 2 ? 0 : 11 - (somatorioDV1 % 11);
      somatorioDV2 += dv1 * pesosDV[tamanhoCNPJWithoutDV];
      const dv2 = somatorioDV2 % 11 < 2 ? 0 : 11 - (somatorioDV2 % 11);
      return `${dv1}${dv2}`;
    }
  }
  return 'Não é possível calcular o DV porque o CNPJ fornecido é inválido';
}

const removeDots = (data: string): string => {
    return data.replace(regexTakeOutMask, "");
}

const isValidDoc = (doc: string) => {
  const digits = removeDots(doc);
  return digits.length === 11 ? validateCPF(digits) : validateCNPJ(digits);
}

const landOK = (area: { total: number; arable: number; vegetation: number; }) => {
  return (area.arable + area.vegetation) <= area.total;
}

export { isEmail, minLen, validateCPF, validateCNPJ, isValidDoc, landOK }

