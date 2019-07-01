module.exports = function(sequelize, DataTypes) {
  var Tasks = sequelize.define("Tasks", {
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
    },
    user: DataTypes.STRING
  });
  return Tasks;
};
