import mysql from 'mysql2/promise'

export const connectDB = async () => {
    let connection = await mysql.createConnection({
        host : process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    return connection;
}