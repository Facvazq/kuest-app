# JSONBin Integration Guide

This project has been migrated from localStorage + Supabase to **JSONBin** as the primary storage solution.

## What is JSONBin?

JSONBin is a serverless JSON storage service that allows you to store, retrieve, and update JSON data via REST API without any server setup.

**Benefits:**
- ✅ **Serverless** - No backend required
- ✅ **Fast** - Instant API responses  
- ✅ **Simple** - REST API with just an API key
- ✅ **Permanent** - Data persists indefinitely
- ✅ **Public/Private** - Control access to your data

## How It Works

### 1. Form Creation
When a user creates a form:
1. **Create**: POST to JSONBin with form data → Returns unique bin ID (9 characters)
2. **URL**: Form becomes accessible at `/form/{binId}`
3. **Share**: Users get a permanent shareable link

### 2. Form Submission  
When someone fills out a form:
1. **Fetch**: GET form data from JSONBin using bin ID
2. **Update**: PUT updated data back to JSONBin with new responses

## Setup Instructions

### 1. Get JSONBin API Key
1. Go to [jsonbin.io](https://jsonbin.io/)
2. Sign up / Log in
3. Go to **Account Settings** → **API Keys**
4. Create a new API key

### 2. Configure Environment
Create `.env.local` file:
```bash
NEXT_PUBLIC_JSONBIN_API_KEY=your_api_key_here
```

### 3. Test Integration
```bash
# Set your API key in environment
export NEXT_PUBLIC_JSONBIN_API_KEY=your_key

# Run test
node test-jsonbin.js
```

## API Structure

When we create a form in JSONBin, it stores this structure:

```json
{
  "type": "form",
  "formData": {
    "id": "jsonbin_id",
    "title": "My Quiz",
    "description": "A quiz about...",
    "questions": [...],
    "theme": "default",
    "accentColor": "#22c55e",
    "mode": "questionnaire"
  },
  "responses": [
    {
      "id": "response_id",
      "formId": "jsonbin_id", 
      "studentName": "John Doe",
      "responses": {...},
      "submittedAt": "2024-01-01T00:00:00.000Z",
      "preliminaryScore": 85,
      "maxScore": 100
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## File Changes Made

### New Files:
- `src/lib/jsonbin-storage.ts` - Core JSONBin API functions
- `test-jsonbin.js` - Integration test script
- `JSONBIN_INTEGRATION.md` - This guide

### Updated Files:
- `src/lib/storage.ts` - Now uses JSONBin as primary storage
- `src/lib/hybrid-storage.ts` - Redirects all calls to JSONBin
- `src/app/form-builder/page.tsx` - Handles JSONBin form creation and sharing
- `src/app/shared/[encodedData]/page.tsx` - Supports both legacy encoded data and JSONBin IDs
- `src/app/form/[id]/page.tsx` - Reads forms from JSONBin
- `src/app/dashboard/page.tsx` - Updated for JSONBin (forms stored individually)
- `env.example` - Added JSONBin configuration

## URL Structure

### Old URLs (Legacy - Still Supported):
- `/shared/encodedBase64Data` - Legacy encoded form sharing

### New URLs (Primary):
- `/form/{jsonbin_id}` - Access form by JSONBin ID
- Example: `facsystems.dev/form/abc123def`

## Benefits of Migration

1. **🌐 Serverless**: No backend database to maintain
2. **⚡ Performance**: Direct API calls, faster than database queries  
3. **🔗 Permanent Links**: Forms have persistent URLs
4. **📈 Scalable**: JSONBin handles rate limits and scaling
5. **🔒 Secure**: API key authentication
6. **💰 Cost-Effective**: Free tier supports significant usage

## Migration Support

The codebase supports both:
- **Legacy**: Encoded form sharing (`/shared/...`)
- **New**: JSONBin form sharing (`/form/{id}`)

Forms automatically detect whether they're dealing with:
- 9-character JSONBin ID (new system)
- Longer encoded data (legacy system)

## Error Handling

The system gracefully handles:
- ✅ Missing API key (shows helpful error message)
- ✅ Network failures (falls back gracefully)
- ✅ Invalid bin IDs (shows "Form not found")
- ✅ API rate limits (built into JSONBin)

## Troubleshooting

### Form Not Loading
1. Check JSONBin API key is set
2. Verify the bin ID exists: `https://jsonbin.io/{id}`
3. Check API key permissions

### Cannot Create Forms  
1. Verify API key has write permissions
2. Check network connection
3. Confirm JSONBin service status

### Responses Not Saving
1. Ensure API key has update permissions  
2. Check form ID is valid
3. Verify responses array exists in bin

## Testing

Run the test script to verify everything works:

```bash
NEXT_PUBLIC_JSONBIN_API_KEY=your_key node test-jsonbin.js
```

This will:
1. ✅ Create a test form
2. ✅ Retrieve the form  
3. ✅ Add a response
4. ✅ Verify the response was saved

## Production Deployment

1. **Set Environment Variable**: Add `NEXT_PUBLIC_JSONBIN_API_KEY` to your deployment platform
2. **Verify**: Use the test script to confirm integration
3. **Deploy**: Push to production
4. **Test**: Create a form to verify end-to-end functionality

## Next Steps

- ✅ **JSONBin Integration Complete**
- ✅ **Form Creation Working**  
- ✅ **Form Access Working**
- ✅ **Response Submission Working**
- ✅ **Legacy Support Maintained**

The migration is complete and ready for production use!
