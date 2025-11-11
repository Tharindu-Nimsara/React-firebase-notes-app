// src/utils.js

// Function to format Firestore Timestamp/Date object
export const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    
    // Check if it's a Firestore Timestamp object (has a toDate method)
    if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString('en-US', {
            hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'short', day: 'numeric'
        });
    }
    
    // Handle standard Date object
    if (timestamp instanceof Date) {
        return timestamp.toLocaleDateString('en-US', {
            hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'short', day: 'numeric'
        });
    }
    return "N/A";
};