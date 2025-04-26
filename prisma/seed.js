const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

if (process.env.SKIP_SEED === 'true') {
  console.log('Skipping seed script...');
  process.exit(0);
}

const prisma = new PrismaClient();

async function main() {
  const email = 'fanuell@example.com';

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('Usuário já existe, ignorando...');
    return;
  }

  const password = await bcrypt.hash('12345678', 10);

  const user = await prisma.user.create({
    data: {
      name: 'Fanuel',
      email,
      password,
    },
  });

  console.log('Usuário criado:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
