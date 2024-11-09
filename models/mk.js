import { DataTypes } from "sequelize";
import { define } from "../config/database";

const MK = define(
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
