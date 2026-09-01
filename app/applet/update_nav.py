import re

with open('frontend/myi10.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Update initNavigation
pattern = r'function initNavigation\(\) \{[\s\S]*?\n\}'
match = re.search(pattern, text)
if match:
    old_init = match.group(0)
    print('Found initNavigation, replacing...')
    new_init = '''function initNavigation() {
  const navEl = document.getElementById('sidebarNav');
  if (!navEl) return;

  if (typeof NAV_SECTIONS !== 'undefined' && Array.isArray(NAV_SECTIONS)) {
    navEl.innerHTML = NAV_SECTIONS.map(sec => `
      <div class="nav-section-title" style="margin-top:14px;margin-bottom:6px;font-size:11px;text-transform:uppercase;letter-spacing:0.8px;color:#94bcb4;font-weight:800;padding:0 12px;">${escapeHtml(sec.title)}</div>
      ${sec.items.map(item => {
        const clickAction = item.action ? item.action : `go('${item.id}')`;
        const badgeStyle = item.badgeColor ? `background:${item.badgeColor};color:white;` : '';
        return `
          <button onclick="${clickAction}" id="nav-${item.id}" title="${escapeHtml(item.label)}">
            <span class="nav-icon">${item.icon}</span>
            <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(item.label)}</span>
            ${item.badge ? `<span class="badge" style="${badgeStyle}">${escapeHtml(item.badge)}</span>` : ''}
          </button>
        `;
      }).join('')}
    `).join('');
  } else {
    navEl.innerHTML = NAV_MODULES.map(([id, icon, label, badge]) => `
      <button onclick="go('${id}')" id="nav-${id}">
        <span class="nav-icon">${icon}</span>
        <span>${escapeHtml(label)}</span>
        ${badge ? `<span class="badge">${escapeHtml(badge)}</span>` : ''}
      </button>
    `).join('');
  }
}'''
    text = text.replace(old_init, new_init, 1)
    with open('frontend/myi10.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print('✓ Successfully updated initNavigation')
else:
    print('Pattern not matched')
