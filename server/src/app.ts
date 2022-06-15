// Libs
import grpc from '@grpc/grpc-js';

// Data
const HOST = '0.0.0.0:3000';
const PROTO_FILE = './proto/hello.proto';

const server = new grpc.Server();
const proto: any = grpc.load(PROTO_FILE, 'hello', '1.0.0');

// Define the routes
server.addService(proto.hello.HelloService.service, {
    sayHello: (call: any, callback: any) => {
        callback(null, { message: 'Hello, ' + call.request.name });
    }
});

// Start the Server
server.bindAsync(HOST, grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
        console.log(`The server is online on port: ${port}`);
    }
);