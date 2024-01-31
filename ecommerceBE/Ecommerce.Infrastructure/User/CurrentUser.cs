using Microsoft.AspNetCore.Http;
using System;
using System.Security.Claims;

namespace Ecommerce.Infrastructure.User
{
    public class CurrentUser : ICurrentUser
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        /// <summary>
        /// 
        /// </summary>
        protected ClaimsPrincipal ClaimsPrincipal => _httpContextAccessor.HttpContext?.User;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="httpContextAccessor"></param>
        public CurrentUser(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Guid Id => ClaimsPrincipal.FindFirst(ClaimTypes.NameIdentifier) != null ? new Guid(ClaimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value) : Guid.Empty;

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string FullName => ClaimsPrincipal.FindFirst(ClaimTypes.Name).Value;

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string Role => ClaimsPrincipal.FindFirst(ClaimTypes.Role).Value;
    }
}
