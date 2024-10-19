# Microservicio de Autenticación

## Descripción
El microservicio de autenticación es una pieza fundamental de la arquitectura de microservicios, diseñada para gestionar el registro de usuarios, la autenticación y la autorización mediante JSON Web Tokens (JWT). Este servicio asegura que solo los usuarios autenticados puedan acceder a recursos protegidos y permite la gestión de sesiones de usuario de manera segura.

## Funcionalidades
- **Registro de Usuarios**: Permite a los nuevos usuarios crear una cuenta proporcionando sus credenciales (nombre, correo electrónico y contraseña).
- **Inicio de Sesión**: Autentica a los usuarios existentes mediante sus credenciales y genera un token JWT que permite el acceso a otros microservicios.
- **Verificación de Token**: Valida el token JWT para garantizar que el usuario está autenticado antes de acceder a recursos protegidos.
- **Recuperación de Contraseña**: Ofrece funcionalidad para que los usuarios puedan restablecer su contraseña en caso de olvido.

## Tecnologías Utilizadas
- **NestJS**: Framework para construir aplicaciones del lado del servidor eficientes y escalables.
- **JWT (JSON Web Tokens)**: Protocolo utilizado para la autenticación segura de usuarios.
- **TypeScript**: Lenguaje de programación que proporciona tipado estático, mejorando la calidad del código.
- **bcrypt**: Biblioteca para el hashing de contraseñas, asegurando que las contraseñas de los usuarios se almacenen de forma segura.
- **PostgreSQL**: Sistema de gestión de bases de datos utilizado para almacenar la información de los usuarios.
- **Docker**: Facilita la creación y gestión de contenedores para ejecutar el microservicio de manera aislada.
- **NATS**: Sistema de mensajería utilizado para la comunicación asíncrona con otros microservicios.

## Instalación
Para instalar y ejecutar el microservicio de autenticación, sigue estos pasos:

### 1. Clonar el Repositorio
Clona el repositorio del microservicio:
```bash
git clone https://github.com/TrujiDev/authentication-microservice.git
cd authentication-microservice
```

### 2. Instalar Dependencias
Instala las dependencias necesarias utilizando npm:
```bash
npm install
```

### 3. Configuración del Entorno
Crea un archivo `.env` en la raíz del proyecto y configura las variables necesarias:
```env
DATABASE_URL=postgres://user:password@localhost:5432/mydatabase
JWT_SECRET=mysecretkey
```

### 4. Ejecutar el Microservicio
Finalmente, ejecuta el microservicio:
```bash
npm run start
```

## Uso
El microservicio de autenticación expone las siguientes rutas:

- **POST /auth/register**: Registra un nuevo usuario.
- **POST /auth/login**: Inicia sesión y devuelve un token JWT.
- **GET /auth/verify**: Verifica el token JWT proporcionado.

## Mantenimiento
Para mantener el microservicio actualizado, asegúrate de:
- Revisar y aplicar actualizaciones de seguridad a las dependencias.
- Realizar pruebas regulares para asegurar el correcto funcionamiento del servicio.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir a este microservicio, sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`).
3. Haz un commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4. Haz push a la branch (`git push origin feature/AmazingFeature`).
5. Abre un Pull Request.
