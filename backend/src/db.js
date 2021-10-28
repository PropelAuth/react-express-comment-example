const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize({ dialect: "sqlite", storage: "./db.sqlite" })

const Comment = sequelize.define(
    "Comment",
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        timestamps: true, // add createdAt and updatedAt
    }
)

module.exports = {
    sequelize,
    Comment,
}
