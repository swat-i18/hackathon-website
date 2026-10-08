import re

# 1. Update dashboard.html to add Modal overlay and fix button
with open('dashboard.html', 'r', encoding='utf-8') as f:
    html = f.read()

modal_html = '''
    <!-- CUSTOM MODAL OVERLAY -->
    <div id="customModal" class="modal-overlay">
      <div class="modal-box">
        <div class="modal-header">
          <h3 id="modalTitle">System Message</h3>
          <button onclick="closeModal()" class="close-modal">✕</button>
        </div>
        <div class="modal-body" id="modalBody">
          <!-- Dynamic content -->
        </div>
        <div class="modal-footer" id="modalFooter">
          <button class="btn-primary" onclick="closeModal()">Close</button>
        </div>
      </div>
    </div>
'''

if 'id="customModal"' not in html:
    html = html.replace('</body>', modal_html + '\n    </body>')

# Replace alert() with initiateOverflow()
html = re.sub(
    r'onclick="alert\(\'Overflow protocols initiated[^"]*"\)',
    'onclick="initiateOverflow()"',
    html
)

with open('dashboard.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update sub.css to style the modal
with open('sub.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '.modal-overlay' not in css:
    css += '''
/* CUSTOM MODAL */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(4, 15, 14, 0.85); backdrop-filter: blur(5px);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999; opacity: 0; pointer-events: none;
  transition: opacity 0.3s ease;
}
.modal-overlay.active { opacity: 1; pointer-events: auto; }
.modal-box {
  background: var(--bg-card); border: 1px solid var(--border-subtle);
  border-radius: 12px; width: 90%; max-width: 500px;
  transform: translateY(20px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}
.modal-overlay.active .modal-box { transform: translateY(0) scale(1); }
.modal-header {
  padding: 16px 24px; border-bottom: 1px solid var(--border-subtle);
  display: flex; justify-content: space-between; align-items: center;
}
.modal-header h3 { margin: 0; font-size: 1.2rem; color: var(--text-main); }
.close-modal { background: transparent; border: none; color: var(--text-muted); font-size: 1.2rem; cursor: pointer; }
.close-modal:hover { color: var(--text-main); }
.modal-body { padding: 24px; color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; }
.modal-footer {
  padding: 16px 24px; border-top: 1px solid var(--border-subtle);
  display: flex; justify-content: flex-end; gap: 12px;
}
.progress-container { width: 100%; height: 8px; background: #1D5B54; border-radius: 4px; margin-top: 16px; overflow: hidden; }
.progress-bar { height: 100%; background: var(--accent-primary); width: 0%; transition: width 2s ease-in-out; }
'''
    with open('sub.css', 'w', encoding='utf-8') as f:
        f.write(css)

# 3. Update stp.js with modal logic
with open('stp.js', 'r', encoding='utf-8') as f:
    js = f.read()

modal_js = '''
// MODAL SYSTEM
window.showModal = function(title, bodyHTML, footerHTML) {
  const overlay = document.getElementById('customModal');
  if (!overlay) return;
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalBody').innerHTML = bodyHTML;
  if (footerHTML) document.getElementById('modalFooter').innerHTML = footerHTML;
  overlay.classList.add('active');
};
window.closeModal = function() {
  const overlay = document.getElementById('customModal');
  if (overlay) overlay.classList.remove('active');
};

window.initiateOverflow = function() {
  showModal(
    "Initiating Overflow Protocols",
    `
      <div style="display:flex; align-items:center; gap:12px; margin-bottom: 16px;">
        <div style="font-size:2rem; animation: pulse-emergency 1s infinite alternate;">⚠️</div>
        <div>
          <strong style="color:var(--text-main);">Routing patients to Wing C...</strong><br>
          Notifying standby personnel in Ward 4.
        </div>
      </div>
      <div class="progress-container"><div class="progress-bar" id="overflowProgress"></div></div>
      <p id="overflowStatus" style="margin-top:12px; font-size:0.85rem;">Establishing secure comms...</p>
    `,
    `<button class="btn-outline" onclick="closeModal()">Cancel</button>`
  );
  
  setTimeout(() => { 
      const pb = document.getElementById('overflowProgress');
      if(pb) pb.style.width = '100%'; 
  }, 100);
  setTimeout(() => { 
      const st = document.getElementById('overflowStatus');
      if(st) st.innerHTML = "<span style='color:var(--primary); font-weight:bold;'>✅ Wing C personnel mobilized. 12 beds reserved.</span>"; 
  }, 2000);
  setTimeout(() => { 
    const ft = document.getElementById('modalFooter');
    if(ft) ft.innerHTML = `<button class="btn-primary" onclick="closeModal()">Acknowledge</button>`;
  }, 2200);
};

window.confirmEmergency = function() {
  closeModal();
  document.body.classList.add('emergency-mode');
  const emBtn = document.getElementById('emergencyToggle');
  if(emBtn) {
      emBtn.innerText = "🛑 Cancel Emergency Protocol";
      emBtn.style.backgroundColor = "#5a1111";
  }
  document.querySelectorAll('.card').forEach(card => {
    if (card.innerText.includes('Beds') || card.innerText.includes('Staff')) {
      card.classList.add('emergency-pulse');
    }
  });
};
'''

if 'window.showModal' not in js:
    # Inject modal system at the top
    js = modal_js + '\n' + js
    
    # Replace initEmergencyProtocol logic
    old_emergency = r'emBtn\.addEventListener\(\'click\', \(\) => \{[\s\S]*?\}\);\s*\}'
    new_emergency = '''emBtn.addEventListener('click', () => {
    if (document.body.classList.contains('emergency-mode')) {
      document.body.classList.remove('emergency-mode');
      emBtn.innerText = "🚨 Trigger Emergency Protocol";
      emBtn.style.backgroundColor = "#ff4d4d";
      document.querySelectorAll('.card').forEach(card => card.classList.remove('emergency-pulse'));
    } else {
      showModal(
        "🚨 SYSTEM OVERRIDE: CODE RED",
        `
          <p style="color:#ffb3b3; font-weight:bold; font-size:1.1rem;">WARNING: Initiating Hospital-Wide Emergency Protocol.</p>
          <ul style="margin-top:16px; margin-left:20px; line-height:1.8;">
            <li>Standard operations dashboard will be overridden.</li>
            <li>Emergency lighting sequences will be triggered.</li>
            <li>Available standby staff will be universally paged.</li>
          </ul>
          <p style="margin-top:20px; font-size:1rem; color:var(--text-main);">Are you absolutely sure you want to proceed?</p>
        `,
        `
          <button class="btn-outline" onclick="closeModal()">Cancel</button>
          <button class="btn-primary" style="background:#ff4d4d; color:white; border:none;" onclick="confirmEmergency()">AUTHORIZE CODE RED</button>
        `
      );
    }
  });
}'''
    js = re.sub(old_emergency, new_emergency, js)

with open('stp.js', 'w', encoding='utf-8') as f:
    f.write(js)
