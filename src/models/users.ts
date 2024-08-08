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
        allowNull : true,
    })
    phone_number!: string;


    @Column({
        type : DataType.DATE,
        allowNull : true,
    })
    last_login!: string;

    @Column({
        type : DataType.STRING,
        allowNull : true,
    })
    firebase_uid!: string;

    @Column({
        type : DataType.BOOLEAN,
        allowNull : true,
    })
    email_verified!: boolean;

    @Column({
        type : DataType.INTEGER,
        allowNull : true,
    })
    number_of_login!: number;
}