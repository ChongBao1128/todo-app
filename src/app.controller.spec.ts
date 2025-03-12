import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotFoundException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getTodos: jest.fn(() => [
              { id: 1, task: 'Task 1', isCompleted: false, insertedAt: new Date() },
              { id: 2, task: 'Task 2', isCompleted: true, insertedAt: new Date() },
            ]),
            createTodo: jest.fn((dto) => ({ id: 1, ...dto, insertedAt: new Date() })),
            updateTodo: jest.fn(),
            deleteTodo: jest.fn(),
            deleteAllTodos: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getAllTodos', () => {
    it('should return an array of todos', () => {
      const expectedTodos = [
        { id: 1, task: 'Task 1', isCompleted: false, insertedAt: expect.any(Date) },
        { id: 2, task: 'Task 2', isCompleted: true, insertedAt: expect.any(Date) },
      ];
      const todos = appController.getAllTodos();
      expect(appService.getTodos).toHaveBeenCalled();
      expect(todos).toEqual(expectedTodos);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo item', () => {
      const createTodoDto = { task: 'New Task', isCompleted: false };
      const result = appController.createTodo(createTodoDto);
      expect(appService.createTodo).toHaveBeenCalledWith(createTodoDto);
      expect(result).toEqual({ id: 1, ...createTodoDto, insertedAt: expect.any(Date) });
    });
  });

  describe('updateTodo', () => {
    it('should update an existing todo', () => {
      const id = '1';
      const updateData = { task: 'Updated Task', isCompleted: true };
      const updatedTodo = { id: 1, ...updateData, insertedAt: new Date() };
      (appService.updateTodo as jest.Mock).mockReturnValue(updatedTodo);
      const result = appController.updateTodo(id, updateData);
      expect(appService.updateTodo).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(updatedTodo);
    });

    it('should throw NotFoundException if todo is not found', () => {
      const id = '999';
      const updateData = { task: 'Updated Task' };
      (appService.updateTodo as jest.Mock).mockImplementation(() => {
        throw new NotFoundException(`Todo with ${id} not found!`);
      });
      expect(() => appController.updateTodo(id, updateData)).toThrow(NotFoundException);
      expect(appService.updateTodo).toHaveBeenCalledWith(999, updateData);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo by id', () => {
      const id = '1';
      const removedTodo = { id: 1, task: 'Task 1', isCompleted: false, insertedAt: new Date() };
      (appService.deleteTodo as jest.Mock).mockReturnValue(removedTodo);
      const result = appController.deleteTodo(id);
      expect(appService.deleteTodo).toHaveBeenCalledWith(1);
      expect(result).toEqual(removedTodo);
    });

    it('should throw NotFoundException if the todo is not found', () => {
      const id = '999';
      (appService.deleteTodo as jest.Mock).mockImplementation(() => {
        throw new NotFoundException(`Todo with id ${id} not found`);
      });
      expect(() => appController.deleteTodo(id)).toThrow(NotFoundException);
      expect(appService.deleteTodo).toHaveBeenCalledWith(999);
    });
  });

  describe('deleteAllTodos', () => {
    it('should delete all todos', () => {
      const allTodos = [
        { id: 1, task: 'Task 1', isCompleted: false, insertedAt: new Date() },
        { id: 2, task: 'Task 2', isCompleted: true, insertedAt: new Date() },
      ];
      (appService.deleteAllTodos as jest.Mock).mockReturnValue(allTodos);
      const result = appController.deleteAllTodo();
      expect(appService.deleteAllTodos).toHaveBeenCalled();
      expect(result).toEqual(allTodos);
    });
  });
});
