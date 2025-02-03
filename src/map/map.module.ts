import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { HttpModule } from '@nestjs/axios';
import { MapResolver } from './map.resolver';

@Module({
  imports: [HttpModule],
  providers: [MapService, MapResolver],
})
export class MapModule {}
