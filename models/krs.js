import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";
import MK from "./mk.js";
import MHS from "./mhs.js";

const { DataTypes } = Sequelize;

const KRS = sequelize.define(
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
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: "tb_krs",
        timestamps: false,
    }
);

MHS.hasMany(KRS, {
    foreignKey: "nim",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
KRS.belongsTo(MHS, {
    foreignKey: "nim",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

MK.hasMany(KRS, {
    foreignKey: "id_mk",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
KRS.belongsTo(MK, {
    foreignKey: "id_mk",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export default KRS;
