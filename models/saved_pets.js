module.exports = function (sequelize, Sequelize) {
    let SavedPets = sequelize.define("SavedPets", {
        animalID: Sequelize.INTEGER(25),
        petName: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },

        breedPrimary: {
            Sequelize.STRING(100),
            allowNull: false,
        },

        petDescription: {
            Sequelize.STRING(100),
            allowNull: false,
        },
        petPhotoURL: {
            Sequelize.STRING(225),
        },

        locationAddress: {
            Sequelize.STRING(225),
            allowNull: false,
        },

        locationCity: {
            Sequelize.STRING(100),
            allowNull: false,
        },

        locationState: {
            Sequelize.STRING(100),
            allowNull: false,
        },

        locationPostCode: {
            Sequelize.STRING(100),
            allowNull: false,
        },

        locationCountry: {
            Sequelize.STRING(100),
            allowNull: false,
        },

        locationEmail: {
            Sequelize.STRING(100),
            allowNull: false,
        },

        locationPhoneNumber: {
            Sequelize.STRING(100),
            allowNull: false,
        },

        distanceMiles: {
            Sequelize.STRING(100),
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