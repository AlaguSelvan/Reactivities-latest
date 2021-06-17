using System.Threading;
using System.Collections.Generic;
using Domain;
using MediatR;
using System.Threading.Tasks;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Extensions.Logging;
using Application.Core;
using Application.Interfaces;

namespace Application.Activities
{
  public class List
  {
    public class Query : IRequest<Result<List<ActivityDto>>> { }

    public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
    {
      private readonly DataContext _context;
      private readonly ILogger<List> _logger;
      private readonly IMapper _mapper;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, ILogger<List> logger, IMapper mapper, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _mapper = mapper;
        _logger = logger;
        _context = context;
      }

      public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var activities = await _context.Activities
          .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
            new {currentUsername = _userAccessor.GetUserName()})
          .ToListAsync(cancellationToken);
        return Result<List<ActivityDto>>.Success(activities);
      }

    }
  }
}