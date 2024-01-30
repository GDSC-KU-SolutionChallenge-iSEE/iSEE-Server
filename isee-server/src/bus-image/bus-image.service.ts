import { Injectable } from '@nestjs/common';
import { DefaultDto } from 'src/common/dto/deafult.dto';
import { BusImageResultDto } from './dto/bus-image.result.dto';

@Injectable()
export class BusImageService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uploadImage(image: string): DefaultDto<BusImageResultDto> {
    const randomNum = Math.floor(Math.random() * 6);

    const result: string[] = [];

    for (let i: number = 0; i < randomNum + 1; i += 1) {
      const randomLength = Math.floor(Math.random() * 5 + 1);
      const charset = 'ABCD0123456789';
      let tmp_string = '';
      for (let i = 0; i < randomLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        tmp_string += charset.charAt(randomIndex);
      }
      result.push(tmp_string);
    }

    // Repeat the random string the number of times specified by the random number

    return DefaultDto.of<BusImageResultDto>(
      true,
      '',
      BusImageResultDto.of(result),
    );
  }
}
