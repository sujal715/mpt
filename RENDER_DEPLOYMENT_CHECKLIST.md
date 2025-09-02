# 🚀 Render Deployment Checklist

## **Step-by-Step Deployment to Render**

### **1. Go to Render**
- Open: [render.com](https://render.com)
- Click **"Sign Up"**
- Choose **"Continue with GitHub"**
- Authorize Render access

### **2. Create Web Service**
- Click **"New +"** button
- Select **"Web Service"**
- Connect repository: `sujal715/MPT`
- Click **"Connect"**

### **3. Configure Settings (IMPORTANT!)**
```
Name: mpt-backend
Environment: Java (MUST SELECT THIS - don't use auto-detect!)
Region: US East (or closest)
Branch: main
Build Command: ./mvnw clean install
Start Command: java -jar target/mpt-0.0.1-SNAPSHOT.jar
Plan: Free
```

### **4. Deploy**
- Click **"Create Web Service"**
- Wait 5-10 minutes for deployment
- You'll get URL: `https://mpt-backend.onrender.com`

### **5. Test Your App**
- Visit your Render URL
- Test API endpoints:
  - `https://mpt-backend.onrender.com/api/customers`
  - `https://mpt-backend.onrender.com/api/packages`

### **6. Share with Friend**
Your friend can now use:
```
API Base URL: https://mpt-backend.onrender.com/api
```

## **Why This is Better:**
✅ **No passwords needed** - completely open
✅ **Permanent URL** - works 24/7
✅ **Always accessible** - from anywhere in the world
✅ **Professional** - looks like production app
✅ **Free forever** - no hidden costs
✅ **Auto-deploys** - updates when you push to GitHub

## **Troubleshooting:**
- **If it still fails**: Delete the service and recreate it
- **Make sure to select "Java"** as environment (not auto-detect)
- **Check Render logs** if deployment fails
- **Make sure your app compiles locally first**
- **CORS is already configured for Render URLs**

## **Need Help?**
- Check Render logs if deployment fails
- Make sure your app compiles locally first
- CORS is already configured for Render URLs
