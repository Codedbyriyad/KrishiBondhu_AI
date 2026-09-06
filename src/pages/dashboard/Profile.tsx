import React, { useState } from 'react';
import {
  User,
  Tractor,
  Activity,
  FileText,
  Settings,
  LogOut,
  Camera,
  MapPin,
  CheckCircle2,
  Edit2,
  Download,
  Bell,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { mockUserInfo, mockFarmInfo, mockActivities, mockSavedReports } from '../../data/mockProfile';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'farm' | 'activity' | 'reports' | 'settings'>('info');
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleLogout = () => {
    // Call your authentication logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* Top Banner / Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={mockUserInfo.avatarUrl}
            alt={mockUserInfo.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-50"
          />
          <button 
            aria-label="Change profile picture"
            className="absolute bottom-0 right-0 p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition shadow-sm"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center sm:text-left space-y-1 flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{mockUserInfo.name}</h1>
          <p className="text-slate-500 font-medium">{mockUserInfo.role}</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified Farmer
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
              <MapPin className="w-3.5 h-3.5" /> {mockUserInfo.location}
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout (Navigation + Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Navigation Menu Column */}
        <div className="lg:col-span-1 space-y-2">
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('info')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition ${
                activeTab === 'info'
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <User className="w-4 h-4" /> User Information
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => setActiveTab('farm')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition ${
                activeTab === 'farm'
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <Tractor className="w-4 h-4" /> Farm Information
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => setActiveTab('activity')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition ${
                activeTab === 'activity'
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <Activity className="w-4 h-4" /> Recent Activity
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition ${
                activeTab === 'reports'
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <FileText className="w-4 h-4" /> Saved Reports
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition ${
                activeTab === 'settings'
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <Settings className="w-4 h-4" /> Settings
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <div className="pt-2 border-t border-slate-100 mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl font-medium text-sm transition"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content Area Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* User Information Section */}
          {activeTab === 'info' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" /> User Information
                </h2>
                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5">
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <p className="text-slate-800 font-medium mt-1">{mockUserInfo.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <p className="text-slate-800 font-medium mt-1">{mockUserInfo.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                  <p className="text-slate-800 font-medium mt-1">{mockUserInfo.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Member Since</label>
                  <p className="text-slate-800 font-medium mt-1">{mockUserInfo.joinedDate}</p>
                </div>
              </div>
            </div>
          )}

          {/* Farm Information Section */}
          {activeTab === 'farm' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Tractor className="w-5 h-5 text-emerald-600" /> Farm Information
                </h2>
                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5">
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Farm Name</label>
                  <p className="text-slate-800 font-medium mt-1">{mockFarmInfo.farmName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Area</label>
                  <p className="text-slate-800 font-medium mt-1">{mockFarmInfo.totalArea}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Soil Type</label>
                  <p className="text-slate-800 font-medium mt-1">{mockFarmInfo.soilType}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Primary Crops</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {mockFarmInfo.crops.map((crop, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity Section */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
                <Activity className="w-5 h-5 text-emerald-600" /> Recent Activity
              </h2>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {mockActivities.map((act) => (
                  <div key={act.id} className="relative">
                    <span className="absolute -left-6 top-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-4 ring-white" />
                    <p className="text-sm font-medium text-slate-800">{act.title}</p>
                    <span className="text-xs text-slate-400">{act.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Reports Section */}
          {activeTab === 'reports' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" /> Saved Reports
                </h2>
              </div>

              <div className="space-y-3">
                {mockSavedReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">{report.title}</h4>
                        <span className="text-xs text-slate-500">
                          {report.date} • {report.type} ({report.fileSize})
                        </span>
                      </div>
                    </div>
                    <button 
                      aria-label={`Download ${report.title}`}
                      className="p-2 text-slate-400 hover:text-emerald-600 transition"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
                <Settings className="w-5 h-5 text-emerald-600" /> Account Settings
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Email Notifications</p>
                      <p className="text-xs text-slate-400">Receive weekly agricultural recommendations</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotif}
                    onChange={(e) => setEmailNotif(e.target.checked)}
                    className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Two-Factor Authentication</p>
                      <p className="text-xs text-slate-400">Enhance your account security</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={twoFactor}
                    onChange={(e) => setTwoFactor(e.target.checked)}
                    className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;