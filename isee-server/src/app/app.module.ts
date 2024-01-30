import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { CommonModule } from 'src/common/common.module';
import { configModule } from './modules/config.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [configModule, FirebaseModule, CommonModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
