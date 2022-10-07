class PostgresRepository {
  constructor(client) {
    this.client = client;
  }

  getUnitsAsync = async () => {
    console.log('Receiving units');

    const query = `
      SELECT 
        unit.name AS unit_name
        , unit_stat.hit_points AS unit_hp
        , unit_stat.damage_points AS unit_damage
        , unit_stat.defense_points AS unit_defense
        , unit_stat.health_points AS unit_health
        , unit_storage.wood AS unit_wood
        , unit_storage.food AS unit_food
        , unit_storage.gold AS unit_gold
        , unit_storage.stone AS unit_stone  
        , equipment.name AS equipment_name
        , equipment_stat.hit_points AS equipment_hp
        , equipment_stat.damage_points AS equipment_damage
        , equipment_stat.defense_points AS equipment_defense
        , equipment_stat.health_points AS equipment_health
        , equipment_storage.wood AS equipment_wood
        , equipment_storage.food AS equipment_food
        , equipment_storage.gold AS equipment_gold
        , equipment_storage.stone AS equipment_stone
      FROM unit AS unit
        JOIN stat AS unit_stat ON unit_stat.id = unit.stat_id
        JOIN storage AS unit_storage ON unit_storage.id = unit.storage_id
        JOIN equipment AS equipment ON equipment.unit_id = unit.id
        JOIN stat AS equipment_stat ON equipment_stat.id = equipment.stat_id
        LEFT JOIN storage AS equipment_storage ON equipment_storage.id = equipment.storage_id;
      `

    const records = await this.client.query(query);

    return records.rows.map(record => {
      return record;
    });
  };
}

const getRepository = (client) => {
  return new PostgresRepository(client);
}

module.exports = getRepository;
