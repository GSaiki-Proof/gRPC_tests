"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const grpc_js_1 = __importDefault(require("@grpc/grpc-js"));
// Data
const HOST = '0.0.0.0:3000';
const PROTO_FILE = './proto/hello.proto';
const server = new grpc_js_1.default.Server();
const proto = grpc_js_1.default.load(PROTO_FILE, 'hello', '1.0.0');
// Define the routes
server.addService(proto.hello.HelloService.service, {
    sayHello: (call, callback) => {
        callback(null, { message: 'Hello, ' + call.request.name });
    }
});
// Start the Server
server.bindAsync(HOST, grpc_js_1.default.ServerCredentials.createInsecure(), (err, port) => {
    console.log(`The server is online on port: ${port}`);
});
