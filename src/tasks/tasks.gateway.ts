import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateTaskDto } from './dto/create-task.dto';

@WebSocketGateway()
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  handleTaskCreated(task: CreateTaskDto) {
    this.server.emit('taskCreated', task);
  }

  @SubscribeMessage('createTask')
  handleMessage(@MessageBody() createTaskDto: CreateTaskDto): void {
    this.handleTaskCreated(createTaskDto);
  }
}
