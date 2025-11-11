import React, { useState, useEffect } from "react";
import { db } from "../firebase-config.js"; // Adjust path as needed
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import NoteForm from "../components/NoteForm.jsx";
import NoteItem from "../components/NoteItem.jsx";
import { formatTimestamp } from "../utils.js";

// Define the reference to the 'notes' collection in Firestore
const notesCollectionRef = collection(db, "notes");
const MOCK_USER_ID = "local-dev-user-001";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Local state for handling the editing input globally (optional, but keeps logic centralized)
  const [editText, setEditText] = useState("");

  // --- READ: Fetch notes in real-time ---
  useEffect(() => {
    const q = query(notesCollectionRef, orderBy("updatedAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setNotes(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            isEditing: false, // Local UI state
          }))
        );
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching notes: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // --- CREATE: Add a new note to Firestore ---
  const addNote = async (noteData) => {
    const now = new Date();
    try {
      await addDoc(notesCollectionRef, {
        ...noteData, // text, color, tags
        isPinned: false,
        userId: MOCK_USER_ID,
        createdAt: now,
        updatedAt: now,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // --- DELETE: Remove a note from Firestore ---
  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    try {
      await deleteDoc(noteDoc);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // --- UPDATE: Toggle Editing State (Local UI logic) ---
  const toggleEdit = (id, currentText) => {
    setEditText(currentText);
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isEditing: !note.isEditing } : note
      )
    );
  };

  // --- UPDATE: Save the edited text to Firestore ---
  const saveEdit = async (id) => {
    const noteDoc = doc(db, "notes", id);
    if (!editText.trim()) return;

    try {
      await updateDoc(noteDoc, {
        text: editText,
        updatedAt: new Date(),
      });

      // Toggle back to read mode locally
      setNotes(
        notes.map((note) =>
          note.id === id ? { ...note, isEditing: false } : note
        )
      );
      setEditText("");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // --- Rendered Component ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
        <p className="text-xl">Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-400 mb-2 mt-4">
          ☁️ FireNotes
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Data is stored in Firebase and updates in real-time. 
        </p>
        <hr className="border-gray-700 mb-8" />

        {/* NoteForm for CREATE operation */}
        <NoteForm onAddNote={addNote} />

        {/* Notes List */}
        <div className="notes-list">
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">
            Your Notes ({notes.length})
          </h2>

          {notes.length === 0 ? (
            <p className="text-gray-500 italic">No notes yet! Add one above.</p>
          ) : (
            notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                editText={editText}
                setEditText={setEditText}
                onDelete={deleteNote}
                onToggleEdit={toggleEdit}
                onSaveEdit={saveEdit}
                formatTimestamp={formatTimestamp}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
