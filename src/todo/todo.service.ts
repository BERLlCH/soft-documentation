import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/Todo';
import { CreateTaskDto } from './dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  create(todo: CreateTaskDto): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<void> {
    const task = await this.todoRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    await this.todoRepository.remove(task);
  }

  async search(searchString: string): Promise<Todo[]> {
    return this.todoRepository
      .createQueryBuilder('task')
      .where(
        'task.title LIKE :searchString OR task.description LIKE :searchString',
        { searchString: `%${searchString}%` },
      )
      .getMany();
  }
}
