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
            defaultValue: 0,
        },
        ipk: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: "tb_ipk",
        timestamps: false,
        indexes: [
            {
                unique: true, // Menandakan bahwa kombinasi nim, semester, dan tahun harus unik
                fields: ["nim", "semester", "tahun"], // Kombinasi kolom untuk kunci unik
            },
        ],
    }
);

// Definisikan relasi antara MHS dan IPK
MHS.hasMany(IPK, {
    foreignKey: "nim",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
IPK.belongsTo(MHS, {
    foreignKey: "nim",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export default IPK;
