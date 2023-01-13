import {Sequelize} from 'sequelize';

const db = new Sequelize('nombrebd', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
});

export default db;