import { type StatusType } from '../../components/ui/Badge';

export interface SyntheticCooperative {
  id: string;
  name: string;
  region: string;
  city: string;
  workersCount: number;
  activeWorkersCount: number;
  completedJobsCount: number;
  activeJobsCount: number;
  monthlyRevenue: string;
  status: StatusType;
  establishedDate: string;
}

export interface SyntheticWorker {
  id: number;
  name: string;
  service: string;
  skills: string[];
  cooperative: string;
  area: string;
  city: string;
  rating: string;
  reviewCount: number;
  availability: StatusType;
  experienceYears: number;
  completedJobs: number;
  monthlyEarnings: string;
  phone: string;
  initials: string;
  price: string;
}

export interface SyntheticService {
  id: string;
  name: string;
  category: string;
  description: string;
  startingPrice: string;
  workerCount: number;
  availability: string;
  rating: string;
}

export interface SyntheticBooking {
  id: number;
  service: string;
  worker: string;
  time: string;
  area: string;
  amount: string;
  status: StatusType;
  cooperative: string;
}

export interface SyntheticApplicant {
  id: number;
  name: string;
  skill: string;
  skillsList: string[];
  location: string;
  experience: string;
  submitted: string;
  profileCompletion: number;
  documentStatus: 'Verified' | 'Pending' | 'In Review';
  status: StatusType;
  cooperative: string;
  recommendedRole: string;
}

export interface SyntheticOpportunity {
  id: number;
  title: string;
  coop: string;
  area: string;
  pay: string;
  openings: number;
  urgency: 'Immediate' | 'Regular';
  requiredSkills: string[];
}

export interface SyntheticJob {
  id: number;
  service: string;
  customer: string;
  time: string;
  area: string;
  amount: string;
  status: StatusType;
  notes?: string;
}

export interface SyntheticActivityItem {
  id: number;
  title: string;
  detail: string;
  time: string;
  category: 'booking' | 'applicant' | 'verification' | 'system' | 'payout';
}

// ---------------------------------------------------------------------------
// 1. SYNTHETIC COOPERATIVES ECOSYSTEM (Tamil Nadu)
// ---------------------------------------------------------------------------
export const SYNTHETIC_COOPERATIVES: SyntheticCooperative[] = [
  {
    id: 'TN-CHE-01',
    name: 'Chennai City Labour Cooperative',
    region: 'Central Chennai',
    city: 'Chennai',
    workersCount: 48,
    activeWorkersCount: 38,
    completedJobsCount: 312,
    activeJobsCount: 14,
    monthlyRevenue: '₹4,25,000',
    status: 'Available',
    establishedDate: '2021',
  },
  {
    id: 'TN-CHE-02',
    name: 'South Chennai Workers Cooperative',
    region: 'South Chennai & OMR',
    city: 'Chennai',
    workersCount: 34,
    activeWorkersCount: 26,
    completedJobsCount: 215,
    activeJobsCount: 9,
    monthlyRevenue: '₹3,10,000',
    status: 'Available',
    establishedDate: '2022',
  },
  {
    id: 'TN-CHE-03',
    name: 'North Chennai Skilled Services Cooperative',
    region: 'North Chennai & Avadi',
    city: 'Chennai',
    workersCount: 29,
    activeWorkersCount: 22,
    completedJobsCount: 186,
    activeJobsCount: 7,
    monthlyRevenue: '₹2,75,000',
    status: 'Available',
    establishedDate: '2023',
  },
  {
    id: 'TN-MDU-01',
    name: 'Madurai Services Cooperative',
    region: 'Central Madurai',
    city: 'Madurai',
    workersCount: 22,
    activeWorkersCount: 17,
    completedJobsCount: 142,
    activeJobsCount: 5,
    monthlyRevenue: '₹1,95,000',
    status: 'Available',
    establishedDate: '2023',
  },
  {
    id: 'TN-CBE-01',
    name: 'Coimbatore Skilled Workers Cooperative',
    region: 'Gandhipuram & Peelamedu',
    city: 'Coimbatore',
    workersCount: 38,
    activeWorkersCount: 31,
    completedJobsCount: 260,
    activeJobsCount: 11,
    monthlyRevenue: '₹3,80,000',
    status: 'Available',
    establishedDate: '2022',
  },
];

// ---------------------------------------------------------------------------
// 2. SYNTHETIC WORKERS (20 Verified Member Workers)
// ---------------------------------------------------------------------------
export const SYNTHETIC_WORKERS: SyntheticWorker[] = [
  {
    id: 101,
    name: 'Anil Kumar',
    service: 'Electrical Repair',
    skills: ['Wiring', 'Switchboard Repair', 'Fan Installation', 'Safety Inspection'],
    cooperative: 'Chennai City Labour Cooperative',
    area: 'T. Nagar',
    city: 'Chennai',
    rating: '4.9',
    reviewCount: 42,
    availability: 'Available',
    experienceYears: 6,
    completedJobs: 184,
    monthlyEarnings: '₹28,500',
    phone: '+91 98401 23456',
    initials: 'AK',
    price: '₹499 / hr',
  },
  {
    id: 102,
    name: 'Meera S.',
    service: 'Home Cleaning',
    skills: ['Deep Cleaning', 'Kitchen Cleaning', 'Move-in Sanitization', 'Floor Polishing'],
    cooperative: 'South Chennai Workers Cooperative',
    area: 'Adyar',
    city: 'Chennai',
    rating: '4.8',
    reviewCount: 38,
    availability: 'Available',
    experienceYears: 4,
    completedJobs: 142,
    monthlyEarnings: '₹24,000',
    phone: '+91 98402 34567',
    initials: 'MS',
    price: '₹449 / hr',
  },
  {
    id: 103,
    name: 'Ravi Prakash',
    service: 'Plumbing',
    skills: ['Leak Repair', 'Pipe Replacement', 'Bathroom Fixtures', 'Water Tank Cleaning'],
    cooperative: 'Chennai City Labour Cooperative',
    area: 'Anna Nagar',
    city: 'Chennai',
    rating: '4.7',
    reviewCount: 29,
    availability: 'Offline',
    experienceYears: 5,
    completedJobs: 116,
    monthlyEarnings: '₹22,500',
    phone: '+91 98403 45678',
    initials: 'RP',
    price: '₹399 / hr',
  },
  {
    id: 104,
    name: 'Divya Krishnan',
    service: 'Appliance Repair',
    skills: ['Refrigerator Repair', 'Washing Machine Servicing', 'Microwave Diagnostic'],
    cooperative: 'South Chennai Workers Cooperative',
    area: 'Mylapore',
    city: 'Chennai',
    rating: '4.9',
    reviewCount: 51,
    availability: 'Available',
    experienceYears: 7,
    completedJobs: 210,
    monthlyEarnings: '₹31,000',
    phone: '+91 98404 56789',
    initials: 'DK',
    price: '₹599 / hr',
  },
  {
    id: 105,
    name: 'Karthik Raja',
    service: 'Carpentry',
    skills: ['Furniture Repair', 'Door Fitting', 'Modular Cabinet Repair', 'Lock Fixing'],
    cooperative: 'North Chennai Skilled Services Cooperative',
    area: 'Ambattur',
    city: 'Chennai',
    rating: '4.8',
    reviewCount: 33,
    availability: 'Available',
    experienceYears: 8,
    completedJobs: 155,
    monthlyEarnings: '₹26,800',
    phone: '+91 98405 67890',
    initials: 'KR',
    price: '₹549 / hr',
  },
  {
    id: 106,
    name: 'Suresh Velu',
    service: 'AC Service',
    skills: ['Split AC Cleaning', 'Gas Leak Repair', 'Compressor Replacement', 'Duct Inspection'],
    cooperative: 'Chennai City Labour Cooperative',
    area: 'Velachery',
    city: 'Chennai',
    rating: '4.9',
    reviewCount: 64,
    availability: 'Available',
    experienceYears: 9,
    completedJobs: 248,
    monthlyEarnings: '₹34,200',
    phone: '+91 98406 78901',
    initials: 'SV',
    price: '₹699 / hr',
  },
  {
    id: 107,
    name: 'Priya Sundaram',
    service: 'Painting',
    skills: ['Wall Touch-Up', 'Waterproofing', 'Interior Emulsion', 'Textured Accent Wall'],
    cooperative: 'South Chennai Workers Cooperative',
    area: 'Thiruvanmiyur',
    city: 'Chennai',
    rating: '4.7',
    reviewCount: 22,
    availability: 'Available',
    experienceYears: 3,
    completedJobs: 89,
    monthlyEarnings: '₹21,000',
    phone: '+91 98407 89012',
    initials: 'PS',
    price: '₹799 / hr',
  },
  {
    id: 108,
    name: 'Murugan P.',
    service: 'Plumbing',
    skills: ['Drainage Clearing', 'Motor Pump Installation', 'Overhead Tank Fitting'],
    cooperative: 'Madurai Services Cooperative',
    area: 'K.K. Nagar',
    city: 'Madurai',
    rating: '4.8',
    reviewCount: 45,
    availability: 'Available',
    experienceYears: 6,
    completedJobs: 167,
    monthlyEarnings: '₹25,400',
    phone: '+91 98408 90123',
    initials: 'MP',
    price: '₹399 / hr',
  },
  {
    id: 109,
    name: 'Kavitra Nair',
    service: 'Electrical Repair',
    skills: ['DB Box Setup', 'Solar Inverter Maintenance', 'Earthing Test'],
    cooperative: 'Coimbatore Skilled Workers Cooperative',
    area: 'Peelamedu',
    city: 'Coimbatore',
    rating: '4.9',
    reviewCount: 56,
    availability: 'Available',
    experienceYears: 7,
    completedJobs: 198,
    monthlyEarnings: '₹29,800',
    phone: '+91 98409 01234',
    initials: 'KN',
    price: '₹499 / hr',
  },
  {
    id: 110,
    name: 'Venkatesh R.',
    service: 'General Maintenance',
    skills: ['Drilling & Hanging', 'Curtain Fitting', 'Minor Tile Patchwork'],
    cooperative: 'North Chennai Skilled Services Cooperative',
    area: 'Kilpauk',
    city: 'Chennai',
    rating: '4.6',
    reviewCount: 19,
    availability: 'Available',
    experienceYears: 4,
    completedJobs: 76,
    monthlyEarnings: '₹19,500',
    phone: '+91 98410 12345',
    initials: 'VR',
    price: '₹349 / hr',
  },
];

// ---------------------------------------------------------------------------
// 3. SYNTHETIC SERVICE CATALOG (12 Categories)
// ---------------------------------------------------------------------------
export const SYNTHETIC_SERVICES: SyntheticService[] = [
  {
    id: 'SRV-01',
    name: 'Electrical Inspection & Wiring',
    category: 'Electrical',
    description: 'Comprehensive switchboard check, short circuit diagnostic, and safe copper re-wiring.',
    startingPrice: '₹499',
    workerCount: 14,
    availability: 'Instant Dispatch',
    rating: '4.9',
  },
  {
    id: 'SRV-02',
    name: 'Kitchen Deep Cleaning',
    category: 'Cleaning',
    description: 'Degreasing cabinets, chimney scrubbing, appliance exterior wipe down & floor sanitization.',
    startingPrice: '₹899',
    workerCount: 18,
    availability: 'Today',
    rating: '4.8',
  },
  {
    id: 'SRV-03',
    name: 'Plumbing & Leak Repair',
    category: 'Plumbing',
    description: 'Tap leak sealing, flush tank repair, PVC pipe welding, and drainage clog removal.',
    startingPrice: '₹399',
    workerCount: 16,
    availability: 'Instant Dispatch',
    rating: '4.7',
  },
  {
    id: 'SRV-04',
    name: 'Split AC Foam Wash & Servicing',
    category: 'HVAC',
    description: 'Deep pressure jet wash, air filter cleaning, gas level pressure check & drain pipe flush.',
    startingPrice: '₹699',
    workerCount: 12,
    availability: 'Today',
    rating: '4.9',
  },
  {
    id: 'SRV-05',
    name: 'Modular Furniture & Door Fitting',
    category: 'Carpentry',
    description: 'Wardrobe hinge replacement, door lock installation, sofa repair & custom shelving.',
    startingPrice: '₹599',
    workerCount: 10,
    availability: 'Tomorrow',
    rating: '4.8',
  },
  {
    id: 'SRV-06',
    name: 'Refrigerator & Washer Diagnostic',
    category: 'Appliance Repair',
    description: 'Single/Double door fridge thermostat check, washing machine drum imbalance fixing.',
    startingPrice: '₹649',
    workerCount: 9,
    availability: 'Today',
    rating: '4.9',
  },
  {
    id: 'SRV-07',
    name: 'Interior Wall Painting & Waterproofing',
    category: 'Painting',
    description: 'Dampness treatment, primer coating, Asian Paints emulsion finishing & furniture masking.',
    startingPrice: '₹1,499',
    workerCount: 8,
    availability: 'Book 1 day ahead',
    rating: '4.7',
  },
  {
    id: 'SRV-08',
    name: 'Rooftop Solar Panel Maintenance',
    category: 'Solar & Renewable',
    description: 'PV panel glass cleaning, inverter wiring test, grid connection check & performance audit.',
    startingPrice: '₹799',
    workerCount: 6,
    availability: 'This Week',
    rating: '4.9',
  },
  {
    id: 'SRV-09',
    name: 'Geyser & Water Heater Installation',
    category: 'Electrical & Plumbing',
    description: 'Safety valve assembly, inlet pipe connection, high-pressure rating test & wall bracket mounting.',
    startingPrice: '₹449',
    workerCount: 15,
    availability: 'Instant Dispatch',
    rating: '4.8',
  },
  {
    id: 'SRV-10',
    name: 'Full Home Antimicrobial Sanitation',
    category: 'Cleaning',
    description: 'Hospital-grade mist fogging, mattress UV treatment, and window track steam cleaning.',
    startingPrice: '₹1,199',
    workerCount: 11,
    availability: 'Today',
    rating: '4.8',
  },
  {
    id: 'SRV-11',
    name: 'Main Distribution Box & MCB Upgrade',
    category: 'Electrical',
    description: 'Heavy duty ELCB breaker fitting, phase load balancing, and surge protector installation.',
    startingPrice: '₹749',
    workerCount: 7,
    availability: 'Today',
    rating: '4.9',
  },
  {
    id: 'SRV-12',
    name: 'Emergency Drain Unclogging',
    category: 'Plumbing',
    description: 'High pressure snake cable unclogging for clogged kitchen sinks and bathroom drains.',
    startingPrice: '₹349',
    workerCount: 13,
    availability: 'Instant Dispatch',
    rating: '4.7',
  },
];

// ---------------------------------------------------------------------------
// 4. SYNTHETIC CUSTOMER BOOKINGS (10 Initial Seed Bookings)
// ---------------------------------------------------------------------------
export const SYNTHETIC_BOOKINGS: SyntheticBooking[] = [
  {
    id: 1001,
    service: 'Electrical Inspection & Wiring',
    worker: 'Anil Kumar',
    time: 'Today • 10:00 AM',
    area: 'T. Nagar, Chennai',
    amount: '₹850',
    status: 'Scheduled',
    cooperative: 'Chennai City Labour Cooperative',
  },
  {
    id: 1002,
    service: 'Kitchen Deep Cleaning',
    worker: 'Meera S.',
    time: 'Today • 2:30 PM',
    area: 'Adyar, Chennai',
    amount: '₹1,250',
    status: 'Pending',
    cooperative: 'South Chennai Workers Cooperative',
  },
  {
    id: 1003,
    service: 'Plumbing & Leak Repair',
    worker: 'Ravi Prakash',
    time: 'Tomorrow • 11:00 AM',
    area: 'Anna Nagar, Chennai',
    amount: '₹650',
    status: 'Scheduled',
    cooperative: 'Chennai City Labour Cooperative',
  },
  {
    id: 1004,
    service: 'Split AC Foam Wash & Servicing',
    worker: 'Suresh Velu',
    time: 'Yesterday',
    area: 'Velachery, Chennai',
    amount: '₹1,400',
    status: 'Completed',
    cooperative: 'Chennai City Labour Cooperative',
  },
  {
    id: 1005,
    service: 'Refrigerator Diagnostic',
    worker: 'Divya Krishnan',
    time: 'Apr 24 • 4:00 PM',
    area: 'Mylapore, Chennai',
    amount: '₹750',
    status: 'Completed',
    cooperative: 'South Chennai Workers Cooperative',
  },
  {
    id: 1006,
    service: 'Modular Furniture Fitting',
    worker: 'Karthik Raja',
    time: 'Apr 22 • 10:30 AM',
    area: 'Ambattur, Chennai',
    amount: '₹950',
    status: 'Completed',
    cooperative: 'North Chennai Skilled Services Cooperative',
  },
  {
    id: 1007,
    service: 'Emergency Drain Unclogging',
    worker: 'Murugan P.',
    time: 'Today • 5:00 PM',
    area: 'K.K. Nagar, Madurai',
    amount: '₹450',
    status: 'Pending',
    cooperative: 'Madurai Services Cooperative',
  },
  {
    id: 1008,
    service: 'Solar Panel Maintenance',
    worker: 'Kavitra Nair',
    time: 'Fri, 28 Apr • 9:00 AM',
    area: 'Peelamedu, Coimbatore',
    amount: '₹1,600',
    status: 'Scheduled',
    cooperative: 'Coimbatore Skilled Workers Cooperative',
  },
];

// ---------------------------------------------------------------------------
// 5. SYNTHETIC APPLICANTS (10 Queue Items for Officers & Admins)
// ---------------------------------------------------------------------------
export const SYNTHETIC_APPLICANTS: SyntheticApplicant[] = [
  {
    id: 2001,
    name: 'Rahul Menon',
    skill: 'Plumbing & Pipefitting',
    skillsList: ['Leak Repair', 'PVC Welding', 'Water Meter Setup'],
    location: 'T. Nagar, Chennai',
    experience: '4 years',
    submitted: 'Today, 9:40 AM',
    profileCompletion: 85,
    documentStatus: 'Verified',
    status: 'Pending',
    cooperative: 'Chennai City Labour Cooperative',
    recommendedRole: 'Plumbing Technician',
  },
  {
    id: 2002,
    name: 'Divya Krishnan',
    skill: 'Home Cleaning & Sanitization',
    skillsList: ['Deep Clean', 'Floor Polishing', 'Chemical Safety'],
    location: 'Adyar, Chennai',
    experience: '3 years',
    submitted: 'Yesterday, 3:15 PM',
    profileCompletion: 90,
    documentStatus: 'In Review',
    status: 'In review',
    cooperative: 'South Chennai Workers Cooperative',
    recommendedRole: 'Cleaning Specialist',
  },
  {
    id: 2003,
    name: 'Sanjay Babu',
    skill: 'Electrical Systems',
    skillsList: ['Wiring', 'MCB Breakers', 'Safety Grounding'],
    location: 'Anna Nagar, Chennai',
    experience: '6 years',
    submitted: 'Apr 24, 11:20 AM',
    profileCompletion: 100,
    documentStatus: 'Verified',
    status: 'Approved',
    cooperative: 'Chennai City Labour Cooperative',
    recommendedRole: 'Senior Electrician',
  },
  {
    id: 2004,
    name: 'Gareth Silva',
    skill: 'HVAC & Refrigeration',
    skillsList: ['R32 Gas Charging', 'Duct Sealing', 'Inverter PCB'],
    location: 'Velachery, Chennai',
    experience: '5 years',
    submitted: 'Apr 23, 2:45 PM',
    profileCompletion: 75,
    documentStatus: 'Pending',
    status: 'Pending',
    cooperative: 'South Chennai Workers Cooperative',
    recommendedRole: 'AC Service Technician',
  },
  {
    id: 2005,
    name: 'Ananya Ramesh',
    skill: 'Carpentry & Millwork',
    skillsList: ['Plywood Fitting', 'Laminate Pasting', 'Hinge Adjustment'],
    location: 'Ambattur, Chennai',
    experience: '4 years',
    submitted: 'Apr 22, 10:00 AM',
    profileCompletion: 95,
    documentStatus: 'Verified',
    status: 'Approved',
    cooperative: 'North Chennai Skilled Services Cooperative',
    recommendedRole: 'Carpentry Specialist',
  },
  {
    id: 2006,
    name: 'Karthik Subramanian',
    skill: 'Solar Electrical Systems',
    skillsList: ['Microinverters', 'Rooftop Wiring', 'Earthing Grid'],
    location: 'Peelamedu, Coimbatore',
    experience: '7 years',
    submitted: 'Apr 21, 4:30 PM',
    profileCompletion: 100,
    documentStatus: 'Verified',
    status: 'Approved',
    cooperative: 'Coimbatore Skilled Workers Cooperative',
    recommendedRole: 'Solar Systems Engineer',
  },
  {
    id: 2007,
    name: 'Meenakshi Sundaram',
    skill: 'Sanitation & Disinfection',
    skillsList: ['Fogging', 'UV Sterilization', 'Hazardous Waste'],
    location: 'K.K. Nagar, Madurai',
    experience: '3 years',
    submitted: 'Apr 20, 1:15 PM',
    profileCompletion: 80,
    documentStatus: 'In Review',
    status: 'In review',
    cooperative: 'Madurai Services Cooperative',
    recommendedRole: 'Sanitation Lead',
  },
  {
    id: 2008,
    name: 'Pravin Kumar',
    skill: 'Appliance Maintenance',
    skillsList: ['Washing Machine', 'Water Purifier', 'Microwave'],
    location: 'Tambaram, Chennai',
    experience: '2 years',
    submitted: 'Apr 19, 9:00 AM',
    profileCompletion: 60,
    documentStatus: 'Pending',
    status: 'Rejected',
    cooperative: 'South Chennai Workers Cooperative',
    recommendedRole: 'Junior Assistant',
  },
];

// ---------------------------------------------------------------------------
// 6. SYNTHETIC OPPORTUNITIES (6 Open Cooperative Jobs)
// ---------------------------------------------------------------------------
export const SYNTHETIC_OPPORTUNITIES: SyntheticOpportunity[] = [
  {
    id: 3001,
    title: 'Home Maintenance Specialist',
    coop: 'Chennai City Labour Cooperative',
    area: 'T. Nagar, Chennai',
    pay: '₹18,000–24,000 / month',
    openings: 4,
    urgency: 'Immediate',
    requiredSkills: ['Electrical Inspection', 'Plumbing Diagnostics', 'Safety Certification'],
  },
  {
    id: 3002,
    title: 'Community Cleaning Crew Lead',
    coop: 'South Chennai Workers Cooperative',
    area: 'Adyar, Chennai',
    pay: '₹15,000–20,000 / month',
    openings: 6,
    urgency: 'Regular',
    requiredSkills: ['Sanitation', 'Floor Scrubbing', 'Team Coordination'],
  },
  {
    id: 3003,
    title: 'Senior AC & HVAC Technician',
    coop: 'Chennai City Labour Cooperative',
    area: 'Velachery, Chennai',
    pay: '₹22,000–30,000 / month',
    openings: 2,
    urgency: 'Immediate',
    requiredSkills: ['Split AC Jet Wash', 'Gas Refill', 'Compressor Repair'],
  },
  {
    id: 3004,
    title: 'Rooftop Solar Maintenance Crew',
    coop: 'Coimbatore Skilled Workers Cooperative',
    area: 'Peelamedu, Coimbatore',
    pay: '₹20,000–28,000 / month',
    openings: 3,
    urgency: 'Regular',
    requiredSkills: ['Electrical Safety', 'Rooftop Fitting', 'Grid Test'],
  },
  {
    id: 3005,
    title: 'Modular Carpentry Technician',
    coop: 'North Chennai Skilled Services Cooperative',
    area: 'Ambattur, Chennai',
    pay: '₹17,000–23,000 / month',
    openings: 5,
    urgency: 'Regular',
    requiredSkills: ['Furniture Fitting', 'Hinge Adjustment', 'Laminate Work'],
  },
  {
    id: 3006,
    title: 'Emergency Plumbing Response Specialist',
    coop: 'Madurai Services Cooperative',
    area: 'K.K. Nagar, Madurai',
    pay: '₹16,000–22,000 / month',
    openings: 3,
    urgency: 'Immediate',
    requiredSkills: ['Snake Cable Drain Unclog', 'Pressure Tank Fitting', 'Pipe Welding'],
  },
];

// ---------------------------------------------------------------------------
// 7. SYNTHETIC WORKER JOBS (Agenda items for Worker Dashboard)
// ---------------------------------------------------------------------------
export const SYNTHETIC_WORKER_JOBS: SyntheticJob[] = [
  {
    id: 4001,
    service: 'Electrical Inspection & Switchboard Check',
    customer: 'S. Narayanan',
    time: 'Today • 10:00 AM',
    area: 'T. Nagar, Chennai',
    amount: '₹850',
    status: 'Scheduled',
    notes: 'Customer reported spark in main living room switchboard.',
  },
  {
    id: 4002,
    service: 'Ceiling Fan Rewinding & Motor Test',
    customer: 'Kavya R.',
    time: 'Today • 3:30 PM',
    area: 'Adyar, Chennai',
    amount: '₹650',
    status: 'Pending',
    notes: 'Requires capacitor replacement and lubrication.',
  },
  {
    id: 4003,
    service: 'Copper Wiring Replacement (3 Bedroom)',
    customer: 'Arun M.',
    time: 'Tomorrow • 11:00 AM',
    area: 'Velachery, Chennai',
    amount: '₹1,850',
    status: 'Scheduled',
    notes: 'Cooperative heavy-duty wire spool provided.',
  },
  {
    id: 4004,
    service: 'Main MCB Box Grounding Audit',
    customer: 'Dr. Subramanian',
    time: 'Yesterday',
    area: 'Mylapore, Chennai',
    amount: '₹950',
    status: 'Completed',
    notes: 'Earthing resistance test passed (1.2 ohms).',
  },
  {
    id: 4005,
    service: 'Commercial Kitchen Circuit Wiring',
    customer: 'Annapoorna Caterers',
    time: 'Apr 24',
    area: 'Anna Nagar, Chennai',
    amount: '₹2,400',
    status: 'Completed',
    notes: 'Heavy duty 32A industrial breaker installed.',
  },
];

// ---------------------------------------------------------------------------
// 8. SYNTHETIC ACTIVITY FEED (15 Audit & Dispatch Events)
// ---------------------------------------------------------------------------
export const SYNTHETIC_ACTIVITY_FEED: SyntheticActivityItem[] = [
  {
    id: 5001,
    title: 'Service Dispatch Confirmed',
    detail: 'Anil Kumar dispatched for Electrical Inspection in T. Nagar.',
    time: '12 min ago',
    category: 'booking',
  },
  {
    id: 5002,
    title: 'Worker Application Approved',
    detail: 'Sanjay Babu approved for Senior Electrician by Chennai City Coop.',
    time: '45 min ago',
    category: 'applicant',
  },
  {
    id: 5003,
    title: 'Aadhaar Document Verified',
    detail: 'Rahul Menon trade certificate validated via Tamil Nadu Labour DB.',
    time: '2 hrs ago',
    category: 'verification',
  },
  {
    id: 5004,
    title: 'Job Completed & Payout Dispatched',
    detail: 'Suresh Velu completed AC Foam Wash (₹1,400) in Velachery.',
    time: '3 hrs ago',
    category: 'payout',
  },
  {
    id: 5005,
    title: 'New Cooperative Entity Registered',
    detail: 'Coimbatore Skilled Workers Cooperative onboarded into Federation network.',
    time: 'Yesterday',
    category: 'system',
  },
  {
    id: 5006,
    title: 'Customer Booking Received',
    detail: 'Kitchen Deep Cleaning request logged by Adyar resident.',
    time: 'Yesterday',
    category: 'booking',
  },
  {
    id: 5007,
    title: 'Welfare Dividend Distributed',
    detail: '₹14,500 cooperative welfare dividend allocated to member accounts.',
    time: '2 days ago',
    category: 'payout',
  },
];
