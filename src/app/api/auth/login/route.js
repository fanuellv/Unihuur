// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { email, password } = await request.json();

  // Verificar se o usuário existe
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  // Verificar se a senha está correta
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 400 });
  }

  // Gerar token JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET, // Usando a variável de ambiente para o segredo
    { expiresIn: '1h' }
  );

  return NextResponse.json({ message: 'Login bem-sucedido', token });
}
