const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('12345678', 10); // senha encriptada

  const user = await prisma.User.create({
    data: {
      name: 'Fanuel',
      email: 'fanuell@example.com',
      password: password,
    },
  });

  console.log('User criado:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  
  if (process.env.SKIP_SEED === 'true') {
    console.log('Skipping seed script...');
    process.exit(0);
  }
