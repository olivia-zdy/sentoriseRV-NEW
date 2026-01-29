
# Internal Business Tools Suite for Sentorise

This plan outlines a unified Admin Dashboard with three core modules: Brand Asset Generator, Lead Follow-up System, and Customer Feedback Hub. All tools will be accessible via a new `/admin` dashboard with team authentication.

---

## Overview

```text
+------------------------------------------+
|           ADMIN DASHBOARD                |
|  (/admin - requires team login)          |
+------------------------------------------+
|                                          |
|  +----------+  +----------+  +----------+|
|  |  Brand   |  |  Lead    |  | Feedback ||
|  |  Assets  |  | Follow-up|  |   Hub    ||
|  +----------+  +----------+  +----------+|
|                                          |
+------------------------------------------+
```

---

## Part 1: Authentication & Dashboard Shell

### Database Tables

**team_members** - Store authorized team accounts
- id, email, name, role (admin/sales/support), created_at
- Uses Supabase Auth with email/password sign-in

**user_roles** - For role-based access control
- id, user_id, role (admin/sales/support)
- Security definer function for role checks

### Pages & Components

1. **Admin Login Page** (`/admin/login`)
   - Email/password authentication
   - Auto-redirect to dashboard on success

2. **Admin Dashboard Layout** (`/admin`)
   - Sidebar navigation with three modules
   - Mobile-responsive collapsible sidebar
   - Team member name/role in header
   - Logout functionality

---

## Part 2: Brand Asset Generator

A tool to create branded marketing materials using AI image generation and templates.

### Database Table

**brand_assets**
- id, name, type (social/email/document), dimensions, image_url
- created_by (team member), created_at, status (draft/published)

### Features

1. **Template Gallery**
   - Pre-built templates for each asset type
   - Social: Instagram Post (1080x1080), Facebook Cover (1200x630), Banner (1920x600)
   - Email: Signature block, Newsletter header
   - Document: Letterhead, Invoice header, Presentation slide

2. **Asset Editor**
   - Select template type and dimensions
   - Input custom text (headline, tagline, product name)
   - Choose product image from catalog
   - Preview with live brand colors (forest green, lime accent)
   - Generate using Lovable AI (google/gemini-2.5-flash-image)

3. **Asset Library**
   - Grid view of all generated assets
   - Download in PNG/JPG format
   - Copy/share functionality
   - Delete/archive old assets

### UI Flow

```text
Template Gallery -> Select Type -> Customize Text/Images -> Generate -> Save to Library
```

---

## Part 3: Lead Follow-up System

Centralizes all leads from quote requests and contact forms with automated reminders.

### Database Tables

**leads** (aggregated view of existing data)
- Pulls from: quote_requests, contact_submissions
- Fields: id, source, name, email, phone, company, status, created_at

**lead_activities**
- id, lead_id, activity_type (note/call/email), content, created_by, created_at

**follow_up_reminders**
- id, lead_id, reminder_date, status (pending/completed/dismissed), created_by

### Lead Statuses

```text
New -> Contacted -> Qualified -> Quoted -> Won/Lost
```

### Features

1. **Lead Dashboard**
   - Kanban board view by status
   - Table view with filters (source, status, date range)
   - Search by name/email/company
   - Status counts and conversion metrics

2. **Lead Detail View**
   - Full contact information
   - Original inquiry message
   - Activity timeline (notes, calls, emails logged)
   - Quick actions: Add Note, Set Reminder, Change Status

3. **Reminder System**
   - Set follow-up date when viewing a lead
   - Dashboard widget showing today's pending reminders
   - Mark as completed or snooze
   - Daily digest email (optional, via Edge Function + Resend)

4. **Lead Aging Alerts**
   - Visual indicator for leads not contacted within 24/48/72 hours
   - "At Risk" filter for leads going cold (no activity in 3+ days)

---

## Part 4: Customer Feedback Hub

Centralizes feedback from various channels into one searchable, actionable system.

### Database Tables

**feedback_entries**
- id, source (manual/email/form), customer_name, customer_email
- product_id (optional), feedback_type (praise/issue/suggestion/question)
- content, sentiment (positive/neutral/negative)
- status (new/reviewed/actioned/archived)
- created_by, created_at

**feedback_tags**
- id, name (e.g., "Bluetooth App", "Shipping", "Documentation")

**feedback_entry_tags** (junction table)
- feedback_id, tag_id

### Features

1. **Feedback Inbox**
   - List view of all entries with type/sentiment icons
   - Filter by type, sentiment, tag, product, status
   - Quick search across all content

2. **Add Feedback Form**
   - Manual entry for feedback from Slack, calls, emails
   - Customer info (name, email - optional)
   - Link to product (dropdown from catalog)
   - Type and sentiment classification
   - Tag selection (multi-select)

3. **Feedback Detail View**
   - Full content with customer context
   - Product link if applicable
   - Team notes/internal discussion
   - Status workflow: New -> Reviewed -> Actioned -> Archived

4. **Insights Dashboard**
   - Sentiment breakdown chart (Recharts)
   - Top tags by frequency
   - Feedback volume over time
   - Product-specific feedback summary

5. **Quick Actions**
   - "Reply to Customer" - opens email draft
   - "Create Task" - note for internal follow-up
   - "Link to Lead" - connect feedback to existing lead

---

## Technical Implementation

### New Files

```text
src/pages/admin/
├── AdminLogin.tsx
├── AdminDashboard.tsx
├── BrandAssets.tsx
├── LeadFollowUp.tsx
├── FeedbackHub.tsx
└── components/
    ├── AdminSidebar.tsx
    ├── AdminLayout.tsx
    ├── AssetEditor.tsx
    ├── AssetGallery.tsx
    ├── LeadKanban.tsx
    ├── LeadDetail.tsx
    ├── ReminderWidget.tsx
    ├── FeedbackList.tsx
    ├── FeedbackForm.tsx
    └── InsightsCharts.tsx
```

### Database Migrations

1. Create `team_members` table with RLS (select/update own profile only)
2. Create `user_roles` table with security definer function
3. Create `brand_assets` table with RLS (team members only)
4. Create `leads` view aggregating quote_requests + contact_submissions
5. Create `lead_activities` and `follow_up_reminders` tables
6. Create `feedback_entries`, `feedback_tags`, `feedback_entry_tags` tables
7. All tables have RLS requiring authenticated team members

### Edge Functions

1. **generate-brand-asset** - Calls Lovable AI for image generation
2. **send-reminder-digest** (optional) - Daily email of pending reminders

### Storage Bucket

- `brand-assets` - Store generated images

---

## Security Considerations

- Admin section requires Supabase Auth login
- RLS policies restrict all admin tables to authenticated team members
- Role-based access: Admin sees all, Sales sees leads, Support sees feedback
- No admin functionality exposed to public site visitors
- Sensitive lead data (emails, phones) protected by RLS

---

## Implementation Order

1. **Phase 1: Authentication & Shell**
   - Team member auth system
   - Admin dashboard layout with sidebar
   - Protected routes

2. **Phase 2: Lead Follow-up System**
   - Most immediately valuable for preventing cold leads
   - Database tables and aggregated view
   - Kanban board and lead detail pages
   - Reminder system

3. **Phase 3: Feedback Hub**
   - Feedback entry tables
   - Inbox and manual entry form
   - Tagging and insights dashboard

4. **Phase 4: Brand Asset Generator**
   - Template gallery and editor
   - AI image generation integration
   - Asset library with downloads

---

## Navigation Integration

The admin dashboard will be accessible via:
- Direct URL: `/admin`
- Not shown in main site navigation (internal tool)
- Team members bookmark or access via internal link

---

Ready to implement these internal business tools for your Sentorise team. The Lead Follow-up System will be prioritized first since preventing cold leads has immediate business impact.
