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
            allowNull: true,
        },
        ipk: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        tableName: "tb_mhs",
        timestamps: false,
    }
);

export default MHS;
