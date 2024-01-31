﻿using Ecommerce.Domain;
using Ecommerce.Infrastructure.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Ecommerce.Application.SaleCodes
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="code"></param>
    /// <returns></returns>
    public record DeleteSaleCodeCommand(string code) : IRequest<Unit>;

    internal class DeleteSaleCodeHandler : IRequestHandler<DeleteSaleCodeCommand, Unit>
    {
        private readonly MainDbContext _mainDbContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mainDbContext"></param>
        public DeleteSaleCodeHandler(MainDbContext mainDbContext)
        {
            _mainDbContext = mainDbContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Unit> Handle(DeleteSaleCodeCommand request, CancellationToken cancellationToken)
        {
            var saleCode = await _mainDbContext.SaleCodes.FirstOrDefaultAsync(v => v.Code == request.code, cancellationToken);
            if (saleCode is null)
            {
                throw new CoreException("Mã giảm giá không tồn tại");
            }
            _mainDbContext.SaleCodes.Remove(saleCode);
            await _mainDbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
