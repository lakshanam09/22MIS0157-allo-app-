import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear old data
  await prisma.reservation.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.warehouse.deleteMany();

  // Create warehouses
  const chennaiWarehouse = await prisma.warehouse.create({
    data: {
      name: "Chennai Warehouse",
    },
  });

  const bangaloreWarehouse = await prisma.warehouse.create({
    data: {
      name: "Bangalore Warehouse",
    },
  });

  // Create products
  const iphone = await prisma.product.create({
    data: {
      name: "iPhone 15",
    },
  });

  const airpods = await prisma.product.create({
    data: {
      name: "AirPods Pro",
    },
  });

  const macbook = await prisma.product.create({
    data: {
      name: "MacBook Air M3",
    },
  });

  // Create inventory
  await prisma.inventory.createMany({
    data: [
      {
        productId: iphone.id,
        warehouseId: chennaiWarehouse.id,
        totalStock: 10,
        reservedStock: 0,
      },
      {
        productId: iphone.id,
        warehouseId: bangaloreWarehouse.id,
        totalStock: 5,
        reservedStock: 0,
      },
      {
        productId: airpods.id,
        warehouseId: chennaiWarehouse.id,
        totalStock: 20,
        reservedStock: 0,
      },
      {
        productId: macbook.id,
        warehouseId: bangaloreWarehouse.id,
        totalStock: 7,
        reservedStock: 0,
      },
    ],
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });