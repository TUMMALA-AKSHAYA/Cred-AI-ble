# 🚂 Railway Deployment Guide

## Quick Deploy Steps

1. **Connect GitHub Repo**
   - Go to https://railway.app/new
   - Select "Deploy from GitHub repo"
   - Choose `Cred-AI-ble` repository
   - Select branch: `claude/main-updates-011CUmHrb4iktFvxE9XQsrQW`

2. **Configure Service**
   - Click **Settings**
   - Set **Root Directory**: `backend`
   - Railway will auto-detect Node.js using `nixpacks.toml`

3. **Add Environment Variables**
   Click **Variables** tab and add these:

   ```
   NODE_ENV=production
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/career-discovery
   JWT_SECRET=cred_ai_ble_jwt_secret_key_change_in_production_2025
   ALGORAND_TREASURY_MNEMONIC=error brown assume flush crawl make net hundred gentle mystery bulb about occur mammal sweet live clean leisure spawn betray remove execute bag able limb
   ```

4. **Deploy**
   - Railway will automatically deploy
   - Build takes ~1-2 minutes
   - Once deployed, you'll get a URL: `https://xxx.railway.app`

## Configuration Files

This backend includes:

- **`nixpacks.toml`**: Tells Railway how to build the app
  - Uses Node.js 22
  - Runs `npm ci` to install dependencies
  - Starts with `npm start`

- **`railway.json`**: Additional Railway configuration
  - Sets build command: `npm install`
  - Sets start command: `node server.js`
  - Restart policy on failure

## Verify Deployment

### Test Health Endpoint
Visit: `https://your-app.railway.app/api/health`

Expected response:
```json
{
  "status": "OK",
  "message": "Career Discovery API is running",
  "timestamp": "2025-11-08..."
}
```

### Test Algorand Endpoints
```bash
# Check treasury balance
curl https://your-app.railway.app/api/algorand/balance/PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M
```

## Troubleshooting

### Build Times Out
**Problem**: Build command runs `npm start` which never finishes

**Solution**:
- Make sure `nixpacks.toml` exists in `backend/` folder
- Check Railway logs: Settings → Deployments → Click deployment → View logs
- Verify `buildCommand` in `railway.json` is `npm install` not `npm start`

### Port Binding Error
**Problem**: `Error: listen EADDRINUSE`

**Solution**:
- Railway automatically sets `PORT` environment variable
- Your `server.js` should use: `process.env.PORT || 5000`
- Don't hardcode port 5001 in production

### MongoDB Connection Failed
**Problem**: Can't connect to MongoDB

**Solutions**:
1. **Use MongoDB Atlas** (recommended):
   - Create free cluster: https://www.mongodb.com/cloud/atlas
   - Get connection string
   - Update `MONGODB_URI` in Railway

2. **Use Railway's MongoDB**:
   - In Railway project, click **+ New**
   - Select **Database** → **MongoDB**
   - Railway will auto-inject `MONGODB_URL` variable

### CORS Errors from Frontend
**Problem**: Frontend can't call backend APIs

**Solution**: Add your Vercel URL to CORS whitelist

Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://cred-ai-ble.vercel.app',
    'https://your-custom-domain.vercel.app'
  ]
}));
```

Then redeploy.

### Algorand Transactions Fail
**Problem**: NFT minting returns error

**Check**:
1. `ALGORAND_TREASURY_MNEMONIC` is set correctly in Railway
2. Treasury wallet has TestNet ALGO balance
   - Visit: https://testnet.algoexplorer.io/address/PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M
   - Should have at least 5 ALGO
3. Check Railway logs for specific error message

## View Logs

1. Railway Dashboard → Your Project
2. Click on the service
3. Go to **Deployments** tab
4. Click on latest deployment
5. View real-time logs

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | No | Railway sets automatically |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for JWT tokens |
| `ALGORAND_TREASURY_MNEMONIC` | Yes | 25-word mnemonic for treasury wallet |

## Next Steps

After backend is deployed:
1. Copy your Railway URL
2. Deploy frontend to Vercel
3. Set `REACT_APP_API_URL` in Vercel to your Railway URL + `/api`
4. Test NFT minting!

---

**Need help?** Check Railway docs: https://docs.railway.app/
