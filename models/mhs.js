import { DataTypes } from "sequelize";
import { define } from "../config/database";

const MHS = define(
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
