# 🚀 **STEP-BY-STEP DEPLOYMENT GUIDE**

## 📋 **Follow These Steps Exactly**

### **Step 1: Open Render Dashboard**
1. **Open your browser**
2. **Go to**: https://dashboard.render.com
3. **Sign in** to your Render account

---

## 🔧 **DEPLOY BACKEND FIRST**

### **Step 2: Create Backend Service**
1. **Click the "New +" button** (top right)
2. **Select "Web Service"**
3. **Click "Connect" next to GitHub**
4. **Select your repository**: `mp`
5. **Click "Connect"**

### **Step 3: Configure Backend**
Fill in these exact settings:
```
Name: mp-backend
Environment: Java
Region: Choose closest to you
Branch: main
Build Command: ./mvnw clean package -DskipTests
Start Command: java -jar target/mpt-0.0.1-SNAPSHOT.jar
```

### **Step 4: Deploy Backend**
1. **Click "Create Web Service"**
2. **Wait for deployment** (5-10 minutes)
3. **Copy your backend URL** (e.g., https://mp-backend.onrender.com)

---

## 🎨 **DEPLOY FRONTEND NEXT**

### **Step 5: Create Frontend Service**
1. **Click "New +" button again**
2. **Select "Static Site"**
3. **Click "Connect" next to GitHub**
4. **Select your repository**: `mp` (same repo!)
5. **Click "Connect"**

### **Step 6: Configure Frontend**
Fill in these exact settings:
```
Name: mp-frontend
Branch: main
Build Command: npm install && npm run build
Publish Directory: build
```

### **Step 7: Add Environment Variable**
1. **Click "Advanced"**
2. **Add Environment Variable**:
   ```
   Key: REACT_APP_API_URL
   Value: [PASTE YOUR BACKEND URL HERE]
   ```

### **Step 8: Deploy Frontend**
1. **Click "Create Static Site"**
2. **Wait for deployment** (3-5 minutes)
3. **Copy your frontend URL** (e.g., https://mp-frontend.onrender.com)

---

## ✅ **VERIFICATION STEPS**

### **Step 9: Test Your Backend**
1. **Visit your backend URL**
2. **You should see** your Spring Boot application running
3. **If it works**, proceed to frontend

### **Step 10: Test Your Frontend**
1. **Visit your frontend URL**
2. **You should see** your luxury MPT website
3. **Test navigation** between pages
4. **Check if it connects** to your backend

---

## 🎯 **WHAT YOU'LL HAVE**

### **Complete MPT Application**
- **Backend**: https://mp-backend.onrender.com
- **Frontend**: https://mp-frontend.onrender.com
- **Integration**: Frontend talks to backend
- **Status**: Live and running! 🚀

---

## 🆘 **IF SOMETHING GOES WRONG**

### **Backend Issues**
- Check build logs in Render dashboard
- Verify your `pom.xml` exists
- Make sure Maven wrapper (`mvnw`) is in your repo

### **Frontend Issues**
- Check build logs in Render dashboard
- Verify `package.json` exists
- Make sure `src/` folder has your React code

---

## 🎉 **SUCCESS!**

**Your complete MPT application will be live on Render!**

**Follow these steps exactly and you'll have everything deployed!** 🚀
