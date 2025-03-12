import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
            createTodo: jest.fn((dto) => ({ id: 1, ...dto })),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
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
});
