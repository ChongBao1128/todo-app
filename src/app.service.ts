import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

export interface Todo {
  id: number;
  task: string;
  isCompleted?: boolean;
  insertedAt?: Date;
}

@Injectable()
export class AppService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Get all todos from the Supabase 'todos' table
  async getTodos(): Promise<Todo[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('todos')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  // Insert a new todo into the Supabase 'todos' table
  async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const { data, error } = await this.supabaseService.supabase
      .from('todos')
      .insert([todo])
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // Update an existing todo in the Supabase 'todos' table
  async updateTodo(id: number, updateData: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
    const { data, error } = await this.supabaseService.supabase
      .from('todos')
      .update(updateData)
      .eq('id', id)
      .single();

    if (error) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return data;
  }

  // Delete a todo from the Supabase 'todos' table
  async deleteTodo(id: number): Promise<Todo> {
    const { data, error } = await this.supabaseService.supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .single();

    if (error) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return data;
  }

  // Delete all todos from the Supabase 'todos' table
  async deleteAllTodos(): Promise<Todo[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('todos')
      .delete()
      .gt("id", 0);

    if (error) {
      throw error;
    }

    return data || [];
  }
}
