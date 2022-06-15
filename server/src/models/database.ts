import { Sequelize } from 'sequelize';

// Libs
class Database {
    private static database: string = 'grpc_user';
    private static user: string = 'grpc_user';
    private static password: string = 'grpc_password';
    public static seq: Sequelize = new Sequelize(
        this.database, this.user, this.password, {
            host: 'grpc_db',
            port: 5432,
            dialect: 'postgres',
            logging: false
        }
    );
}

export default Database;