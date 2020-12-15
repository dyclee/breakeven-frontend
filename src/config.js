const imageUrl = process.env.DATABASE_HOST || "http://localhost:8000";
const baseUrl = `${imageUrl}/api`

module.exports = {
    imageUrl,
    baseUrl
}
