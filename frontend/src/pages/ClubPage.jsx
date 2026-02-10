import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  eventService,
  discussionService,
  clubService,
} from "../services/api.service";
import { Plus, Calendar, MessageCircle, Loader } from "lucide-react";

const ClubPage = () => {
  const { clubId } = useParams();

  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEventModal, setShowEventModal] = useState(false);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [eventForm, setEventForm] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });

  const [discussionForm, setDiscussionForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    fetchClubData();
  }, [clubId]);

  const fetchClubData = async () => {
    try {
      setLoading(true);

      const clubData = await clubService.getClubById(clubId);
      setClub(clubData);

      const eventsData = await eventService.getAllEvents();
      const filteredEvents = eventsData.events.filter(
        (e) => e.club?._id === clubId
      );
      setEvents(filteredEvents);

      const discussionsData =
        await discussionService.getDiscussionsByClub(clubId);
      setDiscussions(discussionsData.discussions || []);
    } catch (err) {
      console.error("Error loading club:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);

      await eventService.createEvent({
        ...eventForm,
        club: clubId,
      });

      setShowEventModal(false);
      setEventForm({
        name: "",
        description: "",
        date: "",
        location: "",
      });

      fetchClubData();
    } catch (err) {
      console.error("Event creation failed:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleCreateDiscussion = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);

      await discussionService.createDiscussion({
        ...discussionForm,
        club: clubId,
      });

      setShowDiscussionModal(false);
      setDiscussionForm({
        title: "",
        content: "",
      });

      fetchClubData();
    } catch (err) {
      console.error("Discussion creation failed:", err);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a]">
        <Loader className="animate-spin text-blue-500" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white p-8">
      {/* Club Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{club?.name}</h1>
        <p className="text-gray-400 mt-2">{club?.description}</p>
        <span className="inline-block mt-3 px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
          {club?.category}
        </span>
      </div>

      {/* Events Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar size={20} /> Events
          </h2>

          <button
            onClick={() => setShowEventModal(true)}
            className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Plus size={18} />
            Create Event
          </button>
        </div>

        {events.length === 0 ? (
          <p className="text-gray-500">No events in this club yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-gray-800/50 p-5 rounded-xl border border-gray-700"
              >
                <h3 className="text-lg font-bold mb-2">{event.name}</h3>
                <p className="text-gray-400 text-sm mb-3">
                  {event.description}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(event.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discussions Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageCircle size={20} /> Discussions
          </h2>

          <button
            onClick={() => setShowDiscussionModal(true)}
            className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} />
            Start Discussion
          </button>
        </div>

        {discussions.length === 0 ? (
          <p className="text-gray-500">No discussions yet.</p>
        ) : (
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Link
                key={discussion._id}
                to={`/dashboard/discussion/${discussion._id}`}
                className="block bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-blue-500 transition"
              >
                <h3 className="font-semibold text-lg mb-1">
                  {discussion.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {discussion.content}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* EVENT MODAL */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Create Event</h3>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <input
                type="text"
                placeholder="Event name"
                value={eventForm.name}
                onChange={(e) =>
                  setEventForm({ ...eventForm, name: e.target.value })
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3"
                required
              />

              <textarea
                placeholder="Description"
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    description: e.target.value,
                  })
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3"
              />

              <input
                type="datetime-local"
                value={eventForm.date}
                onChange={(e) =>
                  setEventForm({ ...eventForm, date: e.target.value })
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3"
                required
              />

              <input
                type="text"
                placeholder="Location"
                value={eventForm.location}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    location: e.target.value,
                  })
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3"
              />

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg"
              >
                {formLoading ? "Creating..." : "Create Event"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DISCUSSION MODAL */}
      {showDiscussionModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Start Discussion</h3>

            <form
              onSubmit={handleCreateDiscussion}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Discussion title"
                value={discussionForm.title}
                onChange={(e) =>
                  setDiscussionForm({
                    ...discussionForm,
                    title: e.target.value,
                  })
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3"
                required
              />

              <textarea
                placeholder="Write something..."
                value={discussionForm.content}
                onChange={(e) =>
                  setDiscussionForm({
                    ...discussionForm,
                    content: e.target.value,
                  })
                }
                rows={4}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3"
                required
              />

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
              >
                {formLoading ? "Posting..." : "Start Discussion"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubPage;
