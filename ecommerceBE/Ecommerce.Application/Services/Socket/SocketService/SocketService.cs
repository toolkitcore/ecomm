using Ecommerce.Application.Services.Socket.Hubs;
using Ecommerce.Domain.Helper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;
namespace Ecommerce.Application.Services.Socket.SocketService
{
    public class SocketService
    {
        private readonly IHubContext<NotificationHub> _hub;
        private readonly ILogger _logger;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="hub"></param>
        /// <param name="logger"></param>
        public SocketService(IHubContext<NotificationHub> hub, ILogger<SocketService> logger)
        {
            _hub = hub;
            _logger = logger;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="eventName"></param>
        /// <param name="message"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task SendMessageAsync(string eventName, object message, CancellationToken cancellationToken)
        {
            _logger.LogInformation(JsonHelper.ToJson(message, eventName, "sent socket event"));
            await _hub.Clients.All.SendAsync(eventName, message, cancellationToken);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="eventName"></param>
        /// <param name="userId"></param>
        /// <param name="message"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task SendMessageByUserAsync(string eventName, string userId, object message, CancellationToken cancellationToken)
        {
            _logger.LogInformation(JsonHelper.ToJson(message, eventName, $"sent socket event to {userId}"));
            await _hub.Clients.User(userId).SendAsync(eventName, message, cancellationToken);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="eventName"></param>
        /// <param name="groupName"></param>
        /// <param name="message"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task SendMessageByGroupAsync(string eventName, string groupName, object message, CancellationToken cancellationToken)
        {
            _logger.LogInformation(JsonHelper.ToJson(message, eventName, $"sent socket event to {groupName}"));
            await _hub.Clients.Group(groupName).SendAsync(eventName, message, cancellationToken);
        }
    }
}
