# ✅ **DEPLOYMENT CHECKLIST**

## 🚀 **Quick Reference - Follow This Order**

### **PHASE 1: BACKEND DEPLOYMENT**
- [ ] Open https://dashboard.render.com
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repo: `mp`
- [ ] Name: `mp-backend`
- [ ] Environment: Java
- [ ] Build Command: `./mvnw clean package -DskipTests`
- [ ] Start Command: `java -jar target/mpt-0.0.1-SNAPSHOT.jar`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)
- [ ] Copy backend URL: `https://mp-backend.onrender.com`

### **PHASE 2: FRONTEND DEPLOYMENT**
- [ ] Click "New +" → "Static Site"
- [ ] Connect GitHub repo: `mp` (same repo!)
- [ ] Name: `mp-frontend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `build`
- [ ] Add Environment Variable:
  - Key: `REACT_APP_API_URL`
  - Value: `[PASTE YOUR BACKEND URL]`
- [ ] Click "Create Static Site"
- [ ] Wait for deployment (3-5 minutes)
- [ ] Copy frontend URL: `https://mp-frontend.onrender.com`

### **PHASE 3: VERIFICATION**
- [ ] Test backend URL - should show Spring Boot app
- [ ] Test frontend URL - should show your luxury MPT website
- [ ] Check navigation between pages
- [ ] Verify frontend connects to backend

## 🎯 **SUCCESS INDICATORS**

✅ **Backend**: Shows Spring Boot application  
✅ **Frontend**: Shows your luxury MPT website  
✅ **Integration**: Frontend can communicate with backend  
✅ **URLs**: Both services are accessible  

## 🆘 **TROUBLESHOOTING**

- **Build fails**: Check logs in Render dashboard
- **Can't connect**: Verify environment variables
- **Page not found**: Check publish directory settings

**Follow this checklist and you'll have everything deployed!** 🚀
