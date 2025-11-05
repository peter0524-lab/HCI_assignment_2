
export interface UserData {
  name: string;
  major: string;
  education: string;
  experience: string;
  skills: string;
  awards: string;
  researchKeywords: string;
}

export interface Professor {
  name: string;
  university: string;
  department: string;
  researchArea: string;
  recentPublication: string;
  email: string;
}

export interface DocumentData {
  cv: string;
  proposal: string;
  email: string;
}
