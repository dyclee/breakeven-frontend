const imageUrl = process.env.DATABASE_HOST || "http://localhost:5000";
const baseUrl = `${imageUrl}/api`

module.exports = {
    imageUrl,
    baseUrl
}
