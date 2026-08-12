import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        creatorId: userId,
        dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.task.findMany({
      where: { creatorId: userId },
      orderBy: [
        { status: 'asc' }, // Not strictly needed, but nice
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id, creatorId: userId },
      include: { subtasks: true }
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    // Ensure task exists and belongs to user
    const oldTask = await this.findOne(id, userId);
    
    const data: any = { ...updateTaskDto };
    if (updateTaskDto.dueDate) {
      data.dueDate = new Date(updateTaskDto.dueDate);
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data,
    });

    // Generate Audit Log
    const changes: string[] = [];
    if (updateTaskDto.status && updateTaskDto.status !== oldTask.status) {
      changes.push(`changed status to ${updateTaskDto.status}`);
    }
    if (updateTaskDto.priority && updateTaskDto.priority !== oldTask.priority) {
      changes.push(`changed priority to ${updateTaskDto.priority}`);
    }
    
    if (changes.length > 0) {
      await this.prisma.auditLog.create({
        data: {
          taskId: id,
          userId,
          action: changes.join(' and '),
        }
      });
    }

    return updatedTask;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async reorder(userId: string, updates: { id: string; status: string; order: number }[]) {
    // We execute these in a transaction to ensure atomic updates
    const transactions = updates.map(update => 
      this.prisma.task.update({
        where: { id: update.id, creatorId: userId },
        data: { status: update.status, order: update.order },
      })
    );
    return this.prisma.$transaction(transactions);
  }

  async addComment(taskId: string, userId: string, content: string) {
    await this.findOne(taskId, userId); // verify ownership/access
    return this.prisma.comment.create({
      data: {
        content,
        taskId,
        authorId: userId,
      },
      include: { author: true }
    });
  }

  async getComments(taskId: string, userId: string) {
    await this.findOne(taskId, userId);
    return this.prisma.comment.findMany({
      where: { taskId },
      orderBy: { createdAt: 'asc' },
      include: { author: { select: { id: true, email: true, avatarUrl: true } } }
    });
  }

  async getHistory(taskId: string, userId: string) {
    await this.findOne(taskId, userId);
    return this.prisma.auditLog.findMany({
      where: { taskId },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, email: true, avatarUrl: true } } }
    });
  }
}
