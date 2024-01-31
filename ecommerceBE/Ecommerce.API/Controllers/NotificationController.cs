﻿using Ecommerce.Application.Notifications;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Ecommerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotificationController : ControllerBase
    {
        private readonly IMediator _mediator;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mediator"></param>
        public NotificationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="query"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetNotification([FromQuery] GetNotificationQuery query, CancellationToken cancellationToken)
        {
            var dto = await _mediator.Send(query, cancellationToken);
            return Ok(dto);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSeenNotification(Guid id, CancellationToken cancellationToken)
        {
            var dto = await _mediator.Send(new UpdateSeenNotificationCommand(id), cancellationToken);
            return Ok(dto);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="query"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [HttpGet("new-notification")]
        public async Task<IActionResult> GetNumberNewNotification([FromQuery] GetNumberNewNotificationQuery query, CancellationToken cancellationToken)
        {
            var dto = await _mediator.Send(query, cancellationToken);
            return Ok(dto);
        }
    }
}
