window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('calc-form');
  if (form) {
    setupIntialValues();
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById('loan-amount').value),
    years: +(document.getElementById('loan-years').value),
    rate: +(document.getElementById('loan-rate').value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let amountInput = document.querySelector('#loan-amount')
  let yearsInput = document.querySelector('#loan-years')
  let rateInput = document.querySelector('#loan-rate')
  
  amountInput.value = 1000
  yearsInput.value = 1
  rateInput.value = 0.02

  update()
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let values = getCurrentUIValues()
  let amount = parseFloat(values['amount'])
  let years = parseFloat(values['years'])
  let rate = parseFloat(values['rate'])

  if(typeof amount !== 'number' || typeof years !== 'number' || typeof rate !== 'number'){
    let monthly = 'You have entered invalid input.'
    updateMonthly(monthly)
  }
  else if(amount === NaN || years === NaN || rate === NaN){
    let monthly = 'You have entered invalid input.'
    updateMonthly(monthly)
  }
  else if(amount === 0 || years === 0 || rate === 0){
    let monthly = 'You have entered invalid input.'
    updateMonthly(monthly)
  }
  else{
    let monthly = calculateMonthlyPayment(values)
    updateMonthly(monthly)
  }
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let amount = parseFloat(values['amount'])
  let totalPayments = parseFloat((values['years']*12))
  let monthlyRate = parseFloat((values['rate']/12))

  let rawMonthly = (amount * monthlyRate)/(1-((1+monthlyRate)**(-totalPayments)))
  let monthlyTwoDecPlaces = (Math.round(rawMonthly*100))/100
  return monthlyTwoDecPlaces.toString()
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let monthlyContainer = document.querySelector('#monthly-payment')
  if(monthly === 'You have entered invalid input.'){
    monthlyContainer.innerText = `${monthly}`
  }
  else{
    monthlyContainer.innerText = `Your monthly payment is $${monthly}`
  }
}
