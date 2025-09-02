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
      hydrofoil: {
        title: 'Hydrofoil Safety Guide',
        filename: 'MPT_Hydrofoil_Safety_Guide.pdf',
        content: this.generateHydrofoilGuide(),
        type: 'application/pdf'
      },
      wingFoil: {
        title: 'Wing Foil Safety Guide',
        filename: 'MPT_Wing_Foil_Safety_Guide.pdf',
        content: this.generateWingFoilGuide(),
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

    // Log the download with user email if provided
    if (userEmail) {
      console.log(`Download requested for ${resourceKey} by ${userEmail}`);
      // Here you could send the email to your backend for tracking
      this.logDownload(resourceKey, userEmail);
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

  // Get resource by key
  getResource(key) {
    return this.resources[key];
  }
}

export default new ResourcesService();
