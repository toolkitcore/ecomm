﻿using Ecommerce.Application.SaleCodes;
using Ecommerce.Domain.Const;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace Ecommerce.API.Controllers
{
    [Route("api/sale-code")]
    [ApiController]
    public class SaleCodeController : ControllerBase
    {
        private readonly IMediator _mediator;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mediator"></param>
        public SaleCodeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="command"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [Authorize(Roles = $"{AppRole.SuperAdmin}, {AppRole.Admin}")]
        [HttpPost]
        public async Task<IActionResult> CreateSaleCode(CreateSaleCodeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="query"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [Authorize(Roles = $"{AppRole.SuperAdmin}, {AppRole.Admin}")]
        [HttpGet()]
        public async Task<IActionResult> GetSaleCodes([FromQuery] GetSaleCodeQuery query, CancellationToken cancellationToken)
        {
            var res = await _mediator.Send(query, cancellationToken);
            return Ok(res);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="command"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [Authorize(Roles = $"{AppRole.SuperAdmin}, {AppRole.Admin}")]
        [HttpPut()]
        public async Task<IActionResult> UpdateSaleCode(UpdateSaleCodeCommand command, CancellationToken cancellationToken)
        {
            var res = await _mediator.Send(command, cancellationToken);
            return Ok(res);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="code"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [Authorize(Roles = $"{AppRole.SuperAdmin}, {AppRole.Admin}")]
        [HttpDelete("{code}")]
        public async Task<IActionResult> DeleteSaleCode(string code, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new DeleteSaleCodeCommand(code), cancellationToken);
            return Ok(result);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="code"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [HttpGet("{code}")]
        public async Task<IActionResult> GetSaleCodeByCode(string code, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new GetSaleCodeByCodeQuery(code), cancellationToken);
            return Ok(result);
        }
    }
}
