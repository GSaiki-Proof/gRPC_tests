// Libs
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

            console.log('Got character: \n' + JSON.stringify(result));
            return callback(null, {
                characterId: result.id,
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
            console.log('Created character: \n' + JSON.stringify(result));
            return callback(null, {
                characterId: result.id,
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

            console.log(
                `name: ${call.request.name}, life: ${call.request.life}`);

            const result = (await search.update({
                name: call.request.name,
                life: call.request.life
            })).toJSON();

            console.log('Updated character: \n' + JSON.stringify(result));
            return callback(null, {
                characterId: result.id,
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

            console.log('Deleted character.');
            return callback(null, {
                characterId: call.request.characterId
            });
    }
}

export default CharacterService;