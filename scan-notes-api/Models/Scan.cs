namespace scan_notes_api.Models
{
    public record Scan(int Id, DateTime Date, string Type, string PatientName);
}