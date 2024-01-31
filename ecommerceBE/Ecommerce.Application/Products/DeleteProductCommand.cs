﻿using Ecommerce.Domain;
using Ecommerce.Infrastructure.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Ecommerce.Application.Products
{
    internal class DeleteProductHandler : IRequestHandler<DeleteProductCommand, Unit>
    {
        private readonly MainDbContext _mainDbContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mainDbContext"></param>
        public DeleteProductHandler(MainDbContext mainDbContext)
        {
            _mainDbContext = mainDbContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _mainDbContext.Products.FirstOrDefaultAsync(x => x.Id == request.id, cancellationToken);
            if (product is null)
            {
                throw new CoreException("Sản phẩm không tồn tại");
            }
            _mainDbContext.Products.Remove(product);
            await _mainDbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public record DeleteProductCommand(Guid id): IRequest<Unit>;
}
