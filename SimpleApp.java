import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class SimpleApp {

    public static void main(String[] args) {
        SpringApplication.run(SimpleApp.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "🚀 MPT Application is RUNNING!";
    }

    @GetMapping("/api/health")
    public String health() {
        return "✅ HEALTHY - Server is working!";
    }

    @PostMapping("/api/bookings/create")
    public String createBooking(@RequestBody String data) {
        return "✅ Booking created successfully!";
    }

    @GetMapping("/api/bookings")
    public String getBookings() {
        return "📋 Bookings: Sample data here";
    }
}
