import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";
import MHS from "./mhs.js";

const { DataTypes } = Sequelize;

const IPK = sequelize.define(
    "IPK",
    {
        id_ipk: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nim: {
            type: DataTypes.STRING,
            references: {
                model: MHS,
                key: "nim",
            },
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tahun: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ips: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        ipk: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: "tb_ipk",
        timestamps: false,
    }
);

export default IPK;
