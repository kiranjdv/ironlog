// Comprehensive Exercise Form Guide Database for IronLog
// Designed to assist beginners and lifters with proper technique, safety cues, common pitfalls, and alternatives.
// Supports 80+ exercises with 100% offline smart keyword & alias matching.

export const EXERCISE_GUIDES = {
  // ==========================================
  // CHEST EXERCISES
  // ==========================================
  "Bench Press": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Chest",
    primaryMuscles: ["Pectoralis Major (Mid & Lower Chest)"],
    secondaryMuscles: ["Anterior Deltoids", "Triceps"],
    starterVolume: "3 sets × 8–10 reps",
    setup: [
      "Lie flat on the bench with your eyes directly under the racked barbell.",
      "Plant feet firmly flat on the floor wider than shoulder-width for maximum leg drive.",
      "Grip the bar slightly wider than shoulder-width with thumbs wrapped fully around the bar.",
      "Retract your shoulder blades (pinch them together and down into the bench) to create a solid arch in your upper back."
    ],
    execution: [
      "Unrack the bar and stabilize it directly over your chest with straight arms.",
      "Inhale, slowly lowering the bar in a controlled path to your mid-chest (nipple line).",
      "Keep your elbows tucked at roughly 45–60 degrees relative to your torso—never flare them out at 90 degrees.",
      "Lightly touch your chest (don't bounce), then exhale as you explosively drive the bar back up to the starting position."
    ],
    proTips: [
      "Think about bending the barbell in half with your hands to engage your lats and stabilize your shoulders.",
      "Drive through your legs (leg drive) while keeping your glutes pinned to the bench.",
      "Maintain tight wrist alignment; don't let the barbell bend your wrists backward."
    ],
    commonMistakes: [
      "Bouncing the barbell aggressively off your sternum/ribcage.",
      "Flaring elbows wide to 90°, which places immense stress on the rotator cuffs.",
      "Lifting hips/butt off the bench to cheat the weight up."
    ],
    alternative: "Dumbbell Bench Press or Incline Push-Ups",
    videoQuery: "how+to+properly+barbell+bench+press+form+guide"
  },

  "Incline Dumbbell Press": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Chest",
    primaryMuscles: ["Clavicular Pectoralis (Upper Chest)"],
    secondaryMuscles: ["Front Delts", "Triceps"],
    starterVolume: "3 sets × 8–12 reps",
    setup: [
      "Set an adjustable bench to an incline of 30 degrees (steeper than 45° shifts focus onto front shoulders).",
      "Sit back, kick the dumbbells up to your shoulders with your knees one at a time.",
      "Retract your shoulder blades into the pad, plant feet flat on the floor, and keep a slight natural arch."
    ],
    execution: [
      "Lower the dumbbells under control with elbows tucked at roughly 45–60 degrees until weights reach chest level.",
      "Feel the stretch across your upper chest at the bottom.",
      "Exhale and press dumbbells up in a slight inward arc, stopping just short of clinking weights together at the top."
    ],
    proTips: [
      "Dumbbells allow wrists to rotate naturally into a semi-neutral angle, easing shoulder joint strain.",
      "Never let the dumbbells clank together at the top—maintain constant muscle tension."
    ],
    commonMistakes: [
      "Setting the bench incline too steep (60°+ turns it into a shoulder press).",
      "Flaring elbows out horizontally at 90 degrees."
    ],
    alternative: "Incline Push-Ups or Incline Barbell Press",
    videoQuery: "incline+dumbbell+press+proper+form"
  },

  "Flat Dumbbell Press": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Chest",
    primaryMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Triceps", "Front Delts"],
    starterVolume: "3 sets × 8–12 reps",
    setup: [
      "Sit on edge of flat bench with dumbbells resting on your knees.",
      "Lie back smoothly using your knees to kick the weights up to chest position.",
      "Pinch shoulder blades into the bench and plant feet firmly."
    ],
    execution: [
      "Lower weights until hands are at chest height with elbows at 45 degrees.",
      "Press dumbbells upward directly over your chest, squeezing your pecs at the top."
    ],
    proTips: [
      "Provides greater range of motion and unilateral balance than a barbell."
    ],
    commonMistakes: [
      "Dropping dumbbells to the floor recklessly after a set (can tear rotator cuffs).",
      "Bouncing weights out of the bottom."
    ],
    alternative: "Barbell Bench Press or Push-Ups",
    videoQuery: "dumbbell+bench+press+form"
  },

  "Incline Bench Press": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Chest",
    primaryMuscles: ["Clavicular Pectoralis (Upper Chest)"],
    secondaryMuscles: ["Front Deltoids", "Triceps"],
    starterVolume: "3 sets × 8–12 reps",
    setup: [
      "Set the bench angle to 30–45 degrees (any steeper emphasizes front shoulders too much).",
      "Plant your feet firmly on the floor and pull your shoulder blades down and back against the pad.",
      "Grip the bar slightly outside shoulder-width with wrists straight."
    ],
    execution: [
      "Unrack and hold the bar above your upper chest.",
      "Lower the bar under strict control toward your collarbone/upper chest area.",
      "Keep your elbows tucked at 45–60 degrees.",
      "Press the bar back up in a slight backward arc to lockout directly above your shoulders."
    ],
    proTips: [
      "A 30-degree incline is usually the sweet spot for maximum upper-chest activation without front-delt dominance.",
      "Keep tension in your core and upper back throughout the entire set."
    ],
    commonMistakes: [
      "Setting the bench angle too steep (60°+ turns it into a shoulder press).",
      "Letting the bar drift too far forward during the descent."
    ],
    alternative: "Incline Dumbbell Press",
    videoQuery: "how+to+incline+barbell+bench+press+form"
  },

  "Decline Bench Press": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Chest",
    primaryMuscles: ["Lower Pectoralis Major"],
    secondaryMuscles: ["Triceps", "Anterior Deltoids"],
    starterVolume: "3 sets × 8–12 reps",
    setup: [
      "Secure your legs firmly under the decline bench rollers.",
      "Lie back and grip the bar slightly wider than shoulder-width.",
      "Lock shoulder blades together into the pad."
    ],
    execution: [
      "Unrack the bar and hold it over your lower chest.",
      "Lower the bar smoothly until it gently touches the lower pectoral line.",
      "Press straight up and slightly back toward the rack."
    ],
    proTips: [
      "Always use a spotter or keep safety hooks engaged when racking and unracking on a decline angle."
    ],
    commonMistakes: [
      "Losing control of the bar path toward the neck.",
      "Lifting the head off the bench."
    ],
    alternative: "Chest Dips or Cable Decline Flyes",
    videoQuery: "decline+bench+press+proper+form"
  },

  "Dumbbell Flyes": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Chest",
    primaryMuscles: ["Pectoralis Major (Chest Stretch & Squeeze)"],
    secondaryMuscles: ["Front Deltoids", "Biceps (Short Head)"],
    starterVolume: "3 sets × 12–15 reps (use moderate weight)",
    setup: [
      "Lie on a flat bench holding two dumbbells above your chest, palms facing each other.",
      "Maintain a slight, fixed bend in your elbows (approx 15–20 degrees) and lock that bend in place."
    ],
    execution: [
      "Inhale and open your arms wide in a smooth, hugging-a-tree arc until you feel a deep stretch in your chest.",
      "Do not lower past bench level to protect your shoulder joint.",
      "Exhale and contract your chest muscles to bring the dumbbells back together at the top."
    ],
    proTips: [
      "Think about squeezing your inner biceps toward your chest rather than just clinking dumbbells together."
    ],
    commonMistakes: [
      "Bending and straightening elbows during the rep (turning it into a messy press).",
      "Going too heavy and hyperextending shoulders into a dangerous deep stretch."
    ],
    alternative: "Pec Deck Machine or Cable Crossover",
    videoQuery: "dumbbell+flyes+form+mistakes"
  },

  "Cable Crossover": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Chest",
    primaryMuscles: ["Pectoralis Major (Sternal & Clavicular)"],
    secondaryMuscles: ["Front Delts"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Set pulleys to shoulder or high level. Grab both handles with an overhand grip.",
      "Step one foot forward into a staggered stance for stability and lean forward slightly at the hips."
    ],
    execution: [
      "With a slight elbow bend, bring both hands forward and downward in a hugging arc until hands meet or cross.",
      "Pause for 1 second at the peak contraction and squeeze your chest hard.",
      "Slowly return along the same arc to feel a full, controlled stretch."
    ],
    proTips: [
      "Keep your torso completely stationary—do not sway or swing your body to generate momentum."
    ],
    commonMistakes: [
      "Using excessive weight and turning the movement into a jerky press.",
      "Letting shoulders roll forward at the peak."
    ],
    alternative: "Dumbbell Flyes or Pec Deck Fly",
    videoQuery: "cable+crossover+chest+form"
  },

  "Pec Deck Fly": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Chest",
    primaryMuscles: ["Pectoralis Major (Sternal Head)"],
    secondaryMuscles: ["Front Deltoids"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Adjust seat height so handles/pads align with your mid-chest.",
      "Sit back firmly, retract shoulder blades into the back pad, feet flat on the floor.",
      "Grip handles with elbows slightly bent."
    ],
    execution: [
      "Bring handles together in front of your chest in a hugging motion.",
      "Squeeze your pecs together hard for 1 full second at peak contraction.",
      "Control the weight back until you feel a gentle chest stretch—don't let the weights slam."
    ],
    proTips: [
      "Focus on pushing through your elbows/inner arms rather than your hands."
    ],
    commonMistakes: [
      "Letting shoulders roll forward off the pad at peak contraction.",
      "Going too far back into extreme shoulder hyperextension."
    ],
    alternative: "Cable Crossover or Dumbbell Flyes",
    videoQuery: "pec+deck+machine+fly+proper+form"
  },

  "Cable Low-to-High Fly": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Chest",
    primaryMuscles: ["Upper Pectoralis Major (Clavicular Head)"],
    secondaryMuscles: ["Front Delts"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Set both pulleys to the lowest position.",
      "Grab single handles with palms facing forward, take one step forward into a staggered stance."
    ],
    execution: [
      "With a slight elbow bend, scoop your hands upward and inward toward eye level.",
      "Squeeze your upper chest tightly at the top for 1 second.",
      "Lower slowly along the same path."
    ],
    proTips: [
      "Keep palms facing upward at the top to target upper chest fibers."
    ],
    commonMistakes: [
      "Bending elbows excessively and turning it into a bicep curl.",
      "Arching backwards."
    ],
    alternative: "Incline Dumbbell Press",
    videoQuery: "low+to+high+cable+fly+form"
  },

  "Floor Press": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Chest",
    primaryMuscles: ["Mid Chest", "Triceps"],
    secondaryMuscles: ["Front Delts"],
    starterVolume: "3 sets × 8–12 reps",
    setup: [
      "Lie flat on the floor with knees bent and feet flat.",
      "Hold dumbbells over chest with elbows angled at 45 degrees."
    ],
    execution: [
      "Lower dumbbells until your triceps gently touch the floor.",
      "Pause for 1 second to eliminate stretch reflex/momentum, then press back up."
    ],
    proTips: [
      "Ideal for lifters with shoulder impingement because the floor stops hyperextension."
    ],
    commonMistakes: [
      "Bouncing elbows hard off the floor.",
      "Arching lower back off the mat."
    ],
    alternative: "Standard Dumbbell Bench Press",
    videoQuery: "dumbbell+floor+press+form"
  },

  "Landmine Press": {
    difficulty: "Beginner",
    equipment: "Barbell",
    muscle: "Chest",
    primaryMuscles: ["Upper Chest", "Anterior Deltoid"],
    secondaryMuscles: ["Triceps", "Core"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Anchor one end of a barbell into a corner or landmine holder.",
      "Stand holding the weighted sleeve with one or both hands at chest level."
    ],
    execution: [
      "Press the barbell up and away at a 45-degree angle until arm is fully extended.",
      "Squeeze upper chest at top, then lower with control."
    ],
    proTips: [
      "Lean forward slightly into the press to maximize upper chest activation."
    ],
    commonMistakes: [
      "Leaning back to cheat the weight.",
      "Not controlling the negative descent."
    ],
    alternative: "Incline Dumbbell Press",
    videoQuery: "landmine+chest+press+form"
  },

  "Push-Ups": {
    difficulty: "Beginner",
    equipment: "Bodyweight",
    muscle: "Chest",
    primaryMuscles: ["Pectoralis Major", "Core / Abs"],
    secondaryMuscles: ["Triceps", "Front Deltoids", "Serratus Anterior"],
    starterVolume: "3 sets × 10–20 reps (or to technical failure)",
    setup: [
      "Place hands on the floor slightly wider than shoulder-width, fingers spread.",
      "Extend legs back on toes, body forming a rigid straight line from heels to crown.",
      "Squeeze glutes and brace your abs like you are in a plank."
    ],
    execution: [
      "Inhale, lowering your chest toward the floor until your elbows reach roughly 90 degrees or chest is 1 inch off floor.",
      "Keep elbows tucked at a 45-degree arrow shape (never flare them like a 'T').",
      "Exhale and push through your palms back to full extension."
    ],
    proTips: [
      "Keep your neck neutral by gazing at a point 6–12 inches in front of your hands."
    ],
    commonMistakes: [
      "Sagging hips or piking butt into the air (loss of core engagement).",
      "Flaring elbows wide out to the sides.",
      "Doing half-reps (head bobbing without chest descending)."
    ],
    alternative: "Incline Push-Ups (hands on bench/wall) or Knee Push-Ups",
    videoQuery: "proper+pushup+form+for+beginners"
  },

  "Chest Dips": {
    difficulty: "Advanced",
    equipment: "Bodyweight",
    muscle: "Chest",
    primaryMuscles: ["Lower Chest", "Triceps"],
    secondaryMuscles: ["Front Delts", "Upper Back"],
    starterVolume: "3 sets × 6–10 reps",
    setup: [
      "Mount parallel dip bars with straight arms.",
      "Cross your legs, bend knees, and lean your torso forward at roughly a 30-degree angle to focus on chest instead of triceps."
    ],
    execution: [
      "Slowly lower yourself by bending elbows until your upper arms are roughly parallel to the floor.",
      "Keep elbows slightly flared outward and maintain the forward torso lean.",
      "Press firmly through your palms to return to the top."
    ],
    proTips: [
      "Leaning forward shifts the load onto the chest; staying upright targets the triceps."
    ],
    commonMistakes: [
      "Dipping too deep if shoulder mobility is restricted, risking acromioclavicular strain.",
      "Swinging legs to generate momentum."
    ],
    alternative: "Assisted Dip Machine or Push-Ups with elevated feet",
    videoQuery: "chest+dips+proper+form+tutorial"
  },

  // ==========================================
  // BACK EXERCISES
  // ==========================================
  "Deadlift": {
    difficulty: "Advanced",
    equipment: "Barbell",
    muscle: "Back",
    primaryMuscles: ["Erector Spinae", "Glutes", "Hamstrings", "Lats"],
    secondaryMuscles: ["Traps", "Forearms", "Core"],
    starterVolume: "3 sets × 5 reps (prioritize pristine form)",
    setup: [
      "Stand with feet hip-width apart, bar cutting across your mid-foot (1 inch from shins).",
      "Hinge at hips, reach down and grip the bar just outside your knees (double overhand or hook grip).",
      "Bend knees until shins touch the bar, pull your chest up, and pull the 'slack' out of the bar until you hear a click.",
      "Flatten your back completely, lock your lats down into your armpits ('protect your armpits')."
    ],
    execution: [
      "Take a deep diaphragmatic breath and brace your core 360 degrees.",
      "Push the floor away through your heels and mid-foot—do not 'pull' with your lower back.",
      "Once the bar clears your knees, drive hips forward to stand tall. Lock out glutes and hips without hyperextending backward.",
      "Reverse the movement by hinging hips back until bar passes knees, then bend knees to return bar to dead stop on floor."
    ],
    proTips: [
      "The bar must stay in contact with or skim your legs throughout the entire lift.",
      "Reset your setup completely for every single repetition (dead stop, don't touch-and-go as a beginner)."
    ],
    commonMistakes: [
      "Rounding the lower or upper back (spine flexion under heavy load).",
      "Starting with the bar too far in front of shins.",
      "Hyperextending and leaning backward aggressively at the top."
    ],
    alternative: "Romanian Deadlift (Dumbbell) or Trap Bar Deadlift",
    videoQuery: "how+to+deadlift+proper+form+for+beginners"
  },

  "Pull-Ups": {
    difficulty: "Advanced",
    equipment: "Bodyweight",
    muscle: "Back",
    primaryMuscles: ["Latissimus Dorsi (Lats)", "Upper Back"],
    secondaryMuscles: ["Biceps", "Forearms", "Core"],
    starterVolume: "3 sets × 4–8 reps (or max quality reps)",
    setup: [
      "Hang from an overhead pull-up bar with an overhand grip slightly wider than shoulder-width.",
      "Engage your shoulders by pulling shoulder blades down (active dead hang), cross ankles, and brace core."
    ],
    execution: [
      "Drive your elbows down toward your back pockets as you pull your chest up toward the bar.",
      "Lead with your chest, not your chin. Pull until your chin is cleanly over the bar.",
      "Lower under control for 2–3 seconds back to an active hang."
    ],
    proTips: [
      "Think about pulling the bar down to you rather than pulling your body up.",
      "Avoid swinging your legs or kicking (kipping)."
    ],
    commonMistakes: [
      "Half-reps (not coming all the way down or barely clearing forehead).",
      "Craning neck forward to hook chin over the bar."
    ],
    alternative: "Lat Pulldown or Resistance Band-Assisted Pull-Ups",
    videoQuery: "how+to+do+pullups+form+guide"
  },

  "Barbell Rows": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Back",
    primaryMuscles: ["Latissimus Dorsi", "Rhomboids", "Middle & Lower Traps"],
    secondaryMuscles: ["Rear Delts", "Biceps", "Spinal Erectors"],
    starterVolume: "3 sets × 8–10 reps",
    setup: [
      "Stand with feet hip-width, grip the bar slightly outside knees.",
      "Hinge forward at hips until your torso is roughly 45 degrees to the floor (or parallel for Pendlay row).",
      "Keep a flat back, soft knee bend, and let the bar hang below your shoulders."
    ],
    execution: [
      "Pull your elbows back and up, bringing the bar smoothly to your lower ribcage/belly button.",
      "Squeeze shoulder blades together firmly at the top.",
      "Lower under full control back to arm extension without rounding your spine."
    ],
    proTips: [
      "Pull with your elbows, imagining your hands are just hooks.",
      "Maintain the exact same hip angle throughout the set—don't stand up to heave the weight."
    ],
    commonMistakes: [
      "Using torso momentum/jerking to fling the weight up.",
      "Rounding the lumbar spine.",
      "Pulling up to the throat instead of the lower stomach."
    ],
    alternative: "Seated Cable Row or Chest-Supported Dumbbell Row",
    videoQuery: "barbell+bent+over+row+proper+form"
  },

  "Chest-Supported Row": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Back",
    primaryMuscles: ["Rhomboids", "Middle Trapezius", "Lats"],
    secondaryMuscles: ["Rear Delts", "Biceps"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Set an adjustable bench to an incline of 30–45 degrees.",
      "Lie chest-down on the bench, feet on floor, holding dumbbells hanging vertically."
    ],
    execution: [
      "Drive elbows up and back toward your hips.",
      "Pinch your shoulder blades hard at the top without lifting your chest off the bench pad.",
      "Lower under full 2-second control."
    ],
    proTips: [
      "100% spine-safe exercise because the bench supports your bodyweight, preventing lower back fatigue."
    ],
    commonMistakes: [
      "Shrugging shoulders into the neck.",
      "Lifting chest off the pad to heave the weights."
    ],
    alternative: "Seated Cable Row",
    videoQuery: "chest+supported+dumbbell+row+form"
  },

  "Meadows Row": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Back",
    primaryMuscles: ["Latissimus Dorsi", "Teres Major"],
    secondaryMuscles: ["Biceps", "Forearms"],
    starterVolume: "3 sets × 8–10 reps per side",
    setup: [
      "Stand perpendicular to a landmine barbell. Stagger your stance, resting front forearm on front thigh.",
      "Grip the thick collar end of the barbell with an overhand grip."
    ],
    execution: [
      "Pull your elbow up and back behind your torso.",
      "Focus on the lats and teres major, then lower into a deep stretch."
    ],
    proTips: [
      "Using lifting straps allows you to focus purely on the lats rather than grip strength on the thick collar."
    ],
    commonMistakes: [
      "Rotating torso excessively to heave the barbell."
    ],
    alternative: "Single-Arm Dumbbell Row",
    videoQuery: "meadows+row+proper+form+back"
  },

  "Straight-Arm Pulldown": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Back",
    primaryMuscles: ["Latissimus Dorsi (Isolation)"],
    secondaryMuscles: ["Teres Major", "Triceps (Long Head)"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Attach a straight bar or rope to a high cable pulley.",
      "Step back 2 feet, hinge slightly forward at the hips, arms extended overhead with a soft elbow bend."
    ],
    execution: [
      "Without bending your elbows, pull the bar downward in a wide arc until it touches your upper thighs.",
      "Squeeze your lats as hard as possible at the bottom.",
      "Slowly let the bar return upward until you feel a deep lat stretch at eye level."
    ],
    proTips: [
      "Completely takes the biceps out of the equation—pure lat mind-muscle connection."
    ],
    commonMistakes: [
      "Bending elbows into a tricep pushdown.",
      "Rocking torso up and down."
    ],
    alternative: "Dumbbell Pullover",
    videoQuery: "straight+arm+cable+pulldown+form"
  },

  "Pendlay Row": {
    difficulty: "Advanced",
    equipment: "Barbell",
    muscle: "Back",
    primaryMuscles: ["Lats", "Rhomboids", "Mid Traps"],
    secondaryMuscles: ["Spinal Erectors", "Biceps"],
    starterVolume: "3 sets × 6–8 reps",
    setup: [
      "Barbell rests on floor. Hinge at hips until torso is completely parallel to the floor.",
      "Grip bar with overhand grip slightly wider than shoulder-width."
    ],
    execution: [
      "Explosively pull bar up to your lower chest/sternum without standing up.",
      "Return bar completely to dead rest on floor before the next rep."
    ],
    proTips: [
      "Every rep starts from a dead stop on the floor—no bouncing."
    ],
    commonMistakes: [
      "Standing upright to heave the weight."
    ],
    alternative: "Standard Barbell Row",
    videoQuery: "how+to+pendlay+row+form"
  },

  "Neutral-Grip Lat Pulldown": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Back",
    primaryMuscles: ["Latissimus Dorsi"],
    secondaryMuscles: ["Brachialis", "Biceps"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Attach a V-bar or MAG neutral-grip handle to lat pulldown cable.",
      "Sit with thighs snug under pads, lean back 10 degrees."
    ],
    execution: [
      "Drive elbows straight down, pulling handle to upper chest.",
      "Squeeze lats for 1 second, then control weight up."
    ],
    proTips: [
      "Neutral grip (palms facing each other) is gentler on shoulders and wrists than wide-grip."
    ],
    commonMistakes: [
      "Swinging backwards like a rowing boat."
    ],
    alternative: "Wide-Grip Lat Pulldown",
    videoQuery: "neutral+grip+lat+pulldown+form"
  },

  "Hyperextensions": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Back",
    primaryMuscles: ["Erector Spinae (Lower Back)", "Glutes"],
    secondaryMuscles: ["Hamstrings"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Adjust 45-degree hyperextension bench so the top pad sits just below your hip crease.",
      "Hook heels securely under the ankle pads, cross arms over chest."
    ],
    execution: [
      "Hinge forward at the hips, lowering torso toward the floor.",
      "Raise torso back up until aligned straight with legs, squeezing glutes and lower back."
    ],
    proTips: [
      "Do not hyperextend past a straight line—stop when body is in line."
    ],
    commonMistakes: [
      "Arching excessively backward at the top."
    ],
    alternative: "Bird-Dog or Romanian Deadlift",
    videoQuery: "back+hyperextensions+proper+form"
  },

  "Inverted Row": {
    difficulty: "Beginner",
    equipment: "Bodyweight",
    muscle: "Back",
    primaryMuscles: ["Rhomboids", "Middle Traps", "Lats"],
    secondaryMuscles: ["Biceps", "Core"],
    starterVolume: "3 sets × 8–12 reps",
    setup: [
      "Set a Smith machine bar or barbell in rack at hip height.",
      "Lie underneath and grip bar with overhand grip wider than shoulders.",
      "Extend body straight with heels on floor (like an inverted plank)."
    ],
    execution: [
      "Pull chest up to touch the bar, keeping body completely rigid.",
      "Lower smoothly to full arm hang."
    ],
    proTips: [
      "Bend knees with feet flat on floor to make it easier for beginners."
    ],
    commonMistakes: [
      "Sagging hips."
    ],
    alternative: "Seated Cable Row",
    videoQuery: "inverted+row+proper+form"
  },

  "Cable Rows": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Back",
    primaryMuscles: ["Rhomboids", "Middle Trapezius", "Lats"],
    secondaryMuscles: ["Biceps", "Forearms"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Sit on the cable row bench with feet flat on footrests, knees slightly bent.",
      "Grab the V-bar attachment, slide back, and sit upright with a tall chest."
    ],
    execution: [
      "With chest tall and shoulders retracted, pull the handle toward your lower stomach.",
      "Drive elbows straight back and squeeze your shoulder blades together for 1 second.",
      "Release slowly, allowing arms to extend and upper back to get a mild stretch without leaning excessively forward."
    ],
    proTips: [
      "Keep your shoulders depressed (down and away from your ears) during the pull."
    ],
    commonMistakes: [
      "Leaning back like a pendulum to use bodyweight.",
      "Shrugging shoulders into ears at the top of the contraction."
    ],
    alternative: "Single-Arm Dumbbell Row",
    videoQuery: "seated+cable+row+form+tutorial"
  },

  "Lat Pulldown": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Back",
    primaryMuscles: ["Latissimus Dorsi (Lats)"],
    secondaryMuscles: ["Biceps", "Rear Deltoids", "Brachialis"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Adjust thigh pad so your legs are snug and anchored.",
      "Grip the wide bar slightly wider than shoulder-width with an overhand grip.",
      "Sit down, lean back slightly (10–15 degrees), and lift your sternum."
    ],
    execution: [
      "Drive your elbows down and back, pulling the bar to your upper chest / collarbone.",
      "Squeeze your lats tightly at the bottom for 1 second.",
      "Control the bar on the way up until your arms are fully extended and lats are stretched."
    ],
    proTips: [
      "Never pull the bar behind your neck (this stresses the cervical spine and rotator cuff).",
      "Think about pulling your elbows into your back pockets."
    ],
    commonMistakes: [
      "Swinging back aggressively to rock the weight down.",
      "Pulling too low onto the stomach with bent wrists."
    ],
    alternative: "Resistance Band Pulldown or Inverted Row",
    videoQuery: "lat+pulldown+form+mistakes"
  },

  "T-Bar Row": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Back",
    primaryMuscles: ["Middle Traps", "Rhomboids", "Lats"],
    secondaryMuscles: ["Lower Back", "Biceps"],
    starterVolume: "3 sets × 8–12 reps",
    setup: [
      "Straddle the T-bar apparatus, bend at hips with knees bent and back straight at a 45-degree angle.",
      "Grip the close or neutral handles firmly."
    ],
    execution: [
      "Pull the handle toward your upper abdomen / sternum.",
      "Keep elbows close to your sides and squeeze your mid-back at the peak.",
      "Lower under control without allowing your lower back to round."
    ],
    proTips: [
      "Use smaller diameter plates (e.g., 25lb/10kg plates) for a deeper range of motion before plates hit your chest."
    ],
    commonMistakes: [
      "Standing up too upright and turning it into an awkward shrug.",
      "Jerking with the lower back."
    ],
    alternative: "Chest-Supported Machine Row",
    videoQuery: "t+bar+row+form+and+technique"
  },

  "Face Pulls": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Back",
    primaryMuscles: ["Rear Deltoids", "External Rotators (Infraspinatus, Teres Minor)", "Rhomboids"],
    secondaryMuscles: ["Upper Trapezius"],
    starterVolume: "3 sets × 15–20 reps (focus on high quality burn)",
    setup: [
      "Attach a double-rope to a cable pulley at eye or forehead height.",
      "Grip the ropes with thumbs facing toward you (thumbs pointing back). Step back into a solid stance."
    ],
    execution: [
      "Pull the center of the rope directly toward your bridge of nose / eyes.",
      "As you pull, externally rotate your shoulders so your hands end up next to your ears like a double bicep pose.",
      "Hold the contraction for 1–2 seconds, then smoothly return."
    ],
    proTips: [
      "This is a shoulder health and posture exercise—leave your ego at the door and use light weight with perfect external rotation."
    ],
    commonMistakes: [
      "Treating it like a row by pulling to the chest without rotating hands up.",
      "Leaning back and throwing your body weight."
    ],
    alternative: "Band Pull-Aparts or Rear Delt Dumbbell Flyes",
    videoQuery: "how+to+proper+face+pull+form"
  },

  // ==========================================
  // ARMS EXERCISES
  // ==========================================
  "Spider Curl": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Arms",
    primaryMuscles: ["Biceps Brachii (Short Head & Peak Isolation)"],
    secondaryMuscles: ["Brachialis", "Forearms"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Set an adjustable incline bench to roughly 45 degrees.",
      "Lie chest-down (prone) on the bench with your upper chest resting comfortably slightly over the top pad.",
      "Plant your toes firmly on the floor for balance and let your arms hang vertically straight down toward the floor.",
      "Hold dumbbells or an EZ-curl bar with an underhand grip."
    ],
    execution: [
      "Keep your upper arms locked perpendicular to the floor—do not let your elbows drift forward or backward.",
      "Inhale, then exhale as you curl the weight smoothly upward toward your chin/forehead.",
      "Hold the peak contraction at the top for 1 full second, squeezing your bicep peak as hard as possible.",
      "Lower the weight slowly under strict 2-3 second control until your arms are fully vertical again."
    ],
    proTips: [
      "Because your chest is supported, all body swinging and shoulder momentum is 100% eliminated.",
      "Use lighter weights than regular standing curls—strict form is what triggers intense growth here.",
      "Think about pulling your pinkies up toward your shoulders at the peak for extra peak activation."
    ],
    commonMistakes: [
      "Pulling elbows backward toward ribs (turning the curl into a rowing motion).",
      "Lifting chest or kicking legs off the floor to generate momentum.",
      "Dropping the weights down rapidly without controlling the eccentric descent."
    ],
    alternative: "Preacher Curl or Incline Dumbbell Curl",
    videoQuery: "spider+curl+proper+form+biceps"
  },

  "Incline Dumbbell Curl": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Arms",
    primaryMuscles: ["Biceps Brachii (Long Head - Deep Stretch)"],
    secondaryMuscles: ["Brachialis", "Forearms"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Set an incline bench to 45–60 degrees.",
      "Sit back with your head and shoulders flat against the back pad, letting dumbbells hang straight down at your sides."
    ],
    execution: [
      "With elbows pinned behind the plane of your torso, curl the dumbbells upward.",
      "Rotate wrists outward (supinate) as you curl, bringing pinkies high.",
      "Lower slowly for 3 seconds into the deep stretch at the bottom before initiating the next rep."
    ],
    proTips: [
      "The incline places the long head of the bicep into extreme passive stretch, stimulating maximum hypertrophy."
    ],
    commonMistakes: [
      "Swinging elbows forward to assist the lift.",
      "Lifting head off the bench pad."
    ],
    alternative: "Bayesian Cable Curl or Spider Curl",
    videoQuery: "incline+dumbbell+bicep+curl+form"
  },

  "Bayesian Cable Curl": {
    difficulty: "Intermediate",
    equipment: "Cable",
    muscle: "Arms",
    primaryMuscles: ["Biceps Brachii (Long Head)"],
    secondaryMuscles: ["Forearms"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Set a cable pulley to the lowest notch with a single D-handle.",
      "Face away from the machine, hold handle in one hand, step forward into a lunge until cable is under tension behind your hip."
    ],
    execution: [
      "Keeping upper arm fixed behind your torso line, curl handle forward and up toward shoulder.",
      "Squeeze bicep tightly at peak, then lower under constant cable stretch."
    ],
    proTips: [
      "Provides unmatched tension curve at the stretched position where dumbbells have zero tension."
    ],
    commonMistakes: [
      "Leaning forward or swinging the torso."
    ],
    alternative: "Incline Dumbbell Curl",
    videoQuery: "bayesian+cable+curl+form"
  },

  "21s (Bicep Curl)": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Arms",
    primaryMuscles: ["Biceps Brachii (Metabolic Burnout)"],
    secondaryMuscles: ["Brachialis", "Forearms"],
    starterVolume: "2–3 sets × 21 total reps (finisher)",
    setup: [
      "Stand tall holding an EZ-bar or barbell with shoulder-width underhand grip.",
      "Lock elbows by your ribs."
    ],
    execution: [
      "1. Perform 7 reps from bottom to halfway up (forearms parallel to floor).",
      "2. Immediately perform 7 reps from halfway up to the top chest level.",
      "3. Immediately perform 7 full range reps from bottom all the way to top without resting."
    ],
    proTips: [
      "Use about 50-60% of your regular curling weight—the burn is intense by rep 15."
    ],
    commonMistakes: [
      "Swinging back on the final 7 full reps."
    ],
    alternative: "Drop-Set Dumbbell Curls",
    videoQuery: "how+to+do+21s+bicep+curls"
  },

  "Close-Grip Bench Press": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Arms",
    primaryMuscles: ["Triceps Brachii"],
    secondaryMuscles: ["Chest", "Front Delts"],
    starterVolume: "3 sets × 8–10 reps",
    setup: [
      "Lie on flat bench. Grip the bar with hands shoulder-width apart (roughly 12–14 inches between hands).",
      "Never grip with hands touching, as this severely strains the wrists."
    ],
    execution: [
      "Lower the bar under control to your lower chest, keeping your elbows tucked tightly against your ribs.",
      "Drive through your triceps to press the bar up to lockout."
    ],
    proTips: [
      "Tucking elbows against your sides shifts nearly all the mechanical load directly onto the triceps."
    ],
    commonMistakes: [
      "Gripping too narrow (less than 8 inches), causing wrist sprain.",
      "Flaring elbows wide out to the sides."
    ],
    alternative: "Tricep Pushdown or Skull Crushers",
    videoQuery: "close+grip+bench+press+proper+form"
  },

  "JM Press": {
    difficulty: "Advanced",
    equipment: "Barbell",
    muscle: "Arms",
    primaryMuscles: ["Triceps Brachii (Lateral & Medial Heads)"],
    secondaryMuscles: ["Forearms"],
    starterVolume: "3 sets × 8–10 reps",
    setup: [
      "Lie on flat bench holding barbell with shoulder-width grip directly over upper chest."
    ],
    execution: [
      "A hybrid between a close-grip bench and a skull crusher.",
      "Lower the bar toward your chin/upper throat by letting elbows bend forward while forearms hinge back.",
      "Press the bar back up explosively using triceps."
    ],
    proTips: [
      "Popularized by powerlifter JM Blakley for huge tricep strength."
    ],
    commonMistakes: [
      "Dropping bar too quickly toward the neck."
    ],
    alternative: "Skull Crushers",
    videoQuery: "jm+press+form+tutorial"
  },

  "Dumbbell Kickback": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Arms",
    primaryMuscles: ["Triceps Brachii (Short Head)"],
    secondaryMuscles: ["Rear Delts"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Place one knee and hand on a flat bench, other foot on floor, torso parallel to ground.",
      "Hold dumbbell in free hand, pull elbow up high alongside your torso so upper arm is parallel to floor."
    ],
    execution: [
      "Keeping upper arm pinned in place, extend your forearm straight back until arm is fully straight.",
      "Squeeze tricep for 1 second, then lower back to 90 degrees."
    ],
    proTips: [
      "Only the forearm moves—the upper arm stays locked like a statue."
    ],
    commonMistakes: [
      "Swinging dumbbell forward and backward using shoulder momentum."
    ],
    alternative: "Cable Tricep Kickback or Tricep Pushdown",
    videoQuery: "dumbbell+tricep+kickbacks+form"
  },

  "Overhead Cable Tricep Extension": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Arms",
    primaryMuscles: ["Triceps Brachii (Long Head)"],
    secondaryMuscles: [],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Attach a rope to a cable pulley set at chest or waist height.",
      "Face away from the machine, hold rope behind your head, step forward into a staggered stance."
    ],
    execution: [
      "Extend your forearms forward and overhead, spreading rope ends apart at peak lockout.",
      "Slowly let forearms bend back behind head to feel a deep tricep stretch."
    ],
    proTips: [
      "Spreading the rope ends at full extension maximally engages all three tricep heads."
    ],
    commonMistakes: [
      "Flaring elbows wide.",
      "Arching lower back."
    ],
    alternative: "Skull Crushers or Overhead Dumbbell Extension",
    videoQuery: "overhead+cable+tricep+extension+rope"
  },

  "Barbell Curl": {
    difficulty: "Beginner",
    equipment: "Barbell",
    muscle: "Arms",
    primaryMuscles: ["Biceps Brachii"],
    secondaryMuscles: ["Brachialis", "Forearms"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Stand tall, feet shoulder-width, gripping a barbell with an underhand grip shoulder-width apart.",
      "Pin your elbows to your sides and pull shoulders down and back."
    ],
    execution: [
      "Curl the bar up toward shoulders while keeping elbows fixed in place.",
      "Squeeze biceps hard at the peak for a full second.",
      "Lower the bar under strict control (2–3 seconds) until arms are fully extended."
    ],
    proTips: [
      "Use an EZ-bar if a straight barbell causes wrist or forearm discomfort."
    ],
    commonMistakes: [
      "Swinging your hips and torso backwards to fling the bar up.",
      "Drifting elbows forward past the ribs, taking tension off biceps."
    ],
    alternative: "Dumbbell Bicep Curl or Cable Curl",
    videoQuery: "barbell+bicep+curl+form"
  },

  "Hammer Curl": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Arms",
    primaryMuscles: ["Brachialis", "Brachioradialis (Forearms)"],
    secondaryMuscles: ["Biceps Brachii"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Stand or sit holding dumbbells at your sides with palms facing inward toward each other (neutral grip)."
    ],
    execution: [
      "With elbows glued by your ribs, curl dumbbells up toward shoulder level.",
      "Maintain the neutral palm-in grip throughout the entire arc.",
      "Pause and lower under full control."
    ],
    proTips: [
      "Great exercise to build arm thickness and forearm grip strength."
    ],
    commonMistakes: [
      "Flaring elbows out.",
      "Using torso momentum."
    ],
    alternative: "Rope Cable Hammer Curl",
    videoQuery: "hammer+curl+form+mistakes"
  },

  "Tricep Pushdown": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Arms",
    primaryMuscles: ["Triceps Brachii (Lateral & Medial Heads)"],
    secondaryMuscles: ["Forearms"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Attach a rope or straight/V-bar to a high pulley.",
      "Stand close, lean forward slightly from the hips, pin elbows against your ribcage."
    ],
    execution: [
      "Push the attachment down until elbows are fully extended.",
      "If using a rope, spread the ends outward at the bottom for maximum tricep peak contraction.",
      "Allow elbows to bend back up to approx 90 degrees while keeping upper arms fixed."
    ],
    proTips: [
      "The upper arms must remain like statues glued to your sides—only your forearms move."
    ],
    commonMistakes: [
      "Letting elbows flare forward and back, turning it into a chest press.",
      "Hunching shoulders over the bar."
    ],
    alternative: "Resistance Band Pushdown or Diamond Push-Ups",
    videoQuery: "tricep+pushdown+proper+form"
  },

  "Skull Crushers": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Arms",
    primaryMuscles: ["Triceps Brachii (Long Head)"],
    secondaryMuscles: ["Forearms"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Lie on a flat bench holding an EZ-curl bar above your chest with arms extended.",
      "Tilt arms slightly backward (toward your head) at a 10–15° angle to keep constant tension on triceps."
    ],
    execution: [
      "Bending only at the elbows, lower the bar smoothly toward your forehead or crown of head.",
      "Keep elbows tucked shoulder-width apart—do not let them flare wide.",
      "Extend forearms back to starting locked position."
    ],
    proTips: [
      "Lowering the bar slightly behind the head instead of directly to forehead relieves elbow stress and increases tricep stretch."
    ],
    commonMistakes: [
      "Letting elbows flare outward like chicken wings.",
      "Moving upper arms back and forth like a pullover."
    ],
    alternative: "Dumbbell Overhead Tricep Extension",
    videoQuery: "how+to+do+skull+crushers+without+elbow+pain"
  },

  "Preacher Curl": {
    difficulty: "Beginner",
    equipment: "Barbell",
    muscle: "Arms",
    primaryMuscles: ["Biceps Brachii (Short Head)"],
    secondaryMuscles: ["Brachialis"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Sit at a preacher bench with chest against pad and triceps resting flush on the angled surface.",
      "Grab an EZ-bar with shoulder-width underhand grip."
    ],
    execution: [
      "Curl the bar upward smoothly until forearms are near vertical.",
      "Squeeze biceps, then lower slowly until arms are almost fully extended (leave a 5° safety bend)."
    ],
    proTips: [
      "Do not violently hyperextend your elbows at the bottom under heavy weight."
    ],
    commonMistakes: [
      "Hyperextending and locking out elbows with heavy loads.",
      "Lifting chest and body off the bench to assist."
    ],
    alternative: "Spider Curl or Incline Dumbbell Curl",
    videoQuery: "preacher+curl+proper+form"
  },

  "Overhead Tricep Extension": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Arms",
    primaryMuscles: ["Triceps Brachii (Long Head)"],
    secondaryMuscles: [],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Sit upright or stand, holding one dumbbell vertically with both hands cupping the top plate overhead."
    ],
    execution: [
      "Keeping upper arms vertical by your ears, lower the dumbbell behind your head by bending elbows.",
      "Feel the deep stretch in your triceps, then press back overhead."
    ],
    proTips: [
      "Keep your core braced so your lower back does not arch."
    ],
    commonMistakes: [
      "Flaring elbows wide out to the sides.",
      "Arching the spine."
    ],
    alternative: "Cable Overhead Rope Extension",
    videoQuery: "overhead+dumbbell+tricep+extension+form"
  },

  "Concentration Curl": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Arms",
    primaryMuscles: ["Biceps Brachii (Peak Hypertrophy)"],
    secondaryMuscles: ["Forearms"],
    starterVolume: "3 sets × 12 reps per arm",
    setup: [
      "Sit on a bench with legs open. Rest the back of your working tricep against your inner thigh."
    ],
    execution: [
      "Curl the dumbbell upward toward your face.",
      "Squeeze at the peak without moving your supporting leg.",
      "Lower under full control."
    ],
    proTips: [
      "Eliminates all momentum, isolating the bicep completely."
    ],
    commonMistakes: [
      "Rocking the upper body to swing weight up.",
      "Resting elbow on top of the thigh instead of inside."
    ],
    alternative: "Spider Curl or Single-Arm Cable Curl",
    videoQuery: "concentration+curls+proper+form"
  },

  // ==========================================
  // LEGS EXERCISES
  // ==========================================
  "Squat": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Legs",
    primaryMuscles: ["Quadriceps", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Adductors", "Core / Calves"],
    starterVolume: "3 sets × 8–10 reps",
    setup: [
      "Step under the barbell, resting it across your upper traps (high bar) or rear delts (low bar).",
      "Unrack with both feet under you, take 2–3 calculated steps back.",
      "Set feet slightly wider than shoulder-width with toes angled out 15–30 degrees.",
      "Take a deep breath into your belly and brace your abs tight like taking a punch."
    ],
    execution: [
      "Initiate by hinging hips back and bending knees simultaneously.",
      "Drive knees out in line with your toes as you descend.",
      "Descend until hip crease is at least parallel with the top of your knees (or lower if mobility allows).",
      "Keep your chest proud and drive up through the whole foot (mid-foot balance) to full standing position."
    ],
    proTips: [
      "Keep three points of contact on your foot: big toe, pinky toe, and heel (tripod foot).",
      "Do not look up at the ceiling or down at toes; keep neck neutral aligned with spine."
    ],
    commonMistakes: [
      "Knees caving inward (valgus collapse) on the way up.",
      "Heels lifting off the ground (weight shifting onto toes).",
      "Rounding the lower back ('butt wink' under extreme depth)."
    ],
    alternative: "Goblet Squat (Dumbbell) or Leg Press",
    videoQuery: "how+to+squat+proper+form+for+beginners"
  },

  "Bulgarian Split Squat": {
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    muscle: "Legs",
    primaryMuscles: ["Quadriceps", "Gluteus Maximus"],
    secondaryMuscles: ["Hamstrings", "Calves", "Core"],
    starterVolume: "3 sets × 8–10 reps per leg",
    setup: [
      "Stand 2–3 feet in front of a bench holding dumbbells at your sides.",
      "Place the top of your rear foot laces-down onto the bench behind you.",
      "Torso can be upright (more quads) or leaned forward roughly 15 degrees (more glutes)."
    ],
    execution: [
      "Lower your hips straight down until your front thigh is parallel to the floor.",
      "Your back knee should descend until hovering 1–2 inches off the floor.",
      "Drive firmly through your front heel and mid-foot to stand back up."
    ],
    proTips: [
      "85% of your weight stays on the front leg; the rear leg is purely for balance.",
      "If knee hurts, take a slightly longer forward step to keep tibia more vertical."
    ],
    commonMistakes: [
      "Front foot too close to the bench, jamming the front knee.",
      "Pushing off the back foot."
    ],
    alternative: "Reverse Lunges or Split Squats (both feet on floor)",
    videoQuery: "bulgarian+split+squat+form+guide"
  },

  "Hip Thrust": {
    difficulty: "Beginner",
    equipment: "Barbell",
    muscle: "Legs",
    primaryMuscles: ["Gluteus Maximus"],
    secondaryMuscles: ["Hamstrings", "Adductors", "Core"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Sit on the floor with your upper back (shoulder blade line) resting against a sturdy bench.",
      "Roll a barbell with a barbell pad directly over your hips.",
      "Bend knees with feet planted flat on the floor shoulder-width apart, shins vertical at top of lift."
    ],
    execution: [
      "Drive hard through your heels, extending your hips upward until torso and thighs form a straight line.",
      "Squeeze glutes hard at the top for 2 full seconds while keeping chin tucked forward toward your chest.",
      "Lower hips smoothly back toward the floor."
    ],
    proTips: [
      "Keep your ribs down and pelvis tucked in posterior pelvic tilt—do not arch your lower back.",
      "Look forward at the wall in front of you throughout the rep, not up at the ceiling."
    ],
    commonMistakes: [
      "Arching lower back to push higher instead of using glutes.",
      "Placing feet too far out (strains hamstrings) or too close (strains knees)."
    ],
    alternative: "Dumbbell Glute Bridge or Romanian Deadlift",
    videoQuery: "barbell+hip+thrust+proper+form"
  },

  "Hack Squat": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Legs",
    primaryMuscles: ["Quadriceps (Vastus Lateralis & Medialis)"],
    secondaryMuscles: ["Glutes"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Step onto the machine with back and head resting against the pad, shoulders under shoulder pads.",
      "Place feet shoulder-width apart in middle of footplate."
    ],
    execution: [
      "Release safety handles and lower smoothly until knees bend to 90 degrees or deeper.",
      "Drive through whole foot to return to top, leaving a soft bend in knees (never lock knees out violently)."
    ],
    proTips: [
      "Allows extreme quad overload without taxing your spinal erectors."
    ],
    commonMistakes: [
      "Violently hyperextending knees at top.",
      "Lifting lower back off the pad."
    ],
    alternative: "Leg Press or Goblet Squat",
    videoQuery: "hack+squat+machine+proper+form"
  },

  "Goblet Squat": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Legs",
    primaryMuscles: ["Quadriceps", "Glutes", "Core"],
    secondaryMuscles: ["Hamstrings", "Calves"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Stand holding a dumbbell or kettlebell vertically against your chest with both hands under the top bell.",
      "Feet shoulder-width, toes turned out 15 degrees."
    ],
    execution: [
      "Squat down by pushing hips back and knees out, tracking elbows inside knees.",
      "Reach parallel or deeper with an upright chest, then stand."
    ],
    proTips: [
      "The best squat teacher for beginners because front weight naturally balances your spine."
    ],
    commonMistakes: [
      "Letting elbows drift away from chest.",
      "Heels lifting."
    ],
    alternative: "Bodyweight Squat",
    videoQuery: "goblet+squat+proper+form"
  },

  "Front Squat": {
    difficulty: "Advanced",
    equipment: "Barbell",
    muscle: "Legs",
    primaryMuscles: ["Quadriceps", "Upper Back / Core"],
    secondaryMuscles: ["Glutes"],
    starterVolume: "3 sets × 6–8 reps",
    setup: [
      "Rest barbell across front shoulders/collarbone.",
      "Use fingertips clean grip with elbows pointing high forward or cross-arm grip."
    ],
    execution: [
      "Squat straight down with a completely vertical torso.",
      "Keep elbows up high throughout the entire rep to keep bar from slipping."
    ],
    proTips: [
      "Requires thoracic extension; keep elbows high at all costs."
    ],
    commonMistakes: [
      "Dropping elbows, which dumps the barbell forward."
    ],
    alternative: "Goblet Squats or Hack Squats",
    videoQuery: "how+to+front+squat+proper+form"
  },

  "Sissy Squat": {
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    muscle: "Legs",
    primaryMuscles: ["Quadriceps (Rectus Femoris)"],
    secondaryMuscles: ["Core"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Hold onto a post for balance or step into a sissy squat bench.",
      "Stand on balls of feet, body rigid."
    ],
    execution: [
      "Lean torso back in a straight line with thighs while pushing knees forward and down.",
      "Feel the intense stretch in quads, then drive back to standing."
    ],
    proTips: [
      "Isolates the rectus femoris muscle like no other quad movement."
    ],
    commonMistakes: [
      "Bending at hips (must stay straight from knees to shoulders)."
    ],
    alternative: "Leg Extension",
    videoQuery: "how+to+sissy+squat+quads"
  },

  "Standing Calf Raise": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Legs",
    primaryMuscles: ["Gastrocnemius (Calves)"],
    secondaryMuscles: ["Soleus"],
    starterVolume: "3–4 sets × 12–15 reps",
    setup: [
      "Place balls of feet on step block with heels hanging off.",
      "Keep knees straight with a soft unlocked joint."
    ],
    execution: [
      "Lower heels into a deep, full stretch and pause for 2 seconds.",
      "Explode high onto the balls of your big toes, pause at peak squeeze for 1 second."
    ],
    proTips: [
      "The 2-second pause at the bottom is essential to eliminate Achilles tendon spring bounce."
    ],
    commonMistakes: [
      "Bouncing quickly with zero muscle control."
    ],
    alternative: "Seated Calf Raise",
    videoQuery: "standing+calf+raise+form"
  },

  "Adductor Machine": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Legs",
    primaryMuscles: ["Hip Adductors (Inner Thighs)"],
    secondaryMuscles: ["Pelvic Stabilizers"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Sit back in machine with pads resting against your inner knees.",
      "Open legs to a comfortable stretch."
    ],
    execution: [
      "Squeeze your knees together smoothly until pads touch.",
      "Hold the squeeze for 1 second, then control back slowly."
    ],
    proTips: [
      "Strengthens groin and improves squat hip stability."
    ],
    commonMistakes: [
      "Letting weights slam at the wide stretch."
    ],
    alternative: "Sumo Squat",
    videoQuery: "hip+adductor+machine+form"
  },

  "Abductor Machine": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Legs",
    primaryMuscles: ["Gluteus Medius & Minimus (Outer Hips)"],
    secondaryMuscles: ["Tensor Fasciae Latae"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Sit back in machine with pads resting against your outer knees.",
      "Start with legs closed together."
    ],
    execution: [
      "Push your knees outward as wide as possible against the resistance.",
      "Pause for 1 second at peak spread, then return slowly."
    ],
    proTips: [
      "Leaning forward slightly shifts more emphasis directly to upper glutes."
    ],
    commonMistakes: [
      "Using jerky speed."
    ],
    alternative: "Cable Glute Kickbacks or Lateral Band Walks",
    videoQuery: "hip+abductor+machine+glutes"
  },

  "Leg Press": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Legs",
    primaryMuscles: ["Quadriceps", "Glutes"],
    secondaryMuscles: ["Hamstrings"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Sit fully back into the seat with your tailbone and lower back glued to the back pad.",
      "Place feet shoulder-width apart on the sled platform in the middle."
    ],
    execution: [
      "Release safety handles and lower the sled smoothly until knees bend to approx 90 degrees.",
      "Press the sled back up pushing through your entire foot.",
      "IMPORTANT: Never lock your knees out violently at the top—keep a micro-bend to protect the knee joint."
    ],
    proTips: [
      "Higher foot placement targets more glutes/hamstrings; lower placement shifts emphasis to quads."
    ],
    commonMistakes: [
      "Locking knees out fully and hyperextending under heavy weight.",
      "Letting the lower back/butt peel off the pad at deep depth."
    ],
    alternative: "Goblet Squats or Hack Squats",
    videoQuery: "leg+press+mistakes+and+form"
  },

  "Romanian Deadlift": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Legs",
    primaryMuscles: ["Hamstrings", "Gluteus Maximus"],
    secondaryMuscles: ["Erector Spinae", "Forearms"],
    starterVolume: "3 sets × 8–10 reps",
    setup: [
      "Stand holding barbell at hip level with hands shoulder-width.",
      "Feet hip-width apart, knees unlocked with a slight 10–15° bend.",
      "Retract shoulder blades and keep chest upright."
    ],
    execution: [
      "Push your hips straight back toward the wall behind you (hip hinge).",
      "Keep the bar gliding against your thighs and shins as you descend.",
      "Lower only until you feel a strong stretch in your hamstrings (usually mid-shin level).",
      "Drive hips forward and squeeze glutes hard to return to standing."
    ],
    proTips: [
      "Think about shutting a car door with your butt.",
      "The knee bend never changes during the rep—all movement comes from the hip joint."
    ],
    commonMistakes: [
      "Bending knees more and turning it into a regular squat.",
      "Rounding lower back trying to reach the floor with the bar."
    ],
    alternative: "Dumbbell Romanian Deadlift or Seated Leg Curl",
    videoQuery: "how+to+romanian+deadlift+proper+form"
  },

  "Leg Curl": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Legs",
    primaryMuscles: ["Hamstrings"],
    secondaryMuscles: ["Calves (Gastrocnemius)"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Adjust the machine so the circular pad rests just above your heels / Achilles tendon.",
      "Align your knee joint with the machine's pivot point."
    ],
    execution: [
      "Curl your heels in toward your glutes smoothly.",
      "Hold the peak contraction for 1 second.",
      "Lower slowly for 2–3 seconds back to near full stretch."
    ],
    proTips: [
      "Keep toes pointed upward (dorsiflexed) to maximize hamstring recruitment over calves."
    ],
    commonMistakes: [
      "Lifting hips off the bench on lying leg curl machine.",
      "Using swinging momentum."
    ],
    alternative: "Nordic Hamstring Curl or Swiss Ball Hamstring Curl",
    videoQuery: "lying+leg+curl+proper+form"
  },

  "Leg Extension": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Legs",
    primaryMuscles: ["Quadriceps (All 4 heads)"],
    secondaryMuscles: [],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Sit back firmly into seat. Position the shin pad against lower shins just above ankles.",
      "Align knees with the machine's circular pivot point."
    ],
    execution: [
      "Extend your legs smoothly until knees are nearly straight.",
      "Squeeze your quads tightly for 1 second at the top.",
      "Control the descent slowly (do not let the weight stack slam)."
    ],
    proTips: [
      "Hold onto the side handles firmly to keep your butt pinned into the seat throughout."
    ],
    commonMistakes: [
      "Kicking the weight up with jerky speed.",
      "Letting weights slam at the bottom between reps."
    ],
    alternative: "Goblet Squats or Sissy Squats",
    videoQuery: "leg+extension+form+quads"
  },

  "Lunges": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Legs",
    primaryMuscles: ["Quadriceps", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Calves", "Core"],
    starterVolume: "3 sets × 10 reps per leg",
    setup: [
      "Stand tall holding dumbbells at your sides or bodyweight.",
      "Brace core and keep eyes looking forward."
    ],
    execution: [
      "Take a comfortable stride forward (or backward for reverse lunges).",
      "Lower your back knee smoothly toward the floor until both knees are bent at approx 90 degrees.",
      "Push off the front heel to step back to starting position."
    ],
    proTips: [
      "Reverse lunges are generally friendlier on beginner knees than forward lunges."
    ],
    commonMistakes: [
      "Front knee collapsing inward.",
      "Taking too short a step, driving front knee too far forward and lifting front heel."
    ],
    alternative: "Split Squat (stationary feet) or Reverse Lunge",
    videoQuery: "how+to+do+lunges+proper+form"
  },

  "Calf Raises": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Legs",
    primaryMuscles: ["Gastrocnemius", "Soleus (Calves)"],
    secondaryMuscles: [],
    starterVolume: "3–4 sets × 12–15 reps",
    setup: [
      "Place balls of feet on edge of raised block/step, heels hanging off.",
      "Hold support for balance if doing single-leg or standing on machine."
    ],
    execution: [
      "Lower heels down into a deep, full calf stretch for 1 second.",
      "Drive high onto the balls of your big toes, squeezing calves hard at peak.",
      "Pause for 1 second at the top before descending."
    ],
    proTips: [
      "Bouncing fast eliminates calf activation (the Achilles tendon does the work). Always pause at the bottom and top."
    ],
    commonMistakes: [
      "Bouncing quickly like a pogo stick.",
      "Incomplete range of motion."
    ],
    alternative: "Seated Calf Raise or Dumbbell Single-Leg Calf Raise",
    videoQuery: "standing+calf+raises+proper+form"
  },

  // ==========================================
  // SHOULDERS EXERCISES
  // ==========================================
  "Overhead Press": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Shoulders",
    primaryMuscles: ["Anterior & Lateral Deltoids"],
    secondaryMuscles: ["Triceps", "Upper Chest", "Core", "Trapezius"],
    starterVolume: "3 sets × 6–8 reps",
    setup: [
      "Set bar at collarbone height. Grip bar just outside shoulder-width with forearms vertical.",
      "Rest the bar across front delts/upper chest, step back with feet hip-width, squeeze glutes, and brace abs."
    ],
    execution: [
      "Pull your chin back slightly so the bar clears your face.",
      "Press the bar straight up in a vertical line overhead.",
      "Once bar passes your forehead, push your head forward back to neutral ('peek through the window').",
      "Lock out bar directly over the crown of your head and shoulders, then lower with control."
    ],
    proTips: [
      "Tight glutes and braced core prevent hyperextending your lumbar spine.",
      "Keep wrists stacked directly over forearms."
    ],
    commonMistakes: [
      "Excessive lower back arching (leaning back to turn it into an incline press).",
      "Pressing the bar forward around the head instead of moving the head out of the way."
    ],
    alternative: "Seated Dumbbell Shoulder Press",
    videoQuery: "how+to+overhead+press+proper+form"
  },

  "Dumbbell Shoulder Press": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Shoulders",
    primaryMuscles: ["Anterior Deltoid", "Lateral Deltoid"],
    secondaryMuscles: ["Triceps", "Upper Traps"],
    starterVolume: "3 sets × 8–12 reps",
    setup: [
      "Sit on an upright bench. Kick dumbbells up to shoulder level.",
      "Hold dumbbells at ear height with elbows tucked slightly forward (approx 60°, not wide open at 90°)."
    ],
    execution: [
      "Press dumbbells smoothly overhead in a slight inward arc.",
      "Stop just short of clanking at the top, then lower under 2-second control."
    ],
    proTips: [
      "Tucking elbows slightly into the scapular plane protects rotator cuff tendons."
    ],
    commonMistakes: [
      "Flaring elbows wide open.",
      "Arching lower back off the pad."
    ],
    alternative: "Machine Shoulder Press or Overhead Press",
    videoQuery: "seated+dumbbell+shoulder+press+form"
  },

  "Machine Shoulder Press": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Shoulders",
    primaryMuscles: ["Anterior Deltoid", "Triceps"],
    secondaryMuscles: ["Lateral Deltoid"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Adjust seat so handles start level with your ears.",
      "Back flat against pad, feet planted."
    ],
    execution: [
      "Press handles overhead without violently locking elbows.",
      "Lower slowly until hands reach ear level."
    ],
    proTips: [
      "Safe and locked-in pressing path, perfect for beginners building pressing strength."
    ],
    commonMistakes: [
      "Seat too low, forcing shoulders into awkward extreme external rotation."
    ],
    alternative: "Dumbbell Shoulder Press",
    videoQuery: "machine+shoulder+press+form"
  },

  "Cable Lateral Raise": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Shoulders",
    primaryMuscles: ["Lateral Deltoid (Side Shoulder Cap)"],
    secondaryMuscles: ["Supraspinatus"],
    starterVolume: "3–4 sets × 12–15 reps",
    setup: [
      "Set cable pulley to wrist or hip height with single handle.",
      "Stand sideways to pulley, grab handle with far hand across your body or behind your back."
    ],
    execution: [
      "Raise arm out and up in a smooth arc to shoulder height.",
      "Pause for 1 second at top, lower slowly under continuous cable tension."
    ],
    proTips: [
      "Cables provide constant resistance through the bottom range where dumbbells have zero tension."
    ],
    commonMistakes: [
      "Shrugging neck up to ears.",
      "Leaning away with body."
    ],
    alternative: "Dumbbell Lateral Raise",
    videoQuery: "cable+lateral+raise+form+tutorial"
  },

  "Reverse Pec Deck": {
    difficulty: "Beginner",
    equipment: "Machine",
    muscle: "Shoulders",
    primaryMuscles: ["Posterior Deltoid (Rear Shoulder)"],
    secondaryMuscles: ["Rhomboids", "Middle Traps"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Sit facing the machine pad, chest firmly supported.",
      "Adjust handles so they align with your shoulder height."
    ],
    execution: [
      "With soft elbows, pull handles out and back in a horizontal arc until arms align with torso.",
      "Squeeze rear delts for 1 second, return slowly."
    ],
    proTips: [
      "Keep shoulders depressed down—do not let traps take over the pull."
    ],
    commonMistakes: [
      "Pulling too far back and pinching shoulder blades together excessively instead of focusing on rear delts."
    ],
    alternative: "Face Pulls or Dumbbell Rear Delt Flyes",
    videoQuery: "reverse+pec+deck+rear+delts+form"
  },

  "Lu Raises": {
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    muscle: "Shoulders",
    primaryMuscles: ["Lateral Delts", "Trapezius", "Shoulder Mobility"],
    secondaryMuscles: ["Rotator Cuff"],
    starterVolume: "3 sets × 12–15 reps (light weight)",
    setup: [
      "Stand holding light weight plates (2.5–5kg) or dumbbells at hips."
    ],
    execution: [
      "Raise arms out to sides in a lateral raise, but continue raising all the way overhead until weights touch at the top.",
      "Lower under control back to hips."
    ],
    proTips: [
      "Made famous by Olympic weightlifter Lu Xiaojun for shoulder bulletproofing and size."
    ],
    commonMistakes: [
      "Using too much weight—use very light plates."
    ],
    alternative: "Standard Lateral Raises",
    videoQuery: "lu+raises+proper+form+tutorial"
  },

  "Behind-the-Neck Press": {
    difficulty: "Advanced",
    equipment: "Barbell",
    muscle: "Shoulders",
    primaryMuscles: ["Lateral & Posterior Deltoids"],
    secondaryMuscles: ["Triceps", "Upper Traps"],
    starterVolume: "3 sets × 8–10 reps",
    setup: [
      "Sit on upright bench. Grip barbell with wide snatch or collar grip behind neck."
    ],
    execution: [
      "Press bar straight up overhead to full extension.",
      "Lower slowly only to ear/neck level (never force down if mobility is restricted)."
    ],
    proTips: [
      "Only perform if you have full pain-free shoulder external rotation mobility."
    ],
    commonMistakes: [
      "Lowering too deep with restricted mobility, straining rotator cuff."
    ],
    alternative: "Overhead Press or Dumbbell Press",
    videoQuery: "behind+the+neck+press+safe+form"
  },

  "Arnold Press": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Shoulders",
    primaryMuscles: ["Anterior & Lateral Deltoids"],
    secondaryMuscles: ["Triceps", "Traps"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Sit on an upright bench holding dumbbells at chin height with palms facing your chest (like top of a bicep curl)."
    ],
    execution: [
      "As you press the weights overhead, rotate your wrists so palms face forward at the top.",
      "Lock out overhead without clinking dumbbells.",
      "Reverse the rotation smoothly on the way down until palms face chest again at chin level."
    ],
    proTips: [
      "Execute the rotation smoothly and continuously throughout the pressing motion."
    ],
    commonMistakes: [
      "Rotating too quickly before the press begins.",
      "Arching lower back off the pad."
    ],
    alternative: "Standard Dumbbell Overhead Press",
    videoQuery: "arnold+press+proper+form+guide"
  },

  "Lateral Raises": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Shoulders",
    primaryMuscles: ["Lateral Deltoid (Side Shoulder Cap)"],
    secondaryMuscles: ["Supraspinatus", "Upper Traps"],
    starterVolume: "3–4 sets × 12–15 reps",
    setup: [
      "Stand with feet shoulder-width, holding light dumbbells at your sides or slightly in front of thighs.",
      "Maintain a subtle forward hinge at the hips (10°) and a soft bend in your elbows."
    ],
    execution: [
      "Raise the dumbbells outward and slightly forward (in the scapular plane, ~30° forward of pure side).",
      "Lead with your elbows, raising until upper arms are parallel to the floor (shoulder height).",
      "Pause for half a second at the top, then lower slowly under strict control (2–3 seconds down)."
    ],
    proTips: [
      "Think about pushing your hands out toward the walls rather than just lifting them up.",
      "Keep thumbs slightly higher than or level with pinkies—do not dump thumbs down like pouring a pitcher, as that can impinge shoulders."
    ],
    commonMistakes: [
      "Swinging torso and bouncing knees to heave heavy dumbbells.",
      "Shrugging neck/traps up to ears during the raise."
    ],
    alternative: "Cable Lateral Raise or Resistance Band Lateral Raise",
    videoQuery: "dumbbell+lateral+raise+form+tutorial"
  },

  "Front Raises": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Shoulders",
    primaryMuscles: ["Anterior Deltoid (Front Shoulder)"],
    secondaryMuscles: ["Upper Chest"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Stand tall holding dumbbells in front of your thighs with an overhand or neutral grip."
    ],
    execution: [
      "With straight arms (soft elbow), lift weights in front of you until eye level.",
      "Pause briefly, then lower slowly with control."
    ],
    proTips: [
      "Front delts get heavy work from all pressing exercises, so prioritize light weight and clean control here."
    ],
    commonMistakes: [
      "Swinging backwards to gain momentum.",
      "Lifting higher than eye level."
    ],
    alternative: "Cable Front Raise",
    videoQuery: "front+dumbbell+raise+form"
  },

  "Rear Delt Flyes": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Shoulders",
    primaryMuscles: ["Posterior Deltoid (Rear Shoulder)"],
    secondaryMuscles: ["Rhomboids", "Middle Traps"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Hinge at hips until torso is nearly parallel to the floor, back flat.",
      "Hold light dumbbells under your chest with palms facing each other."
    ],
    execution: [
      "With elbows slightly bent, raise arms out to the sides until upper arms align with torso.",
      "Focus on squeezing the back of your shoulders, then lower smoothly."
    ],
    proTips: [
      "Lead the motion with your elbows, keeping wrists relaxed."
    ],
    commonMistakes: [
      "Using back muscles to yank the dumbbells up.",
      "Standing too upright."
    ],
    alternative: "Reverse Pec Deck Machine or Face Pulls",
    videoQuery: "rear+delt+flye+dumbbell+form"
  },

  "Shrugs": {
    difficulty: "Beginner",
    equipment: "Dumbbell",
    muscle: "Shoulders",
    primaryMuscles: ["Upper Trapezius"],
    secondaryMuscles: ["Forearms"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Stand tall holding dumbbells or a barbell with arms straight at your sides."
    ],
    execution: [
      "Elevate your shoulders straight up toward your ears as high as possible.",
      "Hold the squeeze at the peak for a solid 2-second count.",
      "Lower shoulders smoothly back to full resting position."
    ],
    proTips: [
      "Move straight up and down. NEVER roll your shoulders in circles (rolling causes friction in the shoulder joint with zero added hypertrophy)."
    ],
    commonMistakes: [
      "Rolling shoulders forward or backward.",
      "Bending elbows to assist the lift."
    ],
    alternative: "Trap Bar Shrugs or Smith Machine Shrugs",
    videoQuery: "how+to+shrug+proper+form"
  },

  "Upright Rows": {
    difficulty: "Intermediate",
    equipment: "Barbell",
    muscle: "Shoulders",
    primaryMuscles: ["Lateral Delts", "Upper Traps"],
    secondaryMuscles: ["Biceps", "Forearms"],
    starterVolume: "3 sets × 10–12 reps",
    setup: [
      "Stand tall holding a barbell or EZ-curl bar with a shoulder-width grip (avoid very narrow grips)."
    ],
    execution: [
      "Pull the bar up toward upper chest, leading with your elbows.",
      "Stop when elbows reach shoulder height (do not pull to chin).",
      "Lower smoothly along the same path."
    ],
    proTips: [
      "A wider grip protects the shoulder joint from subacromial impingement."
    ],
    commonMistakes: [
      "Using a super-close grip that forces wrists and shoulders into internal rotation.",
      "Pulling too high above shoulders."
    ],
    alternative: "Cable Rope Upright Row or Dumbbell Lateral Raise",
    videoQuery: "upright+row+safe+form"
  },

  // ==========================================
  // CORE EXERCISES
  // ==========================================
  "Cable Woodchopper": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Core",
    primaryMuscles: ["Internal & External Obliques"],
    secondaryMuscles: ["Rectus Abdominis", "Shoulders"],
    starterVolume: "3 sets × 12–15 reps per side",
    setup: [
      "Set cable pulley to high height. Grab handle with both hands, stand sideways to stack with athletic wide stance."
    ],
    execution: [
      "Pull handle diagonally downward across body toward opposite knee, rotating your torso and pivoting your back foot.",
      "Engage obliques tightly at bottom, return slowly."
    ],
    proTips: [
      "Rotate with your core, not by pulling with arms."
    ],
    commonMistakes: [
      "Bending arms and using shoulder strength instead of torso rotation."
    ],
    alternative: "Russian Twists or Bicycle Crunches",
    videoQuery: "cable+woodchoppers+form"
  },

  "Hanging Leg Raise": {
    difficulty: "Advanced",
    equipment: "Bodyweight",
    muscle: "Core",
    primaryMuscles: ["Lower Rectus Abdominis"],
    secondaryMuscles: ["Hip Flexors", "Forearms"],
    starterVolume: "3 sets × 8–12 reps",
    setup: [
      "Hang from pull-up bar with overhand grip and engaged shoulders."
    ],
    execution: [
      "Keeping legs straight, flex your abs and lift toes all the way to 90 degrees or up to the bar.",
      "Curl your pelvis up toward your sternum at the peak.",
      "Lower under control without swinging."
    ],
    proTips: [
      "You must rotate your pelvis upward to work abs—simply lifting hip flexors does not activate the lower abs."
    ],
    commonMistakes: [
      "Swinging your body like a pendulum."
    ],
    alternative: "Hanging Knee Raises or Lying Leg Raises",
    videoQuery: "hanging+leg+raises+form"
  },

  "Dragon Flag": {
    difficulty: "Advanced",
    equipment: "Bodyweight",
    muscle: "Core",
    primaryMuscles: ["Entire Abdominal Wall", "Transverse Abdominis"],
    secondaryMuscles: ["Lats", "Lower Back"],
    starterVolume: "3 sets × 5–8 reps",
    setup: [
      "Lie on flat bench. Reach arms behind head to grip the bench firmly beside ears.",
      "Lift entire body up into a vertical candle position resting only on your upper shoulder blades."
    ],
    execution: [
      "Keeping body completely straight as a steel rod, slowly lower torso and legs down toward bench.",
      "Stop just before touching the bench, then pull back up using pure core strength."
    ],
    proTips: [
      "Made famous by Bruce Lee and Rocky Balboa—one of the ultimate tests of core strength."
    ],
    commonMistakes: [
      "Bending at the hips (body must stay completely straight)."
    ],
    alternative: "Ab Wheel Rollout or Lying Leg Raises",
    videoQuery: "dragon+flag+proper+progression+form"
  },

  "Pallof Press": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Core",
    primaryMuscles: ["Transverse Abdominis (Anti-Rotation Core)"],
    secondaryMuscles: ["Obliques", "Glutes"],
    starterVolume: "3 sets × 10 reps with 2s hold",
    setup: [
      "Set cable pulley to chest height. Stand sideways to machine holding handle against sternum with both hands.",
      "Feet shoulder-width apart, knees soft."
    ],
    execution: [
      "Press hands straight forward in front of chest.",
      "Hold for 2 seconds, fighting the cable's attempt to rotate your body.",
      "Return hands to chest smoothly."
    ],
    proTips: [
      "Teaches spine stabilization and core anti-rotation, vital for protecting the lower back during squats and deadlifts."
    ],
    commonMistakes: [
      "Letting torso twist toward the cable stack."
    ],
    alternative: "Side Plank",
    videoQuery: "pallof+press+exercise+form"
  },

  "Plank": {
    difficulty: "Beginner",
    equipment: "Bodyweight",
    muscle: "Core",
    primaryMuscles: ["Transverse Abdominis", "Rectus Abdominis"],
    secondaryMuscles: ["Glutes", "Shoulders", "Lower Back"],
    starterVolume: "3 sets × 30–45 sec holds",
    setup: [
      "Lie facedown, propping yourself onto your forearms (elbows directly under shoulders).",
      "Extend legs back on toes, body forming a rigid straight board from heels to head."
    ],
    execution: [
      "Tuck pelvis slightly (posterior pelvic tilt), squeeze glutes hard, pull belly button in toward spine.",
      "Actively press forearms into floor to push upper back up.",
      "Breathe steadily without letting hips sag or pike."
    ],
    proTips: [
      "A 30-second plank performed with maximum glute and core tension is 10x more effective than a loose 2-minute sagging plank."
    ],
    commonMistakes: [
      "Sagging lower back (putting heavy compression on lumbar spine).",
      "Piking butt up into the air.",
      "Holding breath."
    ],
    alternative: "Kneeling Plank or Bird-Dog",
    videoQuery: "proper+plank+form+for+beginners"
  },

  "Crunches": {
    difficulty: "Beginner",
    equipment: "Bodyweight",
    muscle: "Core",
    primaryMuscles: ["Rectus Abdominis (Upper Abs)"],
    secondaryMuscles: ["Obliques"],
    starterVolume: "3 sets × 15–20 reps",
    setup: [
      "Lie on your back with knees bent and feet flat on the floor hip-width apart.",
      "Place fingers gently behind your ears (do NOT interlace behind neck)."
    ],
    execution: [
      "Exhale and curl your shoulders and upper back off the floor, sliding ribs toward hips.",
      "Keep lower back flat on the mat.",
      "Pause for 1 second at the peak crunch, then slowly lower shoulders down."
    ],
    proTips: [
      "Imagine holding an apple or tennis ball under your chin so you don't yank your neck."
    ],
    commonMistakes: [
      "Yanking head and neck with hands.",
      "Lifting lower back off the floor (turning it into a hip-flexor sit-up)."
    ],
    alternative: "Deadbug or Cable Crunch",
    videoQuery: "how+to+do+proper+crunch"
  },

  "Leg Raises": {
    difficulty: "Beginner",
    equipment: "Bodyweight",
    muscle: "Core",
    primaryMuscles: ["Lower Rectus Abdominis", "Hip Flexors"],
    secondaryMuscles: ["Obliques"],
    starterVolume: "3 sets × 10–15 reps",
    setup: [
      "Lie flat on your back on a mat, arms at your sides or hands slightly under glutes for lower back support.",
      "Press lower back firmly into the floor."
    ],
    execution: [
      "Keeping legs straight (or with a slight knee bend for beginners), raise legs until perpendicular to the floor.",
      "Slowly lower legs back down toward floor under control.",
      "Stop when feet are 2 inches off floor without letting your lower back arch off the mat."
    ],
    proTips: [
      "If your lower back begins to arch off the floor, bend knees to 90 degrees (Knee Tucks) to protect your spine."
    ],
    commonMistakes: [
      "Allowing lower back to arch excessively off the floor during the descent.",
      "Swinging legs with fast momentum."
    ],
    alternative: "Lying Knee Tucks or Reverse Crunches",
    videoQuery: "lying+leg+raises+form"
  },

  "Russian Twists": {
    difficulty: "Beginner",
    equipment: "Bodyweight",
    muscle: "Core",
    primaryMuscles: ["Internal & External Obliques"],
    secondaryMuscles: ["Rectus Abdominis", "Hip Flexors"],
    starterVolume: "3 sets × 16–20 total twists",
    setup: [
      "Sit on the floor, bend knees, lean torso back at a 45-degree angle with a straight spine.",
      "Keep feet on the floor (beginner) or elevate feet a few inches (advanced)."
    ],
    execution: [
      "Clasp hands together and rotate your torso smoothly from side to side.",
      "Turn your shoulders through the rotation, touching hands near the floor next to your hips."
    ],
    proTips: [
      "Rotate with your ribcage and shoulders, not just waving your arms."
    ],
    commonMistakes: [
      "Slouching and rounding the lumbar spine.",
      "Moving arms rapidly without actually rotating the torso."
    ],
    alternative: "Bicycle Crunches or Side Planks",
    videoQuery: "russian+twists+proper+form"
  },

  "Ab Wheel": {
    difficulty: "Advanced",
    equipment: "Bodyweight",
    muscle: "Core",
    primaryMuscles: ["Rectus Abdominis", "Transverse Abdominis"],
    secondaryMuscles: ["Lats", "Shoulders", "Chest"],
    starterVolume: "3 sets × 6–10 reps",
    setup: [
      "Kneel on a soft pad holding the ab wheel handles directly under your shoulders.",
      "Round your upper back slightly and tuck your pelvis with abs braced tight."
    ],
    execution: [
      "Slowly roll the wheel forward, extending your body outward into a straight line.",
      "Roll out only as far as you can maintain a rigid, non-sagging lower back.",
      "Contract your abs hard and pull your hips back to the starting kneeling position."
    ],
    proTips: [
      "Never let your lower back sag into an arch—if you feel it in your lower back, roll out a shorter distance."
    ],
    commonMistakes: [
      "Hyperextending lower spine when fully extended.",
      "Sitting hips back first before pulling with the abs."
    ],
    alternative: "Stability Ball Rollout or Plank Walkouts",
    videoQuery: "ab+wheel+rollout+proper+form"
  },

  "Cable Crunches": {
    difficulty: "Beginner",
    equipment: "Cable",
    muscle: "Core",
    primaryMuscles: ["Rectus Abdominis (Weighted Abs)"],
    secondaryMuscles: ["Obliques"],
    starterVolume: "3 sets × 12–15 reps",
    setup: [
      "Kneel in front of a high pulley with a rope attachment.",
      "Hold rope ends by your ears/jawline, sit hips back slightly."
    ],
    execution: [
      "Keep your hips fixed in place. Flex your spine and crunch your ribcage down toward your pelvis.",
      "Squeeze your abs tightly at the bottom for 1 second.",
      "Slowly return to the start without moving hips."
    ],
    proTips: [
      "Do not sit down onto your heels during the rep; keep your hips completely stationary."
    ],
    commonMistakes: [
      "Hinging at the hips rather than flexing the spine (turns it into a hip flexor exercise).",
      "Pulling the rope down with arms instead of crunching with the core."
    ],
    alternative: "Standard Floor Crunch or Decline Bench Crunch",
    videoQuery: "how+to+cable+crunch+proper+form"
  },

  "Hanging Knee Raises": {
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    muscle: "Core",
    primaryMuscles: ["Lower Rectus Abdominis", "Hip Flexors"],
    secondaryMuscles: ["Forearms / Grip", "Obliques"],
    starterVolume: "3 sets × 8–12 reps",
    setup: [
      "Hang from a pull-up bar with an overhand grip, shoulders engaged.",
      "Keep legs straight and body steady."
    ],
    execution: [
      "Exhale and curl your knees up toward your chest.",
      "Rotate your pelvis upward at the top to fully engage the lower abdominal wall.",
      "Lower legs slowly without swinging."
    ],
    proTips: [
      "Simply lifting knees to 90° only uses hip flexors. To work abs, you must tuck your pelvis up toward your chin at the top."
    ],
    commonMistakes: [
      "Swinging like a pendulum.",
      "Not curling the pelvis upward."
    ],
    alternative: "Captain's Chair Knee Raise or Lying Reverse Crunch",
    videoQuery: "hanging+knee+raise+proper+form"
  }
};

// ==========================================
// SMART KEYWORD & ALIAS MATCH RULES (100% OFFLINE)
// ==========================================
const KEYWORD_PATTERNS = [
  // Biceps & Arms
  { regex: /\bspider\b/i, target: "Spider Curl" },
  { regex: /\bbayesian\b/i, target: "Bayesian Cable Curl" },
  { regex: /\b21('?s)?\b/i, target: "21s (Bicep Curl)" },
  { regex: /\bpreacher\b/i, target: "Preacher Curl" },
  { regex: /\bhammer\b/i, target: "Hammer Curl" },
  { regex: /\bconcentration\b/i, target: "Concentration Curl" },
  { regex: /\bincline\b.*\b(curl|bicep)/i, target: "Incline Dumbbell Curl" },
  { regex: /\b(db|dumbbell)\b.*\bincline\b.*\bcurl/i, target: "Incline Dumbbell Curl" },
  { regex: /\bclose\s*grip\b.*\bbench/i, target: "Close-Grip Bench Press" },
  { regex: /\bcgbp\b/i, target: "Close-Grip Bench Press" },
  { regex: /\bjm\s*press\b/i, target: "JM Press" },
  { regex: /\bkick\s*back/i, target: "Dumbbell Kickback" },
  { regex: /\boverhead\b.*\b(cable|rope)\b.*\btricep/i, target: "Overhead Cable Tricep Extension" },
  { regex: /\bskull\s*crusher/i, target: "Skull Crushers" },
  { regex: /\btricep\s*(push\s*down|press\s*down)/i, target: "Tricep Pushdown" },
  { regex: /\bbarbell\s*curl/i, target: "Barbell Curl" },
  { regex: /\bbicep\s*curl/i, target: "Barbell Curl" },

  // Legs & Glutes
  { regex: /\bbulgarian\b/i, target: "Bulgarian Split Squat" },
  { regex: /\bsplit\s*squat/i, target: "Bulgarian Split Squat" },
  { regex: /\bbss\b/i, target: "Bulgarian Split Squat" },
  { regex: /\bhip\s*thrust/i, target: "Hip Thrust" },
  { regex: /\bglute\s*bridge/i, target: "Hip Thrust" },
  { regex: /\bhack\s*squat/i, target: "Hack Squat" },
  { regex: /\bgoblet/i, target: "Goblet Squat" },
  { regex: /\bfront\s*squat/i, target: "Front Squat" },
  { regex: /\bsissy/i, target: "Sissy Squat" },
  { regex: /\badductor/i, target: "Adductor Machine" },
  { regex: /\babductor/i, target: "Abductor Machine" },
  { regex: /\bstanding\s*calf/i, target: "Standing Calf Raise" },
  { regex: /\bcalf\s*raise/i, target: "Calf Raises" },
  { regex: /\bromanian/i, target: "Romanian Deadlift" },
  { regex: /\brdl\b/i, target: "Romanian Deadlift" },
  { regex: /\bleg\s*press/i, target: "Leg Press" },
  { regex: /\bleg\s*curl/i, target: "Leg Curl" },
  { regex: /\bleg\s*ext/i, target: "Leg Extension" },
  { regex: /\blunge/i, target: "Lunges" },
  { regex: /\bsquat/i, target: "Squat" },

  // Chest
  { regex: /\bincline\b.*\b(db|dumbbell)\b.*\b(press|bench)/i, target: "Incline Dumbbell Press" },
  { regex: /\b(db|dumbbell)\b.*\bincline\b.*\b(press|bench)/i, target: "Incline Dumbbell Press" },
  { regex: /\b(db|dumbbell)\b.*\b(bench|press)/i, target: "Flat Dumbbell Press" },
  { regex: /\bflat\s*dumbbell/i, target: "Flat Dumbbell Press" },
  { regex: /\bpec\s*deck/i, target: "Pec Deck Fly" },
  { regex: /\bmachine\s*(chest\s*)?fly/i, target: "Pec Deck Fly" },
  { regex: /\blow\s*to\s*high/i, target: "Cable Low-to-High Fly" },
  { regex: /\bfloor\s*press/i, target: "Floor Press" },
  { regex: /\blandmine\s*press/i, target: "Landmine Press" },
  { regex: /\bincline\s*(bench|press)/i, target: "Incline Bench Press" },
  { regex: /\bdecline\s*(bench|press)/i, target: "Decline Bench Press" },
  { regex: /\bbench\s*press/i, target: "Bench Press" },
  { regex: /\bchest\s*dip/i, target: "Chest Dips" },
  { regex: /\bdip/i, target: "Chest Dips" },
  { regex: /\bpush\s*up/i, target: "Push-Ups" },
  { regex: /\bcable\s*cross/i, target: "Cable Crossover" },
  { regex: /\bfly/i, target: "Dumbbell Flyes" },

  // Back
  { regex: /\bchest\s*supported\s*row/i, target: "Chest-Supported Row" },
  { regex: /\bmeadows/i, target: "Meadows Row" },
  { regex: /\bstraight\s*arm\s*(pulldown|pushdown)/i, target: "Straight-Arm Pulldown" },
  { regex: /\bpendlay/i, target: "Pendlay Row" },
  { regex: /\bneutral\s*grip\s*(lat\s*)?pulldown/i, target: "Neutral-Grip Lat Pulldown" },
  { regex: /\bhyperextension/i, target: "Hyperextensions" },
  { regex: /\bback\s*extension/i, target: "Hyperextensions" },
  { regex: /\binverted\s*row/i, target: "Inverted Row" },
  { regex: /\bdeadlift/i, target: "Deadlift" },
  { regex: /\bpull\s*up/i, target: "Pull-Ups" },
  { regex: /\bchin\s*up/i, target: "Pull-Ups" },
  { regex: /\blat\s*pulldown/i, target: "Lat Pulldown" },
  { regex: /\bbarbell\s*row/i, target: "Barbell Rows" },
  { regex: /\bbent\s*over\s*row/i, target: "Barbell Rows" },
  { regex: /\bcable\s*row/i, target: "Cable Rows" },
  { regex: /\bt-?bar\s*row/i, target: "T-Bar Row" },
  { regex: /\bface\s*pull/i, target: "Face Pulls" },

  // Shoulders
  { regex: /\bcable\s*lateral/i, target: "Cable Lateral Raise" },
  { regex: /\bcable\s*side\s*raise/i, target: "Cable Lateral Raise" },
  { regex: /\b(db|dumbbell)\b.*\bshoulder\s*press/i, target: "Dumbbell Shoulder Press" },
  { regex: /\bmachine\s*shoulder\s*press/i, target: "Machine Shoulder Press" },
  { regex: /\breverse\s*pec\s*deck/i, target: "Reverse Pec Deck" },
  { regex: /\breverse\s*fly/i, target: "Rear Delt Flyes" },
  { regex: /\brear\s*delt/i, target: "Rear Delt Flyes" },
  { regex: /\blu\s*raise/i, target: "Lu Raises" },
  { regex: /\bbehind\s*the\s*neck/i, target: "Behind-the-Neck Press" },
  { regex: /\barnold\s*press/i, target: "Arnold Press" },
  { regex: /\boverhead\s*press/i, target: "Overhead Press" },
  { regex: /\bmilitary\s*press/i, target: "Overhead Press" },
  { regex: /\bohp\b/i, target: "Overhead Press" },
  { regex: /\blateral\s*raise/i, target: "Lateral Raises" },
  { regex: /\bside\s*raise/i, target: "Lateral Raises" },
  { regex: /\bfront\s*raise/i, target: "Front Raises" },
  { regex: /\bshrug/i, target: "Shrugs" },
  { regex: /\bupright\s*row/i, target: "Upright Rows" },

  // Core
  { regex: /\bwood\s*chop/i, target: "Cable Woodchopper" },
  { regex: /\bhanging\s*leg\s*raise/i, target: "Hanging Leg Raise" },
  { regex: /\bdragon\s*flag/i, target: "Dragon Flag" },
  { regex: /\bpallof/i, target: "Pallof Press" },
  { regex: /\bplank/i, target: "Plank" },
  { regex: /\bcrunch/i, target: "Crunches" },
  { regex: /\bleg\s*raise/i, target: "Leg Raises" },
  { regex: /\brussian\s*twist/i, target: "Russian Twists" },
  { regex: /\bab\s*wheel/i, target: "Ab Wheel" },
  { regex: /\bhanging\s*knee/i, target: "Hanging Knee Raises" },
];

/**
 * Intelligent 100% Offline Guide Matcher
 * Finds exact matches, case-insensitive matches, or matches via Smart Keyword Patterns.
 */
export function getExerciseGuide(exerciseName = "", muscleGroup = "Full Body") {
  const trimmed = exerciseName.trim();

  // 1. Direct exact match
  if (EXERCISE_GUIDES[trimmed]) {
    return { name: trimmed, ...EXERCISE_GUIDES[trimmed] };
  }

  // 2. Case-insensitive exact match
  const lowerName = trimmed.toLowerCase();
  const directKey = Object.keys(EXERCISE_GUIDES).find(
    (k) => k.toLowerCase() === lowerName
  );
  if (directKey) {
    return { name: trimmed, ...EXERCISE_GUIDES[directKey] };
  }

  // 3. Smart Keyword & Alias Pattern Match (e.g. "db spider curl" -> "Spider Curl")
  for (const item of KEYWORD_PATTERNS) {
    if (item.regex.test(lowerName)) {
      const matchedGuide = EXERCISE_GUIDES[item.target];
      if (matchedGuide) {
        return {
          name: trimmed, // keep user's original custom title
          matchedFrom: item.target,
          ...matchedGuide,
          videoQuery: `${trimmed.replace(/\s+/g, "+")}+exercise+proper+form`
        };
      }
    }
  }

  // 4. Smart fallback based on muscle group
  const defaultGuides = {
    Chest: {
      difficulty: "Beginner",
      equipment: "Free Weights / Machine",
      muscle: "Chest",
      primaryMuscles: ["Pectoralis Major"],
      secondaryMuscles: ["Front Deltoids", "Triceps"],
      starterVolume: "3 sets × 8–12 reps",
      setup: [
        "Position yourself comfortably with stable foot placement.",
        "Retract shoulder blades down and back into the bench or back rest."
      ],
      execution: [
        "Inhale and lower weight with control, keeping elbows tucked at roughly 45 degrees.",
        "Exhale as you press, squeezing the chest at peak contraction."
      ],
      proTips: ["Never flare elbows 90° wide to protect the rotator cuff.", "Control the lowering phase for at least 2 seconds."],
      commonMistakes: ["Bouncing the weight or rushing reps.", "Lifting hips off the support pad."],
      alternative: "Push-Ups or Dumbbell Bench Press",
      videoQuery: `${trimmed.replace(/\s+/g, "+")}+exercise+form`
    },
    Back: {
      difficulty: "Beginner",
      equipment: "Free Weights / Cable",
      muscle: "Back",
      primaryMuscles: ["Latissimus Dorsi", "Rhomboids"],
      secondaryMuscles: ["Biceps", "Forearms"],
      starterVolume: "3 sets × 8–12 reps",
      setup: ["Set feet shoulder-width, keep spine neutral, and engage lats before initiating."],
      execution: [
        "Pull through elbows, driving them back toward your hips.",
        "Squeeze shoulder blades together for 1 full second at peak contraction.",
        "Slowly extend arms back to starting position."
      ],
      proTips: ["Think of your hands as hooks; pull with your elbows, not your wrists."],
      commonMistakes: ["Jerking the torso with momentum.", "Rounding the lower back."],
      alternative: "Lat Pulldown or Seated Cable Row",
      videoQuery: `${trimmed.replace(/\s+/g, "+")}+exercise+form`
    },
    Shoulders: {
      difficulty: "Beginner",
      equipment: "Dumbbell / Cable",
      muscle: "Shoulders",
      primaryMuscles: ["Deltoids (Anterior, Lateral, or Posterior)"],
      secondaryMuscles: ["Trapezius", "Triceps"],
      starterVolume: "3 sets × 10–12 reps",
      setup: ["Stand or sit tall with an upright posture and braced core."],
      execution: [
        "Raise the weight in a controlled path without swinging.",
        "Pause at shoulder height and squeeze.",
        "Lower under full 2-second control."
      ],
      proTips: ["Use lighter weights with strict form—shoulders respond best to clean tension."],
      commonMistakes: ["Using torso momentum to swing the weights.", "Shrugging the neck up."],
      alternative: "Dumbbell Lateral Raise or Seated Shoulder Press",
      videoQuery: `${trimmed.replace(/\s+/g, "+")}+exercise+form`
    },
    Legs: {
      difficulty: "Beginner",
      equipment: "Barbell / Machine / Dumbbell",
      muscle: "Legs",
      primaryMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
      secondaryMuscles: ["Calves", "Core"],
      starterVolume: "3 sets × 8–12 reps",
      setup: ["Set feet shoulder-width, toes angled slightly out, brace core."],
      execution: [
        "Hinge at hips and bend knees, driving knees out in line with toes.",
        "Descend to parallel, then drive through mid-foot to stand tall."
      ],
      proTips: ["Keep heels glued to the floor at all times."],
      commonMistakes: ["Knees caving inward on the way up.", "Heels lifting."],
      alternative: "Goblet Squats or Leg Press",
      videoQuery: `${trimmed.replace(/\s+/g, "+")}+exercise+form`
    },
    Arms: {
      difficulty: "Beginner",
      equipment: "Dumbbell / Cable",
      muscle: "Arms",
      primaryMuscles: ["Biceps or Triceps"],
      secondaryMuscles: ["Forearms"],
      starterVolume: "3 sets × 10–12 reps",
      setup: ["Keep elbows pinned to your sides throughout the movement."],
      execution: [
        "Move only your forearms around the elbow pivot point.",
        "Squeeze target muscle at peak contraction, then lower slowly."
      ],
      proTips: ["Eliminate swinging; isolation is key for arm growth."],
      commonMistakes: ["Using hips or back to heave the weight."],
      alternative: "Dumbbell Bicep Curl or Tricep Pushdown",
      videoQuery: `${trimmed.replace(/\s+/g, "+")}+exercise+form`
    },
    Core: {
      difficulty: "Beginner",
      equipment: "Bodyweight",
      muscle: "Core",
      primaryMuscles: ["Rectus Abdominis", "Transverse Abdominis"],
      secondaryMuscles: ["Obliques"],
      starterVolume: "3 sets × 12–15 reps",
      setup: ["Keep lower back flat and braced against floor or pad."],
      execution: [
        "Exhale as you contract your abdominal wall.",
        "Pause at peak squeeze, then return under strict control."
      ],
      proTips: ["Breathe out completely at maximum contraction to fully engage the core."],
      commonMistakes: ["Pulling on neck with hands.", "Arching lower back."],
      alternative: "Plank or Deadbug",
      videoQuery: `${trimmed.replace(/\s+/g, "+")}+exercise+form`
    }
  };

  const base = defaultGuides[muscleGroup] || defaultGuides["Arms"] || defaultGuides["Chest"];
  return {
    name: trimmed,
    ...base,
    videoQuery: `${trimmed.replace(/\s+/g, "+")}+exercise+proper+form`
  };
}
