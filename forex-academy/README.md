# Forex Academy — Production Deployment & Configuration Guide

A professional, responsive, static web application for a premier Forex education institution. Built strictly using **HTML5**, **CSS3**, and **vanilla JavaScript** with zero frameworks, zero build tools, and zero server dependencies.

Deployable directly to **Vercel** as a static website with zero configuration.

---

## Final Project Structure

```
forex-academy/
├── index.html              # Main single-page application & all 10 core sections
├── styles.css              # Custom institutional design system & responsive layout
├── script.js               # Central configuration, dynamic binding & form handlers
├── confirmation.html       # Native post-submission & orientation confirmation page
├── privacy.html            # Institutional Privacy & Data Policy page
├── README.md               # Master production configuration and deployment guide
└── assets/
    ├── icons/
    │   └── favicon.svg     # Stylized gold monogram & candlestick SVG icon
    └── images/
        └── hero-chart.svg  # Vector 4H Market Structure & 1:3 Risk-to-Reward visual
```

---

## 1. Central Configuration (`script.js`)

All institutional parameters (name, form URL, WhatsApp, cohort date, fees, format) are managed inside the `CONFIG` object at the top of `script.js`.

Open `script.js` in any text editor:

```javascript
const CONFIG = {
  // 1. Academy Name
  academyName: "FOREX ACADEMY",

  // 2. Externally Hosted Registration Form URL
  // Paste your live Tally.so or Google Forms link here:
  registrationUrl: "",

  // 3. Embed Mode (true = embed iframe directly, false = native form with redirect)
  embedForm: false,

  // 4. Admissions Desk WhatsApp Number (international format with country code)
  whatsappNumber: "+23408144784467",

  // 5. Official Admissions Email
  contactEmail: "Mayormontechris@gmail.com",

  // 6. Upcoming Cohort Start Date
  cohortStartDate: "First Monday of Next Month",

  // 7. Program Tuition Fee
  courseFee: "₦45,000 (All 4 Weeks Included)",

  // 8. Program Delivery Format
  classFormat: "Online & Physical"
};
```

---

## 2. Step-by-Step Configuration Guide

### A. How to Configure the Academy Name
1. Open `script.js`.
2. Locate `academyName` inside `CONFIG`.
3. Replace `"FOREX ACADEMY"` with your official institution name (e.g., `"APEX FOREX INSTITUTE"`).
4. Save the file.
5. All references across the website header, hero, footer, and privacy policy will automatically update.

---

### B. How to Update the Registration Form URL

You can integrate **Tally.so** (recommended) or **Google Forms**.

#### Option 1: Integrating with Tally.so (Recommended)
1. Go to [Tally.so](https://tally.so) and create your application form.
2. In Tally's settings, under **"Post-submission"**, select **"Redirect to URL"**.
3. Set the redirect URL to your deployed confirmation page:  
   `https://your-domain.vercel.app/confirmation.html`
4. Copy your public Tally share link (e.g., `https://tally.so/r/3yVwPO`).
5. Open `script.js` and paste it into `registrationUrl`:
   ```javascript
   registrationUrl: "https://tally.so/r/3yVwPO",
   ```
6. *(Optional)* If you want the form embedded directly inside the registration section, set:
   ```javascript
   embedForm: true,
   ```

#### Option 2: Integrating with Google Forms
1. Create your application form at [Google Forms](https://forms.google.com).
2. Click **Send** &rarr; select the link tab &rarr; check **Shorten URL** &rarr; copy the link (e.g., `https://forms.gle/abc123xyz`).
3. Open `script.js` and paste it into `registrationUrl`:
   ```javascript
   registrationUrl: "https://forms.gle/abc123xyz",
   ```

> **Ethical & Data Protection Rules**:
> - If `registrationUrl` is left empty (`""`), the form will **never fake a registration**. It will display an honest Setup Notice instructing administrators to paste their form link, and provides applicants with a direct WhatsApp concierge forwarding button.
> - Student information is **never** written to `localStorage`, `sessionStorage`, or browser cookies.
> - The form **never** collects passwords, OTPs, BVN, NIN, or broker account logins.

---

### C. How to Update the WhatsApp Contact
1. Open `script.js`.
2. Locate `whatsappNumber` inside `CONFIG`.
3. Enter your phone number with your country dial code and no symbols or spaces (e.g., `"+2348012345678"` for Nigeria).
4. Save the file. All WhatsApp chat buttons across the header, admissions sidebar, and footer will route to this number with pre-formatted admissions inquiries.

---

### D. How to Update the Course Fee & Cohort Dates
1. Open `script.js`.
2. Update `cohortStartDate` (e.g., `"Monday, December 1st, 2026"`).
3. Update `courseFee` (e.g., `"₦50,000 (Materials & Demo Account Included)"` or `"$100 USD"`).
4. Update `classFormat` if needed (e.g., `"Online Interactive Room"` or `"Lagos Classroom & Online"`).
5. Save the file. The program specifications, hero badges, and admissions sidebar will reflect the new values immediately.

---

## 3. How to Deploy to Vercel (Static Zero-Config)

Because this website uses pure HTML5, CSS3, and vanilla JavaScript without build steps or frameworks, Vercel deploys it instantaneously.

### Method 1: Deploying via Vercel Web Dashboard (GitHub / GitLab)
1. Push this project folder to a GitHub repository (e.g., `github.com/your-username/forex-academy`).
2. Go to [Vercel](https://vercel.com) and log in.
3. Click **"Add New..."** &rarr; **"Project"**.
4. Import your `forex-academy` GitHub repository.
5. In the configuration screen:
   - **Framework Preset**: `Other`
   - **Root Directory**: `.` *(default workspace root)*
   - **Build Command**: *(leave completely blank)*
   - **Output Directory**: *(leave blank)*
6. Click **Deploy**.
7. In ~15 seconds, your site will be live with free SSL on `your-project.vercel.app`.

### Method 2: Deploying via Vercel CLI
If you prefer the command line:
1. Install the Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```
2. In your terminal, navigate to the project directory:
   ```bash
   cd "my forex academy"
   ```
3. Run the deployment command:
   ```bash
   vercel
   ```
4. Follow the brief command prompts:
   - *Set up and deploy?* &rarr; **y**
   - *Which scope?* &rarr; **[Your Account]**
   - *Link to existing project?* &rarr; **n**
   - *What's your project's name?* &rarr; `forex-academy`
   - *In which directory is your code located?* &rarr; `./`
5. For instant production deployment with your permanent domain:
   ```bash
   vercel --prod
   ```

---

## 4. How to Update the Website After Deployment

Whenever you need to update tuition fees, cohort dates, or registration links:

1. **If using GitHub + Vercel (Recommended)**:
   - Make your changes locally in `script.js` or `index.html`.
   - Commit and push to GitHub:
     ```bash
     git add .
     git commit -m "Update cohort date and tuition fee"
     git push origin main
     ```
   - Vercel automatically detects the push and deploys the update within 10 seconds with zero downtime.

2. **If using Vercel CLI**:
   - Make your changes in `script.js`.
   - Run:
     ```bash
     vercel --prod
     ```
   - The production site is updated immediately.

---

## 5. Security & Risk Compliance Notes

- **Zero Sensitive Data Collection**: This website never requests or stores bank verification numbers (BVN), national identity numbers (NIN), passwords, OTP codes, or live broker credentials.
- **Demo-First Focus**: All modules and marketing materials emphasize simulated demo accounts on MetaTrader 5 with virtual capital.
- **Risk Warning**: Includes the mandatory risk disclaimer warning that Forex and CFD trading involve significant financial risk and that the academy does not promise or guarantee profits.
