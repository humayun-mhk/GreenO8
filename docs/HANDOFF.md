# Team handoff

## Humayun — landing page ownership
This package covers the public landing page scope end to end: responsive visual design, content architecture, real-data project feed adapter, motion, accessibility, SEO metadata and engineering handoff notes.

## Haris / backend integration
Set:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_PROJECTS_ENDPOINT=/api/projects?status=verified&listed=true
```

`components/ProjectFeed.js` intentionally has **no mock investment data fallback**. If the API is absent, it renders an explicit integration state. Adjust `lib/api.js` only after the backend project schema is agreed.

Recommended project fields:

```json
{
  "id": "...",
  "name": "...",
  "type": "solar|wind|storage|green_infrastructure",
  "location": "...",
  "verified": true,
  "riskLevel": "...",
  "minimumInvestment": 100,
  "currency": "$",
  "status": "open"
}
```

## Saliqa / investor dashboard coordination
The landing page only **teases** portfolio/performance capabilities. It does not implement or claim ownership of the dashboard, investment checkout or portfolio views. Those remain in the investor-app/dashboard workstream.

## Product sign-off checklist
- Confirm final hero copy and legal/risk language.
- Confirm `hello@greenova8.io` or replace with preferred developer contact.
- Connect verified project endpoint.
- Add actual Terms / Privacy / Risk Disclosure URLs when supplied.
- Confirm supported deposit methods by launch market before naming individual gateways publicly.
- Run `npm run qa` and `npm run build` before merge/deploy.
