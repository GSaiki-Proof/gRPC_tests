// Libs
import Database from '../models/database';
import Character from '../models/character';


// Classes
class Migrations {
    public static async up() {
        await Database.seq.sync();
        await Character.sync();
    }
    public static async down() {
        await Database.seq.drop();
    }
}


// Code
export default Migrations;