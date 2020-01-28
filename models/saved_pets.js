
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
        }
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