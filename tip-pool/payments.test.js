describe('testing the various functions in payments.js',function(){
    it('should create a payment object including bill amount (billAmt), tip amount (tipAmt), and tip percent (tipPercent)--createCurPayment()', function(){
        billAmtInput.value = '10.00'
        tipAmtInput.value =  '2.00'
        expect(createCurPayment()).toEqual({'billAmt': '10.00', 'tipAmt': '2.00', 'tipPercent': 20})

        billAmtInput.value = '5.00'
        tipAmtInput.value = '0.00'
        expect(createCurPayment()).toEqual({'billAmt': '5.00', 'tipAmt': '0.00', 'tipPercent': 0})

        billAmtInput.value = '100.51'
        tipAmtInput.value = '20.00'
        expect(createCurPayment()).toEqual({'billAmt': '100.51', 'tipAmt': '20.00', 'tipPercent': 20})
    })

    it('should append a single curPayment object to the payment table', function(){
        paymentId = 1
        curPayment = {'billAmt': '5.00', 'tipAmt': '0.00', 'tipPercent': 0}
        appendPaymentTable(curPayment)
        checkTds = Array.from(document.querySelectorAll('#payment1 td'))
        tdsTextArr = []
        for(td of checkTds){
            tdsTextArr.push(td.innerText)
        }

        expect(tdsTextArr[0]).toEqual('$5.00')
        expect(tdsTextArr[1]).toEqual('$0.00')
        expect(tdsTextArr[2]).toEqual('0%')
    })

    it('should append multiple curPayment objects to the payment table', function(){
        paymentId = 1
        curPayment = {'billAmt': '5.00', 'tipAmt': '0.00', 'tipPercent': 0}
        appendPaymentTable(curPayment)
        checkTds = Array.from(document.querySelectorAll('#payment1 td'))
        tdsTextArr = []
        for(td of checkTds){
            tdsTextArr.push(td.innerText)
        }

        expect(tdsTextArr[0]).toEqual('$5.00')
        expect(tdsTextArr[1]).toEqual('$0.00')
        expect(tdsTextArr[2]).toEqual('0%')

        paymentId++

        curPayment = {'billAmt': '10.00', 'tipAmt': '2.00', 'tipPercent': 20}
        appendPaymentTable(curPayment)
        checkTds = Array.from(document.querySelectorAll('#payment2 td'))
        tdsTextArr = []
        for(td of checkTds){
            tdsTextArr.push(td.innerText)
        }

        expect(tdsTextArr[0]).toEqual('$10.00')
        expect(tdsTextArr[1]).toEqual('$2.00')
        expect(tdsTextArr[2]).toEqual('20%')

        paymentId++

        curPayment = {'billAmt': '100.51', 'tipAmt': '20.00', 'tipPercent': 20}
        appendPaymentTable(curPayment)
        checkTds = Array.from(document.querySelectorAll('#payment3 td'))
        tdsTextArr = []
        for(td of checkTds){
            tdsTextArr.push(td.innerText)
        }

        expect(tdsTextArr[0]).toEqual('$100.51')
        expect(tdsTextArr[1]).toEqual('$20.00')
        expect(tdsTextArr[2]).toEqual('20%')

        expect(paymentTbody.querySelectorAll('#paymentTable tr').length).toEqual(3)
    })

   it('should append a summary row to the payment table for a single payment row', function(){
       paymentId = 1

       curPayment = {'billAmt': '5.00', 'tipAmt': '0.00', 'tipPercent': 0}
       appendPaymentTable(curPayment)
       allPayments['payment' + paymentId] = curPayment;
       updateSummary()

       expect(summaryTds[0].innerText).toEqual('$5')
       expect(summaryTds[1].innerText).toEqual('$0')
       expect(summaryTds[2].innerText).toEqual('0%')
   })
   
   it('should appent a summary row to the payment table for multiple payment rows', function(){
    paymentId = 1

    curPayment = {'billAmt': '5.00', 'tipAmt': '0.00', 'tipPercent': 0}
    appendPaymentTable(curPayment)
    allPayments['payment' + paymentId] = curPayment;
    updateSummary()

    expect(summaryTds[0].innerText).toEqual('$5')
    expect(summaryTds[1].innerText).toEqual('$0')
    expect(summaryTds[2].innerText).toEqual('0%')

    paymentId++

    curPayment = {'billAmt': '10.00', 'tipAmt': '2.00', 'tipPercent': 20}
    appendPaymentTable(curPayment)
    allPayments['payment' + paymentId] = curPayment
    updateSummary()

    expect(summaryTds[0].innerText).toEqual('$15')
    expect(summaryTds[1].innerText).toEqual('$2')
    expect(summaryTds[2].innerText).toEqual('10%')

    paymentId++

    curPayment = {'billAmt': '100.51', 'tipAmt': '20.00', 'tipPercent': 20}
    appendPaymentTable(curPayment)
    allPayments['payment' + paymentId] = curPayment
    updateSummary()

    expect(summaryTds[0].innerText).toEqual('$115.51')
    expect(summaryTds[1].innerText).toEqual('$22')
    expect(summaryTds[2].innerText).toEqual('13%')
})

afterEach(function(){
    billAmtInput.value = ''
    tipAmtInput.value = ''
    paymentTbody.innerHTML = ''
    curPayment = {}
    document.querySelector('#summaryTable').innerHTML = ''
    allPayments = {}
    paymentId = 1
    checkTds = []
    tdsTextArr = []
    })
})