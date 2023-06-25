import { PrismaClient } from "@prisma/client";
import { colorChoice } from "../data/colorChoiceData";
import { products } from "../data/displayProductData";
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await prisma.colorChoice.createMany({
    data: colorChoice,
  });

  await prisma.displayProducts.createMany({
    data: products,
  });

  // const deleteUsers = await prisma.colorChoice.deleteMany({});
  // const deleteMy = await prisma.displayProducts.deleteMany({});

  console.log(`Data added.`);
  // console.log(`Data deleld.`, deleteUsers, deleteMy);
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
