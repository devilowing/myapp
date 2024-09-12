module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      debtId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Debts',
          key: 'id'
        },
        allowNull: false
      },
      paymentAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      timestamps: true
    });
  
    return Payment;
  };
  