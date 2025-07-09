using scan_notes_api.Models;

namespace scan_notes_api
{
    public class ScanService
    {
        private readonly List<Scan> _scans = new();
        private readonly Dictionary<int, List<Note>> _notes = new();
        public ScanService()
        {
            _scans = new List<Scan>
            {
                new Scan ( 1, DateTime.UtcNow.AddDays(-3), "CT", "John Doe" ),
                new Scan ( 2, DateTime.UtcNow.AddDays(-1), "MRI", "Jane Smith" ),
                new Scan ( 3, DateTime.UtcNow, "X-ray", "Alice Lee" ),
            };

            _notes[1] = new List<Note>
            {
                new Note("Initial Observation", "Patient history of migraine. Scan looks unremarkable."),
                new Note("Follow-up Recommended", "Suggest follow-up in 6 months to monitor any subtle changes."),
                new Note("General Impression", "Overall, the scan shows no acute findings.")
            };
        }

        public List<Scan> GetScans()
        {
            return _scans;
        }

        public List<Note> GetNotes(int scanId)
        {
            _notes.TryGetValue(scanId, out var notes);
            return notes ?? new();
        }

        public void AddNote(int scanId, Note note)
        {
            if (!_notes.ContainsKey(scanId))
            {
                _notes[scanId] = new List<Note>();
            }
            _notes[scanId].Add(note);
        }

        public bool ScanIdExists(int scanId) => _scans.Any(s => s.Id == scanId);
    }
}
