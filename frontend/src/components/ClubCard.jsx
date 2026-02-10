import React from "react";
import { Users, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClubCard = ({ club, currentUserId, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleOpenClub = () => {
    navigate(`/dashboard/club/${club._id}`)

  };

  const isOwner = club.owner?.toString() === currentUserId;

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="cursor-pointer flex-1"
          onClick={handleOpenClub}
        >
          <h3 className="text-lg font-bold text-white mb-2">
            {club.name}
          </h3>

          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
            {club.category}
          </span>
        </div>

        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(club)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Edit className="text-blue-400" size={16} />
            </button>

            <button
              onClick={() => onDelete(club._id)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Trash2 className="text-red-400" size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm line-clamp-3">
        {club.description}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <Users size={14} />
        <span>{club.members?.length || 0} members</span>
      </div>
    </div>
  );
};

export default ClubCard;
