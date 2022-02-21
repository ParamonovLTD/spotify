import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from "path";


@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static')}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
    }),
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.t0hmz.mongodb.net/spotify?retryWrites=true&w=majority'),
    TrackModule,
    FileModule
  ]
})
export class AppModule {}