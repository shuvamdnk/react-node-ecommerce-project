import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
dotenv.config();

const connection: mysql2.Connection = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
})


const result = connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`, (err, results) => {
    if (err) {
        console.log('Error => ', err);
        return;
    }
    return results
    // console.log(results);
})
   
// console.log('Database', result);

const sequelize = new Sequelize(String(process.env.DATABASE_NAME), String(process.env.DATABASE_USERNAME), process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false
});

if (result) {
    sequelize.authenticate()
        .then(() => {
            console.log('Database connected.');
        })
        .catch((err) => {
            console.error('Unable to connect to the database:' + err);
        });
}

export default sequelize;