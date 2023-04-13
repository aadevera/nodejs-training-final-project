import { Module } from '@nestjs/common';
import { CampersModule } from './campers/campers.module';
import { PrismaModule } from 'libs/prisma/prisma.module';

@Module({
  imports: [CampersModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
