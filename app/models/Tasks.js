module.exports = function (sequelize, DataTypes) {
  var Tasks = sequelize.define('Tasks', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    note: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    event: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    task: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    date: DataTypes.DATE,
    urgent: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false
    }
  })
  Tasks.associate = function (models) {
    Tasks.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
        allowNull: false
      }
    })
  }
  return Tasks
}
