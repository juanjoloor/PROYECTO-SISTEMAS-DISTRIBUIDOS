const express = require('express');

const ValidationHandler = require('../utils/middleware/validationHandler');
const BattleService = require('../services/battle');
const { battleIdSchema, battleRoyaleSchema, } = require('../utils/schemas/battleSchema');


function battleApi(app) {
  const router = express.Router();
  app.use('/api/battle', router);

  const battleService = new BattleService();

  router.get(
    '/top10-player',
    async function (req, res, next) {
      try {
        console.log('INIT MAP REDUCE');
        const data = await battleService.top10JugadoresWinner();
        res.status(200).json({
          data: data,
          message: 'Proceso mapper y reduce terminado',
        }); 
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/top10-cards',
    async function (req, res, next) {
      try {
        console.log('INIT MAP REDUCE');
        const data = await battleService.top10CartasMasUsadasWinner();
        res.status(200).json({
          data: data,
          message: 'Proceso mapper y reduce terminado',
        }); 
      } catch (error) {
        next(error);
      }
    }
  );
    router.get("/", async function (req, res, next) {
      try { 
        const pageNumber = parseInt(req.query.pageNumber) || 0;
        console.log('pageNumber', pageNumber);
        const pageSize = parseInt(req.query.pageSize) || 10;
        const data = await battleService.getBattles({}, pageNumber, pageSize);
        res.status(200).json({      
          data: data, 
          message: "Battalas obtenidas con exito"
        });     
      } catch (error) { 
        next(error);  
      }
    });
  router.get(
    '/:battleId',
    ValidationHandler({ battleId: battleIdSchema }, 'params'),
    async function (req, res, next) {
      const { battleId } = req.params;
      try {
        const battle = await battleService.getBattle({ battleId });

        if(battle && battle._id) {
          res.status(200).json({
            data: battle,
            message: 'Batalla accedida con éxito',
          });
        } else {
          res.status(200).json({
            data: null,
            message: 'Batalla no encontrada',
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  
  router.post(
    '/',
    ValidationHandler(battleRoyaleSchema),
    async function (req, res, next) {
      const { body: battle } = req;
      try {
        const createdBattleId = await battleService.createBattle({
          battle
        });
        if(createdBattleId) {
          res.status(201).json({
            data: createdBattleId,
            message: 'Batalla creada',
          });
        } else {
          res.status(200).json({
            data: null,
            message: 'Batalla no creada',
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  
  router.put(
    '/:battleId',
    ValidationHandler({ battleId: battleIdSchema }, 'params'),
    ValidationHandler(battleRoyaleSchema),
    async function (req, res, next) {
      const { body: battle } = req;
      const { battleId } = req.params;
      try {
        const updatedBattleId = await battleService.updateBattle({
          battleId, battle
        });

        if(updatedBattleId) {
          res.status(201).json({
            data: updatedBattleId,
            message: 'Batalla actualizada',
          });
        } else {
          res.status(200).json({
            data: null,
            message: 'Batalla no encontrada',
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:battleId',
    ValidationHandler({ battleId: battleIdSchema }, 'params'),
    async function (req, res, next) {
      const { battleId } = req.params;
      try {
        const deletedBattleId = await battleService.deleteBattle({
          battleId
        });
        if(deletedBattleId) {
          res.status(200).json({
            data: deletedBattleId,
            message: 'Batalla Eliminada',
          });
        } else {
          res.status(200).json({
            data: null,
            message: 'Batalla no encontrada',
          });
        }
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = battleApi;
