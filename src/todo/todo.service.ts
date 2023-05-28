import { EquipmentService } from 'src/equipment/equipment.service';
import { SupportService } from 'src/support/support.service';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Sequelize } from 'sequelize-typescript';
import { Employee } from 'src/employees/models/employee.model';
import { EquipmentAttachment } from 'src/equipment-attachment/models/equipment-attachment';

@Injectable()
export class TodoService {

  constructor(
    private equipmentService: EquipmentService,
    private supportService: SupportService,
    private sequelize: Sequelize,
  ) { }

  create(createTodoDto: CreateTodoDto) {
    return 'This action adds a new todo';
  }


  async getTodos(): Promise<any> {
    const equipmentTodos = await this.equipmentService.getEquipmentForTodo()
    const supportTodos = await this.supportService.findForTdo();
    return {
      equipmentTodo: [...equipmentTodos],
      supportTodos: [...supportTodos],
    };
  }


  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
