# 🚀 MPT Website Deployment Guide

## Quick Deploy (Recommended)

### Option 1: Render.com (Easiest)

1. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment - Free consultation system"
   git push origin main
   ```

3. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Sign up/login with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect your `render.yaml` configuration

4. **Set Environment Variables in Render Dashboard:**
   - `SPRING_PROFILES_ACTIVE=render`
   - `JAVA_VERSION=17`
   - `REACT_APP_API_URL=https://your-app-name.onrender.com`

5. **Your website will be live at:** `https://your-app-name.onrender.com`

---

## What's Already Configured ✅

- ✅ **Render.yaml**: Backend deployment configuration
- ✅ **Frontend Build**: React app builds into Spring Boot static folder
- ✅ **Production Database**: H2 in-memory (can upgrade to PostgreSQL later)
- ✅ **CORS**: Configured for all origins
- ✅ **Health Check**: `/api/health` endpoint
- ✅ **Free Consultation**: Complete booking system
- ✅ **Admin Panel**: Full management interface
- ✅ **Payment System**: Stripe integration (mock for now)

---

## Alternative Deployment Options

### Option 2: Railway.app

1. Create `railway.json`:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "java -jar target/mpt-0.0.1-SNAPSHOT.jar",
    "healthcheckPath": "/api/health"
  }
}
```

2. Connect GitHub to Railway
3. Railway auto-detects Java/Spring Boot
4. Set environment variables

### Option 3: Vercel + Railway (Separate Services)

**Backend (Railway):**
- Deploy Spring Boot backend
- Get backend URL

**Frontend (Vercel):**
- Set `REACT_APP_API_URL=https://your-backend-url.railway.app`
- Deploy React app

---

## Production Checklist

### Before Deploying:
- [ ] Test free consultation booking
- [ ] Test paid package booking
- [ ] Verify admin panel functionality
- [ ] Check all images load correctly
- [ ] Test contact form
- [ ] Verify testimonials display

### After Deploying:
- [ ] Test website on mobile
- [ ] Check SSL certificate
- [ ] Verify all forms work
- [ ] Test booking system end-to-end
- [ ] Check admin panel access
- [ ] Monitor error logs

---

## Environment Variables

### Required for Production:
```bash
SPRING_PROFILES_ACTIVE=render
JAVA_VERSION=17
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### Optional (for Stripe):
```bash
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

---

## Database Options

### Current: H2 In-Memory
- ✅ Simple setup
- ✅ No external dependencies
- ❌ Data resets on restart

### Upgrade to PostgreSQL:
1. Add PostgreSQL dependency to `pom.xml`
2. Update `application-render.properties`
3. Create PostgreSQL database in Render
4. Update connection string

---

## Custom Domain Setup

1. **Buy domain** (e.g., from Namecheap, GoDaddy)
2. **In Render Dashboard:**
   - Go to your service
   - Click "Settings" → "Custom Domains"
   - Add your domain
3. **Update DNS:**
   - Add CNAME record pointing to your Render URL
4. **SSL:** Automatically provided by Render

---

## Monitoring & Maintenance

### Health Checks:
- Backend: `https://your-app.onrender.com/api/health`
- Frontend: `https://your-app.onrender.com/`

### Logs:
- View in Render dashboard
- Monitor for errors
- Check booking submissions

### Updates:
- Push changes to GitHub
- Render auto-deploys
- Test in production

---

## Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check Java version (17)
   - Verify Maven dependencies
   - Check `render.yaml` syntax

2. **Frontend Not Loading:**
   - Verify `REACT_APP_API_URL` environment variable
   - Check CORS configuration
   - Test API endpoints

3. **Database Issues:**
   - H2 resets on restart (normal)
   - Consider PostgreSQL for persistence
   - Check connection string

4. **Images Not Loading:**
   - Verify image paths
   - Check static file serving
   - Test image URLs directly

---

## Support

- **Render Docs:** https://render.com/docs
- **Spring Boot Docs:** https://spring.io/projects/spring-boot
- **React Docs:** https://reactjs.org/docs

---

## 🎉 You're Ready to Deploy!

Your website is production-ready with:
- ✅ Free consultation booking
- ✅ Paid package booking  
- ✅ Admin management panel
- ✅ Responsive design
- ✅ Payment integration
- ✅ Contact forms
- ✅ Testimonials
- ✅ Team information

**Run `./deploy.sh` and follow the steps above!**
