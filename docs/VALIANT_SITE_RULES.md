# Valiant Admin Site Rules & Compatibility Guide

When developing, updating, or maintaining this website, you MUST preserve compatibility with Valiant Admin.

## 1. Core Configuration Files
- `valiant.config.json` (root): Identifies the site name, content path, and schema path. The `"connected"` flag is managed by Valiant Admin (do not manually modify unless instructed).
- `src/data/siteContent.json`: Contains all user-editable content (text, hero sections, services, portfolio scripts, images, links, SEO metadata).
- `src/data/adminSchema.json`: Schema definition that describes how Valiant Admin renders editing controls for `siteContent.json`.

## 2. Schema Structure Requirements
`src/data/adminSchema.json` MUST strictly follow this exact top-level format:

```json
{
  "version": 1,
  "sections": [
    {
      "id": "unique-section-id",
      "label": "Human Readable Label",
      "fields": []
    }
  ]
}
```

### Critical Rules:
- **`fields` MUST ALWAYS BE AN ARRAY**: Never use an object for `fields` anywhere in the schema.
- **`version` MUST be `1`**.
- **Every section must have a unique `id`**, a human-readable `label`, and a `fields` array.
- **Field Keys Match Content**: Every field key must directly correspond to an existing property inside `siteContent.json`. Do not invent phantom fields.
- **Repeatable Content**: For arrays of repeatable content, use `"type": "array"` and define editable item properties inside `fields: []` as an array:
  ```json
  {
    "key": "items",
    "label": "Items",
    "type": "array",
    "fields": [
      { "key": "id", "label": "ID", "type": "text" },
      { "key": "title", "label": "Title", "type": "text" }
    ]
  }
  ```
- **Supported Field Types**: `text`, `textarea`, `richtext`, `number`, `url`, `email`, `image`, `boolean`, `select`, `array`.
- **Image Fields**: All editable images must use `"type": "image"` in the schema and reference valid image paths/URLs in `siteContent.json`.

## 3. Public Website Components
- Components must read editable values directly from `src/data/siteContent.json`.
- Do NOT hardcode user-editable copy or image paths in JSX when they exist in `siteContent.json`.
- Provide fallback values or default imports so the public site renders seamlessly regardless of external connectivity.

## 4. Forbidden Features (Valiant Admin Handles These Centrally)
Do NOT add:
- Local admin panels or `/admin` routes
- Client-side authentication / login modals for administrators
- GitHub Personal Access Tokens (PATs) or GitHub App credentials
- Publishing APIs or local image upload APIs
- Database engines (SQL, Firestore) for admin CMS state
- LocalStorage/sessionStorage CMS persistence
