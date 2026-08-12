import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Request() req: any, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req.user.id, createTaskDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.tasksService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, req.user.id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.tasksService.remove(id, req.user.id);
  }

  @Patch('bulk/reorder')
  reorder(@Request() req: any, @Body() updates: { id: string; status: string; order: number }[]) {
    return this.tasksService.reorder(req.user.id, updates);
  }

  @Post(':id/comments')
  addComment(@Request() req: any, @Param('id') id: string, @Body('content') content: string) {
    return this.tasksService.addComment(id, req.user.id, content);
  }

  @Get(':id/comments')
  getComments(@Request() req: any, @Param('id') id: string) {
    return this.tasksService.getComments(id, req.user.id);
  }

  @Get(':id/history')
  getHistory(@Request() req: any, @Param('id') id: string) {
    return this.tasksService.getHistory(id, req.user.id);
  }
}
