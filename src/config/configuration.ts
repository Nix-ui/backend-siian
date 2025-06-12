export default () => ({
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || '3306', 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        type: process.env.DATABASE_TYPE as 'mysql',
    },
    frontend: {
        origin: process.env.FRONTEND_ORIGIN,
        methods: process.env.FRONTEND_METHODS
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        },
    },
});