module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the foreign key constraints after both tables are created
    await queryInterface.addConstraint("Decisions", {
      fields: ["priorityFieldId"],
      type: "foreign key",
      references: {
        table: "Fields",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Decisions", {
      fields: ["negativeFieldId"],
      type: "foreign key",
      references: {
        table: "Fields",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Decisions", {
      fields: ["selectedOptionId"],
      type: "foreign key",
      references: {
        table: "Options",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Options", {
      fields: ["decisionId"],
      type: "foreign key",
      references: {
        table: "Decisions",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Fields", {
      fields: ["optionId"],
      type: "foreign key",
      references: {
        table: "Options",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the foreign key constraints if necessary
    await queryInterface.removeConstraint(
      "Decisions",
      "Decisions_priorityFieldId_foreign_idx"
    );
    await queryInterface.removeConstraint(
      "Decisions",
      "Decisions_negativeFieldId_foreign_idx"
    );
    await queryInterface.removeConstraint(
      "Decisions",
      "Decisions_selectedOptionId_foreign_idx"
    ); // Add this line
    await queryInterface.removeConstraint(
      "Options",
      "Options_decisionId_foreign_idx"
    );
    await queryInterface.removeConstraint(
      "Fields",
      "Fields_optionId_foreign_idx"
    );
  },
};
