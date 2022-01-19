const joi = require('@hapi/joi');

//Para comprobar que el id es un string y cumple la expresion regular:
// const battleIdSchema = joi.string().pattern(/^[a-zA-Z0-9]{24}$/);
const battleIdSchema = joi.string();
const stringSchema = joi.string();

const playerBattleSchema = {
  tag: stringSchema,
  startingTrophies: stringSchema,
  trophyChange: stringSchema,
  crowns: stringSchema,
  kingTowerHitPoints: stringSchema,
  princessTowersHitPoints: stringSchema,
  clan: { tag: stringSchema, badgeId: stringSchema },
  card1: { id: stringSchema, level: stringSchema, },
  card2: { id: stringSchema, level: stringSchema, },
  card3: { id: stringSchema, level: stringSchema, },
  card4: { id: stringSchema, level: stringSchema, },
  card5: { id: stringSchema, level: stringSchema, },
  card6: { id: stringSchema, level: stringSchema, },
  card7: { id: stringSchema, level: stringSchema, },
  card8: { id: stringSchema, level: stringSchema, },
  cards: {
    list: stringSchema
  },
  totalcard: { level: stringSchema },
  troop: { count: stringSchema },
  structure: { count: stringSchema },
  spell: { count: stringSchema },
  common: { count: stringSchema },
  rare: { count: stringSchema },
  epic: { count: stringSchema },
  legendary: { count: stringSchema },
  elixir: { average: stringSchema }
};

const battleRoyaleSchema = {
  id: stringSchema,
  battleTime: stringSchema,
  arena: { id: stringSchema, },
  gameMode: { id: stringSchema, },
  average: { startingTrophies: stringSchema, },
  winner: playerBattleSchema,
  loser: playerBattleSchema
};

module.exports = {
  battleIdSchema,
  battleRoyaleSchema,
};