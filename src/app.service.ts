import { Injectable } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed?: boolean;
}

@Injectable()
export class AppService {
  private todos: Todo[] = [];
  private idCounter = 1;

  // Create a new todo item to database
  createTodo(todo: Omit<Todo, 'id'>): Todo {
    const newTodo: Todo = {
      id: this.idCounter++, // Assign auto-incremented id
      ...todo // rest of items
    };

    this.todos.push(newTodo); // Add the new todo to the list
    return newTodo;
  }
  
}
