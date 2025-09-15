export interface DoctorProfile {
  name: string;
  title: string;
  experience_years: number;
  languages: string[];
  qualifications: Array<{
    degree: string;
    institution: string;
    year: number;
    department?: string;
  }>;
  affiliations: Array<{
    hospital: string;
    logo: string;
    role: string;
    current: boolean;
  }>;
  about: string;
  awards: Array<{
    name: string;
    year: number;
    issuer: string;
  }>;
  experience: Array<{
    year: number;
    role: string;
    hospital: string;
    logo: string;
    notes?: string;
  }>;
  videos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    description: string;
    video_url?: string;
    disclaimer?: string;
    tags?: string[];
  }>;
  publications: Array<{
    title: string;
    source: string;
    year: number;
    type: 'Research' | 'Case Study' | 'Review';
    topic: string;
    url: string;
    citation: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: number;
    credentialId: string;
    description: string;
    logo: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  other_doctors: Array<{
    name: string;
    specialty: string;
    languages: string[];
    portrait: string;
    slug: string;
  }>;
}

export const drSaptarshiProfile: DoctorProfile = {
  name: "Dr. Saptarshi Bhattacharya",
  title: "Chief Medical Advisor, EarlyFit",
  experience_years: 18,
  languages: ["English", "Hindi", "Bengali", "Telugu"],
  qualifications: [
    {
      degree: "DM (Endocrinology)",
      institution: "AIIMS",
      year: 2010,
      department: "Department of Endocrinology & Metabolism"
    },
    {
      degree: "MD (Internal Medicine)",
      institution: "MAMC",
      year: 2007,
      department: "Department of Internal Medicine"
    },
    {
      degree: "MBBS",
      institution: "Medical College Kolkata",
      year: 2004
    }
  ],
  affiliations: [
    {
      hospital: "Indraprastha Apollo Hospitals",
      logo: "/src/assets/apollo.png",
      role: "Senior Consultant, Endocrinology",
      current: true
    },
    {
      hospital: "eHealth Diabetes & Endicrinology Centre (eDEC)",
      logo: "/src/assets/eDEC.png",
      role: "Director",
      current: false
    },
    {
      hospital: "AIIMS",
      logo: "/src/assets/AIIMS_logo.png",
      role: "Former Senior Resident",
      current: false
    }
  ],
  about: "Dr. Saptarshi Bhattacharya is a senior endocrinologist with over 20 years of experience in managing a broad spectrum of endocrine and metabolic disorders. He is committed to delivering evidence-based, compassionate care tailored to individual needs, with a strong focus on patient education and long-term outcomes.\n\nDr. Bhattacharya treats conditions such as type 1 and type 2 diabetes, monogenic and secondary forms of diabetes, thyroid disorders, obesity, PCOS, osteoporosis, pituitary and adrenal diseases, reproductive and puberty-related hormonal issues, and endocrine disorders in pregnancy. He uses advanced technologies including continuous glucose monitoring (CGM), insulin pump therapy, and dynamic endocrine testing to provide precise and personalized care.\n\nIn addition to clinical practice, Dr. Bhattacharya is deeply involved in public health awareness initiatives aimed at improving understanding of endocrine diseases in the general population. He regularly appears on television news channels and contributes to leading newspapers, promoting early diagnosis and prevention of endocrine disorders. He has authored over 100 scientific publications in peer-reviewed journals and medical platforms, reflecting his strong academic engagement.\n\nDr. Bhattacharya is a member of the Education Working Group of the International Society of Endocrinology (ISE), an Executive Committee Member of the Indian Thyroid Society and the Endocrine Society of India, and currently serves as the Secretary of the Endocrine Society of Delhi.\n\nPatients and colleagues seeking reliable, research-driven, and patient-focused endocrine care or collaboration are welcome to connect with Dr. Bhattacharya.",
  awards: [
    {
      name: "Excellence in Endocrinology Award",
      year: 2023,
      issuer: "Indian Society of Endocrinology"
    },
    {
      name: "Best Research Paper in Diabetes Management",
      year: 2022,
      issuer: "Diabetes Association of India"
    }
  ],
  experience: [
    {
      year: 2018,
      role: "Senior Consultant Endocrinologist",
      hospital: "Max Healthcare",
      logo: "/src/assets/max-healthcare-logo.jpg",
      notes: "Leading diabetes and obesity management programs"
    },
    {
      year: 2015,
      role: "Consultant Endocrinologist",
      hospital: "Fortis Healthcare",
      logo: "/src/assets/fortis-logo.jpg"
    },
    {
      year: 2010,
      role: "Senior Resident",
      hospital: "AIIMS",
      logo: "/src/assets/aiims-logo.jpg",
      notes: "Specialized training in diabetes and thyroid disorders"
    }
  ],
  videos: [
    {
      id: "4",
      title: "Expert Talk: Understanding Diabetes",
      thumbnail: "", // Will use video's first frame as thumbnail
      duration: "00:45",
      description: "Dr. Saptarshi Bhattacharya provides insights into understanding diabetes, its types, and effective management strategies.",
      video_url: "/src/assets/video1_saptarshi.mov",
      tags: ["Diabetes", "Expert Talk", "Awareness"]
    },
    {
      id: "5",
      title: "Preventive Measures for Thyroid Disorders",
      thumbnail: "", // Will use video's first frame as thumbnail
      duration: "01:30",
      description: "Dr. Saptarshi Bhattacharya discusses practical tips and lifestyle changes to prevent common thyroid disorders.",
      video_url: "/src/assets/video2_saptarshi.mp4",
      tags: ["Thyroid", "Prevention", "Health Tips"]
    },
    {
      id: "6",
      title: "Managing PCOS and Hormonal Imbalances",
      thumbnail: "", // Will use video's first frame as thumbnail
      duration: "02:15",
      description: "Dr. Saptarshi Bhattacharya explains effective strategies for managing PCOS and restoring hormonal balance.",
      video_url: "/src/assets/video3_saptarshi.mp4",
      tags: ["PCOS", "Hormones", "Women's Health"]
    }
  ],
  publications: [
    {
      title: "Efficacy of GLP-1 Receptor Agonists in Indian Population: A Real-World Study",
      source: "Indian Journal of Endocrinology",
      year: 2023,
      type: "Research",
      topic: "Diabetes",
      url: "#",
      citation: "Bhattacharya, S. et al. (2023). Efficacy of GLP-1 Receptor Agonists in Indian Population: A Real-World Study. Indian Journal of Endocrinology, 27(4), 245-252."
    },
    {
      title: "Metabolic Syndrome Management in Urban India: Challenges and Solutions",
      source: "Diabetes Care India",
      year: 2022,
      type: "Review",
      topic: "Metabolism",
      url: "#",
      citation: "Bhattacharya, S. (2022). Metabolic Syndrome Management in Urban India: Challenges and Solutions. Diabetes Care India, 15(2), 89-96."
    },
    {
      title: "Case Series: Successful Weight Loss with Tirzepatide in Indian Patients",
      source: "Obesity Medicine",
      year: 2023,
      type: "Case Study",
      topic: "Obesity",
      url: "#",
      citation: "Bhattacharya, S. et al. (2023). Case Series: Successful Weight Loss with Tirzepatide in Indian Patients. Obesity Medicine, 8(3), 123-129."
    }
  ],
  certifications: [
    {
      name: "Certified Diabetes Educator",
      issuer: "International Diabetes Federation",
      year: 2019,
      credentialId: "CDE-2019-001245",
      description: "Advanced certification in diabetes education and management",
      logo: "/src/assets/aiims-logo.jpg"
    },
    {
      name: "Fellowship in Obesity Medicine",
      issuer: "World Obesity Federation",
      year: 2020,
      credentialId: "FOM-2020-789",
      description: "Specialized training in comprehensive obesity management",
      logo: "/src/assets/max-healthcare-logo.jpg"
    }
  ],
  faq: [
    {
      question: "What conditions does Dr. Saptarshi specialize in?",
      answer: "Dr. Saptarshi specializes in diabetes management, thyroid disorders, obesity treatment with GLP-1 therapies, metabolic syndrome, and hormonal imbalances. He has extensive experience with both type 1 and type 2 diabetes care."
    },
    {
      question: "How effective are GLP-1 medications for weight loss?",
      answer: "GLP-1 medications can lead to significant weight loss of 10-20% of body weight when combined with lifestyle modifications. Results vary by individual, but most patients see meaningful improvements within 3-6 months of treatment."
    },
    {
      question: "What should I expect during my first consultation?",
      answer: "Your first consultation will include a comprehensive medical history review, physical examination, discussion of your symptoms and goals, and creation of a personalized treatment plan. Please bring all current medications and recent lab reports."
    },
    {
      question: "Do you provide ongoing support for lifestyle changes?",
      answer: "Yes, we provide comprehensive support including nutritional guidance, exercise planning, regular monitoring, and adjustments to your treatment plan. Our goal is to help you achieve sustainable, long-term health improvements."
    }
  ],
  other_doctors: [
    {
      name: "Dr. Priya Sharma",
      specialty: "Endocrinology & Diabetes",
      languages: ["English", "Hindi", "Punjabi"],
      portrait: "https://via.placeholder.com/200x200?text=Dr+Priya",
      slug: "dr-priya-sharma"
    },
    {
      name: "Dr. Rajesh Kumar",
      specialty: "Metabolic Medicine",
      languages: ["English", "Hindi", "Tamil"],
      portrait: "https://via.placeholder.com/200x200?text=Dr+Rajesh",
      slug: "dr-rajesh-kumar"
    },
    {
      name: "Dr. Anita Mehta",
      specialty: "Thyroid & Hormone Therapy",
      languages: ["English", "Hindi", "Gujarati"],
      portrait: "https://via.placeholder.com/200x200?text=Dr+Anita",
      slug: "dr-anita-mehta"
    }
  ]
};