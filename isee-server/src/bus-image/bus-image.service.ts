import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DefaultDto } from 'src/common/dto/deafult.dto';
import {
  BusImageResultCliDto,
  BusImageResultDto,
} from './dto/bus-image.result.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { BusImageDto } from './dto/bus-image.dto';
import { BusRouteService } from 'src/bus-route/bus-route.service';

@Injectable()
export class BusImageService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private busRouteService: BusRouteService,
  ) {}

  filterBus(bus_ids: string[]): string[] {
    const result: string[] = [];
    for (const busId of bus_ids) {
      if (this.busRouteService.BusRouteSet.has(busId)) {
        result.push(busId);
      }
    }
    return result;
  }
  async uploadImage(
    image_string: string,
  ): Promise<DefaultDto<BusImageResultCliDto>> {
    let result: string[] = [];
    const AI_URL: string = this.configService.get('AI_URL');
    const { data } = await firstValueFrom(
      this.httpService
        .post<BusImageResultDto>(AI_URL, BusImageDto.of(image_string), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response);
            throw new InternalServerErrorException(
              'Failed to retrieve route info by image from the ai-server.',
            );
          }),
        ),
    );
    result = this.filterBus(data.result); // TODO : Filter by bus number
    console.log('Detected:', data.result, 'Filtered:', result);
    return DefaultDto.of<BusImageResultCliDto>(
      true,
      'Bus route names detected from the image.',
      BusImageResultCliDto.of(result),
    );
  }
}
