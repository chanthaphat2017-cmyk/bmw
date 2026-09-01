# BMW Thailand — Figma to Website Project

โครงงานพัฒนาเว็บไซต์ BMW Thailand จากการออกแบบใน Figma สู่เว็บไซต์ที่ใช้งานได้จริง (Functional Web Application)

---

## 📌 ข้อมูลโครงงาน
- **ชื่อโครงการ:** BMW Thailand Website Redesign
- **ผู้จัดทำ:** [ใส่ชื่อ-นามสกุล / รหัสนักศึกษา]
- **ลิงก์ Figma ต้นฉบับ:** [ใส่ลิงก์ Figma ที่เปิดสิทธิ์แชร์แล้ว]
- **ลิงก์ Live Demo (GitHub Pages):** [ใส่ลิงก์ GitHub Pages เช่น https://<username>.github.io/<repo-name>/]
- **ลิงก์ GitHub Repository:** [ใส่ลิงก์ GitHub Repository]

---

## 🛠️ Technology Stack
- **Structure:** Semantic HTML5
- **Styling:** Vanilla CSS3 (Custom Design System, Flexbox, CSS Grid, Responsive Media Queries, Smooth Transitions)
- **Logic & Interactions:** Vanilla JavaScript (ES6+)
- **Storage & State:** Web Storage API (`localStorage`) สำหรับจำลองระบบเก็บข้อมูลฟอร์มติดต่อ
- **Version Control & Deployment:** Git, GitHub, GitHub Pages

---

## ✨ คุณสมบัติเด่นของเว็บไซต์ (Key Features)
1. **Multi-Section SPA Navigation:** รองรับการสลับหน้า 6 หน้าอย่างลื่นไหล (หน้าแรก, เกี่ยวกับเรา, รุ่นรถ, นวัตกรรม, ข่าวสาร, ติดต่อเรา)
2. **Interactive Elements:**
   - ระบบกรองรุ่นรถ (Models Filter: M Series, i Series, X Series, Sedan, Touring, All) พร้อมแอนิเมชัน
   - ระบบแบ่งหน้า (Pagination) ในหน้ารุ่นรถ
   - ระบบ Contact Form พร้อมตารางจัดการข้อมูล (Admin Panel) บันทึกและลบข้อมูลใน `localStorage` พร้อมปุ่ม Export CSV
3. **Responsive Design:** รองรับการแสดงผลทั้งหน้าจอ Desktop, Tablet และ Mobile
4. **Design Aesthetics:** ถอดแบบองค์ประกอบและคู่สีตาม CI/CD ของแบรนด์ BMW (สีน้ำเงิน M-Power, ดำ Midnight, ขาว และเทาพรีเมียม)

---

## 🤖 AI Usage Report (บันทึกการใช้ AI)
- **เครื่องมือ AI ที่ใช้:** Antigravity AI Assistant
- **บทบาทการใช้งาน:**
  - ช่วยเขียนโครงสร้าง Semantic HTML และ CSS Design Tokens
  - ช่วยจัดวาง Layout (Flexbox & CSS Grid) และแก้ปัญหา Layout Alignment ของ Footer และ Responsive Breakpoints
  - ช่วยเขียน Logic JavaScript สำหรับ Pagination, LocalStorage Admin Table, และ Filter Interactions
- **การตรวจสอบและการแก้ปัญหา:**
  - ตรวจสอบและทดสอบการแสดงผลบนเบราว์เซอร์จริง
  - ปรับแก้โครงสร้างของ Footer ให้รองรับความยาวหน้ากระดาษที่แตกต่างกันแบบ Sticky Footer

---

## 🚀 วิธีการติดตั้งและรันบนเครื่อง (Local Setup)
1. Clone หรือ Download Repository นี้:
   ```bash
   git clone [URL-Repository]
   ```
2. เปิดไฟล์ `index.html` บน Web Browser หรือรันผ่าน Local Server (เช่น Laragon, Live Server ใน VS Code)
