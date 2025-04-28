import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { email, senha } = await request.json();

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
  const passwordMatch = await bcrypt.compare(senha, user.senha);

  if (!passwordMatch) {
    return NextResponse.json(
      { message: 'Email ou senha incorretos' },
      { status: 400 }
    );
  }

  // Gerar o token JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email }, // Dados que você quer incluir no token
    process.env.JWT_SECRET,                  // A chave secreta (coloque em .env)
    { expiresIn: '1h' }                      // Expiração do token
  );

  // Retorna a resposta com o token
  return NextResponse.json({
    message: 'Login efetuado com sucesso!',
    user: { id: user.id, name: user.name, email: user.email, tipoConta: user.tipoConta },
    token, // Adiciona o token na resposta
  });
}
