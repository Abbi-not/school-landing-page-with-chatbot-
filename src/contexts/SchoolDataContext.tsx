import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface TuitionItem {
  id: string;
  grade: string;
  tuitionFee: number;
  registrationFee: number;
  materialsFee: number;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  grades: string;
  icon: string;
}

export interface ImportantDate {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface AdmissionRequirement {
  id: string;
  title: string;
  items: string[];
}

interface SchoolData {
  tuition: TuitionItem[];
  programs: Program[];
  dates: ImportantDate[];
  admissionRequirements: AdmissionRequirement[];
}

interface SchoolDataContextType {
  data: SchoolData;
  updateTuition: (items: TuitionItem[]) => void;
  updatePrograms: (items: Program[]) => void;
  updateDates: (items: ImportantDate[]) => void;
  updateAdmissionRequirements: (items: AdmissionRequirement[]) => void;
}

const defaultData: SchoolData = {
  tuition: [
    { id: "1", grade: "Kindergarten (KG)", tuitionFee: 15000, registrationFee: 2000, materialsFee: 3000 },
    { id: "2", grade: "Grade 1-4", tuitionFee: 18000, registrationFee: 2500, materialsFee: 3500 },
    { id: "3", grade: "Grade 5-8", tuitionFee: 22000, registrationFee: 3000, materialsFee: 4000 },
  ],
  programs: [
    { id: "1", name: "Kindergarten Program", description: "Foundation learning through play-based education for ages 4-6", grades: "KG1-KG3", icon: "Palette" },
    { id: "2", name: "Primary Education", description: "Core academics with focus on literacy, numeracy, and critical thinking", grades: "Grade 1-4", icon: "BookOpen" },
    { id: "3", name: "Middle School", description: "Advanced curriculum preparing students for secondary education", grades: "Grade 5-8", icon: "GraduationCap" },
    { id: "4", name: "After School Activities", description: "Sports, arts, music, and coding clubs", grades: "All Grades", icon: "Trophy" },
  ],
  dates: [
    { id: "1", title: "Registration Opens", date: "2024-06-01", description: "New student registration begins for the upcoming academic year" },
    { id: "2", title: "School Year Begins", date: "2024-09-11", description: "First day of classes for all students" },
    { id: "3", title: "Mid-Year Exams", date: "2025-01-15", description: "First semester examination period" },
    { id: "4", title: "School Year Ends", date: "2025-06-30", description: "Last day of the academic year" },
  ],
  admissionRequirements: [
    { id: "1", title: "Required Documents", items: ["Birth Certificate", "Previous School Records", "Passport Photos (4)", "Parent/Guardian ID", "Medical Certificate"] },
    { id: "2", title: "Age Requirements", items: ["KG1: 4 years old", "KG2: 5 years old", "KG3: 6 years old", "Grade 1: 7 years old"] },
  ],
};

const SchoolDataContext = createContext<SchoolDataContextType | undefined>(undefined);

const STORAGE_KEY = "sanete_school_data";

export const SchoolDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SchoolData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateTuition = (items: TuitionItem[]) => {
    setData(prev => ({ ...prev, tuition: items }));
  };

  const updatePrograms = (items: Program[]) => {
    setData(prev => ({ ...prev, programs: items }));
  };

  const updateDates = (items: ImportantDate[]) => {
    setData(prev => ({ ...prev, dates: items }));
  };

  const updateAdmissionRequirements = (items: AdmissionRequirement[]) => {
    setData(prev => ({ ...prev, admissionRequirements: items }));
  };

  return (
    <SchoolDataContext.Provider value={{ data, updateTuition, updatePrograms, updateDates, updateAdmissionRequirements }}>
      {children}
    </SchoolDataContext.Provider>
  );
};

export const useSchoolData = () => {
  const context = useContext(SchoolDataContext);
  if (!context) {
    throw new Error("useSchoolData must be used within SchoolDataProvider");
  }
  return context;
};
