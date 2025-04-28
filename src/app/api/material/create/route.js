import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { titulo, descricao, categoria, precoAluguel, userId } = await req.json();

    const material = await prisma.material.create({
      data: {
        titulo,
        descricao,
        categoria,
        precoAluguel,
        status: "disponível", // Status padrão
        userId,
      },
    });

    return new Response(JSON.stringify(material), { status: 201 });
  } catch (error) {
    console.error("Erro ao criar material:", error);
    return new Response(
      JSON.stringify({ message: "Erro ao criar material" }),
      { status: 500 }
    );
  }
}
