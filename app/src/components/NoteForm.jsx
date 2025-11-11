import React, { useState } from "react";

export default function NoteForm({ onAddNote }) {
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteColor, setNewNoteColor] = useState("#4f46e5");
  const [newNoteTags, setNewNoteTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    // Process tags
    const tagsArray = newNoteTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    // Call the parent function with the new note data
    onAddNote({
      text: newNoteText,
      color: newNoteColor,
      tags: tagsArray,
    });

    // Clear local state
    setNewNoteText("");
    setNewNoteTags("");
    setNewNoteColor("#4f46e5");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-10 p-4 bg-gray-800 rounded-lg shadow-inner"
    >
      <input
        type="text"
        value={newNoteText}
        onChange={(e) => setNewNoteText(e.target.value)}
        placeholder="Enter the note content..."
        className="p-3 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={newNoteTags}
          onChange={(e) => setNewNoteTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="flex-grow p-3 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <label className="flex items-center gap-2 text-gray-400">
          Color:
          <input
            type="color"
            value={newNoteColor}
            onChange={(e) => setNewNoteColor(e.target.value)}
            className="w-8 h-8 rounded-full border-none cursor-pointer p-0"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
      >
        Add Note
      </button>
    </form>
  );
}
