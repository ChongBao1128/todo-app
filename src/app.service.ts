import { Injectable, NotFoundException } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  status?: boolean;
}

@Injectable()
export class AppService {
  private todos: Todo[] = [];
  private idCounter = 1;

  // Read all todo items from database
  getTodos(): Todo[] {
    return this.todos;
  }

  // Create a new todo item to database
  createTodo(todo: Omit<Todo, 'id'>): Todo {
    const newTodo: Todo = {
      id: this.idCounter++, // Assign auto-incremented id
      ...todo // rest of items
    };

    this.todos.push(newTodo); // Add the new todo to the list
    return newTodo;
  }

  // Update existing todo item
  updateTodo(id: number, updateData: Partial<Omit<Todo, 'id'>>): Todo {
    const index = this.todos.findIndex(todo => todo.id === id);

    if(index === -1) {
      throw new NotFoundException(`Todo with ${id} not found!`); // not found
    }

    const updatedTodo = { ...this.todos[index], ...updateData };

    this.todos[index] = updatedTodo;    
    
    return updatedTodo;
  }
}
