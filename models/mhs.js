import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const { DataTypes } = Sequelize;

const MHS = sequelize.define(
    "MHS",
    {
        nim: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        nama_mhs: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ips: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        ipk: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: "tb_mhs",
        timestamps: false,
    }
);

export default MHS;
