
module.exports = function (sequelize, DataTypes) {
    let SavedPets = sequelize.define('SavedPets', {
        animalID: {
            type: DataTypes.INTEGER,
        },

        petName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });

    SavedPets.associate = function (models) {
        // We're saying that a SavedPets should belong to an User
        // A SavedPets can't be created without an User due to the foreign key constraint
        SavedPets.belongsTo(models.User, {
            foreignKey: {
                
                allowNull: false
            }
        });
    };

    return SavedPets;
};