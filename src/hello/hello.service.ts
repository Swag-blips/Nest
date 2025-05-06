import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  gethello(): string {
    return 'Hello nNest JS';
  }
}
