const MongoLib = require('../lib/mongo');

//Logica de negocio
class BattleService {

    constructor() {
        this.collection = 'ClashRoyale-Matches';
        this.mongoDB = new MongoLib();
    }

    async getBattles({ tags }, pageNumber, pageSize) {
        const query = tags && { tags: { $in: tags }};
        const battles = await this.mongoDB.getAll(this.collection, query, pageNumber, pageSize);
        return battles || [];
    }

    async getBattle({ battleId }) {
        const battle = await this.mongoDB.get(this.collection, battleId);
        return battle || {};
    }

    async top10JugadoresWinner() {
        await this.mongoDB.mapReduceJugadoresConMasVictorias(this.collection);
        const battles = await this.mongoDB.getTop10('jugadores_con_mas_victorias');
        return battles || [];
    }

    async top10CartasMasUsadasWinner() {
        await this.mongoDB.mapReduceCartasMasUsadasEnVictorias(this.collection);
        const battles = await this.mongoDB.getTop10('cartas_mas_usadas');
        return battles || [];
    }

    async createBattle({ battle }) {
        const createBattleId = await this.mongoDB.create(this.collection, battle)
        return createBattleId;
    }

    async updateBattle({ battleId, battle } = {}) {
        const updateBattleId = await this.mongoDB.update(this.collection, battleId, battle);
        return updateBattleId;
    }

    async deleteBattle({ battleId }) {
        const deletedBattleId = await this.mongoDB.delete(this.collection, battleId);
        return deletedBattleId;
    }
}

module.exports = BattleService;