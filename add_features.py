import os
import re

# 1. Update dashboard.html
with open('dashboard.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add Carbon Offset Card after Solar Generation
carbon_card = '''
        <!-- SUSTAINABILITY CARD -->
        <div class="card" style="background: linear-gradient(135deg, #0f302b 0%, #175245 100%); border-color: #35e0c0; position: relative; overflow: hidden;">
          <div style="position: absolute; right: -20px; top: -20px; font-size: 6rem; opacity: 0.1;">🌍</div>
          <div class="card-header">
            <div class="card-icon">🌱</div>
            <h3>Carbon Offset</h3>
          </div>
          <div class="card-value">
            <h2 id="carbonOffsetVal">1.24 tCO₂</h2>
            <span class="trend positive">↑ 14% vs yesterday</span>
          </div>
          <p class="card-desc">CO₂ emissions prevented via Solar Generation today.</p>
        </div>
'''
if 'id="carbonOffsetVal"' not in html:
    html = re.sub(
        r'(<div class="card-header">\s*<div class="card-icon">☀️</div>\s*<h3>Solar Generation</h3>.*?</div>)',
        r'\1\n' + carbon_card,
        html, flags=re.DOTALL
    )

# Add Staff Reallocation Engine to Staff Card
staff_reallocation = '''
          <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
             <div style="font-size: 0.8rem; color: #ffb3b3; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;"><span>⚠️</span> ER understaffed by 4 nurses</div>
             <button id="reallocateBtn" class="btn-outline" style="width: 100%; font-size: 0.8rem; border-color: var(--primary); padding: 6px; cursor: pointer;" onclick="executeReallocation(this)">⚡ Auto-Reallocate Staff</button>
          </div>
'''
if 'id="reallocateBtn"' not in html:
    html = re.sub(
        r'(<div class="card-icon">👥</div>\s*<h3>Staff Availability</h3>.*?<p class="card-desc">.*?)</p>',
        r'\1</p>' + '\n' + staff_reallocation,
        html, flags=re.DOTALL
    )

with open('dashboard.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update stp.js
with open('stp.js', 'r', encoding='utf-8') as f:
    js = f.read()

realloc_js = '''
window.executeReallocation = function(btn) {
  const originalText = btn.innerHTML;
  btn.innerHTML = "🔄 Calculating optimal transfer...";
  btn.style.opacity = "0.7";
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerHTML = "✅ Transfer Complete: 4 shifted to ER";
    btn.style.backgroundColor = "var(--primary)";
    btn.style.color = "var(--bg-main)";
    btn.style.opacity = "1";
    
    // Visually update the staff metric to simulate the fix
    const staffVal = document.getElementById('staffVal');
    if (staffVal && staffVal.innerText.includes('/')) {
        let parts = staffVal.innerText.split('/');
        let available = parseInt(parts[0]) - 4; // 4 less available, now on duty
        staffVal.innerText = available + " / " + parts[1];
    }
    
    // Trigger pulse on the card
    btn.closest('.card').classList.add('flash-update');
    setTimeout(() => {
        btn.closest('.card').classList.remove('flash-update');
    }, 1500);
  }, 1500);
};
'''

if 'window.executeReallocation' not in js:
    js = js.replace('function initApp() {', realloc_js + '\nfunction initApp() {')

with open('stp.js', 'w', encoding='utf-8') as f:
    f.write(js)
