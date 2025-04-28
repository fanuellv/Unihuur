// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const { email, password } = await request.json();

  // Verificar se o usuário existe
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'Email ou senha incorretos' },
      { status: 400 }
    );
  }

  // Verificar se a senha está correta
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json(
      { message: 'Email ou senha incorretos' },
      { status: 400 }
    );
  }

  // (Aqui depois você pode gerar token ou sessão)
  return NextResponse.json({
    message: 'Login efetuado com sucesso!',
    user: { id: user.id, name: user.name, email: user.email, tipoConta: user.tipoConta },
  });
}
