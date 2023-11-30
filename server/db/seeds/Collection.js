export async function seed(knex) {

  await knex('Collection').del()
  await knex('Collection').insert([
    {
      id: 1,
      duckId: 1,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 2,
      duckId: 2,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 3,
      duckId: 3,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 4,
      duckId: 4,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 5,
      duckId: 5,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 6,
      duckId: 6,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 7,
      duckId: 7,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 8,
      duckId: 8,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 9,
      duckId: 9,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 10,
      duckId: 10,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 11,
      duckId: 11,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 12,
      duckId: 12,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 13,
      duckId: 13,
      auth0Id: "",
      timesCollected: 0
    },
    {
      id: 14,
      duckId: 14,
      auth0Id: "",
      timesCollected: 0
    },
  ])
}

