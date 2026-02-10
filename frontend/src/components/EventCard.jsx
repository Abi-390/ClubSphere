import React from "react";
import { Calendar, Trash2 } from "lucide-react";

const EventCard = ({ event, currentUserId, onDelete }) => {
  const isOwner =
    event.creator?.toString?.() === currentUserId;

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-white">{event.name}</h3>

        {isOwner && (
          <button
            onClick={() => onDelete(event._id)}
            className="p-2 hover:bg-gray-700 rounded"
          >
            <Trash2 className="text-red-400" size={16} />
          </button>
        )}
      </div>

      <p className="text-gray-400 mb-3">{event.description}</p>

      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Calendar size={14} />
        <span>
          {new Date(event.date).toLocaleDateString()}
        </span>
      </div>

      {event.location && (
        <div className="text-sm text-gray-400 mt-2">
          📍 {event.location}
        </div>
      )}
    </div>
  );
};

export default EventCard;
