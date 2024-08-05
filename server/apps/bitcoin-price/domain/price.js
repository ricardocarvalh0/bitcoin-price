const db = require('../db');

const priceDomain = {
    createTables: async () => {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("CREATE TABLE IF NOT EXISTS prices (timestamp TEXT, price REAL)", (err, _result) => {
                    if (err) {
                        console.log('error creating tables', err)
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })
        });
    },
    savePrice: async (price, timestamp) => {
        return new Promise((resolve, reject) => {
            const stmt = db.prepare("INSERT INTO prices VALUES (?, ?)");
            stmt.run([timestamp, price]);
            stmt.finalize((err) => {
                if (err) {
                    console.log('error saving price', err)
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    getHistory: async () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT timestamp, price FROM prices ORDER BY timestamp DESC LIMIT 10", (err, rows) => {
                if (err) {
                    console.log("error retrieving price history: ", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = priceDomain;
