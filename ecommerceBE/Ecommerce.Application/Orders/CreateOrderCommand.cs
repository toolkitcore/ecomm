﻿using Ecommerce.Application.Orders.Dto;
using Ecommerce.Application.Services.MailNotifyService;
using Ecommerce.Domain;
using Ecommerce.Domain.Const;
using Ecommerce.Domain.Helper;
using Ecommerce.Domain.Model;
using Ecommerce.Infrastructure.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Ecommerce.Application.Services.NotificationService;

namespace Ecommerce.Application.Orders
{
    internal class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Unit>
    {
        private readonly MainDbContext _mainDbContext;
        private readonly IMailNotifyService _mailNotifyService;
        private readonly NotificationService _notificationService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mainDbContext"></param>
        /// <param name="mailNotifyService"></param>
        /// <param name="notificationService"></param>
        public CreateOrderHandler(MainDbContext mainDbContext, IMailNotifyService mailNotifyService, NotificationService notificationService)
        {
            _mainDbContext = mainDbContext;
            _mailNotifyService = mailNotifyService;
            _notificationService = notificationService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Unit> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {

            var order = new Order();
            order.OrderCode = NanoIdHelper.GenerateNanoId();
            order.Email = request.Email;
            order.PhoneNumber = request.PhoneNumber;
            order.ProvinceCode = request.ProvinceCode;
            order.DistrictCode = request.DistrictCode;
            order.Address = request.Address;
            order.Note = request.Note;
            order.CustomerName = request.CustomerName;
            if (!string.IsNullOrEmpty(request.SaleCode))
            {
                order.SaleCode = request.SaleCode;
            }
            order.PaymentMethod = request.PaymentMethod;
            order.PaymentStatus = request.PaymentMethod == PaymentMethod.Cash ? PaymentStatus.Waiting : PaymentStatus.Complete;
            foreach (var item in request.OrderDetails)
            {
                var category = await _mainDbContext.Categories.AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == item.CategoryId && x.IsActive, cancellationToken: cancellationToken);
                if (category is null)
                {
                    throw new CoreException("Mặt hàng không tồn tại");
                }
                order.OrderDetails.Add(new OrderDetail() { CategoryId = item.CategoryId, Price = category.Price, Quantity = item.Quantity });
            }

            order.Price = await GetTotalPrice(order.OrderDetails, order.SaleCode, cancellationToken);

            order.OrderLogs.Add(new OrderLog(){Status = OrderStatus.Waiting, Timestamp = DateTime.UtcNow});
            _mainDbContext.Orders.Add(order);
            await _mainDbContext.SaveChangesAsync(cancellationToken);
            await CreateNotification(order, cancellationToken);
            return Unit.Value;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="orderDetails"></param>
        /// <param name="saleCode"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        private async Task<decimal> GetTotalPrice(ICollection<OrderDetail> orderDetails, string saleCode,
            CancellationToken cancellationToken)
        {
            decimal totalPrice = orderDetails.Sum(item => item.Price * item.Quantity);
            if (String.IsNullOrEmpty(saleCode))
            {
                return totalPrice;
            }
            var code = await _mainDbContext.SaleCodes.AsNoTracking().FirstOrDefaultAsync(x => x.Code == saleCode, cancellationToken);
            if (code is null)
            {
                throw new CoreException("mã giảm giá không hợp lệ ");
            }

            if (code.ValidUntil.Date < DateTime.Now.Date)
            {
                throw new CoreException("mã giảm giá không hợp lệ ");
            }


            if (code.Percent * totalPrice / 100 > code.MaxPrice)
            {
                return totalPrice - code.MaxPrice;
            }

            return totalPrice - code.Percent * totalPrice / 100;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="order"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        private async Task CreateNotification(Order order, CancellationToken cancellationToken)
        {
            var metadata = new
            {
                orderId = order.Id,
                orderCode = order.OrderCode,
                customerName = order.CustomerName,
                createAt = order.CreatedAt,
                eventName = NotifyEvent.CreateOrder
            };
            await _notificationService.SentNotificationByGroupAsync(AppRole.Admin, metadata, NotifyEvent.CreateOrder, cancellationToken);
        }
    }
    public class CreateOrderCommand : IRequest<Unit>
    {
        public string Email { get; init; }
        public string PhoneNumber { get; init; }
        public string ProvinceCode { get; init; }
        public string DistrictCode { get; init; }
        public string Address { get; init; }
        public string Note { get; init; }
        public string CustomerName { get; init; }
        public string SaleCode { get; init; }
        public string PaymentMethod { get; init; }
        public virtual ICollection<CreateOrderDetailDto> OrderDetails { get; init; }
    }
}
