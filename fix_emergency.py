import re

with open('stp.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Strip out whatever is left of initEmergencyProtocol
js = re.sub(r'function initEmergencyProtocol\(\) \{[\s\S]*?\n\}\n*', '', js)
# Also strip out the orphaned else block
js = re.sub(r'\} else \{\s*emBtn\.innerText.*?\}\s*\}\);\s*\}', '', js, flags=re.DOTALL)

clean_emergency = '''
function initEmergencyProtocol() {
  const emBtn = document.getElementById('emergencyToggle');
  if (!emBtn) return;
  emBtn.addEventListener('click', () => {
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
}
'''
js = js.replace('function initApp() {', clean_emergency + '\nfunction initApp() {')

with open('stp.js', 'w', encoding='utf-8') as f:
    f.write(js)
