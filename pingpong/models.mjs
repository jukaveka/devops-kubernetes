import { Model, DataTypes } from "sequelize"
import sequelize from "./db.mjs"

export class Ping extends Model {}

Ping.init(
  {
    counter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "ping",
    timestamps: true
  }
)
