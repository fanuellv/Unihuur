import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from 'next/server';
import path from "path";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();

    const titulo = formData.get("titulo");
    const descricao = formData.get("descricao");
    const categoria = formData.get("categoria");
    const precoAluguel = parseFloat(formData.get("precoAluguel"));
    const userId = parseInt(formData.get("userId"));
    const imagem = formData.get("imagem");

    let imagemUrl = "";

    if (imagem && typeof imagem.arrayBuffer === "function") {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");

      await mkdir(uploadsDir, { recursive: true });

      const bytes = await imagem.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${imagem.name}`;
      const filepath = path.join(uploadsDir, filename);

      await writeFile(filepath, buffer);

      imagemUrl = `/uploads/${filename}`;
    } else {
      console.log("Nenhuma imagem enviada ou formato inválido.");
    }

    const material = await prisma.material.create({
      data: {
        titulo,
        descricao,
        categoria,
        precoAluguel,
        status: "disponível",
        userId,
        imagemUrl,
      },
    });

    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar material:", error);
    return new Response(
      JSON.stringify({ message: "Erro ao criar material", error: error?.message || String(error) }),
      { status: 500 }
    );
  }
}
