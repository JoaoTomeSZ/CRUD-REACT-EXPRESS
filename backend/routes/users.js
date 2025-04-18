const express = require("express")
const { Router } = require("express")
const { getUsers, getUser, postUser, deleteUser, patchUser } = require("../controllers/users")

const app = express()

const router = Router()

router.get("/", getUsers)

router.get("/:id", getUser)

router.post("/", postUser)

router.patch("/:id", patchUser)

router.delete("/:id", deleteUser)

module.exports = router