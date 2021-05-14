using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;
using System;

namespace Application.Activities
{
  public class Create
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Activity Activity { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator() {
        RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
      }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;

      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
          var user = await _context.Users.FirstOrDefaultAsync(x =>
            x.UserName == _userAccessor.GetUserName());
          Console.WriteLine("userName:", _userAccessor);
          var attendee = new ActivityAttendee
          {
            AppUser = user,
            Activity = request.Activity,
            IsHost = true
          };

          request.Activity.Attendees.Add(attendee);

          _context.Activities.Add(request.Activity);

          var result = await _context.SaveChangesAsync() > 0;

          if(!result) return Result<Unit>.Failure("Failed to create Activity");

          return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}