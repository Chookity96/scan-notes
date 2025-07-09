using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using scan_notes_api;
using scan_notes_api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Scan Notes API",
        Version = "v1",
    });
});


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "ScanNotesPolicy",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

builder.Services.AddSingleton<ScanService>();

var app = builder.Build();

app.UseCors("ScanNotesPolicy");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ScanNotes API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.MapGet("/scans", (ScanService service) =>
{
    return Results.Ok(service.GetScans());
});

app.MapGet("/scans/{id}/notes", (int id, ScanService service) =>
{
    if (!service.ScanIdExists(id))
    {
        return Results.NotFound("Scan not found");
    }

    var notes = service.GetNotes(id);
    return Results.Ok(notes);
});

app.MapPost("/scans/{id}/notes", (int id, [FromBody] CreateNoteRequest note, ScanService service) =>
{
    if (note is null || string.IsNullOrEmpty(note.Title) || string.IsNullOrEmpty(note.Content))
    {
        return Results.BadRequest("Title and Content are required");
    }

    service.AddNote(id, new Note(note.Title, note.Content));
    return Results.Created($"/scans/{id}/notes", note);
});

app.Run();

