import { PrismaClient } from '@prisma/client';
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient();

async function seedCategories() {
  const categories = [];
  for (let i = 0; i < 100; i++) {
    categories.push({
      name: faker.commerce.department(), 
    });
  }

  await prisma.category.createMany({
    data: categories,
  });

  // await prisma.user.deleteMany();
  // console.log('Categories table cleared!');

}

seedCategories()
  .then(async () => {
    console.log(`yayy categories created!`);
    await prisma.$disconnect();
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  });
