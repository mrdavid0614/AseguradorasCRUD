using Microsoft.EntityFrameworkCore;
using Aseguradoras.Core;
using Aseguradoras.Core.Dtos;
using Aseguradoras.Repo.Repositories;
using Aseguradoras.Service.Services;
using Microsoft.AspNetCore.Http.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AseguradorasDBContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("AseguradorasSQLite"), b => b.MigrationsAssembly("Aseguradoras")));
builder.Services.AddScoped<AseguradoraRepository>();
builder.Services.AddTransient<AseguradoraService>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseExceptionHandler(exceptionHandlerApp => 
    exceptionHandlerApp.Run(async context => await Results.Problem().ExecuteAsync(context)
  )
);

app.UseHttpsRedirection();
app.Use(async (context, next) =>
{
    var headers = context.Request.Headers;

    if (headers.TryGetValue("token", out var token) && token == "1234")
        await next(context);
    else
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.StartAsync();
    }

});

app.MapGet("/aseguradora", (AseguradoraService aseguradoraService) =>
{
    return aseguradoraService.GetAll();
});

app.MapGet("/aseguradora/{id}", (AseguradoraService aseguradoraService, string id) =>
{
    var aseguradora = aseguradoraService.GetById(id);

    if (aseguradora == null)
        return Results.NotFound("No existe una aseguradora con este Id");

    return Results.Ok(aseguradora);
});

app.MapPost("/aseguradora", (HttpContext context, AseguradoraService aseguradoraService, AseguradoraCreateRequestDto dto) =>
{
    if (dto.Nombre == null || dto.Comision <= 0)
    {
        return Results.BadRequest("Nombre o comisión inválidos.");
    }
    else
    {
        aseguradoraService.Create(dto);
        return Results.Created(context.Request.GetDisplayUrl(), dto);
    }
});

app.MapPut("/aseguradora", (AseguradoraService aseguradoraService, AseguradoraUpdateRequestDto dto) =>
{
    if (dto.Id == null)
    {
        return Results.BadRequest("Id necesario para actualizar.");
    }
    else
    {
        aseguradoraService.Update(dto);
        return Results.Ok("Aseguradora actualizada.");
    }
});

app.MapDelete("/aseguradora/{id}", (AseguradoraService aseguradoraService, string id) =>
{
    aseguradoraService.DeleteById(id);
});

app.Run();
