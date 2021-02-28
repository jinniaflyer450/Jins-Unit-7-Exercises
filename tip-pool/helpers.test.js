describe('tests for sumPaymentTotal, which gives the total of whatever part of an allPayments object (billAmt, tipAmt, or tipPercent) it is told to sum', function(){
    it('should return the total of billAmt, tipAmt, and tipPercent for a single payment', function(){
        allPayments = {'payment1': {'billAmt': '10.00', 'tipAmt': '2.00', 'tipPercent': 20}}
        
        let total = sumPaymentTotal('billAmt')
        expect(total).toEqual(10)

        total = sumPaymentTotal('tipAmt')
        expect(total).toEqual(2)

        total = sumPaymentTotal('tipPercent')
        expect(total). toEqual(20)
    })

    it('should return the total of billAmt, tipAmt and tipPercent for multiple payments', function(){
        allPayments = {'payment1': {'billAmt': '10.00', 'tipAmt': '2.00', 'tipPercent': 20}, 'payment2': {'billAmt': '5.00', 'tipAmt': '0.00', 'tipPercent': 0}, 'payment3': {'billAmt': '100.51', 'tipAmt': '20.00', 'tipPercent': 20}}

        total = sumPaymentTotal('billAmt')
        expect(total).toEqual(115.51)

        total = sumPaymentTotal('tipAmt')
        expect(total).toEqual(22)

        total = sumPaymentTotal('tipPercent')
        expect(total).toEqual(40)
    })

    afterEach(function(){
        allPayments = {}
        total = 0
    })
})

describe('tests for calculateTipPercent, which calculates the tip percent of a payment given the bill amount and tip amount.', function(){
    it('should calculate the tip percent given a bill amount and tip amount', function(){
        expect(calculateTipPercent('10', '2')).toEqual(20)
        expect(calculateTipPercent('5', '0')).toEqual(0)
        expect(calculateTipPercent('100.51', '20')).toEqual(20)
    })
})

describe('tests for appendTd, which appends a new table data element to an existing table row', function(){
    it('should append one new table data element to an existing table row', function(){
        tr = document.createElement('tr')
        value = 'This is table data'

        appendTd(tr, value)
        
        expect(tr.querySelector('td').innerText).toEqual('This is table data')
    })

    it('should append three new table data elements to an existing table row', function(){
        tr = document.createElement('tr')
        value = 'This is table data'
        appendTd(tr, value)

        value = 'This is also table data'
        appendTd(tr, value)

        value = 'This is finally table data'
        appendTd(tr, value)

        tdArray = Array.from(tr.querySelectorAll('td'))

        expect(tdArray[0].innerText).toEqual('This is table data')
        expect(tdArray[1].innerText).toEqual('This is also table data')
        expect(tdArray[2].innerText).toEqual('This is finally table data')
    })
    afterEach(function(){
        tr = undefined
        value = undefined
        newTd = undefined
    })
})

describe('tests for appendDeleteBtn(), which adds a table data element that deletes a table row if clicked.', function(){
    it('should append a delete button to a single table row.', function(){
        tr = document.createElement('tr')
        appendDeleteBtn(tr)

        expect(tr.querySelector('td').innerText).toEqual('X')
    })
    it('should append delete buttons to multiple table rows within a table', function(){
        table = document.querySelector('#paymentTable')
        
        tr = document.createElement('tr')
        tr.id = 'tr1'
        appendDeleteBtn(tr)
        table.append(tr)

        tr = document.createElement('tr')
        tr.id = 'tr2'
        appendDeleteBtn(tr)
        table.append(tr)

        tr = document.createElement('tr')
        tr.id = 'tr3'
        appendDeleteBtn(tr)
        table.append(tr)

        expect(table.querySelector('#tr1 td').innerText).toEqual('X')
        expect(table.querySelector('#tr2 td').innerText).toEqual('X')
        expect(table.querySelector('#tr3 td').innerText).toEqual('X')
    })

    it('should append delete buttons to multiple table rows within a table along with actual table data', function(){
        table = document.querySelector('#paymentTable')

        tr = document.createElement('tr')
        tr.id = 'tr1'
        appendTd(tr, 'This is table data')
        appendDeleteBtn(tr)
        table.append(tr)

        tr1Array = Array.from(table.querySelectorAll('#tr1 td'))

        expect(tr1Array[0].innerText).toEqual('This is table data')
        expect(tr1Array[1].innerText).toEqual('X')

        tr = document.createElement('tr')
        tr.id = 'tr2'
        appendTd(tr, 'This is table data')
        appendDeleteBtn(tr)
        table.append(tr)

        tr = document.createElement('tr')
        tr.id = 'tr3'
        appendTd(tr, 'This is table data')
        appendDeleteBtn(tr)
        table.append(tr)

        tr1Array = Array.from(table.querySelectorAll('#tr1 td'))
        tr2Array = Array.from(table.querySelectorAll('#tr2 td'))
        tr3Array = Array.from(table.querySelectorAll('#tr3 td'))

        expect(tr1Array[0].innerText).toEqual('This is table data')
        expect(tr1Array[1].innerText).toEqual('X')
        expect(tr2Array[0].innerText).toEqual('This is table data')
        expect(tr2Array[1].innerText).toEqual('X')
        expect(tr3Array[0].innerText).toEqual('This is table data')
        expect(tr3Array[1].innerText).toEqual('X')
    })

    afterEach(function(){
        tr = undefined
        value = undefined
        newTd = undefined
        document.querySelector('#paymentTable').innerHTML = ''
    })
})
