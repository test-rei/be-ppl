import { DataTypes } from "sequelize";
import { define } from "../config/database";
import MK from "./mk";
import MHS from "./mhs";

const KRS = define(
    "KRS",
    {
        id_krs: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tahun: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nim: {
            type: DataTypes.STRING,
            references: {
                model: MHS,
                key: "nim",
            },
        },
        id_mk: {
            type: DataTypes.INTEGER,
            references: {
                model: MK,
                key: "id_mk",
            },
        },
        nilai: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "tb_krs",
        timestamps: false,
    }
);

export default KRS;
