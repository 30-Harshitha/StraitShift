import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Video, 
  FileText, 
  Upload, 
  Save, 
  CheckCircle2, 
  Sparkles,
  Link2,
  FolderUp,
  Database
} from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// IndexedDB Helper Functions for Permanent Binary Video Storage
const openVideoDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('StraitShiftVideoDB', 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('videos')) {
        db.createObjectStore('videos');
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveVideoToDB = async (blob: Blob, fileName: string) => {
  try {
    const db = await openVideoDB();
    const tx = db.transaction('videos', 'readwrite');
    const store = tx.objectStore('videos');
    store.put({ blob, name: fileName, timestamp: Date.now() }, 'saved_demo_video');
  } catch (err) {
    console.error('Error saving video to IndexedDB:', err);
  }
};

const loadVideoFromDB = async (): Promise<{ blob: Blob; name: string } | null> => {
  try {
    const db = await openVideoDB();
    const tx = db.transaction('videos', 'readonly');
    const store = tx.objectStore('videos');
    return new Promise((resolve) => {
      const req = store.get('saved_demo_video');
      req.onsuccess = () => {
        if (req.result && req.result.blob) {
          resolve({ blob: req.result.blob, name: req.result.name });
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
};

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'player' | 'script'>('player');
  const [videoUrl, setVideoUrl] = useState<string>('/demo-video.mp4');
  const [customInputUrl, setCustomInputUrl] = useState<string>('/demo-video.mp4');
  const [isLocalFile, setIsLocalFile] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [activeTimestamp, setActiveTimestamp] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved video from IndexedDB on component mount
  useEffect(() => {
    const initVideo = async () => {
      const savedData = await loadVideoFromDB();
      if (savedData && savedData.blob) {
        const objectUrl = URL.createObjectURL(savedData.blob);
        setVideoUrl(objectUrl);
        setFileName(savedData.name);
        setIsLocalFile(true);
        setCustomInputUrl(savedData.name);
      } else {
        const savedUrl = localStorage.getItem('straitshift_demo_video_url');
        if (savedUrl) {
          setVideoUrl(savedUrl);
          setCustomInputUrl(savedUrl);
        } else {
          setVideoUrl('/demo-video.mp4');
          setCustomInputUrl('/demo-video.mp4');
        }
      }
    };
    initVideo();
  }, []);

  useEffect(() => {
    if (videoUrl.startsWith('blob:') || videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm')) {
      setIsLocalFile(true);
    } else {
      setIsLocalFile(false);
    }
  }, [videoUrl]);

  if (!isOpen) return null;

  // Handle local video file upload (MP4/WebM) & save PERMANENTLY to IndexedDB
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create instant Object URL
      const fileObjUrl = URL.createObjectURL(file);
      setVideoUrl(fileObjUrl);
      setFileName(file.name);
      setIsLocalFile(true);
      setCustomInputUrl(file.name);

      // Save binary blob PERMANENTLY to IndexedDB
      await saveVideoToDB(file, file.name);
      localStorage.setItem('straitshift_demo_video_url', fileObjUrl);
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  // Handle custom URL save (Loom, YouTube, MP4 URL)
  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = customInputUrl.trim();

    if (finalUrl.includes('youtube.com/watch?v=')) {
      const videoId = finalUrl.split('v=')[1]?.split('&')[0];
      finalUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (finalUrl.includes('loom.com/share/')) {
      const loomId = finalUrl.split('share/')[1]?.split('?')[0];
      finalUrl = `https://www.loom.com/embed/${loomId}`;
    }

    setVideoUrl(finalUrl);
    localStorage.setItem('straitshift_demo_video_url', finalUrl);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const scriptSections = [
    {
      step: 1,
      time: '0:00 - 0:25',
      title: '1. Executive Problem & Overview Dashboard',
      screenAction: 'Show Overview Dashboard, highlight red STATUS: CRITICAL banner and 6 KPI cards.',
      narration: 'What happens to the global economy when 20% of the world\'s oil supply is suddenly frozen overnight? The Strait of Hormuz carries over 20 million barrels of energy daily. Meet StraitShift — an enterprise supply continuity platform built to transform disruption panic into clear executive action. Right from the dashboard, leadership gets immediate visibility: 18 cargoes exposed, 14.2M barrels at risk, and +14.8 days average delay.'
    },
    {
      step: 2,
      time: '0:25 - 0:50',
      title: '2. Disruption Map & Exposed Cargo Inspection',
      screenAction: 'Open Disruption Map (red vs cyan lines), then go to Shipments and open VLCC Arabian Titan SS-9041 drawer.',
      narration: 'Our interactive Global Energy Flow Map visually isolates the blocked Strait of Hormuz in red while actively plotting alternative corridors, including the Cape of Good Hope circumnavigation and Saudi East-West landbridge pipeline. Inspecting exposed cargoes — like the VLCC Arabian Titan — StraitShift calculates transit lag (+14 days), freight cost deltas (+$3.2M), and provides a one-click rerouting order.'
    },
    {
      step: 3,
      time: '0:50 - 1:20',
      title: '3. 30-Day Scenario Engine & AI Directives',
      screenAction: 'Run 30-Day Scenario Simulation, show Recharts inventory curves, open Action Center recommendations.',
      narration: 'To plan for what happens next, our 30-day Scenario Engine simulates supply gaps and plots inventory depletion curves over time — contrasting unmitigated stockouts against a StraitShift optimized response. In the Action Center, StraitShift Intelligence generates AI-assisted directives — like shifting 35% of crude allocation to Atlantic basin suppliers, cutting supply risk by up to 78%.'
    },
    {
      step: 4,
      time: '1:20 - 1:50',
      title: '4. System Architecture & Executive Board Report',
      screenAction: 'Open "How It Works" Architecture modal, navigate to Reports, click Print / Export PDF.',
      narration: 'Behind the UI, StraitShift operates on a modular 6-layer architecture ready to ingest live AIS vessel tracking, SAP ERP inventory data, and Platts market pricing. Finally, decision-makers can convert these insights into board-ready audit briefs with a single click, ready for PDF export.'
    },
    {
      step: 5,
      time: '1:50 - 2:00',
      title: '5. Conclusion & Value Proposition',
      screenAction: 'Return to Overview Dashboard with header tagline visible.',
      narration: 'StraitShift moves businesses from disruption to visibility, simulation, and decision — keeping energy moving when critical routes don\'t. Thank you!'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col my-6 max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                StraitShift 2-Minute Executive Walkthrough
              </h2>
              <p className="text-xs text-slate-400">Uploaded videos are permanently stored in IndexedDB browser database</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toolbar */}
        <div className="bg-slate-950/70 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('player')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                activeTab === 'player'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-cyan-400" />
              <span>Video Player</span>
            </button>

            <button
              onClick={() => setActiveTab('script')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                activeTab === 'script'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Presentation Script & Timestamps</span>
            </button>
          </div>

          <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700 font-mono">
            Duration: 02:00
          </span>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'player' && (
            <div className="space-y-4">
              {/* Responsive Video Container */}
              <div className="relative aspect-video w-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                {isLocalFile ? (
                  <video 
                    src={videoUrl} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support HTML5 video playback.
                  </video>
                ) : (
                  <iframe
                    src={videoUrl}
                    title="StraitShift 2-Minute Video Demo"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              {/* UPLOAD LOCAL VIDEO FILE + LINK EMBED SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Upload Local MP4 File */}
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <FolderUp className="w-4 h-4 text-cyan-400" /> Upload MP4 (Saved Permanently)
                    </span>
                    {fileName && (
                      <span className="text-[10px] text-cyan-400 font-mono font-bold truncate max-w-[120px]">
                        {fileName}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Uploaded video is saved inside browser IndexedDB storage and survives server reloads.
                  </p>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="video/mp4,video/webm"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 px-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-bold rounded-xl text-xs border border-cyan-500/30 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload & Save MP4 Video...</span>
                  </button>
                </div>

                {/* Paste Loom / YouTube URL */}
                <form onSubmit={handleSaveUrl} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Link2 className="w-4 h-4 text-cyan-400" /> Embed Loom / YouTube URL
                    </span>
                    {isSaved && (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Saved!
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Or paste your Loom or YouTube video link to embed your demo.
                  </p>

                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="https://www.loom.com/share/... or YouTube link"
                      value={customInputUrl}
                      onChange={e => setCustomInputUrl(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      className="py-2 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shrink-0 flex items-center gap-1"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Embed</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Permanent Storage Status & Instructions */}
              <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1 text-[11px] text-slate-400">
                <span className="font-bold text-cyan-400 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-cyan-400" /> Permanent File Persistence Notice:
                </span>
                <p>
                  1. <strong>IndexedDB Enabled</strong>: Uploaded MP4 videos are saved binary blobs inside browser database storage, so restarting localhost will <strong>NOT</strong> erase your video.<br />
                  2. <strong>Vercel Bundle Tip</strong>: For permanent Vercel deployment across all devices, copy your video file to <code className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-200 font-mono">straitshift/public/demo-video.mp4</code>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'script' && (
            <div className="space-y-4">
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-3.5 rounded-xl flex items-center justify-between text-xs text-cyan-300">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Use these timestamps and screen action guides while recording your video.</span>
                </div>
              </div>

              <div className="space-y-3">
                {scriptSections.map(sec => (
                  <div
                    key={sec.step}
                    onClick={() => setActiveTimestamp(sec.step)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      activeTimestamp === sec.step
                        ? 'bg-slate-950 border-cyan-500/50 shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                      <span className="text-xs font-bold text-slate-100">{sec.title}</span>
                      <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                        ⏱️ {sec.time}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">🎥 Screen Action:</span>
                        <span className="text-slate-300 font-medium">{sec.screenAction}</span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-cyan-400 block">🎙️ Voiceover Speech:</span>
                        <p className="text-slate-200 leading-relaxed font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 text-[11px]">
                          "{sec.narration}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-between items-center text-xs">
          <span className="text-slate-400 hidden sm:inline">StraitShift Video Companion</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition-colors"
          >
            Close Video Player
          </button>
        </div>
      </div>
    </div>
  );
};
