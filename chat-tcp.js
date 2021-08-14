const net = require('net');
const chatServer = net.createServer();
const clientList = [];

const sendToAll = (message, client) => { 
    
    clientList
        .filter(item => item !== client)
        .forEach(item => item.write(message))
}

chatServer.on('connection', (client) => { 
    
    client.write('Ola todo mundo como estao ? =D' + "!\n");
    clientList.push(client);

    client.on('end',  () => { 
        console.log('Cliente desconectado', clientList.indexOf(client));
        clientList.splice(clientList.indexOf(client), 1);
    })

    client.on('data', (data) => sendToAll(data, client));
})

chatServer.listen(9000);
