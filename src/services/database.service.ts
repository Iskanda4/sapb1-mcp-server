import { ItemSeries } from "../types/index.js";
import { PrismaClient } from "../../generated/prisma/index.js";

export class DatabaseService {
  private static instance: DatabaseService;
  private prisma: PrismaClient;

  constructor() {
    if (DatabaseService.instance) {
      throw new Error("Use DatabaseService.getInstance() instead");
    }
    this.prisma = new PrismaClient();
    DatabaseService.instance = this;
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    const prisma = new PrismaClient();
    return DatabaseService.instance;
  }

  public async getAllItemSeries(): Promise<ItemSeries[]> {
    const itemSeries = await this.prisma.itemSeries.findMany();
    return itemSeries.map((item) => ({
      series: item.id,
      name: item.name,
    }));
  }

  public async upsertItemSeries(itemSeries: ItemSeries): Promise<void> {
    await this.prisma.itemSeries.upsert({
      where: { id: itemSeries.series },
      update: { name: itemSeries.name },
      create: {
        id: itemSeries.series,
        name: itemSeries.name,
      },
    });
  }

  public async getItemSeries(itemSeriesName: string): Promise<number | null> {
    const itemSeries = await this.prisma.itemSeries.findFirst({
      where: {
        name: itemSeriesName,
      },
    });

    if (!itemSeries) {
      return null;
    }

    return itemSeries.id;
  }
}
