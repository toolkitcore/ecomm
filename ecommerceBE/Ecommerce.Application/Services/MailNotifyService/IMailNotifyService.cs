using System.Threading.Tasks;

namespace Ecommerce.Application.Services.MailNotifyService
{
    public interface IMailNotifyService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <param name="data"></param>
        /// <param name="eventCode"></param>
        /// <returns></returns>
        Task SendMailAsync(string email, object data, string eventCode);
    }
}
