import { Injectable } from '@nestjs/common';
import { NearbyCentersQueryDto } from './dto/nearby-centers-query.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PspCentersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.pspCenter.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findNearby(query: NearbyCentersQueryDto) {
    const lat = Number(query.lat);
    const lng = Number(query.lng);

    const centers = await this.prisma.pspCenter.findMany({
      where: {
        supportsCybercrime: true,
      },
    });

    const withDistance = centers.map((center) => {
      const distance = this.calculateDistanceKm(
        lat,
        lng,
        center.latitude,
        center.longitude,
      );

      return {
        ...center,
        distanceKm: Number(distance.toFixed(2)),
      };
    });

    return withDistance.sort((a, b) => a.distanceKm - b.distanceKm);
  }

  async findOne(id: string) {
    return this.prisma.pspCenter.findUnique({
      where: { id },
    });
  }

  private calculateDistanceKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const earthRadiusKm = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }
}
