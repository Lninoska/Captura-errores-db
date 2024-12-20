const { Pool } = require('pg')
const { cursor } = require('pg-cursor')
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const insertarAlumno = async(nombres, apellidos, n_identificacion, edad) => {
    try {
        const query = 'INSERT INTO Estudiantes (nombres, apellidos, n_identificacion, edad) VALUES ($1, $2, $3, $4)'
        const values = [nombres, apellidos, n_identificacion, edad]
        const result = await pool.query(query, values)
        console.log('Estudiantes nuevo insertado:', result.rowCount);
    } catch (error) {
        if(error.code === '08003') {
            console.error('Error: no hay conexión.')
        }
        else if(error.code === '08006') {
            console.error('Error: conexión fallida.')
        }
        else if(error.code === '2F002') {
            console.error('Error: no esta permitido modificar datos de SQL')
        }
        else if(error.code === '57P03') {
            console.error('Error: ahora no hay conexión')
        }
        else if(error.code === '42601') {
            console.error('Error: Hay un error en la sintaxis')
        }
        else if(error.code === '42501') {
            console.error('Error: no tienes los permisos suficientes')
        }
        else if(error.code === '42602') {
            console.error('Error: nombre no valido')
        }
        else if(error.code === '42622') {
            console.error('Error: el nombre tiene muchos caracteres')
        }
        else if(error.code === '42939') {
            console.error('Error: ese nombre ya esta registrado')
        }
        else if(error.code === '42703') {
            console.error('Error: no existe la columna')
        }
        else if(error.code === '42000') {
            console.error('Error: error de sintaxis o violacion de acceso')
        }
        else if(error.code === '42P01') {
            console.error('Error: no exixte la tabla')
        }
        else if(error.code === '42P02') {
            console.error('Error: no exixte el parametro')
        } else {
            console.error('Error inesperado:', error.message);
        }
    }
}

insertarAlumno('Diana', 'Vial', 9873452, 32)