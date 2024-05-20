import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(createTaskDto);
    return task.save();
  }

  async findAll(owner: string): Promise<Task[]> {
    return this.taskModel.find({ owner }).exec();
  }

  async findOne(id: string, owner: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, owner }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(
    id: string,
    owner: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.taskModel
      .findOneAndUpdate({ _id: id, owner }, updateTaskDto, { new: true })
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async remove(id: string, owner: string): Promise<Task> {
    const task = await this.taskModel
      .findOneAndDelete({ _id: id, owner })
      .exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
}
