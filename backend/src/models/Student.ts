import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';

interface StudentInterface{
    id?:number,
    name:string,
    email:string,
    phone:string,
    stream:string,
    gender:string,
    address:string
}

class Student extends Model{
    public id!:number;
    public name!:string;
    public email!:string;
    public phone!:string;
    public stream!:string;
    public gender!:string;
    public address!:string

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Student.init(
    {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey:true
        }, 
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        profile_pic:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        email:{
            type:DataTypes.STRING(50),
            allowNull:false,
            unique:true
        },
        phone:{
            type:DataTypes.STRING(30),
            allowNull:false,
        },
        stream:{
            type:DataTypes.STRING(30),
            allowNull:false,
        },
        gender:{
            type:DataTypes.STRING(10),
            allowNull:false,
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },{
        sequelize,
        modelName: 'Student',
        tableName: 'students',
        timestamps:true
    }
)

Student.sync({force:false,alter:false})
.then(() => {
    console.log("Student table sync.");
})
.catch((err) => {
    console.log("some error occurs.."+err);
})

export { Student }