import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clean existing data
  await prisma.comment.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
  
  // Create test user
  const admin = await prisma.user.create({
    data: {
      email: 'dexter@gmail.com',
      isGuest: false,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dexter',
    },
  });

  const member = await prisma.user.create({
    data: {
      email: 'member@gmail.com',
      isGuest: false,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Member',
    },
  });

  console.log('Created users:', admin.id, member.id);

  // Create Tasks
  const task1 = await prisma.task.create({
    data: {
      title: 'Design Homepage',
      description: 'Create high-fidelity mockups for the homepage.',
      status: 'DOING',
      priority: 'HIGH',
      dueDate: new Date('2026-09-12T00:00:00Z'),
      creatorId: admin.id,
      assigneeId: admin.id,
      order: 0,
    }
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'Develop Login Feature',
      description: 'Implement JWT authentication and login page.',
      status: 'TODO',
      priority: 'LOW',
      dueDate: new Date('2026-09-15T00:00:00Z'),
      creatorId: admin.id,
      assigneeId: member.id,
      order: 1,
    }
  });

  const task3 = await prisma.task.create({
    data: {
      title: 'Test Payment Gateway',
      description: 'Ensure Stripe webhooks are working correctly.',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: new Date('2026-09-18T00:00:00Z'),
      creatorId: admin.id,
      order: 2,
    }
  });

  // Create Subtasks for task1
  await prisma.task.create({
    data: {
      title: 'Gather requirements',
      status: 'COMPLETED',
      priority: 'MEDIUM',
      creatorId: admin.id,
      parentId: task1.id,
      order: 0,
    }
  });

  await prisma.task.create({
    data: {
      title: 'Create wireframes',
      status: 'DOING',
      priority: 'HIGH',
      creatorId: admin.id,
      parentId: task1.id,
      order: 1,
    }
  });

  // Add a comment
  await prisma.comment.create({
    data: {
      content: 'I will start working on the wireframes today.',
      taskId: task1.id,
      authorId: admin.id,
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
