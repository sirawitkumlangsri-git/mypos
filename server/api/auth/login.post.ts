//server/api/auth/login.post.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    throw createError({
      statusCode: 400,
      message: 'User not found or invalid data.',
    });
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createError({
      statusCode: 400,
      message: 'Invalid credentials.',
    });
  }

  // Create a token
  const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

  return {
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      uuid: user.uuid,
      firstname: user.firstname,
      lastname: user.lastname
    },
  };
});