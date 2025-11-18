import { useState, useCallback } from 'react';

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        processVoiceInput(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      console.error('Speech recognition not supported in this browser');
    }
  }, []);

  const processVoiceInput = (text: string) => {
    // Extract amount, category, and description from voice input
    const amountMatch = text.match(/\d+(\.\d{1,2})?/);
    const amount = amountMatch ? parseFloat(amountMatch[0]) : null;

    const categories = ['food', 'transport', 'entertainment', 'utilities', 'shopping'];
    const category = categories.find(cat => text.toLowerCase().includes(cat)) || '';

    const description = text.replace(/\d+(\.\d{1,2})?/, '').trim();

    return { amount, category, description };
  };

  return { isListening, transcript, startListening };
}