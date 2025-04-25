// app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';  // Importar o Prisma
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const { name, email, password } = await request.json();

  // Verificar se o email já existe
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return NextResponse.json(
      { message: 'Usuário já existe' },
      { status: 400 }
    );
  }

  // Criar um novo usuário
  const hashedPassword = await bcrypt.hash(password, 10);  // Criptografar a senha

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'Usuário criado com sucesso!' ,
    user: { id: newUser.id, email: newUser.email }
  });
}
