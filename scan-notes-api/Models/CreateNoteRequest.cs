using System.ComponentModel.DataAnnotations;

namespace scan_notes_api.Models
{
    public class CreateNoteRequest
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
    }
}
