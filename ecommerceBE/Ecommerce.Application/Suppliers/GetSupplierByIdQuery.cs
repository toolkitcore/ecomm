﻿using Ecommerce.Application.ProductTypes.Dto;
using Ecommerce.Application.Suppliers.Dto;
using Ecommerce.Domain;
using Ecommerce.Infrastructure.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Ecommerce.Application.Suppliers
{
    internal class GetSupplierByIdHandler : IRequestHandler<GetSupplierByIdQuery, SupplierDto>
    {
        private readonly MainDbContext _mainDbContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mainDbContext"></param>
        public GetSupplierByIdHandler(MainDbContext mainDbContext)
        {
            _mainDbContext = mainDbContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<SupplierDto> Handle(GetSupplierByIdQuery request, CancellationToken cancellationToken)
        {
            var supplier = await _mainDbContext.Suppliers.AsNoTracking().Include(x => x.SupplierProductTypes).Where(x => x.Id == request.Id)
                .Select(v => new SupplierDto
                {
                    Id = v.Id,
                    Logo = v.Logo,
                    Name = v.Name,
                    Code = v.Code,
                    ProductTypes = v.SupplierProductTypes.Select(x => new ProductTypeDto
                    {
                        Name = x.ProductType.Name,
                        Id = x.ProductTypeId
                    })
                }).FirstOrDefaultAsync(cancellationToken);
            if (supplier is null)
            {
                throw new CoreException("Item not Found");
            }
            return supplier;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Id"></param>
    /// <returns></returns>
    public record GetSupplierByIdQuery(Guid Id) : IRequest<SupplierDto>;
}
