module.exports = function (sequelize, Sequelize) {
    let User = sequelize.define("User", {
        // Giving the User model a name of type STRING
        firstName: {
            Sequelize.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: 'A first name is required.'
                }
            },

            lastName: {
                Sequelize.STRING(50),
                allowNull: false,
                validate: {
                    len: {
                        args: [1, 50],
                        msg: 'A last name is required.'
                    }
                },

                photoURL: Sequelize.STRING,

                email: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: {
                            msg: 'An email is required.'
                        },
                        isUnique: connection.validateIsUnique(
                            'email',
                            'This email already exists.'
                        )
                    }
                },

                password: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                {
            instanceMethods: {
                generateHash: function (password) {
                    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
                },
                validPassword: function (password) {
                    return bcrypt.compareSync(password, this.password)
                }
            }
        });

    User.sync();

    export default User;

    User.associate = function (models) {
        // Associating User with Posts
        // When an User is deleted, also delete any associated Posts
        User.hasMany(models.SavedPets, {
            onDelete: "cascade"
        });
    };

    return User;
};
