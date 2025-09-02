# 🚀 MPT Spring Boot Backend

## 📱 **Your Complete Spring Boot Application**

This is your **original Spring Boot backend** running on port 8080, recovered and organized from your project.

## 🏗️ **Project Structure**

```
src/main/java/com/mpt/mpt/
├── MptApplication.java          # Main Spring Boot application
├── Controllers/
│   ├── BookingController.java   # Booking API endpoints
│   ├── HealthController.java    # Health check endpoint
│   ├── MainController.java      # Main API endpoints
│   └── TestController.java      # Test endpoints
├── Entities/
│   ├── Booking.java            # Booking entity
│   ├── Package.java            # Package entity
│   ├── Service.java            # Service entity
│   └── Testimonial.java        # Testimonial entity
├── Services/
│   ├── BookingService.java     # Booking business logic
│   └── PackageService.java     # Package business logic
└── Repositories/
    ├── BookingRepository.java   # Data access layer
    ├── PackageRepository.java   # Package data access
    ├── ServiceRepository.java   # Service data access
    └── TestimonialRepository.java # Testimonial data access
```

## 🚀 **Quick Start**

### **Local Development:**
```bash
# Navigate to project
cd clean-spring-boot

# Build the project
./mvnw clean package

# Run locally
./mvnw spring-boot:run
```

### **Your app will be available at:**
- **Local**: http://localhost:8080
- **Health Check**: http://localhost:8080/api/health

## 🌐 **Deploy to Render**

### **Option 1: Automatic Deployment**
1. **Push to GitHub** (this will trigger automatic deployment)
2. **Check Render dashboard** for deployment status

### **Option 2: Manual Deployment**
1. **Go to**: https://dashboard.render.com/
2. **Create new Web Service**
3. **Connect your GitHub repository**
4. **Use these settings**:
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/mpt-0.0.1-SNAPSHOT.jar`
   - **Environment**: Java

## 📊 **API Endpoints**

### **Health Check**
- `GET /api/health` - Service health status

### **Main API**
- `GET /api/test` - Test endpoint
- `GET /api/services` - Get all services
- `GET /api/packages` - Get all packages
- `GET /api/testimonials` - Get all testimonials
- `GET /api/gallery` - Get gallery items

### **Booking API**
- `POST /api/bookings/create` - Create new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/{id}` - Get specific booking

## 🔧 **Configuration**

### **Environment Variables**
- `SPRING_PROFILES_ACTIVE` - Spring profile (render, local)
- `JAVA_VERSION` - Java version (17)
- `PORT` - Server port (8080)

### **Database**
- **Development**: H2 in-memory database
- **Production**: Configure in application-render.properties

## 📦 **Build & Deploy**

### **Build JAR:**
```bash
./mvnw clean package -DskipTests
```

### **Run JAR:**
```bash
java -jar target/mpt-0.0.1-SNAPSHOT.jar
```

## 🎯 **Next Steps**

1. **Test locally** - Make sure everything works
2. **Push to GitHub** - Trigger automatic deployment
3. **Deploy to Render** - Your app will be live!
4. **Customize** - Add your own features and endpoints

## 🌟 **Features**

- ✅ **Complete Spring Boot backend**
- ✅ **RESTful API endpoints**
- ✅ **Entity-Repository-Service architecture**
- ✅ **Health monitoring**
- ✅ **Ready for production deployment**
- ✅ **Port 8080 configuration**

---

**This is YOUR Spring Boot application - clean, organized, and ready to deploy!** 🚀
