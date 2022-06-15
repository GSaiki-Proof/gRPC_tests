// Libs
import * as Sequelize from 'sequelize';

import { Model } from 'sequelize/types';
import Database from '../models/database';

// Data
const Character = Database.seq.define('character', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    life: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Code
export default Character;