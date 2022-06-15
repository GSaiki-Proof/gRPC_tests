// Libs
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// Data
const HOST = '0.0.0.0:3000';
const PROTO_FILE = './src/protos/character.proto';

const server = new grpc.Server();


// Functions
async function main() {
    const proto = protoLoader.loadSync(PROTO_FILE);
    const characterProto: any = grpc.loadPackageDefinition(proto).character;

    // Define the routes
    server.addService(characterProto.CharacterService.service, {
        sayHello: (call: any, callback: any) => {
            callback(null, { message: 'Hello, ' + call.request.name });
        }
    });

    // Start the Server
    server.bindAsync(HOST, grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            console.log(`The server is online on port: ${port}`);
        }
    );
}

main();