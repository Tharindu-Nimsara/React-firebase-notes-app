
export default function NoteItem({
  note,
  editText,
  setEditText,
  onDelete,
  onToggleEdit,
  onSaveEdit,
  formatTimestamp,
}) {
  return (
    <div
      key={note.id}
      // Use the note's color field for a subtle border highlight
      style={{ borderColor: note.color }}
      className="flex flex-col justify-between items-start bg-gray-800 p-4 rounded-xl shadow-lg mb-3 border-l-4 transition duration-200"
    >
      {/* Note Content / Edit Form */}
      {note.isEditing ? (
        // UPDATE Input Field and Buttons
        <div className="flex flex-grow w-full items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={() => onSaveEdit(note.id)}
            className="px-3 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-150"
          >
            Save
          </button>
          <button
            onClick={() => onToggleEdit(note.id, note.text)}
            className="px-3 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition duration-150"
          >
            Cancel
          </button>
        </div>
      ) : (
        /* READ Note Text and Action Buttons */
        <>
          <p className="text-lg text-gray-100 flex-grow mb-2">{note.text}</p>

          {/* Tags and Metadata */}
          <div className="w-full flex justify-between items-center text-xs text-gray-400 mt-2 pt-2 border-t border-gray-700">
            {/* Tags Display */}
            <div className="flex flex-wrap gap-1">
              {note.tags &&
                note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-indigo-900 rounded-full text-indigo-300 text-xs"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            {/* Last Updated Time */}
            <span className="italic">
              Updated: {formatTimestamp(note.updatedAt)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 self-end mt-3">
            <button
              onClick={() => onToggleEdit(note.id, note.text)}
              className="px-3 py-2 bg-yellow-600 text-white font-medium rounded-md hover:bg-yellow-700 transition duration-150"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="px-3 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-150"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
