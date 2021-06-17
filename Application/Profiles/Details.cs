using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
  public class Details
  {
    public class Query : IRequest<Result<Profile>>
    {
      public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<Profile>>
    {
      private readonly IMapper _mapper;
      private readonly DataContext _context;
      private readonly IUserAccessor _userAcessor;

      public Handler(DataContext context, IMapper mapper, IUserAccessor userAcessor)
      {
        _userAcessor = userAcessor;
        _context = context;
        _mapper = mapper;

      }
      public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
      {
        var user = await _context.Users
            .ProjectTo<Profile>(_mapper.ConfigurationProvider, new {currentUsername = _userAcessor.GetUserName()})
            .SingleOrDefaultAsync(x => x.Username == request.Username);

        if (user == null) return null;

        return Result<Profile>.Success(user);

      }
    }
  }
}