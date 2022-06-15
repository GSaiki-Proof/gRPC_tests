// Libs
import * as grpc from '@grpc/grpc-js';

import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import Character from '../models/character';

// Classes
class CharacterService {
    public static async GetCharacter(
        call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) {
            if (!call.request.characterId) {
                return callback(new Error('Id not defined.'));
            }

            const search = (await Character.findOne({
                where: {
                    id: call.request.characterId
                }
            }));

            if (!search) {
                return callback(new Error('Character not found.'));
            }

            const result = search.toJSON();

            return callback(null, {
                id: result.id,
                name: result.name,
                life: result.life
            });

    }
    public static async CreateCharacter(
        call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) {
            if (!call.request.name) {
                return callback(new Error('Name not defined.'));
            }
            const char = await Character.create({
                name: call.request.name,
                life: 100
            });

            const result = char.toJSON();
            return callback(null, {
                id: result.id,
                name: result.name,
                life: result.life
            });

    }
    public static async UpdateCharacter(
        call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) {
            if (!call.request.characterId) {
                return callback(new Error('Id not defined.'));
            }

            const search = (await Character.findOne({
                where: {
                    id: call.request.characterId
                }
            }));
            
            if (!search) {
                return callback(new Error('Character not found'));
            }

            const result = (await search.update({
                name: call.request.name,
                life: call.request.life
            })).toJSON();

            return callback(null, {
                id: result.id,
                name: result.name,
                life: result.life
            });
    }
    public static async DeleteCharacter(
        call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) {
            if (!call.request.characterId) {
                return callback(new Error('Id not defined.'));
            }

            const search = (await Character.findOne({
                where: {
                    id: call.request.characterId
                }
            }));

            if (!search) {
                return callback(new Error('Character not found'));
            }

            await search.destroy();

            return callback(null, {
                id: call.request.characterId
            });
    }
}

export default CharacterService;