﻿using Ecommerce.Domain;
using Ecommerce.Infrastructure.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Ecommerce.Application.SaleCodes
{
    public class UpdateSaleCodeCommand : IRequest<Unit>
    {
        public string Code { get; set; }
        public int Percent { get; set; }
        public decimal MaxPrice { get; set; }
        public DateTime ValidUntil { get; set; }
    }

    internal class UpdateSaleCodeHandler : IRequestHandler<UpdateSaleCodeCommand, Unit>
    {
        private readonly MainDbContext _mainDbContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mainDbContext"></param>
        public UpdateSaleCodeHandler(MainDbContext mainDbContext)
        {
            _mainDbContext = mainDbContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Unit> Handle(UpdateSaleCodeCommand request, CancellationToken cancellationToken)
        {
            var saleCode = await _mainDbContext.SaleCodes.FirstOrDefaultAsync(v => v.Code == request.Code, cancellationToken);
            if (saleCode is null)
            {
                throw new CoreException("Sale Code không tồn tại ");
            }
            saleCode.Percent = request.Percent;
            saleCode.MaxPrice = request.MaxPrice;
            saleCode.ValidUntil = request.ValidUntil;
            await _mainDbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
