import express from 'express';
import userRouter from './user/user.route';

export const router = express();

router.use('/user', userRouter);
router.use((req, res) => {
  return res.status(404).json({ message: 'This endpoint was not found!' });
});

export default router;
