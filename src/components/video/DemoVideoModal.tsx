import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause,
  Video, 
  FileText, 
  Upload, 
  Save, 
  CheckCircle2, 
  Sparkles,
  Link2,
  FolderUp,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Monitor,
  Flame,
  MapPin,
  Sliders,
  Cpu
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
  const [activeTab, setActiveTab] = useState<'interactive' | 'custom' | 'script'>('interactive');
  const [videoUrl, setVideoUrl] = useState<string>('/demo-video.mp4');
  const [customInputUrl, setCustomInputUrl] = useState<string>('/demo-video.mp4');
  const [isLocalFile, setIsLocalFile] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  
  // Interactive Walkthrough Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [progressSec, setProgressSec] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-advance interactive video walkthrough timer
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgressSec(prev => {
          if (prev >= 120) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          // Auto sync slide step based on seconds
          if (next < 25) setCurrentSlide(1);
          else if (next < 50) setCurrentSlide(2);
          else if (next < 80) setCurrentSlide(3);
          else if (next < 110) setCurrentSlide(4);
          else setCurrentSlide(5);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

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
      const fileObjUrl = URL.createObjectURL(file);
      setVideoUrl(fileObjUrl);
      setFileName(file.name);
      setIsLocalFile(true);
      setCustomInputUrl(file.name);
      setActiveTab('custom');

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

  const slidesData = [
    {
      step: 1,
      time: '0:00 - 0:25',
      title: '1. Executive Overview & Disruption Alert',
      icon: <Flame className="w-5 h-5 text-red-400" />,
      sub: 'STATUS: CRITICAL • Strait of Hormuz Blocked',
      details: [
        'Exposed Vessels: 18 / 42 Fleet Cargoes',
        'Volume Exposed: 14.2 Million Barrels',
        'Cost Impact: +$48.5M Freight Surge',
        'Avg Delay: +14.8 Days via Cape'
      ],
      narration: 'What happens to the global economy when 20% of the world\'s oil supply is suddenly frozen overnight? The Strait of Hormuz carries over 20 million barrels of energy daily. Meet StraitShift — an enterprise supply continuity platform built to transform disruption panic into clear executive action.'
    },
    {
      step: 2,
      time: '0:25 - 0:50',
      title: '2. Global Energy Map & Cargo Reroute',
      icon: <MapPin className="w-5 h-5 text-cyan-400" />,
      sub: 'Interactive Routing & Vessel Inspection',
      details: [
        'Blocked SOH Corridor (Pulsing Red Line)',
        'Cape of Good Hope Reroute (Cyan Waypoint)',
        'Saudi East-West Pipeline (Amber Landbridge)',
        'Vessel SS-9041 Arabian Titan: +14 Days Lag'
      ],
      narration: 'Our interactive Global Energy Flow Map visually isolates the blocked Strait of Hormuz in red while actively plotting alternative corridors, including the Cape of Good Hope circumnavigation and Saudi East-West landbridge pipeline. Inspecting exposed cargoes — like the VLCC Arabian Titan — StraitShift calculates transit lag and provides a one-click rerouting order.'
    },
    {
      step: 3,
      time: '0:50 - 1:20',
      title: '3. 30-Day Scenario Engine & AI Directives',
      icon: <Sliders className="w-5 h-5 text-purple-400" />,
      sub: 'Depletion Trajectory & Spot Swaps',
      details: [
        '30-Day Disruption Scenario Execution',
        'Inventory Depletion Trajectory Curves',
        'StraitShift Intelligence AI Directive #4',
        'Shift 35% Allocation to Petrobras Atlantic'
      ],
      narration: 'To plan for what happens next, our 30-day Scenario Engine simulates supply gaps and plots inventory depletion curves over time — contrasting unmitigated stockouts against a StraitShift optimized response. In the Action Center, StraitShift Intelligence generates AI-assisted directives — like shifting 35% of crude allocation to Atlantic basin suppliers, cutting supply risk by up to 78%.'
    },
    {
      step: 4,
      time: '1:20 - 1:50',
      title: '4. System Architecture & Board Report Export',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      sub: '6-Layer Architecture & Board PDF Audit',
      details: [
        'AIS Vessel Feeds • SAP ERP • Platts Crude Prices',
        'Normalized Data Processing & Risk Scoring',
        'Decoupled Production API Architecture',
        'One-Click Executive PDF Brief Export'
      ],
      narration: 'Behind the UI, StraitShift operates on a modular 6-layer architecture ready to ingest live AIS vessel tracking, SAP ERP inventory data, and Platts market pricing. Finally, decision-makers can convert these insights into board-ready audit briefs with a single click, ready for PDF export.'
    },
    {
      step: 5,
      time: '1:50 - 2:00',
      title: '5. Conclusion & Value Proposition',
      icon: <CheckCircle2 className="w-5 h-5 text-cyan-400" />,
      sub: 'Disruption → Visibility → Simulation → Action',
      details: [
        'Centralized Energy Continuity Control Tower',
        'Reduces Stockout Penalties by 64%',
        'Seamless Enterprise SaaS Experience',
        'Keep Energy Moving When Routes Don\'t'
      ],
      narration: 'StraitShift moves businesses from disruption to visibility, simulation, and decision — keeping energy moving when critical routes don\'t. Thank you!'
    }
  ];

  const currentSlideObj = slidesData[currentSlide - 1];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col my-6 max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-cyan-500 flex items-center justify-center text-slate-950 font-bold">
              <Video className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                StraitShift 2-Minute Executive Video Companion
              </h2>
              <p className="text-xs text-slate-400">Permanently embedded 2-minute video presentation & walkthrough player</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-950/70 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors ${
                activeTab === 'interactive'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Walkthrough Player</span>
            </button>

            <button
              onClick={() => setActiveTab('custom')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors ${
                activeTab === 'custom'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span>Upload Video / URL</span>
            </button>

            <button
              onClick={() => setActiveTab('script')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors ${
                activeTab === 'script'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Presentation Script</span>
            </button>
          </div>

          <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700 font-mono font-bold">
            ⏱️ {formatTime(progressSec)} / 02:00
          </span>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: PERMANENT INTERACTIVE WALKTHROUGH PLAYER */}
          {activeTab === 'interactive' && (
            <div className="space-y-4">
              {/* Animated Slide Screen Canvas */}
              <div className="relative aspect-video w-full bg-slate-950 border-2 border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    {currentSlideObj.icon}
                    <div>
                      <h3 className="text-sm font-bold text-slate-100">{currentSlideObj.title}</h3>
                      <span className="text-[11px] text-cyan-400 font-mono">{currentSlideObj.sub}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                    Step {currentSlide} of 5
                  </span>
                </div>

                {/* Body Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 my-3">
                  {currentSlideObj.details.map((d, idx) => (
                    <div key={idx} className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                      <span className="text-xs font-semibold text-slate-200">{d}</span>
                    </div>
                  ))}
                </div>

                {/* Subtitles / Live Narration Speech Box */}
                <div className="bg-slate-900 border border-cyan-500/30 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Live Voiceover Subtitles:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-mono">
                    "{currentSlideObj.narration}"
                  </p>
                </div>
              </div>

              {/* Player Controls Bar */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>{formatTime(progressSec)}</span>
                    <span className="text-cyan-400 font-bold">{currentSlideObj.title.split('.')[1]}</span>
                    <span>02:00</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${(progressSec / 120) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Play Buttons */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                      <span>{isPlaying ? 'Pause Presentation' : 'Play 2-Min Video'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setProgressSec(0);
                        setCurrentSlide(1);
                        setIsPlaying(false);
                      }}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        const prev = Math.max(1, currentSlide - 1);
                        setCurrentSlide(prev);
                        setProgressSec((prev - 1) * 24);
                      }}
                      disabled={currentSlide === 1}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 rounded-xl border border-slate-700 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="text-xs font-mono font-bold text-slate-300 px-2">
                      Slide {currentSlide} / 5
                    </span>

                    <button
                      onClick={() => {
                        const next = Math.min(5, currentSlide + 1);
                        setCurrentSlide(next);
                        setProgressSec((next - 1) * 24);
                      }}
                      disabled={currentSlide === 5}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 rounded-xl border border-slate-700 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOM VIDEO UPLOAD / URL PLAYER */}
          {activeTab === 'custom' && (
            <div className="space-y-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <FolderUp className="w-4 h-4 text-cyan-400" /> Upload MP4 Video File
                    </span>
                    {fileName && (
                      <span className="text-[10px] text-cyan-400 font-mono font-bold truncate max-w-[120px]">
                        {fileName}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Upload a local `.mp4` file — saved in browser IndexedDB database.
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
                    Or paste your Loom or YouTube video link to embed your video.
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
            </div>
          )}

          {/* TAB 3: SCRIPT */}
          {activeTab === 'script' && (
            <div className="space-y-3">
              {slidesData.map(sec => (
                <div
                  key={sec.step}
                  onClick={() => setCurrentSlide(sec.step)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    currentSlide === sec.step
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
                      <span className="text-[10px] uppercase font-bold text-cyan-400 block">🎙️ Voiceover Speech:</span>
                      <p className="text-slate-200 leading-relaxed font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 text-[11px]">
                        "{sec.narration}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
