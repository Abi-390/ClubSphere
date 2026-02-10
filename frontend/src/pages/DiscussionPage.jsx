import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { discussionService } from "../services/api.service";
import ReplyCard from "../components/ReplyCard";
import { Loader, MessageCircle } from "lucide-react";

const DiscussionPage = () => {
  const { discussionId } = useParams();

  const [discussion, setDiscussion] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);
  const [replyLoading, setReplyLoading] = useState(false);

  useEffect(() => {
    fetchDiscussion();
  }, [discussionId]);

  const fetchDiscussion = async () => {
    try {
      setLoading(true);

      const data = await discussionService.getDiscussionById(discussionId);
      setDiscussion(data.discussion);

      const replyData = await discussionService.getReplies(discussionId);
      setReplies(replyData.replies || []);
    } catch (err) {
      console.error("Error loading discussion:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      setReplyLoading(true);

      await discussionService.replyToDiscussion(discussionId, {
        content: replyText,
      });

      setReplyText("");
      await fetchDiscussion();
    } catch (err) {
      console.error("Reply failed:", err);
    } finally {
      setReplyLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a]">
        <Loader className="animate-spin text-blue-500" size={40} />
      </div>
    );

  if (!discussion)
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center text-gray-400">
        Discussion not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white p-8">
      {/* Discussion Header */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
        <h1 className="text-3xl font-bold mb-3">
          {discussion.title || "Discussion"}
        </h1>

        <p className="text-gray-400 mb-4">
          {discussion.content}
        </p>

        <div className="text-xs text-gray-500">
          Posted on {new Date(discussion.createdAt).toLocaleString()}
        </div>
      </div>

      {/* Replies Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <MessageCircle size={20} />
          Replies ({replies.length})
        </h2>

        {replies.length === 0 ? (
          <p className="text-gray-500">No replies yet. Be the first one.</p>
        ) : (
          <div className="space-y-4">
            {replies.map((reply) => (
              <ReplyCard key={reply._id} reply={reply} />
            ))}
          </div>
        )}
      </div>

      {/* Reply Box */}
      <form
        onSubmit={handleReply}
        className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4"
      >
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write your reply..."
          rows={4}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={replyLoading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2"
        >
          {replyLoading ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            "Post Reply"
          )}
        </button>
      </form>
    </div>
  );
};

export default DiscussionPage;
