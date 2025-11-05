
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { UserData, Professor } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCV = async (userData: UserData): Promise<string> => {
  const model = 'gemini-2.5-pro';
  const prompt = `
    Act as a career advisor specializing in AI graduate school admissions.
    Based on the following user information, generate a professional and academic CV in Markdown format.
    The CV should be well-structured, concise, and highlight the user's strengths for a top-tier AI program.

    **User Information:**
    - Name: ${userData.name}
    - Major: ${userData.major}
    - Education: ${userData.education}
    - Experience: ${userData.experience}
    - Skills: ${userData.skills}
    - Awards: ${userData.awards}

    **CV Structure:**
    1.  **Contact Information:** (You can use placeholders)
    2.  **Education:**
    3.  **Research/Work Experience:**
    4.  **Technical Skills:**
    5.  **Awards and Honors:**
    
    Generate the full CV now.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating CV:", error);
    return "Error: Could not generate CV. Please try again.";
  }
};

export const generateProposal = async (userData: UserData): Promise<string> => {
  const model = 'gemini-2.5-pro';
  const prompt = `
    Act as an academic advisor for a student applying to an AI graduate program.
    Based on the user's background and research interests, generate a compelling Statement of Purpose / Research Proposal in Markdown format.
    The proposal should be structured logically and demonstrate a clear understanding of the research area.

    **User Information:**
    - Name: ${userData.name}
    - Background: Major in ${userData.major}, with experience in ${userData.experience} and skills in ${userData.skills}.
    - Research Keywords: ${userData.researchKeywords}

    **Proposal Structure:**
    1.  **Introduction:** Briefly introduce the user and their passion for the chosen research area.
    2.  **Background and Motivation:** Connect their academic and practical experience to their research interests.
    3.  **Proposed Research:** Elaborate on a potential research project based on the keywords. State research questions and potential methodology.
    4.  **Future Goals:** Explain how this graduate program will help them achieve their long-term career goals.
    5.  **Conclusion:** Summarize their fitness for the program.

    Generate the full research proposal now.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating proposal:", error);
    return "Error: Could not generate research proposal. Please try again.";
  }
};

export const recommendProfessors = async (proposal: string): Promise<Professor[]> => {
  const model = 'gemini-2.5-pro';
  const prompt = `
    Analyze the following research proposal. Based on its content, recommend 3 to 5 fictional professors from top universities whose research aligns perfectly with the proposal.
    Return the result as a JSON array.

    **Research Proposal:**
    ${proposal}
  `;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              university: { type: Type.STRING },
              department: { type: Type.STRING },
              researchArea: { type: Type.STRING },
              recentPublication: { type: Type.STRING, description: "A fictional recent paper title." },
              email: { type: Type.STRING },
            },
            required: ["name", "university", "department", "researchArea", "recentPublication", "email"]
          }
        }
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as Professor[];
  } catch (error) {
    console.error("Error recommending professors:", error);
    return [];
  }
};

export const generateEmail = async (documents: { cv: string; proposal: string; }, professor: Professor): Promise<string> => {
  const model = 'gemini-2.5-pro';
  const prompt = `
    Act as a student preparing to contact a potential graduate school advisor.
    Generate a professional, respectful, and concise contact email in Markdown format to the professor specified below.
    The email should:
    1.  Briefly introduce the student.
    2.  Show genuine interest in the professor's research, mentioning their specific work.
    3.  Briefly connect the student's background/research interests (from their proposal) to the professor's work.
    4.  State the student's intention to apply to the graduate program.
    5.  Ask if the professor is accepting new students.
    6.  Mention that the CV and research proposal are attached for review.

    **Professor Information:**
    - Name: ${professor.name}
    - University: ${professor.university}
    - Research Area: ${professor.researchArea}
    - Recent Publication: "${professor.recentPublication}"

    **Student's Research Proposal Summary:**
    ${documents.proposal.substring(0, 1000)}...

    **Student's CV Summary:**
    ${documents.cv.substring(0, 1000)}...

    Generate the email content now. Do not include headers like "To:", "From:", or "Subject:" in the body.
  `;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating email:", error);
    return "Error: Could not generate contact email. Please try again.";
  }
};
