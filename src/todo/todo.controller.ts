import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/Todo';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto, DeleteTaskDto } from './dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiCreatedResponse({
    description: 'Get all todos.',
    type: Todo,
  })
  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @ApiCreatedResponse({ description: 'Created todo.', type: Todo })
  @ApiBadRequestResponse({ description: 'Wrong JSON format.' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post()
  create(@Body() task: CreateTaskDto): Promise<Todo> {
    return this.todoService.create(task);
  }

  @ApiCreatedResponse({ description: 'Deleted todo.' })
  @ApiNotFoundResponse({ description: 'Todo not found.' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Delete()
  async delete(@Body() { id }: DeleteTaskDto): Promise<boolean> {
    console.log(id);
    await this.todoService.delete(id);
    return true;
  }

  @ApiCreatedResponse({ description: 'Created todo.', type: Todo })
  @ApiBadRequestResponse({ description: 'Empty search value.' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get('search')
  async search(@Query('searchValue') searchString: string): Promise<Todo[]> {
    if (!searchString) {
      throw new BadRequestException('Search string is required.');
    }

    return this.todoService.search(searchString);
  }
}
