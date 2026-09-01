/* ============================================================
   BMW THAILAND — SCRIPT
   ============================================================ */
const PAGES = ['home','about','models','innovation','news','contact'];
const NAV_MAP = {
  home:'nav-home', about:'nav-about', models:'nav-models',
  innovation:'nav-innovation', news:'nav-news', contact:'nav-contact'
};

function showPage(id) {
  if (!PAGES.includes(id)) return;
  PAGES.forEach(p => {
    document.getElementById('page-'+p)?.classList.remove('active');
    document.getElementById(NAV_MAP[p])?.classList.remove('active');
  });
  document.getElementById('page-'+id)?.classList.add('active');
  document.getElementById(NAV_MAP[id])?.classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
  if (id === 'contact') renderAdminTable();
}

/* ============================================================
   HAMBURGER / MOBILE MENU
   ============================================================ */
function toggleMobileMenu() {
  const links   = document.getElementById('nav-links-list');
  const burger  = document.getElementById('nav-hamburger');
  const overlay = document.getElementById('nav-overlay');
  const isOpen  = links.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    links.classList.add('open');
    burger.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const links   = document.getElementById('nav-links-list');
  const burger  = document.getElementById('nav-hamburger');
  const overlay = document.getElementById('nav-overlay');
  links.classList.remove('open');
  burger.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

/* ============================================================
   RIPPLE EFFECT — attach to all interactive elements
   ============================================================ */
function createRipple(e) {
  const el   = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x    = e.clientX - rect.left - size / 2;
  const y    = e.clientY - rect.top  - size / 2;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
  el.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

function attachRipples() {
  const selectors = [
    '.nav-link', '.pg-btn', '.pg-num', '.products-btn',
    '.cap-btn', '#cf-submit', '.soc-icon', '.nav-hamburger'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.removeEventListener('click', createRipple);
      el.addEventListener('click', createRipple);
    });
  });
}


/* ============================================================
   CONTACT FORM — localStorage storage
   ============================================================ */
const STORAGE_KEY = 'bmw_contact_submissions';

function getSubmissions() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveSubmissions(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('[BMW] Saved', data.length, 'submissions to localStorage');
  } catch(err) {
    console.error('[BMW] localStorage write error:', err);
    alert('ไม่สามารถบันทึกข้อมูลได้: ' + err.message);
  }
}

function formatDate() {
  const d = new Date();
  const pad = n => String(n).padStart(2,'0');
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function renderAdminTable() {
  const submissions = getSubmissions();
  const wrap  = document.getElementById('cap-table-wrap');
  const empty = document.getElementById('cap-empty');
  if (!wrap) return;

  if (submissions.length === 0) {
    wrap.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  const topicLabel = {
    'test-drive': 'ทดลองขับ',
    'model-info': 'ข้อมูลรุ่นรถ',
    'service':    'บริการหลังการขาย',
    'dealer':     'ค้นหาตัวแทนจำหน่าย',
    'other':      'อื่นๆ',
    '':           '–'
  };

  const rows = submissions.map((s, i) => `
    <tr>
      <td class="cap-td-num">${submissions.length - i}</td>
      <td>${s.date}</td>
      <td><strong>${escHtml(s.name)}</strong></td>
      <td>${escHtml(s.email)}</td>
      <td>${escHtml(s.phone || '–')}</td>
      <td><span class="cap-topic-badge">${topicLabel[s.topic] || s.topic || '–'}</span></td>
      <td class="cap-msg-cell">${escHtml(s.message)}</td>
      <td>
        <button class="cap-del-btn" onclick="deleteSubmission(${i})" title="ลบรายการนี้">✕</button>
      </td>
    </tr>
  `).join('');

  wrap.innerHTML = `
    <table class="cap-table">
      <thead>
        <tr>
          <th>#</th>
          <th>วันที่</th>
          <th>ชื่อ</th>
          <th>อีเมล</th>
          <th>โทรศัพท์</th>
          <th>หัวข้อ</th>
          <th>ข้อความ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="cap-count">รวม ${submissions.length} รายการ</p>
  `;
}

function deleteSubmission(index) {
  if (!confirm('ลบรายการนี้?')) return;
  const data = getSubmissions();
  data.splice(index, 1);
  saveSubmissions(data);
  renderAdminTable();
}

function clearContacts() {
  if (!confirm('ลบข้อมูลทั้งหมด? ไม่สามารถกู้คืนได้')) return;
  localStorage.removeItem(STORAGE_KEY);
  renderAdminTable();
}

function exportContacts() {
  const data = getSubmissions();
  if (data.length === 0) { alert('ยังไม่มีข้อมูลที่จะ Export'); return; }
  const headers = ['#','วันที่','ชื่อ','อีเมล','โทรศัพท์','หัวข้อ','ข้อความ'];
  const topicLabel = {
    'test-drive':'ทดลองขับ','model-info':'ข้อมูลรุ่นรถ',
    'service':'บริการหลังการขาย','dealer':'ค้นหาตัวแทนจำหน่าย','other':'อื่นๆ',''  :'–'
  };
  const rows = data.map((s, i) =>
    [i+1, s.date, s.name, s.email, s.phone||'', topicLabel[s.topic]||s.topic||'', s.message]
      .map(v => `"${String(v).replace(/"/g,'""')}"`)
      .join(',')
  );
  const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n'); // BOM for Thai chars in Excel
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `bmw-contacts-${new Date().toISOString().slice(0,10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
}

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  attachRipples();

  // Close mobile menu on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMobileMenu();
  });

  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Pagination
  document.querySelectorAll('.pg-num').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.pg-num').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Contact form — Web3Forms + localStorage backup
  const form = document.getElementById('con-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name    = document.getElementById('cf-name').value.trim();
      const email   = document.getElementById('cf-email').value.trim();
      const phone   = document.getElementById('cf-phone')?.value.trim() || '';
      const topic   = document.getElementById('cf-topic')?.value || '';
      const message = document.getElementById('cf-msg').value.trim();

      if (!name || !email || !message) {
        alert('กรุณากรอก ชื่อ, อีเมล และ ข้อความ ให้ครบ');
        return;
      }

      const btn = document.getElementById('cf-submit');
      btn.textContent = '⏳ กำลังส่ง...';
      btn.disabled = true;

      // ── 1. ส่งผ่าน Web3Forms API ──
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: '9e258557-5f37-4836-8f5e-95d717e61fbd',
            from_name:  'BMW Thailand Website',
            subject:    `BMW Thailand — ข้อความจากเว็บไซต์ (${topic || 'ทั่วไป'})`,
            name, email, phone,
            topic: topic || '–',
            message
          })
        });

        const data = await res.json();
        console.log('[Web3Forms]', data);

        if (data.success) {
          btn.textContent = '✅ ส่งสำเร็จ! เช็คอีเมลของคุณ';
          btn.style.background = '#16a34a';
        } else {
          throw new Error(data.message || 'Web3Forms error');
        }
      } catch (err) {
        console.error('[Web3Forms Error]', err);
        btn.textContent = '⚠️ ส่งไม่สำเร็จ — บันทึกแบบ offline แทน';
        btn.style.background = '#d97706';
      }

      // ── 2. บันทึก localStorage เสมอ (backup) ──
      const record = {
        date: formatDate(),
        name, email, phone,
        topic: topic || '–',
        message,
        via: 'web3forms'
      };
      const all = getSubmissions();
      all.unshift(record);
      saveSubmissions(all);

      form.reset();
      renderAdminTable();

      setTimeout(() => {
        btn.textContent = 'ส่งข้อความ';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    });
  }

});
