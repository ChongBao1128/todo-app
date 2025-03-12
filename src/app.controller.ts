import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AppService, Todo } from './app.service';
import { CreateTodoDto } from './todos/dto/create-todo.dto';
import { UpdateTodoDto } from './todos/dto/update-todo.dto';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTodos(): Promise<Todo[]> {
    return this.appService.getTodos();
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.appService.createTodo(createTodoDto);
  }

  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() updateData: UpdateTodoDto,
  ): Promise<Todo> {
    return this.appService.updateTodo(Number(id), updateData);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<Todo> {
    return this.appService.deleteTodo(Number(id));
  }

  @Delete()
  deleteAllTodo(): Promise<Todo[]> {
    return this.appService.deleteAllTodos();
  }
}
