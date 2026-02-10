import React from "react";

const ReplyCard = ({ reply }) => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 ml-6">
      <p className="text-gray-300 text-sm mb-2">
        {reply.content}
      </p>

      <div className="text-xs text-gray-500">
        Replied by {reply.author?.name || "User"}
      </div>
    </div>
  );
};

export default ReplyCard;
