let tasaMonitor;

const exchangeRates = {
  USDT: {
    VES: 0,
    Zinli: 0.97
  },
  VES: {
    USDT: 0,
    Paypal: 0,
    Zinli: 0

  },
  PAYPAL: {
    VES: 0,
    USDT: 0.9

  },
  ZINLI: {
    USDT: 0.98,
    VES: 0
  }
};


document.addEventListener('DOMContentLoaded', async () => {
  await consultarTasa();
});


async function consultarTasa() {

  const url =  'https://pydolarvenezuela-api.vercel.app/api/v1/dollar/';

  try {
    const data = await fetch(url);
    const respuesta = await data.json();
    tasa(respuesta);

  } catch (error) {
    console.log(error);
  }
}

function tasa(respuesta) {
  const precioDelDia = respuesta['monitors']['enparalelovzla']['price'];
  const tasaPaypal =  precioDelDia - (precioDelDia * 0.09);
  const tasaUsdtVes =  precioDelDia - (precioDelDia * 0.04);
  const tasaVesUsdt =  precioDelDia + (precioDelDia * 0.02);
  const tasaVesZinli = (precioDelDia + (precioDelDia * 0.04));
  const tasaZinliVes = (precioDelDia - (precioDelDia * 0.03));
  console.log(precioDelDia);

  tasaMonitor = precioDelDia;
  exchangeRates['PAYPAL']['VES'] = tasaPaypal;
  exchangeRates['USDT']['VES'] = tasaUsdtVes;
  exchangeRates['VES']['USDT'] = tasaVesUsdt;
  exchangeRates['VES']['ZINLI'] = tasaVesZinli;
  exchangeRates['ZINLI']['VES'] = tasaZinliVes;


}

function convertCurrency() {
  const fromCurrency = document.querySelector('#payment-method-from').value;
  const toCurrency = document.querySelector('#payment-method-to').value;
  const amountFrom = parseFloat(document.querySelector('#amount-to-change-from').value);



  // Calcular el monto equivalente y las tasas de cambio
  let amountTo;

  if (fromCurrency === 'VES' && toCurrency === 'ZINLI') {
    amountTo = (amountFrom * exchangeRates[fromCurrency][toCurrency]) + tasaMonitor;
  } else {
    amountTo = amountFrom * exchangeRates[fromCurrency][toCurrency];
  }

  // Actualizar el campo de monto en la moneda de destino
  document.querySelector('#amount-to-change-to').value = amountTo.toFixed(2);

}
