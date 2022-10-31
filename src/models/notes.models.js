/*
Create schema ORM for Sequelize
*/
module.exports = (sequelize, Sequelize) => {
    const Notes = sequelize.define("notes", {
     id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        
     },
     dateCreated : Sequelize.DATEONLY,
     lastModified : Sequelize.DATEONLY,  
     text: {
          type: Sequelize.STRING(255),
          allowNull: false
        }
    },
    {
      createdAt: 'dateCreated',
      updatedAt: 'lastModified'
    });
    return Notes;
  };
  