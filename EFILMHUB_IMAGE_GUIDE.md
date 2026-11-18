# eFilmHub Case Study - Image Placement Guide

This guide shows exactly which screenshots to capture from the eFilmHub app and where to place them.

## Directory Setup
Create this folder: `/public/assets/images/efilmhub/`

---

## Required Screenshots (5 Total)

### 1. **Profile Page Screenshot**
**File Name:** `profile-page.png`
**Location in Case Study:** After "Portfolio-First Profile Design" section
**What to Capture:**
- Full profile page showing:
  - Hero reel/video section at top
  - Project tiles in grid layout
  - Skill tags/badges visible
  - Availability status indicator
  - Mobile view preferred (since 85% use mobile)

**Tips:**
- Use a complete, professional-looking example profile
- Show visual richness (media over text)
- Capture on mobile device or mobile view in Figma

---

### 2. **Search & Filter Interface**
**File Name:** `search-filter.png`
**Location in Case Study:** After "Advanced Filtering System" section
**What to Capture:**
- Talent search/discovery page showing:
  - Filter options visible (role, location, rate, etc.)
  - Search results with thumbnail previews
  - Visual portfolio grid/list
  - Active filters applied (e.g., "Cinematographer in Lagos")

**Tips:**
- Show the filtering interface in use
- Display search results with visual previews
- Capture both desktop OR mobile with expanded filters

---

### 3. **Job Posting Flow**
**File Name:** `job-posting.png`
**Location in Case Study:** After "Streamlined Job Posting Flow" section
**What to Capture:**
**OPTION A (Recommended):** Create a multi-panel screenshot showing 2-3 steps:
  - Step 1: Job template selection (Director/DP/Gaffer options)
  - Step 2: Form with smart fields (role, rate, dates)
  - Step 3: Preview/publish screen

**OPTION B:** Single screenshot of the main job posting form showing:
  - Smart template fields
  - Rate range selector
  - Timeline/calendar picker
  - Publish button prominently displayed

**Tips:**
- If using multi-panel, use Figma to arrange 2-3 screens side-by-side
- Show the streamlined, 2-minute process
- Highlight the "smart" features (templates, rate transparency)

---

### 4. **Equipment Marketplace**
**File Name:** `equipment-marketplace.png`
**Location in Case Study:** After "Equipment Marketplace with Trust Infrastructure" section
**What to Capture:**
**RECOMMENDED:** Create a composite showing:
  - Equipment listing grid (cameras, lights, etc.)
  - One equipment detail page showing:
    - Photos and specifications
    - Booking calendar
    - Rating system (5 stars)
    - Rental agreement button
    - Owner verification badge

**ALTERNATIVE:** Single equipment listing page with all trust features visible

**Tips:**
- Show trust infrastructure elements (ratings, verification, calendar)
- Display professional equipment (cameras are most recognizable)
- Include pricing and availability indicators

---

### 5. **Messaging Interface**
**File Name:** `messaging.png`
**Location in Case Study:** After "Contextual Messaging Integration" section
**What to Capture:**
- Messaging screen showing:
  - Project-based thread organization
  - Quick action buttons (Send Application, Share Portfolio, Propose Rate)
  - File attachment options
  - Mobile interface preferred
  - Active conversation about a production/project

**Tips:**
- Show messaging in context of hiring/collaboration (not generic chat)
- Display quick actions prominently
- Use realistic conversation about film production

---

## Screenshot Best Practices

### For All Screenshots:
1. **Use realistic data** - Show actual names, locations, and content (not Lorem Ipsum)
2. **Show UI in use** - Don't capture empty states unless intentional
3. **Maintain consistency** - Use same light/dark mode across all images
4. **High resolution** - Export at 2x for retina displays
5. **Clean up** - Remove any debug tools, personal info, or test data

### Recommended Export Settings:
- **Format:** PNG
- **Resolution:** 1600px width minimum (will scale to 800px max in case study)
- **Background:** Include full UI background (not transparent)
- **Aspect Ratio:** 16:9 or 4:3 works best

### For Multi-Panel Screenshots:
If combining multiple screens (like job posting flow):
1. Open Figma
2. Place 2-3 screens side-by-side with small gaps
3. Add numbered indicators (1, 2, 3) if showing a flow
4. Export the combined frame

---

## File Structure After Adding Images

```
/public/assets/images/efilmhub/
├── profile-page.png          (Full profile with reel & tiles)
├── search-filter.png          (Talent discovery with filters)
├── job-posting.png            (Job posting flow/form)
├── equipment-marketplace.png  (Equipment listings & details)
└── messaging.png              (Project-based messaging)
```

---

## How Images Appear in Case Study

Each image will display with:
- **Max width:** 800px
- **Rounded corners:** 8px border radius
- **Shadow:** Elevated card appearance
- **Caption:** Descriptive text below each image
- **Auto-hide:** If image doesn't exist, placeholder disappears

---

## Priority Order (If Short on Time)

1. **Profile Page** - Shows core value prop (visual portfolios)
2. **Search & Filter** - Demonstrates talent discovery
3. **Equipment Marketplace** - Unique differentiator (trust infrastructure)
4. **Messaging** - Shows contextual networking
5. **Job Posting** - Can describe without image if needed

---

## Need Help?
- Images will automatically appear when you add them to `/public/assets/images/efilmhub/`
- Use exact file names listed above
- If image doesn't load, check browser console for 404 errors
- Images use `onError` to hide gracefully if missing
