import { useState } from "react";

// Workbook data for PDF generation
const translationExercises = [
  { english: "Hello", spanish: "Hola" },
  { english: "Goodbye", spanish: "Adiós" },
  { english: "Thank you", spanish: "Gracias" },
  { english: "Please", spanish: "Por favor" },
  { english: "Yes", spanish: "Sí" },
  { english: "No", spanish: "No" },
  { english: "Good morning", spanish: "Buenos días" },
  { english: "Good night", spanish: "Buenas noches" },
  { english: "How are you?", spanish: "¿Cómo estás?" },
  { english: "I am fine", spanish: "Estoy bien" },
  { english: "What is your name?", spanish: "¿Cómo te llamas?" },
  { english: "My name is...", spanish: "Me llamo..." },
  { english: "Where is the bathroom?", spanish: "¿Dónde está el baño?" },
  { english: "I don't understand", spanish: "No entiendo" },
  { english: "Can you help me?", spanish: "¿Puede ayudarme?" },
];

const fillInBlankExercises = [
  { sentence: "Buenos _____", answer: "días", hint: "Morning greeting" },
  { sentence: "Mucho _____", answer: "gusto", hint: "Nice to meet you" },
  { sentence: "Por _____", answer: "favor", hint: "Please" },
  { sentence: "De _____", answer: "nada", hint: "You're welcome" },
  { sentence: "Yo _____ español", answer: "hablo", hint: "I speak Spanish" },
  { sentence: "¿Dónde _____ el baño?", answer: "está", hint: "Where is the bathroom?" },
  { sentence: "Tengo mucha _____", answer: "hambre", hint: "I'm very hungry" },
  { sentence: "Me _____ la pizza", answer: "gusta", hint: "I like pizza" },
  { sentence: "¿_____ hora es?", answer: "Qué", hint: "What time is it?" },
  { sentence: "Necesito _____ un taxi", answer: "tomar", hint: "I need to take a taxi" },
];

const matchingExercises = [
  { english: "Hello", spanish: "Hola" },
  { english: "Goodbye", spanish: "Adiós" },
  { english: "Good morning", spanish: "Buenos días" },
  { english: "Good night", spanish: "Buenas noches" },
  { english: "See you later", spanish: "Hasta luego" },
  { english: "Welcome", spanish: "Bienvenido" },
  { english: "Thank you", spanish: "Gracias" },
  { english: "You're welcome", spanish: "De nada" },
  { english: "Please", spanish: "Por favor" },
  { english: "Sorry", spanish: "Lo siento" },
];

interface WorkbookPDFProps {
  onClose: () => void;
  mode: "pdf" | "print";
}

export default function WorkbookPDF({ onClose, mode }: WorkbookPDFProps) {
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [selectedSections, setSelectedSections] = useState({
    translation: true,
    fillInBlank: true,
    matching: true,
  });

  const toggleSection = (section: keyof typeof selectedSections) => {
    setSelectedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const generatePrintContent = () => {
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Spanish Learning Workbook</title>
        <style>
          @media print {
            @page { margin: 1in; }
            .no-print { display: none !important; }
            .page-break { page-break-before: always; }
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            text-align: center;
            color: #1e3a8a;
            border-bottom: 3px solid #f59e0b;
            padding-bottom: 10px;
          }
          h2 {
            color: #1e3a8a;
            margin-top: 40px;
            padding: 10px;
            background: #f0f9ff;
            border-left: 4px solid #f59e0b;
          }
          .exercise {
            margin: 15px 0;
            padding: 10px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
          }
          .exercise-number {
            font-weight: bold;
            color: #6366f1;
            margin-right: 10px;
          }
          .answer-line {
            display: inline-block;
            width: 150px;
            border-bottom: 1px solid #333;
            margin: 0 5px;
          }
          .answer {
            color: #16a34a;
            font-weight: bold;
          }
          .answer-key {
            background: #f0fdf4;
            padding: 20px;
            border-radius: 8px;
            margin-top: 40px;
          }
          .answer-key h2 {
            background: #dcfce7;
            border-left-color: #16a34a;
          }
          .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .matching-item {
            padding: 8px 12px;
            background: #f9fafb;
            border-radius: 4px;
            margin: 4px 0;
          }
          .hint {
            color: #6b7280;
            font-size: 0.9em;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <h1>📚 Spanish Learning Workbook</h1>
        <p style="text-align: center; color: #6b7280;">Practice exercises to help you master Spanish</p>
    `;

    // Translation Exercises
    if (selectedSections.translation) {
      html += `
        <h2>🔄 Translation Exercises</h2>
        <p>Translate the following phrases:</p>
        
        <h3>English to Spanish</h3>
      `;
      translationExercises.forEach((ex, i) => {
        html += `
          <div class="exercise">
            <span class="exercise-number">${i + 1}.</span>
            ${ex.english} → <span class="answer-line"></span>
          </div>
        `;
      });

      html += `<h3 class="page-break">Spanish to English</h3>`;
      translationExercises.forEach((ex, i) => {
        html += `
          <div class="exercise">
            <span class="exercise-number">${i + 1}.</span>
            ${ex.spanish} → <span class="answer-line"></span>
          </div>
        `;
      });
    }

    // Fill in the Blank
    if (selectedSections.fillInBlank) {
      html += `
        <h2 class="page-break">✏️ Fill in the Blank</h2>
        <p>Complete the sentences with the correct word:</p>
      `;
      fillInBlankExercises.forEach((ex, i) => {
        html += `
          <div class="exercise">
            <span class="exercise-number">${i + 1}.</span>
            ${ex.sentence.replace("_____", '<span class="answer-line"></span>')}
            <br><span class="hint">Hint: ${ex.hint}</span>
          </div>
        `;
      });
    }

    // Matching
    if (selectedSections.matching) {
      html += `
        <h2 class="page-break">🔗 Matching Exercise</h2>
        <p>Draw lines to match the English phrases with their Spanish translations:</p>
        <div class="two-column">
          <div>
            <h4>English</h4>
      `;
      matchingExercises.forEach((ex, i) => {
        html += `<div class="matching-item">${i + 1}. ${ex.english}</div>`;
      });
      html += `</div><div><h4>Spanish</h4>`;
      // Shuffle spanish for matching
      const shuffled = [...matchingExercises].sort(() => Math.random() - 0.5);
      shuffled.forEach((ex, i) => {
        html += `<div class="matching-item">${String.fromCharCode(65 + i)}. ${ex.spanish}</div>`;
      });
      html += `</div></div>`;
    }

    // Answer Key
    if (includeAnswers) {
      html += `
        <div class="answer-key page-break">
          <h2>📝 Answer Key</h2>
      `;

      if (selectedSections.translation) {
        html += `<h3>Translation (English to Spanish)</h3>`;
        translationExercises.forEach((ex, i) => {
          html += `<p><span class="exercise-number">${i + 1}.</span> <span class="answer">${ex.spanish}</span></p>`;
        });
        html += `<h3>Translation (Spanish to English)</h3>`;
        translationExercises.forEach((ex, i) => {
          html += `<p><span class="exercise-number">${i + 1}.</span> <span class="answer">${ex.english}</span></p>`;
        });
      }

      if (selectedSections.fillInBlank) {
        html += `<h3>Fill in the Blank</h3>`;
        fillInBlankExercises.forEach((ex, i) => {
          html += `<p><span class="exercise-number">${i + 1}.</span> <span class="answer">${ex.answer}</span></p>`;
        });
      }

      if (selectedSections.matching) {
        html += `<h3>Matching</h3>`;
        matchingExercises.forEach((ex, i) => {
          html += `<p><span class="exercise-number">${i + 1}.</span> ${ex.english} = <span class="answer">${ex.spanish}</span></p>`;
        });
      }

      html += `</div>`;
    }

    html += `
        <p style="text-align: center; margin-top: 40px; color: #9ca3af; font-size: 0.9em;">
          Generated by Language Learning App • ${new Date().toLocaleDateString()}
        </p>
      </body>
      </html>
    `;

    return html;
  };

  const handleGenerate = () => {
    const content = generatePrintContent();
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      
      if (mode === "print") {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1a1a2e] rounded-2xl border border-white/10 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{mode === "pdf" ? "📥" : "🖨️"}</span>
              <h2 className="text-xl font-bold text-white">
                {mode === "pdf" ? "Download Workbook" : "Print Workbook"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Section Selection */}
          <div>
            <p className="text-white/60 text-sm mb-3">Select sections to include:</p>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedSections.translation}
                  onChange={() => toggleSection("translation")}
                  className="w-5 h-5 rounded accent-amber-500"
                />
                <span className="text-white">🔄 Translation Exercises</span>
              </label>
              
              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedSections.fillInBlank}
                  onChange={() => toggleSection("fillInBlank")}
                  className="w-5 h-5 rounded accent-cyan-500"
                />
                <span className="text-white">✏️ Fill-in-the-Blank</span>
              </label>
              
              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedSections.matching}
                  onChange={() => toggleSection("matching")}
                  className="w-5 h-5 rounded accent-emerald-500"
                />
                <span className="text-white">🔗 Matching</span>
              </label>
            </div>
          </div>

          {/* Include Answers */}
          <label className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 cursor-pointer">
            <input
              type="checkbox"
              checked={includeAnswers}
              onChange={() => setIncludeAnswers(!includeAnswers)}
              className="w-5 h-5 rounded accent-violet-500"
            />
            <div>
              <span className="text-white font-medium">Include Answer Key</span>
              <p className="text-white/50 text-sm">Add answers on separate page</p>
            </div>
          </label>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={!Object.values(selectedSections).some(v => v)}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              Object.values(selectedSections).some(v => v)
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            {mode === "pdf" ? "Generate PDF" : "Print"}
          </button>
        </div>
      </div>
    </div>
  );
}
