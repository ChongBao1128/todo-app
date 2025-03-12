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
            deleteTodo: jest.fn(),
            deleteAllTodos: jest.fn()
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  // Unit Test for Retrieving all todo items
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

  // Unit Test for Create a new todo item
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

  // Unit Test for Update todo item
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

  // Unit Test for Remove one todo item
  describe('deleteTodo', () => {
    it('should delete a todo by id and return the removed todo', () => {
      const id = '1';
      const removedTodo = { id: 1, title: 'Todo 1', description: 'Test description 1' };
  
      // Mock the deleteTodo method to return the removed todo
      (appService.deleteTodo as jest.Mock).mockReturnValue(removedTodo);
  
      // Call the controller's deleteTodo method (id is passed as string, service expects a number)
      const result = appController.deleteTodo(id);
  
      // Verify that the service method was called with the correct numeric id
      expect(appService.deleteTodo).toHaveBeenCalledWith(1);
  
      // Verify that the result matches the removed todo
      expect(result).toEqual(removedTodo);
    });
  
    it('should throw NotFoundException if the todo is not found', () => {
      const id = '999';
  
      // Mock the deleteTodo method to throw a NotFoundException
      (appService.deleteTodo as jest.Mock).mockImplementation(() => {
        throw new NotFoundException(`Todo with id ${id} not found`);
      });
  
      // Expect the controller's deleteTodo method to throw the exception
      expect(() => appController.deleteTodo(id)).toThrow(NotFoundException);
      expect(appService.deleteTodo).toHaveBeenCalledWith(999);
    });
  });

  // Unit Test for Removing all items in Todo list
  describe('deleteAllTodo', () => {
    it('should delete all todos and return the deleted todos', () => {
      const allTodos = [
        { id: 1, title: 'Todo 1', description: 'Test description 1' },
        { id: 2, title: 'Todo 2', description: 'Test description 2' },
      ];
  
      // Mock the deleteAllTodos method to return the predefined todos array
      (appService.deleteAllTodos as jest.Mock).mockReturnValue(allTodos);
  
      // Call the controller's deleteAllTodo method
      const result = appController.deleteAllTodo();
  
      // Verify that the service method was called
      expect(appService.deleteAllTodos).toHaveBeenCalled();
  
      // Verify that the controller returns the expected todos
      expect(result).toEqual(allTodos);
    });
  });
  
  
});
