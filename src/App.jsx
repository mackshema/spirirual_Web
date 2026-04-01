import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Play, Settings, Search, CheckCircle, Heart, Send, Lock, User, X, Loader } from 'lucide-react';

const STATIC_QUOTES = [
  { text: "For him who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, his mind will remain the greatest enemy.", source: "Bhagavad Gita 6.6", explanation: "If you control your mind, it helps you focus. If not, it distracts you from your goals." },
  { text: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.", source: "Bhagavad Gita 2.47", explanation: "Focus on your studies and work without worrying too much about the results. Do your best!" },
  { text: "There is nothing in this world as purifying as spiritual knowledge.", source: "Bhagavad Gita 4.38", explanation: "Knowledge helps clean your mind from doubts and confusion." }
];

const INITIAL_VIDEOS = [
  { id: "M5n5iT8pWkI", title: "Overcome Laziness | Vamsidhari Dasa", thumbnail: "https://img.youtube.com/vi/M5n5iT8pWkI/hqdefault.jpg", category: "Motivation", views: "60K Views", time: "1 day ago" },
  { id: "S4G0rI82tQ0", title: "Power of Chanting (Sri Namam)", thumbnail: "https://img.youtube.com/vi/S4G0rI82tQ0/hqdefault.jpg", category: "Chanting", views: "40K Views", time: "1 day ago" },
  { id: "JcOIQ_kG3qU", title: "Manage Your Mind | Bhagavad Gita", thumbnail: "https://img.youtube.com/vi/JcOIQ_kG3qU/hqdefault.jpg", category: "Discipline", views: "30K Views", time: "1 day ago" },
  { id: "Y5g1h3wR2Kk", title: "Bhagavad Gita Secrets Revealed", thumbnail: "https://img.youtube.com/vi/Y5g1h3wR2Kk/hqdefault.jpg", category: "Stories", views: "40K Views", time: "1 month ago" },
  { id: "D9zR3QfI8u8", title: "Student Life & Brahmacharya", thumbnail: "https://img.youtube.com/vi/D9zR3QfI8u8/hqdefault.jpg", category: "Discipline", views: "15K Views", time: "2 weeks ago" },
];

const CATEGORIES = ["Motivation", "Discipline", "Chanting", "Stories"];

// 1. Dashboard View
const MainDashboard = ({ videos, setOpenSettings, isLoggedIn, setIsLoggedIn, showLogin, setShowLogin, japaCount, setJapaCount }) => {
  const navigate = useNavigate();
  const currentDay = new Date().getDay();
  const todayQuote = STATIC_QUOTES[currentDay % STATIC_QUOTES.length];

  return (
    <div style={{ width: '100%' }}>
      
      {/* Settings / Web LLM Trigger */}
      <div style={{ position: 'absolute', top: 20, right: 30, zIndex: 100, display: 'flex', gap: '16px' }}>
          <button className="glass-effect" onClick={() => setOpenSettings(true)} style={{ border:'none', padding:'10px', borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
             <Settings size={20} color="#fff" />
          </button>
          <button className="glass-effect" onClick={() => isLoggedIn ? setIsLoggedIn(false) : setShowLogin(true)} style={{ border:'none', padding:'10px', borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
             <User size={20} color={isLoggedIn ? "#f472b6" : "#fff"} />
          </button>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">Find Peace.<br/>Stay Focused.<br/><span className="text-gradient">Grow Daily.</span></h1>
          <p className="hero-subtitle">Personalized spiritual content for youth to enrich daily life.</p>
          <button className="btn-primary">Start Exploring</button>
        </div>
      </div>

      <div className="app-wrapper">
        
        {/* Recommended Row */}
        <div>
          <div className="section-header">
            <h2 className="section-title">Recommended For You</h2>
            <div className="section-filters">
              {CATEGORIES.map(c => <span key={c}>{c}</span>)}
              <div className="see-all-btn" onClick={() => alert("Loading more videos from Vamsidhari Dasa channel...")}>See All &rsaquo;</div>
            </div>
          </div>
          <div className="video-row">
            {videos.slice(0,4).map(video => (
              <div key={video.id} className="video-card" onClick={() => navigate(`/play/${video.id}`)}>
                <div className="thumbnail-box">
                  <img src={video.thumbnail} alt={video.title} onError={(e) => {e.target.src='/hero_krishna.png';}} />
                  <div className="vid-meta-overlay">
                    <span className="vid-badge" style={{background: 'rgba(0,0,0,0.7)'}}>{video.views}</span>
                    <span className="vid-badge" style={{background: 'rgba(147, 51, 234, 0.8)'}}>{video.time}</span>
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '4px', color: '#1e293b' }}>{video.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Watch to understand the simple yet powerful wisdom to change your mindset.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Big Glass Category Pill */}
        <div className="glass-effect big-category-bar">
          <span style={{ cursor:'pointer' }}>Motivation</span> | 
          <span style={{ cursor:'pointer' }}>Discipline</span> | 
          <span style={{ cursor:'pointer' }}>Chanting</span> | 
          <span style={{ cursor:'pointer' }}>Stories</span>
        </div>

        {/* Kirtan & Chanting Section with Japa Counter overlaid natively! */}
        <div className="kirtan-section">
          <h2 className="section-title">Kirtan & Chanting</h2>
          
          <div className="kirtan-banner-box">
            {/* Left Content */}
            <h3 className="kirtan-text">Relax and Chant Along <br/>with Kirtans</h3>
            
            {/* Right Side Glass Japa Counter EXACTLY like image */}
            <div className="japa-floating-card glass-effect">
               <div className="japa-header">
                 <div style={{width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>📿</div>
                 Japa Counter
               </div>
               
               <div className="japa-main-display">
                  <div style={{width: 30, height: 30, borderRadius:'50%', background:'#ec4899', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem'}}>E</div>
                  <span className="japa-num">{isLoggedIn ? japaCount : '--'}</span>
                  <button className="japa-plus" onClick={() => {
                     if(!isLoggedIn) setShowLogin(true);
                     else setJapaCount(prev => prev + 1);
                  }}>+</button>
               </div>

               <button className="japa-btn" onClick={() => isLoggedIn ? setJapaCount(0) : setShowLogin(true)}>
                 {isLoggedIn ? 'Reset Count' : 'Join Now'}
               </button>
            </div>
          </div>
        </div>

        {/* Daily Wisdom Section */}
        <div>
          <div className="section-header" style={{ justifyContent: 'flex-start', gap: 16 }}>
             <h2 className="section-title">Daily Wisdom</h2>
             <span style={{ background: 'rgba(255,255,255,0.6)', padding: '4px 12px', borderRadius: 99, fontSize: '0.8rem', fontWeight: 'bold', color: '#ec4899' }}>Today &rsaquo;</span>
          </div>
          
          <div className="glass-effect wisdom-card" style={{ position: 'relative' }}>
             {!isLoggedIn && (
               <div style={{position: 'absolute', inset:0, background: 'rgba(255,255,255,0.8)', zIndex: 10, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius: 20}}>
                 <Lock size={32} color="#64748b" style={{marginBottom: 8}}/>
                 <button className="btn-primary" onClick={() => setShowLogin(true)}>Login to Read</button>
               </div>
             )}
             <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '12px' }}>Daily: Bhagavad Gita</p>
             <h3 style={{ fontSize: '1.4rem', fontWeight: 700, fontStyle:'italic', color: '#4c1d95', marginBottom: '16px' }}>"{todayQuote.text}"</h3>
             <p style={{ fontSize: '1rem', color: '#334155' }}><strong>Meaning:</strong> {todayQuote.explanation}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

// 2. Video Player Detail with AI Setup
const VideoPlayer = ({ videos, openRouterKey }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videos.find(v => v.id === id) || videos[0];
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { text: `Hare Krishna! Ask me any questions about "${video.title}".`, sender: 'bot' }
  ]);
  const [description, setDescription] = useState({ en: "Loading smart summary...", ta: "சுருக்கமான விளக்கம் ஏற்றப்படுகிறது..." });
  const [descLoading, setDescLoading] = useState(true);

  useEffect(() => {
     window.scrollTo(0,0);
     const fetchAi = async () => {
       if(!openRouterKey) {
          setDescription({
            en: `Powerful lesson from ${video.title}. Discover deep spiritual wisdom for managing focus and stress.`,
            ta: `இது ஒரு அற்புதமான ஆன்மீக வீடியோ. உங்கள் கவனத்தை அதிகரிக்க முழுமையாக காணவும்.`
          });
          setDescLoading(false);
          return;
       }
       try {
         const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${openRouterKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: [
                { role: "system", content: "You are the Description Agent. Generate a simple 2 line description explaining what this video teaches and why a student should watch it. JSON format: {'en': '...', 'ta': '...'}" },
                { role: "user", content: `Title: ${video.title}` }
              ]
            })
         });
         const data = await response.json();
         const content = data.choices[0].message.content;
         const parsed = JSON.parse(content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1));
         setDescription(parsed);
       } catch (e) {
         setDescription({ en: "Spiritual discourse on mindful living.", ta: "ஆன்மீக சொற்பொழிவு." });
       }
       setDescLoading(false);
     };
     fetchAi();
  }, [id, openRouterKey]);

  const handleSend = async () => {
    if(!chatInput.trim()) return;
    const userInput = chatInput;
    setMessages(prev => [...prev, { text: userInput, sender: 'user' }]);
    setChatInput("");
    
    if(!openRouterKey) {
      setTimeout(() => setMessages(prev => [...prev, { text: "For more guidance, contact: 9677914980", sender: 'bot' }]), 1000);
      return;
    }
    
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${openRouterKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: "You are an AI Spiritual Guide for youth. Answer ONLY based on the video context. Keep it short. If irrelevant, say exactly: 'For more guidance, contact: 9677914980'" },
            { role: "user", content: `Video: ${video.title}. Question: ${userInput}` }
          ]
        })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.choices[0].message.content, sender: 'bot' }]);
    } catch(e) {
       setMessages(prev => [...prev, { text: "For more guidance, contact: 9677914980", sender: 'bot' }]);
    }
  };

  return (
    <div className="app-wrapper" style={{ paddingTop: '40px', display: 'flex', flexDirection: 'row', gap: '32px' }}>
       {/* Main Player */}
       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: '#9333ea', cursor: 'pointer', alignSelf: 'flex-start', fontWeight:'bold' }}>&lsaquo; Back to Home</button>
          <div className="glass-effect" style={{ padding: 0, borderRadius: 24, overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="500px" src={`https://www.youtube.com/embed/${video.id}?autoplay=1`} title="Player" frameBorder="0" allowFullScreen></iframe>
          </div>
          <div className="glass-effect" style={{ padding: '32px', borderRadius: 24 }}>
             <h2 className="section-title" style={{ marginBottom: '16px' }}>{video.title}</h2>
             <div style={{ display:'flex', gap: 16, marginBottom: '24px' }}>
                <span className="vid-badge" style={{background: '#9333ea', fontSize: '0.9rem'}}>{video.category}</span>
                <span className="vid-badge" style={{background: '#334155', fontSize: '0.9rem'}}>{video.views}</span>
             </div>
             <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: 1.6, marginBottom:'8px' }}>Eng: {descLoading ? "..." : description.en}</p>
             <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: 1.6 }}>தமிழ்: {descLoading ? "..." : description.ta}</p>
          </div>
       </div>

       {/* Chatbot Sidebar */}
       <div className="glass-effect chatbot-box" style={{ width: '400px' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '16px' }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #ec4899)', display:'flex', alignItems:'center', justifyContent:'center', color:'white' }}><Heart size={24} /></div>
             <div><h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#4c1d95' }}>Spiritual Guide AI</h3><p style={{ fontSize:'0.85rem', color:'#64748b' }}>Ask a question!</p></div>
          </div>
          <div className="chat-messages">
             {messages.map((m, idx) => <div key={idx} className={`chat-bubble chat-${m.sender}`}>{m.text}</div>)}
          </div>
          <div className="chat-input-area">
             <input type="text" placeholder="Ask about this video..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} />
             <button onClick={handleSend}><Send size={20} /></button>
          </div>
       </div>
    </div>
  );
};

// 3. Root App
export default function App() {
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openRouterKey, setOpenRouterKey] = useState("");
  const [japaCount, setJapaCount] = useState(0);

  // Still attempt to fetch the latest videos on startup using AllOrigins (Robust no-cors fetch)
  useEffect(() => {
     fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UCDGxL0Q44R22OL3dIRnrlkw')}`)
      .then(r => r.json())
      .then(d => {
         const parser = new DOMParser();
         const xmlDoc = parser.parseFromString(d.contents, "text/xml");
         const entries = xmlDoc.getElementsByTagName("entry");
         if (entries.length > 0) {
            let fetchedVideos = [];
            for(let i=0; i < Math.min(entries.length, 10); i++) {
                const title = entries[i].getElementsByTagName("title")[0].textContent;
                const vidId = entries[i].getElementsByTagName("yt:videoId")[0].textContent;
                fetchedVideos.push({
                   id: vidId,
                   title: title,
                   thumbnail: `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`,
                   category: "Recent", views: "New", time: "Today"
                });
            }
            setVideos(fetchedVideos);
         }
      }).catch(e => console.log('Using static valid YouTube videos due to network.'));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainDashboard videos={videos} setOpenSettings={setOpenSettings} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} showLogin={showLogin} setShowLogin={setShowLogin} japaCount={japaCount} setJapaCount={setJapaCount} />} />
        <Route path="/play/:id" element={<VideoPlayer videos={videos} openRouterKey={openRouterKey} />} />
      </Routes>

      {/* Login Modal */}
      {showLogin && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(5px)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div className="glass-effect" style={{ width: 400, padding: 40, borderRadius: 32, position:'relative', background: 'rgba(255,255,255,0.9)' }}>
             <X style={{ position:'absolute', top:24, right:24, cursor:'pointer', color:'#64748b' }} onClick={() => setShowLogin(false)} />
             <h2 style={{ fontSize:'1.8rem', color:'#4c1d95', marginBottom: 8, fontWeight:800 }}>Welcome Back</h2>
             <p style={{ color:'#64748b', marginBottom: 32 }}>Login to track your Japa rounds and access Daily Wisdom securely.</p>
             <input type="text" placeholder="Username" style={{ width:'100%', padding:'16px', borderRadius:16, border:'1px solid #e2e8f0', marginBottom:16, outline:'none' }} />
             <input type="password" placeholder="Password" style={{ width:'100%', padding:'16px', borderRadius:16, border:'1px solid #e2e8f0', marginBottom:32, outline:'none' }} />
             <button className="btn-primary" style={{ width:'100%' }} onClick={() => { setIsLoggedIn(true); setShowLogin(false); }}>Login Now</button>
          </div>
        </div>
      )}

      {/* Settings Modal for API Key */}
      {openSettings && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(5px)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div className="glass-effect" style={{ width: 450, padding: 40, borderRadius: 32, position:'relative', background: 'rgba(255,255,255,0.9)' }}>
             <X style={{ position:'absolute', top:24, right:24, cursor:'pointer', color:'#64748b' }} onClick={() => setOpenSettings(false)} />
             <h2 style={{ fontSize:'1.6rem', color:'#4c1d95', marginBottom: 8, fontWeight:800 }}>AI Core Settings</h2>
             <p style={{ color:'#64748b', marginBottom: 32 }}>To trigger real AI Description Generation and the LLM Chatbot, paste your OpenRouter key.</p>
             <input type="password" value={openRouterKey} onChange={e => setOpenRouterKey(e.target.value)} placeholder="sk-or-v1-..." style={{ width:'100%', padding:'16px', borderRadius:16, border:'1px solid #e2e8f0', marginBottom:16, outline:'none' }} />
             <button className="btn-primary" style={{ width:'100%' }} onClick={() => setOpenSettings(false)}>Save Core Key</button>
          </div>
        </div>
      )}
    </Router>
  );
}
