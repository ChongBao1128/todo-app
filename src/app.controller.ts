import { Controller, Post, Body } from '@nestjs/common';
import { AppService, Todo } from './app.service';
import { CreateTodoDto } from './todos/dto/create-todo.dto';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.appService.createTodo(createTodoDto);
  }

}
