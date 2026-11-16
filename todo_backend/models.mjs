import { Model, DataTypes } from "sequelize"
import sequelize from "./db.mjs"

export class Todo extends Model {}

Todo.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    sequelize,
    modelName: "todo",
    timestamps: true
  }
)
