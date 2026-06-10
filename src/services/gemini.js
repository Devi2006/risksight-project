export const analyzeWithGemini = async (
  projectData
) => {
  const prompt = `
You are an expert startup execution and business risk analyst.

Analyze this startup/project/business initiative.

Evaluate:
1. Market competition risk
2. Budget feasibility
3. Timeline realism
4. Team capability
5. Execution gaps
6. Revenue model sustainability
7. Scalability risk
8. Market demand probability
9. Business viability

Also consider:
- current startup trends
- market competition
- execution feasibility

Project Details:
${JSON.stringify(projectData)}

Return STRICT JSON ONLY in this format:

{
  "riskScore": number,
  "riskLevel": "Low/Medium/High",
  "marketSentiment": "Positive/Moderate/Saturated",
  "successProbability": number,
  "topRisks": [],
  "suggestions": []
}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
        import.meta.env.VITE_GEMINI_API_KEY
      }`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data.candidates[0].content.parts[0].text;

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "");

    return JSON.parse(cleanedText);

  } catch (error) {
    console.log(error);

    return null;
  }
};