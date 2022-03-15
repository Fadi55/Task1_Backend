module.exports = (sequelize, Sequelize) => {
    const ExchangeMD = sequelize.define('ExchangeMD', {

        EUR: {
            type: Sequelize.FLOAT,
        },
        GBP: {
            type: Sequelize.FLOAT,
        },
        Base: {
            type: Sequelize.STRING,
        },
        dateExchnage: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
    

    });

    return ExchangeMD;
}