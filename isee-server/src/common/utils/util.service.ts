import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UtilService {
  constructor(private configService: ConfigService) {}

  buildApiUrl(url: string, params: Map<string, string>): string {
    const service_key: string = this.configService.get('DATA_GOV_API_KEY');
    let result = url;
    result += `?serviceKey=${service_key}`;

    for (const [key, value] of params) {
      result += `&${key}=${value}`;
    }
    return result;
  }
}
