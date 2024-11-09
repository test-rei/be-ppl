import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const { DataTypes } = Sequelize;

const MK = sequelize.define(
    "MK",
    {
        id_mk: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama_mk: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sks: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "tb_mk",
        timestamps: false,
    }
);

export default MK;
