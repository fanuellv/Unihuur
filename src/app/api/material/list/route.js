import prisma from '@/lib/prisma';  // Certifique-se de importar corretamente a instância do prisma
import jwt from 'jsonwebtoken';  // Certifique-se de importar o jwt
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Obter o token JWT
    const token = request.headers.get('Authorization')?.split(' ')[1];  // Exemplo de obtenção do token

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: 'Token não fornecido.' }),
        { status: 401 }
      );
    }
    

    // Decodificar o token para pegar o userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Não usamos tipos aqui, pois estamos no JavaScript

    // Agora, vamos filtrar os materiais pelo userId
    const materiais = await prisma.material.findMany({
      where: {
        userId: decoded.userId,  // Assume que o userId está no token
      },
    });

    if (!materiais || materiais.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: 'Nenhum material encontrado.' }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(materiais), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar materiais:", error);
    return new NextResponse(
      JSON.stringify({ message: 'Erro ao buscar materiais. Tente novamente mais tarde.' }),
      { status: 500 }
    );
  }
}
