import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './models/todo.model';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { SupportModule } from 'src/support/support.module';

@Module({
  imports: [
    EquipmentModule,
    SupportModule,
    SequelizeModule.forFeature([Todo])
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule { }
