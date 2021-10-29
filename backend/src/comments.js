const { Comment, sequelize } = require("./db")
const { fetchBatchUserMetadataByUserIds } = require("./propelauth")

async function listAllComments() {
    const comments = await Comment.findAll({
        order: [["createdAt", "DESC"]],
        attributes: [
            "userId",
            "text",
            // Convert to unix time
            [sequelize.fn("strftime", "%s", sequelize.col("createdAt")), "created_at"],
        ],
        raw: true, // Return an array
    })
    return fetchAndAddUsernames(comments)
}

async function createComment(userId, text) {
    await Comment.create({ userId, text })
}

async function fetchAndAddUsernames(comments) {
    const userIds = [...new Set(comments.map((comment) => comment.userId))]
    const userIdToUserMetadata = await fetchBatchUserMetadataByUserIds(userIds)
    return comments.map((comment) => {
        return {
            ...comment,
            username: userIdToUserMetadata[comment.userId].username,
        }
    })
}

module.exports = {
    createComment,
    listAllComments,
}
