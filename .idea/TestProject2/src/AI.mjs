import Groq from "groq-sdk";

const groq = new Groq({ apiKey: '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' });

export async function getPatientReport(patient) {
    const additionalInfo = `BSA: ${patient.bsa.toFixed(2)} m² (calculated using Mosteller formula).` +
        (patient.age < 18 ? " Clark's Rule was applied for dosage calculations." : "");

    let currentPrescriptions = "";
    if (patient.prescription1 !== "None") currentPrescriptions += `\nPrescription 1: ${patient.prescription1}`;
    if (patient.prescription2 !== "None") currentPrescriptions += `\nPrescription 2: ${patient.prescription2}`;
    if (patient.prescription3 !== "None") currentPrescriptions += `\nPrescription 3: ${patient.prescription3}`;

    const message = `Act as a medical assistant bot for Physicians looking at a brief summary of a patient's medical details. Shorten response and do not generate additional or fake details about the scenario. Do not include additional categories beyond those provided. Generate a detailed patient report based on the following information: 
    Name: ${patient.name}, 
    Age: ${patient.age}, 
    Weight: ${patient.weight} lbs, 
    Height: ${patient.height} cm, 
    Gender: ${patient.gender}, 
    Diagnosis: ${patient.diagnosis}, 
    ${additionalInfo}
    Current Prescriptions: ${currentPrescriptions || "None"}`;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "llama3-8b-8192",
        });

        console.log("Patient Report Content:", chatCompletion.choices[0]?.message?.content);
        return chatCompletion.choices[0]?.message?.content || "No report generated.";
    } catch (error) {
        console.error("Error generating patient report:", error);
        return "Error generating report.";
    }
}

export async function getPrescriptionRecommendations(patient) {
    const prescriptionsList = patient.prescriptions.map(p =>
        `${p.name} (${p.dosage} mg/m², Final Dose: ${p.finalDose.toFixed(2)} mg, ${p.frequency}, ${p.route})`
    ).join(", ");

    const message = `Act as a medical assistant bot for Physicians prescribing medicine. Shorten response and do not generate additional or fake details about the scenario. Do not include additional categories beyond those provided. Based on the diagnosis '${patient.diagnosis}', list the following prescriptions with a header "Your inputted prescriptions are": ${prescriptionsList}. After listing those prescriptions, advise if they will be a dangerous combination for the patient. Then advise if the prescription dosages in conjunction are dangerous for the patient, providing reasoning as to why and then a reasonable dosage recommendation for each prescription working all at once on the patient. Then provide a short list of alternative medications without dosage amounts. In parenthesis next to the alternative medication, list their individual common uses.`;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "llama3-8b-8192",
        });

        console.log("Prescription Recommendations Content:", chatCompletion.choices[0]?.message?.content);
        return chatCompletion.choices[0]?.message?.content || "No recommendations generated.";
    } catch (error) {
        console.error("Error generating prescription recommendations:", error);
        return "Error generating recommendations.";
    }
}