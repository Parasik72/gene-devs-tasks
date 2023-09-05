import express from 'express';
import userRouter from './user/user.route';
import testsRouter from './test/test.route';

export const router = express();

router.use('/user', userRouter);
router.use('/tests', testsRouter);
router.use((req, res) => {
  return res.status(404).json({ error: 'This endpoint was not found!' });
});

export default router;
