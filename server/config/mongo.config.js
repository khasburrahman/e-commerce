let db_url 
let db_name

switch (process.env.NODE_ENV) {
    case 'production':
        db_url = process.env.DB_MONGO_URL_PROD
        db_name = process.env.DB_NAME_PROD
        break;
    case 'development':
        db_url = process.env.DB_MONGO_URL_DEV
        db_name = process.env.DB_NAME_DEV
        break
    case 'test':
        db_url = process.env.DB_MONGO_URL_TEST
        db_name = process.env.DB_NAME_TEST
        break
    default:
        db_url = process.env.DB_MONGO_URL_DEV
        db_name = process.env.DB_NAME_DEV
        break;
}

module.exports = {
    db_url,
    db_name
}