import React, { useState, useEffect } from 'react';
import api from '../api';
import './Admin.css';

export default function Admin() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isHomeExpanded, setIsHomeExpanded] = useState(true);
  const [isOurStoryExpanded, setIsOurStoryExpanded] = useState(false);
  const [isB2bExpanded, setIsB2bExpanded] = useState(false);
  const [isCpExpanded, setIsCpExpanded] = useState(false);
  
  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/content').then(res => {
        setContent(res.data);
        if (Object.keys(res.data).length > 0) {
          setActiveSection('header');
        }
        setLoading(false);
      }).catch(err => {
        console.error('Error fetching content:', err);
        if (err.response && err.response.status === 401) {
          handleLogout();
        }
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  const handleChange = (section, key, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = async (section) => {
    try {
      await api.put(`/content/${section}`, { data: content[section] });
      showToast('Changes saved successfully!');
    } catch (err) {
      showToast('Failed to save changes', 'error');
    }
  };

  const handleUpload = async (section, key, e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    setUploading(true);
    try {
      const res = await api.post('/upload', formData);
      const url = res.data.url; // ImageKit returns the full URL natively
      handleChange(section, key, url);
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast('Upload failed', 'error');
    }
    setUploading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setContent(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const res = await api.post('/login', { username: loginUsername, password: loginPassword });
      localStorage.setItem('adminToken', res.data.token);
      setIsAuthenticated(true);
      setLoading(true); // to fetch content
    } catch (err) {
      setLoginError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-box-split">
          {/* Decorative shapes */}
          <div className="shape circle-top"></div>
          <div className="shape circle-side"></div>
          <div className="shape circle-bottom"></div>

          <div className="login-left">
            <div className="login-header-left">
              <h2>Dashboard<br />Hastmilap</h2>
            </div>
            
            <form className="login-form-split" onSubmit={handleLogin}>
              {loginError && <div className="login-error">{loginError}</div>}
              
              <div className="form-group-split">
                <label>Username</label>
                <input 
                  type="text" 
                  value={loginUsername} 
                  onChange={e => setLoginUsername(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="form-group-split">
                <label>Password</label>
                <div className="input-wrapper">
                  <input 
                    type="password" 
                    value={loginPassword} 
                    onChange={e => setLoginPassword(e.target.value)} 
                    required 
                  />
                  <i className="fa-regular fa-eye input-icon"></i>
                </div>
                <div className="forgot-password">Forgot Password?</div>
              </div>
              
              <button type="submit" className="login-btn-split" disabled={isLoggingIn}>
                <div className="btn-text">{isLoggingIn ? '...' : 'LOGIN'}</div>
                <div className="btn-icon"><i className="fa-solid fa-chevron-right"></i></div>
              </button>
              
              <div className="register-link">
                Don't have an account? <span>REGISTER</span>
              </div>
            </form>
          </div>
          
          <div className="login-right">
            <div className="login-right-content">
              <i className="fa-regular fa-images"></i>
              <p>Image Here</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !content) return <div className="admin-loading"><div className="spinner"></div></div>;

  const sections = Object.keys(content);
  const b2bSectionKeys = ['b2bHero', 'b2bInsights', 'b2bUnrounds', 'b2bHeritage', 'b2bAureate', 'b2bAesthete', 'b2bPrivateLabel', 'b2bUniqueInsight'];
  const ourStorySectionKeys = ['ourStory', 'ourLegacy', 'storyName', 'ourValues', 'ourPhilosophy', 'leadership', 'stats'];
  const cpSectionKeys = ['cpHero', 'cpDiscovery', 'cpConcept', 'cp3dModelling', 'cpPrototyping', 'cpManufacturing', 'cpQuality', 'cpDelivery'];
  
  const homeSections = sections.filter(s => s !== 'header' && s !== 'footer' && !ourStorySectionKeys.includes(s) && !b2bSectionKeys.includes(s) && !cpSectionKeys.includes(s));
  const ourStorySections = sections.filter(s => ourStorySectionKeys.includes(s));
  const b2bSections = sections.filter(s => b2bSectionKeys.includes(s));
  const cpSections = sections.filter(s => cpSectionKeys.includes(s));

  const getSectionLabel = (section) => {
    const labels = {
      ourStory: 'Our Story',
      ourLegacy: 'Our Legacy',
      storyName: 'Story Of Our Name',
      ourValues: 'Our Vision & Mission',
      ourPhilosophy: 'Our Values & Philosophy',
      leadership: 'Leadership',
      stats: 'Stats',
      b2bHero: 'Hero',
      b2bInsights: 'Insights',
      b2bUnrounds: 'Unrounds',
      b2bHeritage: 'Heritage',
      b2bAureate: 'Aureate',
      b2bAesthete: 'Aesthete',
      b2bPrivateLabel: 'Private Label',
      b2bUniqueInsight: 'Unique Insight',
      cpHero: 'Hero',
      cpDiscovery: 'Discovery',
      cpConcept: 'Concept & Design',
      cp3dModelling: '3D Modelling',
      cpPrototyping: 'Prototyping',
      cpManufacturing: 'Manufacturing',
      cpQuality: 'Quality Control',
      cpDelivery: 'Delivery'
    };
    return labels[section] || (section.charAt(0).toUpperCase() + section.slice(1));
  };

  const getIcon = (sectionName) => {
    const icons = {
      header: 'fa-solid fa-heading',
      hero: 'fa-solid fa-image',
      strengths: 'fa-solid fa-dumbbell',
      about: 'fa-solid fa-circle-info',
      storyName: 'fa-solid fa-book-open',
      ourValues: 'fa-solid fa-gem',
      ourPhilosophy: 'fa-solid fa-leaf',
      leadership: 'fa-solid fa-users',
      design: 'fa-solid fa-pen-nib',
      global: 'fa-solid fa-globe',
      marquee: 'fa-solid fa-bullhorn',
      faq: 'fa-solid fa-circle-question',
      banner: 'fa-regular fa-image',
      categories: 'fa-solid fa-list',
      tech: 'fa-solid fa-microchip',
      styles: 'fa-solid fa-gem',
      instagram: 'fa-brands fa-instagram',
      footer: 'fa-solid fa-shoe-prints',
      ourStory: 'fa-solid fa-book-open',
      ourLegacy: 'fa-solid fa-landmark'
    };
    return icons[sectionName] || 'fa-solid fa-table-cells-large';
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <span className="dot dot-purple"></span>
            <span className="dot dot-pink"></span>
            <span className="dot dot-blue"></span>
            <span className="dot dot-yellow"></span>
          </div>
          <h2>Hastmilap</h2>
        </div>
        
        <p className="sidebar-subtitle">Modern Admin Dashboard</p>

        <nav className="sidebar-nav">
          {sections.includes('header') && (
            <button 
              className={`nav-item ${activeSection === 'header' ? 'active' : ''}`}
              onClick={() => setActiveSection('header')}
            >
              <i className={getIcon('header')}></i>
              <span>Header</span>
            </button>
          )}

          {homeSections.length > 0 && (
            <div className="nav-group">
              <button 
                className="nav-item group-toggle"
                onClick={() => setIsHomeExpanded(!isHomeExpanded)}
              >
                <i className="fa-solid fa-house"></i>
                <span>Home Page</span>
                <i className={`fa-solid fa-chevron-${isHomeExpanded ? 'up' : 'down'} chevron-icon`}></i>
              </button>
              
              {isHomeExpanded && (
                <div className="sub-menu">
                  {homeSections.map(section => (
                    <button 
                      key={section} 
                      className={`nav-item sub-item ${activeSection === section ? 'active' : ''}`}
                      onClick={() => setActiveSection(section)}
                    >
                      <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {ourStorySections.length > 0 && (
            <div className="nav-group">
              <button 
                className="nav-item group-toggle"
                onClick={() => setIsOurStoryExpanded(!isOurStoryExpanded)}
              >
                <i className="fa-solid fa-book"></i>
                <span>Our Story Page</span>
                <i className={`fa-solid fa-chevron-${isOurStoryExpanded ? 'up' : 'down'} chevron-icon`}></i>
              </button>
              
              {isOurStoryExpanded && (
                <div className="sub-menu">
                  {ourStorySections.map(section => (
                    <button 
                      key={section} 
                      className={`nav-item sub-item ${activeSection === section ? 'active' : ''}`}
                      onClick={() => setActiveSection(section)}
                    >
                      <span>{getSectionLabel(section)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {b2bSections.length > 0 && (
            <div className="nav-group">
              <button 
                className="nav-item group-toggle"
                onClick={() => setIsB2bExpanded(!isB2bExpanded)}
              >
                <i className="fa-solid fa-briefcase"></i>
                <span>B2B Page</span>
                <i className={`fa-solid fa-chevron-${isB2bExpanded ? 'up' : 'down'} chevron-icon`}></i>
              </button>
              
              {isB2bExpanded && (
                <div className="sub-menu">
                  {b2bSections.map(section => (
                    <button 
                      key={section} 
                      className={`nav-item sub-item ${activeSection === section ? 'active' : ''}`}
                      onClick={() => setActiveSection(section)}
                    >
                      <span>{getSectionLabel(section)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {cpSections.length > 0 && (
            <div className="nav-group">
              <button 
                className="nav-item group-toggle"
                onClick={() => setIsCpExpanded(!isCpExpanded)}
              >
                <i className="fa-solid fa-lightbulb"></i>
                <span>Creative Process</span>
                <i className={`fa-solid fa-chevron-${isCpExpanded ? 'up' : 'down'} chevron-icon`}></i>
              </button>
              
              {isCpExpanded && (
                <div className="sub-menu">
                  {cpSections.map(section => (
                    <button 
                      key={section} 
                      className={`nav-item sub-item ${activeSection === section ? 'active' : ''}`}
                      onClick={() => setActiveSection(section)}
                    >
                      <span>{getSectionLabel(section)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {sections.includes('footer') && (
            <button 
              className={`nav-item ${activeSection === 'footer' ? 'active' : ''}`}
              onClick={() => setActiveSection('footer')}
            >
              <i className={getIcon('footer')}></i>
              <span>Footer</span>
            </button>
          )}

          <div className="sidebar-divider"></div>
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <h1>{activeSection ? activeSection.charAt(0).toUpperCase() + activeSection.slice(1) : 'Dashboard'}</h1>
            <p>Welcome to Hastmilap Modern Admin Dashboard</p>
          </div>
          
          <div className="topbar-right">
            <div className="search-bar">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search here..." />
            </div>
            <button className="icon-btn notification">
              <i className="fa-regular fa-bell"></i>
              <span className="badge">4</span>
            </button>
            <div className="profile">
              <img src="https://ui-avatars.com/api/?name=Admin+User&background=a855f7&color=fff" alt="Admin" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="content-area">
          {activeSection && (
            <div className="dashboard-card form-card">
              <div className="card-header">
                <h3>Edit Content</h3>
                <button className="btn-primary" onClick={() => handleSave(activeSection)}>
                  <i className="fa-regular fa-floppy-disk"></i> Save Changes
                </button>
              </div>
              
              <div className="card-body">
                <div className="form-grid">
                  {Object.keys(content[activeSection])
                    .sort((a, b) => {
                      if (a === 'companyLinks') return -1;
                      if (b === 'companyLinks') return 1;
                      return 0;
                    })
                    .map(key => {
                    if (Array.isArray(content[activeSection][key])) {
                      const arr = content[activeSection][key];
                      return (
                        <div key={key} className="form-group full-width">
                          <label className="form-label">{key.toUpperCase()}</label>
                          <div className="array-editor">
                            {arr.map((item, index) => (
                              <div key={index} className="array-item" style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                <input 
                                  type="text" 
                                  placeholder="Link Text" 
                                  className="form-control" 
                                  value={item.text || ''} 
                                  onChange={(e) => {
                                    const newArr = [...arr];
                                    newArr[index] = { ...newArr[index], text: e.target.value };
                                    handleChange(activeSection, key, newArr);
                                  }} 
                                />
                                <input 
                                  type="text" 
                                  placeholder="URL" 
                                  className="form-control" 
                                  value={item.url || ''} 
                                  onChange={(e) => {
                                    const newArr = [...arr];
                                    newArr[index] = { ...newArr[index], url: e.target.value };
                                    handleChange(activeSection, key, newArr);
                                  }} 
                                />
                                <button 
                                  className="btn-danger" 
                                  style={{ padding: '8px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    const newArr = [...arr];
                                    newArr.splice(index, 1);
                                    handleChange(activeSection, key, newArr);
                                  }}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            ))}
                            <button 
                              className="btn-secondary" 
                              style={{ marginTop: '10px' }}
                              onClick={(e) => {
                                e.preventDefault();
                                const newArr = [...arr, { text: 'New Link', url: '#' }];
                                handleChange(activeSection, key, newArr);
                              }}
                            >
                              <i className="fa-solid fa-plus"></i> Add Link
                            </button>
                          </div>
                        </div>
                      );
                    }
                    
                    const isMedia = (key.toLowerCase().includes('url') || key.toLowerCase().includes('image')) && !key.toLowerCase().includes('link');
                    const isLongText = typeof content[activeSection][key] === 'string' && content[activeSection][key].length > 50;
                    
                    if (key === 'mediaType') {
                      return (
                        <div key={key} className="form-group">
                          <label className="form-label">MEDIA TYPE (VIDEO OR IMAGE)</label>
                          <select 
                            className="form-control"
                            value={content[activeSection][key]} 
                            onChange={(e) => handleChange(activeSection, key, e.target.value)}
                          >
                            <option value="video">Video</option>
                            <option value="image">Image</option>
                          </select>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={key} className={`form-group ${isLongText ? 'full-width' : ''}`}>
                        <label className="form-label">{key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</label>
                        {isMedia ? (
                          <div className="media-input">
                            <div className="input-with-icon">
                              <i className="fa-solid fa-link"></i>
                              <input 
                                type="text" 
                                className="form-control"
                                value={content[activeSection][key]} 
                                onChange={(e) => handleChange(activeSection, key, e.target.value)} 
                                placeholder="Media URL"
                              />
                            </div>
                              {key.toLowerCase().includes('video') ? (
                                <div className="upload-btn-wrapper">
                                  <button className="btn-secondary upload-btn" disabled={uploading} onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(`vid-upload-${activeSection}-${key}`).click();
                                  }}>
                                    <i className="fa-solid fa-video"></i> {uploading ? 'Uploading...' : 'Upload Video'}
                                  </button>
                                  <input 
                                    type="file" 
                                    id={`vid-upload-${activeSection}-${key}`}
                                    style={{display: 'none'}} 
                                    accept="video/*"
                                    onChange={(e) => handleUpload(activeSection, key, e)}
                                    disabled={uploading}
                                  />
                                </div>
                              ) : (
                                <div className="upload-btn-wrapper">
                                  <button 
                                    className="btn-secondary upload-btn" 
                                    disabled={uploading}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      document.getElementById(`img-upload-${activeSection}-${key}`).click();
                                    }}
                                  >
                                    <i className="fa-solid fa-image"></i> {uploading ? 'Uploading...' : 'Upload Image'}
                                  </button>
                                  <input 
                                    id={`img-upload-${activeSection}-${key}`}
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={(e) => handleUpload(activeSection, key, e)} 
                                    disabled={uploading} 
                                  />
                                </div>
                              )}
                          </div>
                        ) : isLongText ? (
                          <textarea 
                            className="form-control"
                            value={content[activeSection][key]} 
                            onChange={(e) => handleChange(activeSection, key, e.target.value)}
                            rows="4"
                          />
                        ) : (
                          <input 
                            type="text"
                            className="form-control"
                            value={content[activeSection][key]} 
                            onChange={(e) => handleChange(activeSection, key, e.target.value)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Professional Toast Notification */}
      <div className={`admin-toast ${toast.show ? 'show' : ''} ${toast.type}`}>
        <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
