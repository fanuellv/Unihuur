// app/api/material/create/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  const { nome, categoria, quantidade, preco } = await request.json();

  // Verificar se todos os campos obrigatórios estão presentes
  if (!nome || !categoria || quantidade === undefined || preco === undefined) {
    return NextResponse.json(
      { message: 'Campos obrigatórios não preenchidos' },
      { status: 400 }
    );
  }

  try {
    // Criar o material no banco
    const material = await prisma.material.create({
      data: {
        nome,
        categoria,
        quantidade: Number(quantidade),  // Garantir que seja um número
        preco: Number(preco),  // Garantir que seja um número
        status: "disponível",  // Status padrão
      },
    });

    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Erro ao adicionar material: ${error.message}` },
      { status: 500 }
    );
  }
}
