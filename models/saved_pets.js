
module.exports = function (sequelize, DataTypes) {
    let SavedPets = sequelize.define('SavedPets', {
        animalID: {
            type: DataTypes.INTEGER,
        },

        petName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        breedPrimary: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        petDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        petPhotoURL: {
            type: DataTypes.STRING,
        },

        locationAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        locationCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        locationState: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        locationPostCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        locationCountry: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        locationEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        locationPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        distanceMiles: {
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