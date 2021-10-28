const { Comment, sequelize } = require("./db")

async function listAllComments() {
    const comments = await Comment.findAll({
        order: [["createdAt", "DESC"]],
        attributes: [
            "username",
            "text",
            // Convert to unix time
            [sequelize.fn("strftime", "%s", sequelize.col("createdAt")), "created_at"],
        ],
        raw: true, // Return an array
    })
    return comments
}

async function createComment(username, text) {
    await Comment.create({ username, text })
}

module.exports = {
    createComment,
    listAllComments,
}
