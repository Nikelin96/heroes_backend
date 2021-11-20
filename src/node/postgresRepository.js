class PostgresRepository {
  constructor(client) {
    this.client = client;
  }

  createHeroAsync = async (hero) => {
    console.log('Creating hero');

    const query = 'INSERT INTO "hero" ("name") VALUES ($1) RETURNING *';
    let queryParameters = [hero.name];

    this.client.query(query, queryParameters)
      .then(result => {
        console.log(result.rows);
      })
      .catch(error => {
        console.error(error.stack);
      });
  };

  getHeroesAsync = async () => {
    console.log('Receiving heroes');

    const records = await this.client.query('SELECT * FROM "hero"');

    return records.rows.map(hero => {
      return { id: hero.Id, name: hero.Name }
    });
  };

  updateHeroAsync = async (hero) => {
    console.log('Updating hero');

    const query = 'UPDATE "hero" SET "name" = ($1) WHERE "id" = ($2)'

    let queryParameters = [hero.name, hero.id];

    this.client.query(query, queryParameters)
      .then(res => {
        console.log(res.rows);
      })
      .catch(error => {
        console.error(error.stack);
      });
  };

  deleteHeroAsync = async (id) => {
    console.log('Deleting hero by id: ', id);

    const query = 'DELETE FROM "hero" WHERE "id" = ($1)';
    let queryParameters = [id];

    await this.client.query(query, queryParameters);
  };
}

const getRepository = (client) => {
  return new PostgresRepository(client);
}

module.exports = getRepository;
