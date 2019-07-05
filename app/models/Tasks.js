module.exports = function (sequelize, DataTypes) {
<<<<<<< HEAD
  var Tasks = sequelize.define('Tasks', {
=======
  var Tasks = sequelize.define("Tasks", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
>>>>>>> 06cef6ba883408bf88577b90442899ff0616c95e
    type: DataTypes.STRING,
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    date: DataTypes.DATE,
    urgent: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  })
  Tasks.associate = function (models) {
    Tasks.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Tasks
}
