import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';

interface StudentInterface {
    id?: number,
    name: string,
    email: string,
    phone: string,
    password: string
}

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public phone!: string;
    public password!: string
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
}
)

User.sync({ force: false, alter: true })
    .then(() => {
        console.log("User table sync.");
    })
    .catch((err) => {
        console.log("some error occurs.." + err);
    })

export { User }