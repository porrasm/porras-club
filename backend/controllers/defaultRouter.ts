import axios from 'axios'
import { Router } from 'express'
import { StreamCollection, StreamInfo } from './streams'

const router = Router()

router.get('/hello', async (req, res) => {
    return res.json({hello: "world"})
})

export default router;