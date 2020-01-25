module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define("User", {
        // Giving the User model a name of type STRING

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: 'A first name is required.'
                }
            },
        },
        
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: 'A last name is required.'
                }
            },
        },
            
        photoURL: {
            type: DataTypes.STRING,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'An email is required.'
                },
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
    });

    User.sync();

    User.associate = function (models) {
        // Associating User with Posts
        // When an User is deleted, also delete any associated Posts
        User.hasMany(models.SavedPets, {
            onDelete: "cascade"
        });
    };

    return User;
};
