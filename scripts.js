const currencyOne = document.getElementById('currency-one')
const currencyTwo = document.getElementById('currency-two')

const amountOne = document.getElementById('amount-one')
const amountTwo = document.getElementById('amount-two')

const rateElement = document.getElementById('rate')
const swap = document.getElementById('swap')

// Fetch rates and update the DOM
const calculate = () => {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  // The Exchange API v5 gives a CORs Error. Use V4 to limit headachs
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency_two]

      rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`

      amountTwo.value = (amountOne.value * rate).toFixed(2)
    })
}

// Event listeners
currencyOne.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)
currencyTwo.addEventListener('change', calculate)
amountTwo.addEventListener('input', calculate)

swap.addEventListener('click', () => {
  const temp = currencyOne.value
  currencyOne.value = currencyTwo.value
  currencyTwo.value = temp
  calculate();
})

calculate()