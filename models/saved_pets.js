
module.exports = function (sequelize, DataTypes) {
    let SavedPets = sequelize.define('SavedPets', {
        UserId: {
            type: DataTypes.INTEGER
        },
        animalID: {
            type: DataTypes.INTEGER,
        },

        petName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        petPhoto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        petAge: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        petDesc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        petLocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        petAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        petEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        petPhone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        petOrgID: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    });

    SavedPets.associate = function (models) {
        // We're saying that a SavedPets should belong to an User
        // A SavedPets can't be created without an User due to the foreign key constraint
        SavedPets.belongsTo(models.User, {
            foreignKey: {
                name: "UserId",
                allowNull: false
            }
        });
    };

    return SavedPets;
};