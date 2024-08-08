import {
    Table,
    Model,
    Column,
    DataType
} from 'sequelize-typescript';


@Table({
    timestamps : true,
    tableName : 'users'
})
export class Users extends Model {
    @Column({
        type : DataType.STRING,
        allowNull : false,
    })
    first_name!: string;

    @Column({
        type : DataType.STRING,
        allowNull : false,
    })
    last_name!: string;

    @Column({
        type : DataType.STRING,
        allowNull : false,
        unique: true
    })
    email!: string;


    @Column({
        type : DataType.STRING,
        allowNull : false,
    })
    phone_number!: string;


    @Column({
        type : DataType.DATE,
        allowNull : true,
    })
    last_login!: string;
}