using Newtonsoft.Json;

namespace Ecommerce.Domain.Helper
{
    public static class JsonHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="methodName"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static string ToJson(object input, string methodName, string message)
        {
            return JsonConvert.SerializeObject(new { message, method = methodName, input }, Formatting.Indented);
        }
    }
}
