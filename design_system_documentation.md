# Game Design System & UI Kit Documentation

Welcome to the **Pradhan Mantri Simulator** Game UI Kit. This design system provides centralized tokens, motion presets, and reusable mobile strategy game UI components engineered for portrait resolution (**390 x 844** target).

---

## Design Philosophy & Visual Language

- **Visual Tone**: Dark Premium, Luxurious, Governmental, Authoritative, Minimalist.
- **Color Palette**: Deep Navy (`#0A0F1D`), Midnight Dark (`#060913`), Luxury Gold (`#D4AF37`), Emerald (`#10B981`), Crimson (`#EF4444`), Slate (`#64748B`).
- **Surface Texture**: Glassmorphism (`backdrop-blur-md`, `rgba(18, 26, 45, 0.75)` dark glass with gold accent borders and glow highlights).
- **Single Icon Family**: Lucide React (`lucide-react`) is enforced universally for clean vector geometry.

---

## Design Tokens Summary

| Token Category | Key Values |
| :--- | :--- |
| **Background Colors** | Navy Dark (`#060913`), Navy Primary (`#0A0F1D`), Navy Surface (`#121A2D`) |
| **Accent Colors** | Premium Gold (`#D4AF37`), Light Gold (`#F3E5AB`), Gold Glow (`#F59E0B`) |
| **Status Colors** | Emerald (`#10B981`), Crimson (`#EF4444`), Orange (`#F97316`), Slate (`#64748B`) |
| **Typography Fonts** | Heading: `Cinzel` serif, Body: `Inter` sans-serif, Numbers: `JetBrains Mono` |
| **Border Radius** | Small (`8px`), Game Standard (`14px`), Large (`20px`), Full Pill (`9999px`) |
| **Glass Surfaces** | Standard Glass (`glass-panel`), Gold Glow Glass (`glass-panel-gold`), Crisis Glass (`glass-panel-crimson`) |

---

## Component Catalog & Usage Rules

### 1. Button Components

#### `Button`
- **Purpose**: General purpose game action trigger (primary, secondary, emerald, crimson, ghost).
- **Variants**: `primary`, `secondary`, `emerald`, `crimson`, `ghost`.
- **States**: Default, Hover, Pressed (`scale: 0.96`), Disabled (`opacity: 50%`).
- **Usage Rules**: Use `primary` for main actions, `secondary` for secondary choices, `crimson` for destructive options.
- **Do's**: Keep labels short and uppercase.
- **Don'ts**: Do not use generic web hyper-links.

#### `LargeCTAButton`
- **Purpose**: Prominent Parliament glowing CTA button ("TAKE DECISION").
- **Variants**: Full-width glowing gold gradient with shimmer effect.
- **Future Screens**: Dashboard, Active Crisis Footer, Cabinet Meeting triggers.

#### `FloatingActionButton`
- **Purpose**: Round floating action button (FAB) for quick tactical actions.
- **Variants**: `gold`, `emerald`, `crimson`, `dark`.

---

### 2. Card Components

#### `Card`
- **Purpose**: Universal dark glass surface container.
- **Variants**: `glass`, `gold`, `solid`.
- **States**: Interactive hover (`y: -2px`, `scale: 1.02`).

#### `StatCard`
- **Purpose**: Metrics card featuring a circular SVG progress ring meter and center icon.
- **Future Screens**: National Popularity, Treasury, GDP, Election Countdown tiles.

#### `EventCard`
- **Purpose**: Display urgent crisis alerts, breaking news events, or decision cards.

#### `EmergencyBanner`
- **Purpose**: High-priority hazard banner strip for national emergencies.

---

### 3. Status & Data Components

#### `Badge` / `StatusChip`
- **Purpose**: Short status pills, tags, and classification labels.

#### `NotificationDot`
- **Purpose**: Red/Gold badge dot for unread alerts or tab updates.

#### `LiveIndicator`
- **Purpose**: Pulsing status tag for real-time tracking ("LIVE", "ACTIVE").

#### `TrendIndicator`
- **Purpose**: Metric trend arrow with percentage (`▲ 2.4%` in emerald or crimson).

#### `ProgressRing` / `CircularMeter`
- **Purpose**: Radial gauge meter for popularity, health, or quota stats.

#### `CountryStatBlock`
- **Purpose**: Compact top bar stat module displaying key metric + trend.

---

### 4. Game Shell & Navigation

#### `TopStatusBar`
- **Purpose**: Top horizontal strip rendering national indicators (Treasury, GDP, Inflation, Unemployment).

#### `PlayerProfileCard`
- **Purpose**: Header showing Prime Minister portrait, name, party tag, year/week tracker, bell notification, and settings icon.

#### `MiniAvatar`
- **Purpose**: Gold-rimmed profile/minister avatar container.

#### `SectionHeader`
- **Purpose**: Strategic section divider with gold heading and optional detail link.

#### `MapPin`
- **Purpose**: Tactical map marker for crises, intel, diplomacy, or resources.

#### `FloatingNotification`
- **Purpose**: Slide-in top toast banner for quick status feedback.

---

### 5. Modals & Popups

#### `Modal` / `Dialog`
- **Purpose**: Center popup window for confirmation, alerts, decisions, or rewards.

#### `BottomSheet`
- **Purpose**: Mobile-optimized slide-up panel for decision cards or minister detail sheets.

---

### 6. Input Components

#### `Toggle`
- **Purpose**: Custom game switch for binary policy settings.

#### `SegmentControl`
- **Purpose**: Horizontal tabbed filter control.

#### `Dropdown`
- **Purpose**: Dark glass select list for policy/category filtering.

#### `Slider` / `Stepper`
- **Purpose**: Numeric budget allocation and policy intensity adjustment controls.

#### `SearchInput`
- **Purpose**: Glass search input field for filtering lists.
