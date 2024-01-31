using Ecommerce.Application.Services.Socket.SocketService;
using Ecommerce.Domain;
using Ecommerce.Domain.Const;
using Ecommerce.Domain.Model;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Ecommerce.Application.Services.NotificationService
{
    public class NotificationService
    {
        private readonly SocketService _socketService;
        private readonly MainDbContext _mainDbContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="socketService"></param>
        /// <param name="mainDbContext"></param>
        public NotificationService(SocketService socketService, MainDbContext mainDbContext)
        {
            _socketService = socketService;
            _mainDbContext = mainDbContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="message"></param>
        /// <param name="eventName"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task SentNotificationByUserAsync(Guid userId, object message, string eventName, CancellationToken cancellationToken)
        {
            var newNotification = new Notification()
            {
                EventName = eventName,
                UserId = userId,
                MetaData = message,
            };
            _mainDbContext.Notifications.Add(newNotification);
            await _mainDbContext.SaveChangesAsync(cancellationToken);
            await _socketService.SendMessageByUserAsync(SocketEvent.NewNotification, userId.ToString(), message, cancellationToken);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userRole"></param>
        /// <param name="message"></param>
        /// <param name="eventName"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task SentNotificationByGroupAsync(string userRole, object message, string eventName, CancellationToken cancellationToken)
        {
            var newNotification = new Notification()
            {
                EventName = eventName,
                GroupName = userRole,
                MetaData = message,
            };
            _mainDbContext.Notifications.Add(newNotification);
            await _mainDbContext.SaveChangesAsync(cancellationToken);
            await _socketService.SendMessageByGroupAsync(SocketEvent.NewNotification, userRole, message, cancellationToken);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        /// <param name="eventName"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task SentNotificationAsync(object message, string eventName, CancellationToken cancellationToken)
        {
            var newNotification = new Notification()
            {
                EventName = eventName,
                MetaData = message,
            };
            _mainDbContext.Notifications.Add(newNotification);
            await _mainDbContext.SaveChangesAsync(cancellationToken);
            await _socketService.SendMessageAsync(SocketEvent.NewNotification, message, cancellationToken);
        }

    }
}
