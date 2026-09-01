import re

with open('frontend/myi10.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Insert Sidebar Menu Bar Language Selector if not already present
sidebar_target = '<div id="sidebarNavContainer">'
sidebar_replacement = '''    <!-- REAL-TIME MENU BAR LANGUAGE SELECTOR -->
    <div class="sidebar-lang-selector" style="margin: 0 4px 16px; padding: 12px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 7px;">
        <label for="menuBarLanguageSelect" style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: #7fd6c7; margin: 0; cursor: pointer;">
          <span style="font-size: 13px;">🌐</span>
          <span>Chatbot Language</span>
        </label>
        <span id="menuBarActiveLangBadge" class="badge" style="background: #0d9488; font-size: 10px; padding: 2px 7px; border-radius: 8px; font-weight: 800;">EN</span>
      </div>
      <div style="position: relative;">
        <select id="menuBarLanguageSelect" onchange="changeGlobalLanguage(this.value)" style="width: 100%; height: 38px; padding: 0 28px 0 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.18); background: #07221e; color: #effffb; font-size: 13px; font-weight: 700; cursor: pointer; outline: none; appearance: none; -webkit-appearance: none; transition: border-color 0.2s ease;">
          <!-- Populated dynamically with Indian & Global Languages -->
          <option value="en" selected>🇬🇧 English (English)</option>
          <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
          <option value="te">🇮🇳 తెలుగు (Telugu)</option>
          <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
          <option value="bn">🇮🇳 বাংলা (Bengali)</option>
          <option value="mr">🇮🇳 मराठी (Marathi)</option>
          <option value="gu">🇮🇳 ગુજરાતી (Gujarati)</option>
          <option value="kn">🇮🇳 ಕನ್ನಡ (Kannada)</option>
          <option value="ml">🇮🇳 മലയാളം (Malayalam)</option>
          <option value="pa">🇮🇳 ਪੰਜਾਬੀ (Punjabi)</option>
          <option value="ur">🇵🇰 اردو (Urdu)</option>
          <option value="es">🇪🇸 Español (Spanish)</option>
          <option value="ar">🇸🇦 العربية (Arabic)</option>
          <option value="fr">🇫🇷 Français (French)</option>
          <option value="de">🇩🇪 Deutsch (German)</option>
          <option value="zh">🇨🇳 简体中文 (Chinese)</option>
          <option value="ja">🇯🇵 日本語 (Japanese)</option>
          <option value="ru">🇷🇺 Русский (Russian)</option>
        </select>
        <div style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; font-size: 10px; color: #7fd6c7;">▼</div>
      </div>
      <div id="menuBarLangStatus" style="margin-top: 6px; font-size: 10.5px; color: #94bcb4; display: flex; align-items: center; justify-content: space-between;">
        <span>⚡ Real-time AI Consult</span>
        <span id="menuBarLangNativeName" style="color: #2dd4bf; font-weight: 700;">English</span>
      </div>
    </div>
    <div id="sidebarNavContainer">'''

if 'id="menuBarLanguageSelect"' not in html:
    html = html.replace(sidebar_target, sidebar_replacement, 1)
    print("Added menuBarLanguageSelect markup to sidebar")
else:
    print("menuBarLanguageSelect markup already present")

with open('frontend/myi10.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated myi10.html")
