import sequelize from "../config/database";
import { MK } from "./mk";
import { KRS } from "./krs";
import { MHS } from "./mhs";
import { IPK } from "./ipk";

// Relasi antar tabel (Jika ada relasi)
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

export default { sequelize, MK, KRS, MHS, IPK };
