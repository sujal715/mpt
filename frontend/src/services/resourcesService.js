// Resources Service for MPT Application
// This service handles downloading safety guides and resources

class ResourcesService {
  constructor() {
    this.resources = {
      kitesurfing: {
        title: 'Kitesurfing Safety Guide',
        filename: 'MPT_Kitesurfing_Safety_Guide.pdf',
        content: this.generateKitesurfingGuide(),
        type: 'application/pdf'
      },
      uscRecipes: {
        title: 'USC Recipes',
        filename: 'USC_Recipes.pdf',
        content: this.generateUSCRecipesGuide(),
        type: 'application/pdf'
      },
      mealPlans: {
        title: 'Meal Plans',
        filename: 'Meal_Plans.pdf',
        content: this.generateMealPlansGuide(),
        type: 'application/pdf'
      }
    };
  }

  // Download a specific resource
  downloadResource(resourceKey, userEmail = null) {
    const resource = this.resources[resourceKey];
    if (!resource) {
      throw new Error('Resource not found');
    }

    try {
      // Log the download with user email if provided
      if (userEmail) {
        console.log(`Download requested for ${resourceKey} by ${userEmail}`);
        // Simple logging without external dependencies
        this.logDownloadSimple(resourceKey, userEmail);
      }

      // Create HTML content for better formatting
      const htmlContent = this.createHTMLDocument(resource, userEmail);
      
      // Create a blob with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = resource.filename.replace('.pdf', '.html');
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log(`Successfully downloaded ${resourceKey}`);
      
    } catch (error) {
      console.error('Download error:', error);
      throw new Error(`Download failed: ${error.message}`);
    }
  }

  // Simple logging method without external dependencies
  logDownloadSimple(resourceKey, userEmail) {
    try {
      const downloadData = {
        resource: resourceKey,
        email: userEmail,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };
      
      // Store in localStorage for tracking
      const downloads = JSON.parse(localStorage.getItem('mpt_downloads') || '[]');
      downloads.push(downloadData);
      localStorage.setItem('mpt_downloads', JSON.stringify(downloads));
      
      console.log('Download logged:', downloadData);
    } catch (error) {
      console.warn('Failed to log download:', error);
      // Don't throw error, just log it
    }
  }

  // Log download for tracking
  logDownload(resourceKey, userEmail) {
    const downloadData = {
      resource: resourceKey,
      email: userEmail,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    
    // Store in localStorage for tracking
    const downloads = JSON.parse(localStorage.getItem('mpt_downloads') || '[]');
    downloads.push(downloadData);
    localStorage.setItem('mpt_downloads', JSON.stringify(downloads));
    
    // Here you could send this data to your backend
    console.log('Download logged:', downloadData);
  }

  // Create a formatted HTML document
  createHTMLDocument(resource, userEmail = null) {
    const timestamp = new Date().toLocaleString();
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resource.title}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .header {
            background: linear-gradient(135deg, #0066cc, #0052a3);
            color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
            font-weight: bold;
        }
        .header .subtitle {
            margin-top: 10px;
            font-size: 1.1rem;
            opacity: 0.9;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .content pre {
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            border-left: 4px solid #0066cc;
            overflow-x: auto;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            color: #666;
            font-size: 0.9rem;
        }
        .download-info {
            background-color: #e3f2fd;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            border-left: 4px solid #2196f3;
        }
        .download-info strong {
            color: #1976d2;
        }
        .user-info {
            background-color: #f3e5f5;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            border-left: 4px solid #9c27b0;
        }
        .user-info strong {
            color: #7b1fa2;
        }
        @media print {
            body { background-color: white; }
            .header { background: #0066cc !important; }
            .content { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${resource.title}</h1>
        <div class="subtitle">MPT Water Sports Safety Guide</div>
    </div>
    
    <div class="download-info">
        <strong>Downloaded:</strong> ${timestamp}<br>
        <strong>Source:</strong> MPT Water Sports Academy<br>
        <strong>For:</strong> Educational and Safety Purposes
    </div>
    
    ${userEmail ? `
    <div class="user-info">
        <strong>Downloaded by:</strong> ${userEmail}<br>
        <strong>Thank you for your interest in water sports safety!</strong><br>
        <em>We'll send you additional resources and tips to enhance your learning experience.</em>
    </div>
    ` : ''}
    
    <div class="content">
        <pre>${resource.content}</pre>
    </div>
    
    <div class="footer">
        <p><strong>MPT Water Sports Academy</strong></p>
        <p>Contact: chloebarrettraining@icloud.com | Phone: 04 98 471 509</p>
        <p>This document is for educational purposes only. Always follow local safety regulations.</p>
        <p>Generated on: ${timestamp}</p>
    </div>
</body>
</html>`;
  }

  // Generate Kitesurfing Safety Guide content
  generateKitesurfingGuide() {
    return `
MPT KITESURFING SAFETY GUIDE
================================

SAFETY FIRST - ALWAYS!
Your safety is our top priority. Never compromise on safety procedures.

PRE-FLIGHT CHECKLIST
===================
□ Weather conditions suitable (wind 10-25 knots)
□ Equipment inspection completed
□ Safety gear properly fitted
□ Emergency procedures reviewed
□ Buddy system in place
□ Launch/landing area clear

EQUIPMENT SAFETY
================
1. KITE INSPECTION
   - Check for tears, holes, or damage
   - Ensure all lines are untangled
   - Verify safety release systems work
   - Check bridle connections

2. BOARD INSPECTION
   - Fins securely attached
   - No cracks or damage
   - Leash properly connected
   - Footstraps secure

3. SAFETY GEAR
   - Helmet (mandatory)
   - Impact vest (recommended)
   - Wetsuit appropriate for conditions
   - Safety knife accessible

LAUNCHING PROCEDURES
====================
1. Choose safe launch area
2. Check wind direction and strength
3. Ensure downwind area is clear
4. Have spotter assist if possible
5. Use proper launch technique
6. Never launch alone in strong winds

RIDING SAFETY
=============
1. Stay within your skill level
2. Maintain safe distance from others
3. Be aware of changing conditions
4. Know your emergency procedures
5. Respect right of way rules
6. Monitor fatigue levels

EMERGENCY PROCEDURES
====================
1. IMMEDIATE ACTIONS
   - Release safety system if needed
   - Signal for help if possible
   - Stay with your equipment
   - Don't panic

2. EQUIPMENT RECOVERY
   - Secure kite safely
   - Check for damage
   - Assess if safe to continue
   - Return to shore if needed

WEATHER AWARENESS
=================
- Check forecast before heading out
- Monitor wind changes
- Watch for storm development
- Know local weather patterns
- Understand wind effects on water

COMMUNICATION
=============
- Use clear hand signals
- Establish buddy system
- Know emergency contacts
- Report incidents immediately
- Share conditions with others

POST-SESSION CHECKLIST
======================
□ Equipment properly stored
□ Any damage documented
□ Safety gear cleaned
□ Conditions logged
□ Lessons learned noted

REMEMBER: SAFETY IS NOT OPTIONAL!
Always prioritize safety over performance.
When in doubt, don't go out.

MPT Contact: info@mpt.com
Emergency: 911
Coast Guard: VHF Channel 16

Stay safe and enjoy the ride!
    `.trim();
  }

  // Generate Hydrofoil Safety Guide content
  generateHydrofoilGuide() {
    return `
MPT HYDROFOIL SAFETY GUIDE
============================

HYDROFOILING: THE ULTIMATE WATER EXPERIENCE
Safety is paramount when riding above the water!

PRE-RIDE SAFETY CHECK
=====================
□ Foil assembly inspected
□ All bolts properly torqued
□ Mast and fuselage secure
□ Wings undamaged
□ Safety gear ready
□ Conditions suitable

FOIL ASSEMBLY SAFETY
====================
1. MAST INSPECTION
   - Check for cracks or damage
   - Ensure proper height for conditions
   - Verify mounting plate secure
   - Check for corrosion

2. WING INSPECTION
   - Leading edge smooth
   - No dents or damage
   - Proper angle of attack
   - Secure attachment

3. FUSELAGE CHECK
   - All connections tight
   - No stress fractures
   - Proper alignment
   - Safety lines attached

LAUNCHING TECHNIQUES
====================
1. DEEP WATER LAUNCH
   - Ensure sufficient depth
   - Clear area around
   - Proper body position
   - Smooth acceleration

2. SHALLOW WATER LAUNCH
   - Check depth carefully
   - Avoid hitting bottom
   - Use proper technique
   - Have spotter assist

RIDING SAFETY PROTOCOLS
=======================
1. SPEED MANAGEMENT
   - Start slow and build up
   - Know your limits
   - Avoid excessive speed
   - Control your acceleration

2. POSITIONING
   - Stay centered on foil
   - Maintain proper stance
   - Keep weight balanced
   - Avoid sudden movements

3. AWARENESS
   - Watch for obstacles
   - Monitor water depth
   - Check for other riders
   - Be aware of conditions

EMERGENCY PROCEDURES
====================
1. FOIL FAILURE
   - Stay calm
   - Secure equipment
   - Signal for help
   - Return to safety

2. INJURY PREVENTION
   - Wear protective gear
   - Know your limits
   - Practice falling safely
   - Have emergency plan

3. EQUIPMENT DAMAGE
   - Assess damage level
   - Secure broken parts
   - Return to shore safely
   - Document incident

FOIL MAINTENANCE
================
- Regular inspection schedule
- Clean after each use
- Check for wear and tear
- Professional service when needed
- Store properly when not in use

ADVANCED SAFETY TIPS
====================
- Practice in controlled conditions
- Learn from experienced riders
- Take lessons from professionals
- Build skills gradually
- Respect your equipment

WEATHER CONSIDERATIONS
======================
- Wind strength and direction
- Wave conditions
- Water temperature
- Visibility factors
- Storm development

SAFETY EQUIPMENT
================
□ Helmet (mandatory)
□ Impact vest
□ Wetsuit appropriate
□ Safety knife
□ Communication device
□ First aid kit nearby

POST-RIDE INSPECTION
====================
□ Equipment cleaned
□ Damage documented
□ Maintenance scheduled
□ Lessons learned
□ Safety improvements noted

HYDROFOILING IS AMAZING - STAY SAFE!
Always prioritize safety over performance.
Respect the power of the foil.

MPT Contact: info@mpt.com
Emergency: 911
Coast Guard: VHF Channel 16

Ride high, stay safe!
    `.trim();
  }

  // Generate Wing Foil Safety Guide content
  generateWingFoilGuide() {
    return `
MPT WING FOIL SAFETY GUIDE
===========================

WING FOILING: FREEDOM ON THE WATER
Master the wing, master the foil, master safety!

PRE-SESSION SAFETY CHECK
========================
□ Wing properly inflated
□ Foil assembly secure
□ Safety gear ready
□ Conditions suitable
□ Launch area clear
□ Emergency plan ready

WING INSPECTION
===============
1. INFLATION CHECK
   - Proper pressure maintained
   - No leaks or damage
   - Handles secure
   - Leading edge smooth

2. STRUCTURAL INTEGRITY
   - No tears or holes
   - Seams intact
   - Frame undamaged
   - Safety systems working

3. HANDLE SYSTEM
   - All handles secure
   - Proper positioning
   - Easy access
   - Emergency release working

FOIL SAFETY CHECK
=================
1. ASSEMBLY VERIFICATION
   - Mast properly mounted
   - Wings secure
   - Fuselage tight
   - No loose parts

2. CONDITION ASSESSMENT
   - No damage visible
   - Proper alignment
   - Safety lines attached
   - Emergency procedures known

LAUNCHING SAFETY
================
1. WING HANDLING
   - Proper grip technique
   - Wind direction awareness
   - Launch area clear
   - Spotter assistance if needed

2. FOIL POSITIONING
   - Proper depth
   - Clear area around
   - Smooth acceleration
   - Controlled start

RIDING SAFETY PROTOCOLS
=======================
1. WING CONTROL
   - Proper hand positioning
   - Smooth movements
   - Power management
   - Emergency procedures

2. FOIL BALANCE
   - Stay centered
   - Weight distribution
   - Smooth transitions
   - Avoid sudden movements

3. SITUATIONAL AWARENESS
   - Watch for obstacles
   - Monitor conditions
   - Check other riders
   - Know your location

EMERGENCY PROCEDURES
====================
1. WING FAILURE
   - Stay calm
   - Secure equipment
   - Signal for help
   - Return to safety

2. FOIL ISSUES
   - Assess problem
   - Secure broken parts
   - Return to shore
   - Document incident

3. WEATHER CHANGES
   - Monitor conditions
   - Return to safety
   - Secure equipment
   - Wait for improvement

ADVANCED SAFETY TIPS
====================
- Practice in light winds first
- Learn from professionals
- Build skills gradually
- Respect weather limits
- Use proper technique

EQUIPMENT CARE
==============
- Clean after each use
- Store properly
- Regular inspection
- Professional service
- Damage documentation

SAFETY EQUIPMENT CHECKLIST
==========================
□ Helmet (mandatory)
□ Impact vest
□ Appropriate wetsuit
□ Safety knife
□ Communication device
□ First aid accessible

WEATHER AWARENESS
=================
- Wind strength monitoring
- Direction changes
- Storm development
- Temperature factors
- Visibility conditions

POST-SESSION REVIEW
==================
□ Equipment cleaned
□ Damage documented
□ Lessons learned
□ Safety improvements
□ Next session planning

WING FOILING IS INCREDIBLE - STAY SAFE!
Always prioritize safety over performance.
Respect the power of wind and water.

MPT Contact: info@mpt.com
Emergency: 911
Coast Guard: VHF Channel 16

Fly high, stay safe!
    `.trim();
  }

  // Get all available resources
  getAvailableResources() {
    return Object.keys(this.resources).map(key => ({
      key,
      ...this.resources[key]
    }));
  }

  // Generate USC Recipes Guide content
  generateUSCRecipesGuide() {
    return `
MPT USC RECIPES GUIDE
=====================

DELICIOUS RECIPES FOR OPTIMAL PERFORMANCE
Fuel your water sports journey with these nutritious recipes!

BREAKFAST RECIPES
=================
1. POWER SMOOTHIE BOWL
   - 1 banana
   - 1 cup mixed berries
   - 1/2 cup Greek yogurt
   - 1 tbsp chia seeds
   - 1 tbsp almond butter
   - Blend and top with granola

2. ENERGY PANCAKES
   - 1 cup oats
   - 2 eggs
   - 1 banana
   - 1/2 cup milk
   - Blend and cook like pancakes

3. PROTEIN OATMEAL
   - 1/2 cup oats
   - 1 scoop protein powder
   - 1 tbsp nut butter
   - Fresh berries
   - Honey to taste

LUNCH RECIPES
=============
1. QUINOA POWER BOWL
   - 1 cup cooked quinoa
   - Grilled chicken breast
   - Mixed vegetables
   - Avocado slices
   - Lemon tahini dressing

2. SALMON WRAP
   - Whole grain wrap
   - Grilled salmon
   - Spinach leaves
   - Cucumber slices
   - Greek yogurt sauce

3. VEGGIE STIR FRY
   - Mixed vegetables
   - Brown rice
   - Tofu or chicken
   - Soy sauce
   - Sesame oil

DINNER RECIPES
==============
1. GRILLED FISH & SWEET POTATO
   - White fish fillet
   - Roasted sweet potato
   - Steamed broccoli
   - Lemon herb seasoning

2. TURKEY MEATBALLS
   - Lean ground turkey
   - Whole wheat pasta
   - Marinara sauce
   - Parmesan cheese

3. VEGETABLE CURRY
   - Mixed vegetables
   - Coconut milk
   - Curry spices
   - Brown rice

SNACKS & RECOVERY
=================
1. PROTEIN ENERGY BALLS
   - Dates
   - Almonds
   - Protein powder
   - Cocoa powder
   - Roll into balls

2. GREEK YOGURT PARFAIT
   - Greek yogurt
   - Berries
   - Granola
   - Honey drizzle

3. VEGETABLE HUMMUS
   - Chickpeas
   - Tahini
   - Lemon juice
   - Garlic
   - Serve with vegetables

HYDRATION RECIPES
=================
1. ELECTROLYTE DRINK
   - Coconut water
   - Sea salt
   - Lemon juice
   - Honey

2. GREEN SMOOTHIE
   - Spinach
   - Banana
   - Apple
   - Ginger
   - Water

3. RECOVERY SHAKE
   - Protein powder
   - Banana
   - Almond milk
   - Berries

NUTRITION TIPS
==============
- Eat within 30 minutes after training
- Stay hydrated throughout the day
- Include protein in every meal
- Choose whole grains over refined
- Eat colorful vegetables
- Limit processed foods
- Plan meals ahead of time

MEAL TIMING
===========
- Breakfast: Within 1 hour of waking
- Pre-workout: 2-3 hours before
- Post-workout: Within 30 minutes
- Dinner: 3-4 hours before bed
- Snacks: Between meals as needed

PORTION GUIDES
==============
- Protein: Palm-sized portion
- Carbs: Cupped hand portion
- Vegetables: Two fist-sized portions
- Fats: Thumb-sized portion
- Water: 8-10 glasses daily

RECIPE MODIFICATIONS
====================
- Gluten-free: Use rice, quinoa, oats
- Dairy-free: Use almond/coconut milk
- Vegan: Use plant-based proteins
- Low-carb: Reduce grains, increase vegetables
- High-protein: Add extra protein sources

ENJOY YOUR NUTRITIOUS JOURNEY!
These recipes will fuel your water sports performance
and help you achieve your training goals.

MPT Contact: info@mpt.com
Nutrition Support: nutrition@mpt.com

Eat well, perform better! 🍎💪
    `.trim();
  }

  // Generate Meal Plans Guide content
  generateMealPlansGuide() {
    return `
MPT MEAL PLANS GUIDE
====================

STRUCTURED MEAL PLANS FOR WATER SPORTS PERFORMANCE
Optimize your nutrition for peak performance!

WEEKLY MEAL PLAN STRUCTURE
==========================
MONDAY - POWER START
Breakfast: Protein smoothie bowl
Lunch: Quinoa power bowl
Dinner: Grilled fish & vegetables
Snacks: Energy balls, Greek yogurt

TUESDAY - ENERGY FOCUS
Breakfast: Oatmeal with berries
Lunch: Salmon wrap
Dinner: Turkey meatballs
Snacks: Vegetable hummus, nuts

WEDNESDAY - RECOVERY DAY
Breakfast: Protein pancakes
Lunch: Vegetable stir fry
Dinner: Chicken curry
Snacks: Recovery shake, fruit

THURSDAY - PERFORMANCE
Breakfast: Power smoothie
Lunch: Quinoa salad
Dinner: Grilled salmon
Snacks: Energy bars, yogurt

FRIDAY - PREP DAY
Breakfast: Oatmeal bowl
Lunch: Turkey wrap
Dinner: Fish tacos
Snacks: Trail mix, smoothie

SATURDAY - TRAINING DAY
Breakfast: Protein-rich breakfast
Lunch: Post-workout meal
Dinner: Recovery dinner
Snacks: Pre/post workout snacks

SUNDAY - REST & REFUEL
Breakfast: Leisurely breakfast
Lunch: Family meal
Dinner: Comfort food
Snacks: Healthy treats

DAILY MEAL TIMING
=================
6:00 AM - Wake up
6:30 AM - Pre-workout snack (if training)
7:00 AM - Training session
8:00 AM - Post-workout recovery meal
9:00 AM - Breakfast
12:00 PM - Lunch
3:00 PM - Afternoon snack
6:00 PM - Dinner
8:00 PM - Evening snack (if needed)

MACRONUTRIENT BREAKDOWN
=======================
PROTEIN (25-30%)
- Lean meats
- Fish and seafood
- Eggs
- Dairy products
- Plant-based proteins

CARBOHYDRATES (45-50%)
- Whole grains
- Fruits
- Vegetables
- Legumes
- Sweet potatoes

FATS (20-25%)
- Nuts and seeds
- Avocado
- Olive oil
- Fatty fish
- Coconut products

HYDRATION SCHEDULE
==================
Morning: 2-3 glasses water
Pre-workout: 1-2 glasses
During workout: Sip regularly
Post-workout: 2-3 glasses
Afternoon: 2-3 glasses
Evening: 1-2 glasses

SUPPLEMENT TIMING
=================
Morning: Multivitamin, Omega-3
Pre-workout: Caffeine, BCAAs
Post-workout: Protein powder, Creatine
Evening: Magnesium, Probiotics

GROCERY SHOPPING LIST
======================
PROTEINS
- Chicken breast
- Salmon fillets
- Greek yogurt
- Eggs
- Turkey breast
- Tofu

CARBOHYDRATES
- Quinoa
- Brown rice
- Sweet potatoes
- Oats
- Whole grain bread
- Bananas

VEGETABLES
- Spinach
- Broccoli
- Bell peppers
- Carrots
- Cucumber
- Tomatoes

FATS
- Avocado
- Almonds
- Olive oil
- Coconut oil
- Chia seeds
- Flax seeds

MEAL PREP TIPS
==============
1. Plan meals for the week
2. Shop on weekends
3. Prep proteins in advance
4. Wash and cut vegetables
5. Cook grains in batches
6. Store in containers
7. Label with dates

PORTION CONTROL
===============
Use your hand as a guide:
- Protein: Palm size
- Carbs: Cupped hand
- Vegetables: Two fists
- Fats: Thumb size
- Water: 8-10 glasses

ADAPTATION GUIDELINES
=====================
BEGINNER (0-6 months)
- Focus on consistency
- Simple meal plans
- Basic nutrition
- Regular meal times

INTERMEDIATE (6-18 months)
- Optimize timing
- Advanced meal prep
- Supplement integration
- Performance focus

ADVANCED (18+ months)
- Fine-tune nutrition
- Competition prep
- Recovery optimization
- Individual customization

TROUBLESHOOTING
===============
Low Energy: Check carb intake
Poor Recovery: Increase protein
Digestive Issues: Add probiotics
Weight Management: Adjust portions
Hydration: Monitor water intake

SUCCESS TIPS
=============
- Start with one meal at a time
- Prep meals on weekends
- Keep healthy snacks available
- Stay consistent with timing
- Monitor how you feel
- Adjust as needed

TRACK YOUR PROGRESS
===================
- Energy levels
- Performance improvements
- Recovery time
- Sleep quality
- Mood and focus
- Body composition

YOUR NUTRITION JOURNEY STARTS HERE!
Follow these meal plans to fuel your water sports performance
and achieve your training goals.

MPT Contact: info@mpt.com
Nutrition Support: nutrition@mpt.com

Eat to perform! 🏄‍♀️🍽️
    `.trim();
  }

  // Get resource by key
  getResource(key) {
    return this.resources[key];
  }
}

export default new ResourcesService();
