const express = require("express");

const router = express.Router();

db = require("../data/db");

let posts = [
    {
        title: "The post title",
        contents: "The post contents",
        created_at: "Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)",
        updated_at: "Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) ",
    },
];

router.get("/", (req, res) => {
    db.find(req.query)
        .then((post) => {
            res.status(200).json(post);
        })
        .catch(() => {
            res.status(500).json({
                error: "The posts information could not be retrieved.",
            });
        });
});

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            } else {
                res.status(200).json(post);
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: "The post information could not be retrieved.",
            });
        });
});

router.get("/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            } else {
                res.status(200).json(post);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "The post could not be removed" });
        });
});

router.post("/", (req, res) => {
    const postInfo = req.body;
    if (!postInfo.title || !postInfo.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post.",
        });
    } else {
        db.insert(postInfo)
            .then((post) => {
                res.status(201).json(post);
            })
            .catch((error) => {
                res.status(500).json({
                    error:
                        "There was an error while saving the post to the database",
                });
            });
    }
});

router.post("/:id/comments", (req, res) => {
    const commentInfo = req.body;
    if (!commentInfo.text) {
        res.status(400).json({
            errorMessage: "Please provide text for the comment.",
        });
    } else {
        db.insertComment(comment)
            .then((comment) => {
                if (comment) {
                    res.status(201).json(comment);
                } else {
                    res.status(404).json({
                        message:
                            "The post with the specified ID does not exist.",
                    });
                }
            })
            .catch((comment) => {
                res.status(500).json({
                    error:
                        "There was an error while saving the comment to the database",
                });
            });
    }
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    if (!changes.title || changes.contents) {
        res.status(400).json({
            message: "The post with the specified ID does not exist.",
        });
    } else {
        db.update(req.params.id, changes)
            .then((post) => {
                if (post) {
                    res.status(200).json(post);
                } else {
                    res.status(404).json({
                        message:
                            "The post with the specified ID does not exist.",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    error: "The post information could not be modified.",
                });
            });
    }
});

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            } else {
                res.status(200).json(post);
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "The post could not be removed" });
        });
});

module.exports = router;
