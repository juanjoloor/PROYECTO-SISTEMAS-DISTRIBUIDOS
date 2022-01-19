const { MongoClient, ObjectId } = require('mongodb');
const { emit } = require('nodemon');
const { config } = require('../config/index');
const { battleRoyaleSchema } = require('../utils/schemas/battleSchema');

const USER = encodeURIComponent(config.dbUser); //La funcion encode nos garantiza que si tenemos caracteres especiales no tengamos problemas en conectarnos
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

// const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true$w=majority`;
    const MONGO_URI = `mongodb://${config.dbHost}/${DB_NAME}`;
//Contruimos la libreria de mongo
class MongoLib {
    constructor() {
        //Defino quien es el cliente
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
    }

    //Usaremos el patron singleton para la conexion
    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                    }
                    console.log('Connected succesfully to mongo');
                    resolve(this.client.db(this.dbName));
                });
            });
        }

        return MongoLib.connection;
    }

    //Implementamos el crud
    
    //getAll paginacion y filtros   //getAll(collection, query, pagination, sort) 
  

    getAll(colecction, query, pageNumber, pageSize) { 

        return this.connect().then(db => {
            if(pageNumber==0){
                return db.collection(colecction).find(query).sort({fecha_auditoria:-1}).limit(pageSize).toArray();
            }else{
                return db.collection(colecction).find(query).sort({fecha_auditoria:-1}).skip(pageNumber * pageSize).limit(pageSize).toArray();
            }
            
        })
    }


    mapReduceCartasMasUsadasEnVictorias(collection) {
        return this.connect().then( db => {
            return db.collection(collection).mapReduce(
                function() {
                    if(this.winner && this.winner.cards && this.winner.cards.list) {
                        const arr = this.winner.cards.list.split(',');
                        arr[0] = arr[0].substring(1,arr[0].length);
                        arr[arr.length - 1] = arr[arr.length - 1].substring(0,arr[arr.length -1].length - 1);
                        arr.forEach((tag) => {
                            emit(tag.trim(), 1);
                        });
                    }
                },
                function(keyCustId, valuesPrices) {
                    return Array.sum(valuesPrices);
                },
                { out: "cartas_mas_usadas", maxTimeMS: 10000000 },
            )
        });
    }

    getTop10(collection) {
        return this.connect().then( db => {
            return db.collection(collection).find({}).sort({ value: -1}).limit(10).toArray()
        });
    }

    mapReduceJugadoresConMasVictorias(collection) {
        return this.connect().then( db => {
            return db.collection(collection).mapReduce(
                function() {
                    if(this.winner && this.winner.tag) {
                        emit(this.winner.tag, 1);
                    }
                },
                function(keyCustId, valuesPrices) {
                    return Array.sum(valuesPrices);
                },
                { out: "jugadores_con_mas_victorias", maxTimeMS: 10000000 },
            )
        });
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id)});
        })
    }

    create(collection, data) {
        data.fecha_auditoria = new Date();
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }

    update(collection, id, data) {
        data.fecha_auditoria = new Date();
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id)}, { $set: data }, { upsert: true });
        }).then(result => result.upsertedId || id);
    }

    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id)});
        }).then(() => id);
    }
}

module.exports = MongoLib;
