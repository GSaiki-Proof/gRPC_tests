// Libs
import * as grpc from '@grpc/grpc-js';

import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';

// Classes
class CharacterService {
    public static GetCharacter(
        call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) {
    }
    public static async CreateCharacter(
        call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) {
    }
    public static async UpdateCharacter(
        call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) {
    }
    public static async DeleteCharacter(
        call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) {
    }
}

export default CharacterService;