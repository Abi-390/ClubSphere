import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { clubService, eventService } from '../services/api.service';
import { 
  Plus, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Edit, 
  Trash2, 
  Loader,
  AlertCircle,
  X,
  Check
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showClubModal, setShowClubModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [clubForm, setClubForm] = useState({
    name: '',
    description: '',
    category: 'Other'
  });

  const [eventForm, setEventForm] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    club: ''
  });

  const categories = [
    'Sports', 'Gaming', 'Academic', 'Social', 'Music', 
    'Art', 'Technology', 'Programming', 'Other'
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [clubsData, eventsData] = await Promise.all([
        clubService.getAllClubs(),
        eventService.getAllEvents()
      ]);
      
      setClubs(Array.isArray(clubsData) ? clubsData : []);
      setEvents(eventsData.events || []);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
      setClubs([]);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClubSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      if (selectedClub) {
        await clubService.updateClub(selectedClub._id, clubForm);
      } else {
        await clubService.createClub(clubForm);
      }
      
      await fetchData();
      setShowClubModal(false);
      resetClubForm();
    } catch (err) {
      console.error('Error saving club:', err);
      alert(err.error || 'Failed to save club');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      await eventService.createEvent(eventForm);
      await fetchData();
      setShowEventModal(false);
      resetEventForm();
    } catch (err) {
      console.error('Error creating event:', err);
      alert(err.error || 'Failed to create event');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClub = async (clubId) => {
    if (!window.confirm('Are you sure you want to delete this club?')) return;

    try {
      await clubService.deleteClub(clubId);
      await fetchData();
    } catch (err) {
      console.error('Error deleting club:', err);
      alert(err.error || 'Failed to delete club');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await eventService.deleteEvent(eventId);
      await fetchData();
    } catch (err) {
      console.error('Error deleting event:', err);
      alert(err.error || 'Failed to delete event');
    }
  };

  const openEditClub = (club) => {
    setSelectedClub(club);
    setClubForm({
      name: club.name,
      description: club.description,
      category: club.category || 'Other'
    });
    setShowClubModal(true);
  };

  const resetClubForm = () => {
    setClubForm({ name: '', description: '', category: 'Other' });
    setSelectedClub(null);
  };

  const resetEventForm = () => {
    setEventForm({ name: '', description: '', date: '', location: '', club: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <Loader className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Header */}
      <header className="bg-gray-800/50 border-b border-gray-700/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ClubSphere</h1>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user?.username}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="text-gray-400" size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="text-blue-500" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Clubs</p>
                <p className="text-3xl font-bold text-white">{clubs.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Events</p>
                <p className="text-3xl font-bold text-white">{events.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Settings className="text-purple-500" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Your Clubs</p>
                <p className="text-3xl font-bold text-white">
                  {clubs.filter(c => c.owner === user?.id).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Clubs Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Clubs</h2>
            <button
              onClick={() => setShowClubModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              Create Club
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <div key={club._id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{club.name}</h3>
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                      {club.category}
                    </span>
                  </div>
                  {club.owner === user?.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditClub(club)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Edit className="text-blue-400" size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClub(club._id)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="text-red-400" size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm line-clamp-3">{club.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <Users size={14} />
                  <span>{club.members?.length || 0} members</span>
                </div>
              </div>
            ))}
          </div>

          {clubs.length === 0 && (
            <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <Users className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400">No clubs yet. Create your first club!</p>
            </div>
          )}
        </div>

        {/* Events Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Events</h2>
            <button
              onClick={() => setShowEventModal(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={clubs.length === 0}
            >
              <Plus size={20} />
              Create Event
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex-1">{event.name}</h3>
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Trash2 className="text-red-400" size={16} />
                  </button>
                </div>
                <p className="text-gray-400 text-sm mb-4">{event.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={14} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={14} />
                    <span>{event.club?.name || 'Unknown Club'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <Calendar className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400">No events yet. Create your first event!</p>
            </div>
          )}
        </div>
      </main>

      {/* Club Modal */}
      {showClubModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                {selectedClub ? 'Edit Club' : 'Create New Club'}
              </h3>
              <button onClick={() => { setShowClubModal(false); resetClubForm(); }}>
                <X className="text-gray-400 hover:text-white" size={24} />
              </button>
            </div>

            <form onSubmit={handleClubSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Club Name</label>
                <input
                  type="text"
                  value={clubForm.name}
                  onChange={(e) => setClubForm({ ...clubForm, name: e.target.value })}
                  required
                  minLength={3}
                  maxLength={50}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter club name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={clubForm.category}
                  onChange={(e) => setClubForm({ ...clubForm, category: e.target.value })}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={clubForm.description}
                  onChange={(e) => setClubForm({ ...clubForm, description: e.target.value })}
                  required
                  minLength={10}
                  maxLength={500}
                  rows={4}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Describe your club"
                />
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {formLoading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <>
                    <Check size={20} />
                    {selectedClub ? 'Update Club' : 'Create Club'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Create New Event</h3>
              <button onClick={() => { setShowEventModal(false); resetEventForm(); }}>
                <X className="text-gray-400 hover:text-white" size={24} />
              </button>
            </div>

            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Name</label>
                <input
                  type="text"
                  value={eventForm.name}
                  onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter event name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Club</label>
                <select
                  value={eventForm.club}
                  onChange={(e) => setEventForm({ ...eventForm, club: e.target.value })}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a club</option>
                  {clubs.map(club => (
                    <option key={club._id} value={club._id}>{club.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="datetime-local"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Describe your event"
                />
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {formLoading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <>
                    <Check size={20} />
                    Create Event
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;