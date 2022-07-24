
# Prueba tecnica Javier Montaño Billetera company INC

Se desarrolla la prueba tecnica la cual desarrolla los puntos establacidos en el requerimiento
indicado. Contamos con autenticación usando JWT token, roles con el uso de guards en nestjs
la Base de datos es con MONGO DB y se encuentra conectada a Mongo Atlas (credenciales estan en el archivo .env) 
y el registro e inicio de sesion para un cliente, la creacion y recarga de su billetra actualizando
su balance en dolares y pesos. En el archivo .env Puede modificar la TRM del dia para la conversion en dolares por defecto
esta en 4407 COP.

Toda la api se puede observar su documentacion aquí con Swagger:

http://localhost:3000/documentation

Se puede importar la API en Postman con este link:

http://localhost:3000/documentation-json

Existen dos roles Admin y user:

Admin puede:
- Registrarse e Iniciar sesion
- Obtener todos los usuarios, eliminar un usuarios
- Ver todos las billeteras de cada usuario y eliminar billeteras

User:
- Registrarse e Iniciar sesion
- Crear billetera
- Recargar billetera


## To Start

Existe un user admin con las siguientes credenciales:
Por si se desea probar el ROL


{
    "email": "test@test.com",
    "password": "12345"
}


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Development with NESTJS

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## development by

- Author - Javier Montaño


## License

Nest is [MIT licensed](LICENSE).