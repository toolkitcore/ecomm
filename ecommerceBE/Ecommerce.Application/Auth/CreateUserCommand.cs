using Ecommerce.Domain;
using Ecommerce.Domain.Model;
using Ecommerce.Infrastructure.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Ecommerce.Application.Auth
{
    internal class CreateUserHandler : IRequestHandler<CreateUserCommand, Unit>
    {
        private readonly MainDbContext _mainDbContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mainDbContext"></param>
        public CreateUserHandler(MainDbContext mainDbContext)
        {
            _mainDbContext = mainDbContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var isValidateUser = await ValidateUser(request.Username, cancellationToken);
            if (!isValidateUser)
            {
                throw new CoreException("Username đã tồn tại");
            }
            // Hash password
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            var newUser = new User() { FirstName = request.FirstName, LastName = request.LastName, Role = request.Role, Username = request.Username, Password = passwordHash };
            _mainDbContext.Users.Add(newUser);
            await _mainDbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="username"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        private async Task<bool> ValidateUser(string username, CancellationToken cancellationToken)
        {
            var user = await _mainDbContext.Users.FirstOrDefaultAsync(v => v.Username == username, cancellationToken);
            if (user is null)
            {
                return true;
            }
            return false;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    public class CreateUserCommand : IRequest<Unit>
    {
        public string Username { get; init; }
        public string FirstName { get; init; }
        public string LastName { get; init; }
        public string Role { get; init; }
        public string Password { get; init; }
    }
}
