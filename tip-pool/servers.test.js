describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice'
    serverId = 0
  })

  it('should add a new server to allServers on submitServerInfo()', function (){
    submitServerInfo()

    expect(Object.keys(allServers).length).toEqual(1)
    expect(allServers['server' + serverId].serverName).toEqual('Alice')
    expect(allServers).toEqual({'server1': {'serverName': 'Alice'}})
  })

  it('should add three new servers to allServers on submitServerInfo() with correct information', function(){
    submitServerInfo()
    expect(Object.keys(allServers).length).toEqual(1)
    expect(allServers['server' + serverId].serverName).toEqual('Alice')
    expect(allServers).toEqual({'server1': {'serverName': 'Alice'}})
    
    serverNameInput.value = 'Bob'
    submitServerInfo()
    expect(Object.keys(allServers).length).toEqual(2)
    expect(serverId).toEqual(2)
    expect(allServers['server' + serverId].serverName).toEqual('Bob')
    expect(allServers).toEqual({'server1': {'serverName': 'Alice'}, 'server2': {'serverName': 'Bob'}})
    
    serverNameInput.value = 'Cassie'
    submitServerInfo()
    expect(Object.keys(allServers).length).toEqual(3)
    expect(serverId).toEqual(3)
    expect(allServers['server' + serverId].serverName).toEqual('Cassie')
    expect(allServers).toEqual({'server1': {'serverName': 'Alice'}, 'server2': {'serverName': 'Bob'}, 'server3': {'serverName': 'Cassie'}})
  
  })
  it('should add a single row to the server table with correct information', function(){
    submitServerInfo()
    expect(serverTbody.querySelector(`#server1 td`).innerText).toEqual('Alice')
  })

  it('should add three new rows to the server table with correct information', function(){
    submitServerInfo()
    expect(serverTbody.querySelector('#server1 td').innerText).toEqual('Alice')
    expect(serverTbody.querySelectorAll('tr').length).toEqual(1)

    serverNameInput.value = 'Bob'
    submitServerInfo()
    expect(serverTbody.querySelector('#server2 td').innerText).toEqual('Bob')
    expect(serverTbody.querySelectorAll('tr').length).toEqual(2)

    serverNameInput.value = 'Cassie'
    submitServerInfo()
    expect(serverTbody.querySelector('#server3 td').innerText).toEqual('Cassie')
    expect(serverTbody.querySelectorAll('tr').length).toEqual(3)
  })

  afterEach(function() {
    allServers = {}
    updateServerTable()
    // teardown logic
  });
});
