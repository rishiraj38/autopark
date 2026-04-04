import { Notification, Prisma, NotificationType } from '@prisma/client';
import { BaseRepository } from '../../core/abstract/BaseRepository';

export class NotificationRepository extends BaseRepository<Notification, Prisma.NotificationCreateInput, Prisma.NotificationUpdateInput> {
  protected entityName = 'Notification';

  protected getModelDelegate() {
    return this.prisma.notification;
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async markAsRead(id: string): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: { userId, isRead: false },
    });
  }

  async createNotification(userId: string, type: NotificationType, title: string, message: string): Promise<Notification> {
    return this.prisma.notification.create({
      data: {
        user: { connect: { id: userId } },
        type,
        title,
        message,
      },
    });
  }
}
