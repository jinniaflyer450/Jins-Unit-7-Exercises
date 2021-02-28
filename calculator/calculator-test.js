
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({'amount': '10000', 'years': '5', 'rate': '0.05'})).toEqual('188.71')
  expect(calculateMonthlyPayment({'amount': '50000', 'years': '20', 'rate': '0.02'})).toEqual('252.94')
  expect(calculateMonthlyPayment({'amount': '0', 'years': '1', 'rate': '0.01'})).toEqual('0')
});


it("should return a result with 2 decimal places", function() {
  expect(parseFloat(calculateMonthlyPayment({'amount': '10000', 'years': '5', 'rate': '0.05'}))).toEqual(188.71)
  expect(parseFloat(calculateMonthlyPayment({'amount': '50000', 'years': '20', 'rate': '0.02'}))).toEqual(252.94)
  expect(parseFloat(calculateMonthlyPayment({'amount': '0', 'years': '1', 'rate': '0.01'}))).toEqual(0)
});

it('should return a string', function(){
  expect(typeof calculateMonthlyPayment({'amount': '10000', 'years': '5', 'rate': '0.05'})).toEqual('string')
  expect(typeof calculateMonthlyPayment({'amount': '50000', 'years': '20', 'rate': '0.02'})).toEqual('string')
  expect(typeof calculateMonthlyPayment({'amount': '0', 'years': '1', 'rate': '0.01'})).toEqual('string')
});

/// etc
