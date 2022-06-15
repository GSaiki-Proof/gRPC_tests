// Libs
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

import CharacterService from './services/character';

// Data
const HOST = '0.0.0.0:3000';
const PROTO_FILE = './src/protos/character.proto';
const server = new grpc.Server();


// Functions
function defineRoutes() {
    const proto = protoLoader.loadSync(PROTO_FILE);
    const characterProto: any = grpc.loadPackageDefinition(proto).character;

    // Define the routes
    server.addService(characterProto.CharacterService.service, {
        GetCharacter: CharacterService.GetCharacter
    });
}


async function main() {
    defineRoutes();

    // Start the Server
    server.bindAsync(HOST, grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            server.start();
            console.log(`The server is online on port: ${port}`);
        }
    );
}


// Code
main();