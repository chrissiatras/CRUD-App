
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vessel').del()
    .then(function () {
      const vessels = [
        {
          imo: "9116462",
          mmsi: "1073727001",
          shipname: "AEGEANQUE EN",
          flag: "",
          vtype: "Passengers Ship",
        },
        {
          imo: "9700940",
          mmsi: "1028641360",
          shipname: "IVQ!PC=NDA  O0  O0",
          flag: "",
          vtype: "Cargo",
        },
        {
          imo: "8988600",
          mmsi: "999990394",
          shipname: "TEST25",
          flag: "",
          vtype: "General Cargo",
        },

      ];

      return knex('vessel').insert(vessels);
  });
};
