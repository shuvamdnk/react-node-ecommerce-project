import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';

interface AdminInterface{
  id?:number,
  name:string,
  email:string,
  password:string
}


class Admin extends Model{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique:true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'admins',
    modelName: 'Admin',
    timestamps:true
  }
);

Admin.sync({force:false,alter:false})
.then(() => {
    console.log("Admin table sync.");
})
.catch((err) => {
    console.log("some error occurs.."+err);
})

export { Admin };
