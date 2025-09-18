# MPT Port Configuration - FIXED

## ⚠️ IMPORTANT: PORT 8081 IS FIXED - DO NOT CHANGE

The MPT application uses **port 8081** for the backend. This port is hardcoded and should never be changed.

### Backend Configuration
- **Port**: 8081 (hardcoded in all configuration files)
- **URL**: http://localhost:8081
- **API Base**: http://localhost:8081/api

### Frontend Configuration
- **Port**: 3000 (React development server)
- **URL**: http://localhost:3000
- **API Target**: http://localhost:8081

### Configuration Files Updated
All Spring Boot configuration files have been updated to use port 8081:

- `application.properties` - Main configuration
- `application-prod.properties` - Production configuration
- `application-render.properties` - Render deployment
- `application-railway.properties` - Railway deployment

### Quick Start
```bash
# Start backend (always on port 8081)
./start-backend.sh

# Or manually:
cd clean-spring-boot && mvn spring-boot:run

# Start frontend (always on port 3000)
cd frontend && npm start
```

### Why Port 8081?
- Avoids conflicts with other services
- Consistent across all environments
- Hardcoded to prevent accidental changes

### ⚠️ DO NOT CHANGE THESE PORTS
- Backend: 8081
- Frontend: 3000
- Database: Default H2 port

If you need to change ports, update ALL configuration files and restart both services.
