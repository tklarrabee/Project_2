module.exports = function (sequelize, DataTypes) {
  var Tasks = sequelize.define("Tasks", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
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
  });
  Tasks.associate = function (models) {
    Tasks.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  }


  return Tasks;

};
