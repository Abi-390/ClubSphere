import React from "react";
import { useNavigate } from "react-router-dom";

const DiscussionCard = ({ discussion }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
       navigate(`/dashboard/discussion/${discussion._id}`)

      }
      className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 cursor-pointer hover:border-gray-600 transition"
    >
      <h3 className="text-lg font-bold text-white mb-2">
        {discussion.title}
      </h3>

      <p className="text-gray-400 text-sm line-clamp-2">
        {discussion.content}
      </p>

      <div className="mt-3 text-xs text-gray-500">
        Posted by {discussion.author?.name || "User"}
      </div>
    </div>
  );
};

export default DiscussionCard;
