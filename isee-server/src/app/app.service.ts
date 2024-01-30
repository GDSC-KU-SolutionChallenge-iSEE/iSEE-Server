import { Injectable } from '@nestjs/common';
import { DefaultDto } from 'src/common/dto/deafult.dto';

@Injectable()
export class AppService {
  getHealth(): DefaultDto<null> {
    return DefaultDto.of<null>(true, 'iSEE Server is running', null);
  }
}
