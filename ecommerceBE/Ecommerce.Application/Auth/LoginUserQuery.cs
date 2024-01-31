using Ecommerce.Application.Auth.Dto;
using Ecommerce.Application.Services.AuthService;
using Ecommerce.Domain;
using Ecommerce.Infrastructure.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading;
using System.Threading.Tasks;

namespace Ecommerce.Application.Auth
{
    internal class LoginUserHandler : IRequestHandler<LoginUserQuery, UserLoginDto>
    {
        private readonly MainDbContext _mainDbContext;
        private readonly AuthService _authService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mainDbContext"></param>
        /// <param name="authService"></param>
        public LoginUserHandler(MainDbContext mainDbContext, AuthService authService)
        {
            _mainDbContext = mainDbContext;
            _authService = authService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<UserLoginDto> Handle(LoginUserQuery request, CancellationToken cancellationToken)
        {

            var user = await _mainDbContext.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Username == request.Username, cancellationToken);
            if (user is null)
            {
                throw new CoreException("Username is incorrect");
            }
            // Check passWord
            bool verified = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
            if (!verified)
            {
                throw new CoreException("Password is incorrect");
            }
            var tokenString = _authService.GenerateToken(user);
            var refreshToken = await _authService.GenerateRefreshToken(user.Id);
            return new UserLoginDto()
            {
                Id = user.Id,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                AccessToken = tokenString,
                Role = user.Role,
                RefreshToken = refreshToken
            };
        }
    }

    /// <summary>
    /// 
    /// </summary>
    public class LoginUserQuery : IRequest<UserLoginDto>
    {
        public string Username { get; init; }
        public string Password { get; init; }
    }
}
