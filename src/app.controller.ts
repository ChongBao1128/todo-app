import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService, Todo } from './app.service';
import { CreateTodoDto } from './todos/dto/create-todo.dto';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTodos(): Todo[] {
    return this.appService.getTodos();
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.appService.createTodo(createTodoDto);
  }

}
