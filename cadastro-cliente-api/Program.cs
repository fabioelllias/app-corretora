var builder = WebApplication.CreateBuilder(args);

// 🔹 Adiciona serviços para Controllers
builder.Services.AddControllers();

// 🔹 Swagger tradicional (com Swagger UI)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔹 CORS liberado para qualquer origem (ajuste se quiser restringir)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

// 🔹 Somente em ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // acessível via /swagger
}

app.UseHttpsRedirection();

app.UseCors(); // aplica política de CORS

app.UseAuthorization();

// 🔹 Mapeia todos os controllers automaticamente
app.MapControllers();

app.Run();
