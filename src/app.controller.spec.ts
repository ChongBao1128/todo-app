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
            // Mock the createTodo method
            getTodos: jest.fn(() => [
              { id: 1, title: 'Todo 1', description: 'Test description 1' },
              { id: 2, title: 'Todo 2', description: 'Test description 2' },
              { id: 3, title: 'Todo 3', description: 'Test description 3' },
              { id: 4, title: 'Todo 4', description: 'Test description 4' },
            ]),
            createTodo: jest.fn((dto) => ({ id: 1, ...dto })),
            updateTodo: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getAllTodos', () => {
    it('should return an array of todos', () => {
      // Define expected todos matching the mock
      const expectedTodos = [
        { id: 1, title: 'Todo 1', description: 'Test description 1' },
        { id: 2, title: 'Todo 2', description: 'Test description 2' },
        { id: 3, title: 'Todo 3', description: 'Test description 3' },
        { id: 4, title: 'Todo 4', description: 'Test description 4' },
      ];

      // Call the controller method
      const todos = appController.getAllTodos();

      // Verify that the service method was called
      expect(appService.getTodos).toHaveBeenCalled();

      // Verify that the controller returns the expected todos
      expect(todos).toEqual(expectedTodos);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo item', () => {
      // Sample data
      const createTodoDto = { title: 'Test Todo', description: 'Test description' };

      // Calling createTodo method
      const result = appController.createTodo(createTodoDto);

      // Ensure that the AppService.createTodo method was called with the right DTO
      expect(appService.createTodo).toHaveBeenCalledWith(createTodoDto);

      // Check that the result matches the expected outcome
      expect(result).toEqual({ id: 1, title: 'Test Todo', description: 'Test description' });
    });
  });

  describe('updateTodo', () => {
    it('should update an existing todo and return the updated todo', () => {
      const id = '1';
      const updateData = { title: 'Updated Title' };
      const updatedTodo = { id: 1, title: 'Updated Title', description: 'Existing description' };
  
      // Mock the updateTodo method to return our updatedTodo
      (appService.updateTodo as jest.Mock).mockReturnValue(updatedTodo);
  
      const result = appController.updateTodo(id, updateData);
  
      expect(appService.updateTodo).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(updatedTodo);
    });
  
    it('should throw NotFoundException if todo is not found', () => {
      const id = '999';
      const updateData = { title: 'Updated Title' };
  
      // Mock the updateTodo method to throw a NotFoundException
      (appService.updateTodo as jest.Mock).mockImplementation(() => {
        throw new NotFoundException(`Todo with ${id} not found!`);
      });
  
      // Expect the controller to throw the same error when updateTodo is called
      expect(() => appController.updateTodo(id, updateData)).toThrow(NotFoundException);
      expect(appService.updateTodo).toHaveBeenCalledWith(999, updateData);
    });
  })
});
