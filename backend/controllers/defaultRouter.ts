import { Router } from 'express'

const router = Router()

type PasswordForService = {
    id: number
    service: string
    login: string
    password: string
}

// function that saves json to file
const savePasswords = (json: PasswordForService[]) => {
    const fs = require('fs')
    const path = require('path')
    fs.mkdirSync(path.join(__dirname, 'local'), { recursive: true })
    const filePath = path.join(__dirname, 'local/passwords.json')
    fs.writeFileSync(filePath, JSON.stringify(json))
}

// function that reads json from file
const readPasswords = (): PasswordForService[] => {
    try {
        const fs = require('fs')
        const path = require('path')
        const filePath = path.join(__dirname, 'local/passwords.json')
        const file = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(file)
    } catch (error) {
        return []
    }
}

router.get('/passwords', async (req, res) => {
    return res.json(readPasswords())
})

router.post('/passwords', async (req, res) => {
    const service = "" + req.query.service
    const login = "" + req.query.login
    const password = "" + req.query.password
    const id = new Date().getTime()
    const passwords = readPasswords()
    passwords.push({ id, service, login, password })
    savePasswords(passwords)
    return res.json({ hello: "world" })
})

router.delete('/passwords', async (req, res) => {
    const id = Number(req.query.id)
    const passwords = readPasswords()
    const newPasswords = passwords.filter((password) => password.id !== id)
    savePasswords(newPasswords)
    return res.json({ hello: "world" })
})

export default router;
