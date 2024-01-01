import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(String(process.env.DATABASE_NAME),String(process.env.DATABASE_USERNAME),process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false
});

// const sequelize = new Sequelize({
//     database: 'my_database',
//     dialect: 'mysql',
//     username: 'my_username',
//     password: 'my_password',
// });


sequelize.authenticate()
.then(() =>{
    console.log('Database connected.');
})
.catch((err) => {
    console.error('Unable to connect to the database:'+err);
});
    

export default sequelize;