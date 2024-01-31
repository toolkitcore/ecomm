using Ecommerce.Domain;
using Ecommerce.Infrastructure.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Ecommerce.Application.Auth
{
    internal class AdminUpdatePasswordUserHandler : IRequestHandler<AdminUpdatePasswordUserCommand, Unit>
    {
        private readonly MainDbContext _mainDbContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mainDbContext"></param>
        public AdminUpdatePasswordUserHandler(MainDbContext mainDbContext)
        {
            _mainDbContext = mainDbContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Unit> Handle(AdminUpdatePasswordUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _mainDbContext.Users.FirstOrDefaultAsync(x => x.Id == request.id, cancellationToken);
            if (user is null)
            {
                throw new CoreException("User không tồn tại");
            }
            user.Password = BCrypt.Net.BCrypt.HashPassword(request.dto.NewPassword);
            await _mainDbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="id"></param>
    /// <param name="dto"></param>
    /// <returns></returns>
    public record AdminUpdatePasswordUserCommand(Guid id, UserPasswordDto dto) : IRequest<Unit>
    {
    }

    /// <summary>
    /// 
    /// </summary>
    public class UserPasswordDto
    {
        public string NewPassword { get; init; }
    }
}
