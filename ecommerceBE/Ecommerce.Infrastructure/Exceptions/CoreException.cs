using System;

namespace Ecommerce.Infrastructure.Exceptions
{
    public class CoreException : Exception
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public CoreException() : base() { }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public CoreException(string message) : base(message)
        {
        }
    }
}
