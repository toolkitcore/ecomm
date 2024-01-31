﻿using Ecommerce.Domain;
using Ecommerce.Domain.Model;
using Ecommerce.Infrastructure.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Ecommerce.Application.Ratings
{
    public class CreateRatingCommand : IRequest<Unit>
    {
        public string Comment { get; init; }
        public int Rate { get; init; }
        public string ImageUrl { get; init; }
        public string UserName { get; init; }
        public Guid ProductId { get; init; }
    }

    internal class CreateRatingHandler : IRequestHandler<CreateRatingCommand, Unit>
    {
        private readonly MainDbContext _mainDbContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mainDbContext"></param>
        public CreateRatingHandler(MainDbContext mainDbContext)
        {
            _mainDbContext = mainDbContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Unit> Handle(CreateRatingCommand request, CancellationToken cancellationToken)
        {
            var isExist = await CheckProductExist(request.ProductId, cancellationToken);

            if (!isExist)
            {
                throw new CoreException("Mã sản phẩm không tồn tại.");
            }

            if (request.Rate < 0 || request.Rate > 5)
            {
                throw new CoreException("Giá trị rating không phù hợp.");
            }

            var rating = new Rating() { Comment = request.Comment, Rate = request.Rate, ImageUrl = request.ImageUrl, UserName = request.UserName, ProductId = request.ProductId };
            _mainDbContext.Ratings.Add(rating);
            await _mainDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        private async Task<bool> CheckProductExist(Guid productId, CancellationToken cancellationToken)
        {
            var product = await _mainDbContext.Products
                .AsNoTracking().FirstOrDefaultAsync(i => i.Id == productId, cancellationToken);
            if (product is null)
            {
                return false;
            }
            return true;
        }
    }
}
