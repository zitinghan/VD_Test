import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  //return res.send(Object.values(req.context.models.users));
  return res.status(200).send("hello world");
});

export default router;