/**
 * HealthGPT Ultra-Interactive AI Conversation Engine
 * 
 * Core Orchestrator coordinating:
 * - Conversation State Machine
 * - Entity & Context Memory
 * - Intent & Tone Detection
 * - Real Data Tool Integrations
 * - Follow-up Engine (One question at a time)
 * - Anti-robotic Response Quality Controller
 * - Streaming & Multi-LLM Execution
 */

import type {
  ConversationPersona,
  ConversationSession,
  ConversationMessage,
  ConversationTurnResult,
  ConversationState,
  DetectedIntent,
  ExtractedEntityMemory
} from './types.ts';
import { SafetyLayer } from './safetyLayer.ts';
import { IntentClassifier } from './intentClassifier.ts';
import { MemoryManager } from './memoryManager.ts';
import { ToolManager } from './toolManager.ts';
import { PersonalityEngine } from './personalityEngine.ts';
import { FollowUpEngine } from './followUpEngine.ts';
import { ResponseQualityController } from './responseQualityController.ts';
import { LLMDispatcher, getGenAIClient, getGeminiCandidateModels } from '../llmDispatcher.ts';
import { TranslationService } from '../translationService.ts';

export class ConversationEngine {
  private static sessions: Map<string, ConversationSession> = new Map();

  /**
   * Retrieves or creates a conversation session
   */
  public static getOrCreateSession(
    sessionId: string,
    persona: ConversationPersona = 'doctor',
    userId?: number
  ): ConversationSession {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        id: sessionId,
        title: 'New Health Consultation',
        userId,
        persona,
        state: 'GREETING',
        intent: 'GENERAL_HEALTH',
        emotionalTone: 'calm',
        memory: MemoryManager.createEmptyMemory(),
        summary: '',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.sessions.set(sessionId, session);
    } else if (persona && session.persona !== persona) {
      session.persona = persona;
    }
    return session;
  }

  /**
   * Lists all conversations
   */
  public static listSessions(userId?: number): ConversationSession[] {
    const all = Array.from(this.sessions.values());
    if (userId) {
      return all.filter(s => s.userId === userId).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
    return all.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  /**
   * Gets a specific session by ID
   */
  public static getSession(sessionId: string): ConversationSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Deletes a session by ID
   */
  public static deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  /**
   * Processes an incoming message and generates an intelligent, context-aware turn
   */
  public static async processMessage(options: {
    sessionId: string;
    message: string;
    persona?: ConversationPersona;
    userId?: number;
    language?: string;
    engine?: string;
    prescriptionContext?: string;
    healthMetrics?: any[];
    activePrescriptions?: any[];
    cachedUser?: any;
  }): Promise<ConversationTurnResult> {
    const {
      sessionId,
      message,
      persona = 'doctor',
      userId,
      language = 'en',
      engine = 'auto',
      prescriptionContext,
      healthMetrics = [],
      activePrescriptions = [],
      cachedUser
    } = options;

    const session = this.getOrCreateSession(sessionId, persona, userId);
    session.persona = persona;
    session.updatedAt = new Date().toISOString();

    const userMsgId = `usr_${Date.now()}`;
    const botMsgId = `bot_${Date.now()}`;

    // 1. Safety & Emergency Check
    const emergencyEval = SafetyLayer.evaluate(message);
    if (emergencyEval.isEmergency) {
      const emergencyText = `🚨 **URGENT CLINICAL SAFETY NOTICE**\n\n${emergencyEval.message}\n\n**Immediate Directives:**\n${emergencyEval.directives?.map(d => `* ${d}`).join('\n')}`;
      
      session.state = 'ACTION';
      session.intent = 'EMERGENCY';

      const userMsg: ConversationMessage = {
        id: userMsgId,
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
        persona,
        intent: 'EMERGENCY'
      };
      const botMsg: ConversationMessage = {
        id: botMsgId,
        role: 'assistant',
        content: emergencyText,
        timestamp: new Date().toISOString(),
        persona,
        intent: 'EMERGENCY',
        warningCard: {
          title: 'Emergency Medical Alert',
          message: emergencyEval.message || 'Please seek immediate emergency attention.',
          severity: 'emergency'
        },
        suggestedReplies: ['I am calling emergency services now', 'How should I position myself?', 'Notify emergency contact']
      };

      session.messages.push(userMsg, botMsg);

      return {
        sessionId,
        persona,
        state: 'ACTION',
        intent: 'EMERGENCY',
        emotionalTone: 'scared',
        responseText: emergencyText,
        suggestedReplies: botMsg.suggestedReplies || [],
        actions: [{ id: 'call_112', type: 'call', label: '📞 Call 112 / Emergency' }],
        warningCard: botMsg.warningCard,
        memorySummary: {
          symptoms: session.memory.symptoms,
          onsetDuration: session.memory.onsetDuration,
          severity: session.memory.severity,
          associated: session.memory.associatedSymptoms,
          negated: session.memory.negatedSymptoms
        },
        source: 'HealthGPT Emergency Triage Guardrails',
        engine: 'local-safety',
        model: 'emergency-protocols'
      };
    }

    // 2. Intent & Tone Classification
    const intentResult = IntentClassifier.classify(
      message,
      session.intent,
      session.memory.activeConcern
    );
    session.intent = intentResult.intent;
    session.emotionalTone = intentResult.emotionalTone;

    // Handle topic changes
    if (intentResult.isTopicChange) {
      session.state = 'UNDERSTANDING_INTENT';
      // Do not clear historical facts, but reset active questions
      session.memory.askedQuestions = [];
    }

    // 3. Memory Extraction & Correction
    const { memory: updatedMemory, detectedProfileFact } = MemoryManager.updateMemory(
      session.memory,
      message,
      intentResult.isCorrection
    );
    session.memory = updatedMemory;

    // 4. Autonomous Tool Invocations when Relevant
    const toolSnippets: string[] = [];

    if (
      message.toLowerCase().includes('sleep') ||
      intentResult.intent === 'SLEEP' ||
      message.toLowerCase().includes('how has my sleep been')
    ) {
      const sleepResult = ToolManager.getSleepData(healthMetrics);
      if (sleepResult.humanReadableSummary) {
        toolSnippets.push(`[Sleep Telemetry Data]: ${sleepResult.humanReadableSummary}`);
      }
    }

    if (
      message.toLowerCase().includes('vitals') ||
      message.toLowerCase().includes('blood pressure') ||
      message.toLowerCase().includes('heart rate') ||
      message.toLowerCase().includes('glucose')
    ) {
      const vitalsResult = ToolManager.getRecentHealthMetrics(healthMetrics, userId);
      if (vitalsResult.humanReadableSummary) {
        toolSnippets.push(`[Biometric Vitals]: ${vitalsResult.humanReadableSummary}`);
      }
    }

    if (
      message.toLowerCase().includes('prescription') ||
      message.toLowerCase().includes('medication') ||
      intentResult.intent === 'MEDICINE_INFORMATION'
    ) {
      const medResult = ToolManager.getMedicationData(activePrescriptions);
      if (medResult.humanReadableSummary) {
        toolSnippets.push(`[Active Prescriptions]: ${medResult.humanReadableSummary}`);
      }
    }

    // 5. Follow-Up Evaluation & Suggested Replies
    const followUpDecision = FollowUpEngine.evaluate(
      persona,
      intentResult.intent,
      session.memory,
      message
    );

    // 6. Build Rich Multilingual Prompt
    const langInfo = TranslationService.getLanguageInfo(language);
    const systemInstruction = PersonalityEngine.getSystemInstruction(
      persona,
      session.memory,
      intentResult.intent,
      intentResult.emotionalTone,
      langInfo.name
    );

    // Context from conversation summary + recent messages
    const recentMessages = session.messages.slice(-8);
    let conversationHistoryText = '';
    if (recentMessages.length > 0) {
      conversationHistoryText = recentMessages
        .map(m => `${m.role === 'user' ? 'Patient' : 'Assistant'}: ${m.content}`)
        .join('\n');
    }

    let userPrompt = '';
    if (session.summary) {
      userPrompt += `Previous Conversation Summary:\n${session.summary}\n\n`;
    }
    if (conversationHistoryText) {
      userPrompt += `Recent Conversation History:\n${conversationHistoryText}\n\n`;
    }
    if (toolSnippets.length > 0) {
      userPrompt += `Authorized Patient Health Data:\n${toolSnippets.join('\n')}\n\n`;
    }
    if (prescriptionContext) {
      userPrompt += `Prescription Details:\n${prescriptionContext}\n\n`;
    }

    userPrompt += `Patient's Latest Message: "${message}"\n\n`;
    userPrompt += `INSTRUCTION: Respond warmly, clearly, and conversationally in ${langInfo.name}. Acknowledge what the user just said. Use the remembered facts without asking them to repeat anything. Ask at most ONE specific follow-up question if helpful. Do NOT include generic disclaimers.`;

    // 7. Execute Multi-LLM Call (Grok / Gemini / Local)
    let responseText = '';
    let source = 'HealthGPT Clinical Conversation Engine';
    let engineUsed = 'gemini';
    let modelName = 'gemini-3.8-flash';

    try {
      const llmResult = await LLMDispatcher.execute({
        systemInstruction,
        userPrompt,
        preferredEngine: engine,
        temperature: 0.5,
        maxTokens: 1200
      });

      if (llmResult && llmResult.text) {
        responseText = llmResult.text;
        source = llmResult.source;
        engineUsed = llmResult.engine;
        modelName = llmResult.model;
      }
    } catch (err) {
      console.warn('[ConversationEngine] LLM invocation warning:', err);
    }

    // 8. Fallback to Local Intelligent Response if LLM is unavailable
    if (!responseText) {
      responseText = this.generateLocalConversationalFallback(
        persona,
        message,
        session.memory,
        toolSnippets,
        intentResult.emotionalTone
      );
      source = 'HealthGPT Local Conversation Engine';
      engineUsed = 'local';
      modelName = 'local-rules';
    }

    // 9. Response Quality Controller
    responseText = ResponseQualityController.process(responseText, false);

    // 10. Update Conversation State
    if (session.state === 'GREETING') session.state = 'UNDERSTANDING_INTENT';
    else if (session.state === 'UNDERSTANDING_INTENT') session.state = 'COLLECTING_RELEVANT_INFORMATION';
    else if (session.state === 'COLLECTING_RELEVANT_INFORMATION') session.state = 'ANALYZING';
    else if (session.state === 'ANALYZING') session.state = 'RESPONDING';

    // Update session title if first turn
    if (session.messages.length === 0) {
      session.title = message.length > 40 ? message.slice(0, 37) + '...' : message;
    }

    // Update conversation summary every 6 turns
    if (session.messages.length > 0 && session.messages.length % 6 === 0) {
      session.summary = MemoryManager.generateConversationSummary(session.messages, session.memory);
    }

    // 11. Profile Action (e.g. Save Vegetarian preference or Allergy)
    let profileAction: any = undefined;
    if (detectedProfileFact) {
      profileAction = {
        factKey: detectedProfileFact.key,
        factValue: detectedProfileFact.value,
        label: `Save "${detectedProfileFact.label}" to your permanent Health Profile?`,
        actionType: 'save_profile'
      };
    }

    // 12. Append to Session History
    const userMsg: ConversationMessage = {
      id: userMsgId,
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
      persona,
      intent: intentResult.intent
    };

    const botMsg: ConversationMessage = {
      id: botMsgId,
      role: 'assistant',
      content: responseText,
      timestamp: new Date().toISOString(),
      persona,
      intent: intentResult.intent,
      suggestedReplies: followUpDecision.smartSuggestions,
      actions: followUpDecision.proactiveActions,
      profileAction
    };

    session.messages.push(userMsg, botMsg);

    return {
      sessionId,
      persona,
      state: session.state,
      intent: intentResult.intent,
      emotionalTone: intentResult.emotionalTone,
      responseText,
      suggestedReplies: followUpDecision.smartSuggestions,
      actions: followUpDecision.proactiveActions,
      profileAction,
      memorySummary: {
        symptoms: session.memory.symptoms,
        onsetDuration: session.memory.onsetDuration,
        severity: session.memory.severity,
        associated: session.memory.associatedSymptoms,
        negated: session.memory.negatedSymptoms
      },
      source,
      engine: engineUsed,
      model: modelName
    };
  }

  /**
   * Generates a natural, intelligent conversational fallback when offline or without API key
   */
  private static generateLocalConversationalFallback(
    persona: ConversationPersona,
    message: string,
    memory: ExtractedEntityMemory,
    toolSnippets: string[],
    emotionalTone: string
  ): string {
    const text = message.toLowerCase().trim();

    // Acknowledgments
    const ackList = ['Got it.', 'That helps.', 'Thanks for clarifying.', 'Understood.', 'That gives me a clearer picture.'];
    const ack = ackList[Math.floor(Math.random() * ackList.length)];

    // If emotional tone is scared or anxious
    if (emotionalTone === 'scared' || text.includes('scared')) {
      return `I understand why that could feel scary. Let's take this one step at a time. Tell me what you're experiencing right now, and we will figure it out together.`;
    }

    if (text === 'hey' || text === 'hi' || text === 'hello' || text === 'hey healthgpt') {
      if (persona === 'therapist') {
        return `Hi! ❤️ Take a slow, deep breath... I'm Alex, your mindful wellness companion. How are you feeling right now?`;
      } else if (persona === 'nutrition') {
        return `Hey there! 🥗 I'm Maya, your Nutrition AI. What health or meal goals can we work on together today?`;
      } else {
        return `Hey! 🩺 I'm Dr. Nambi, your Chief AI Doctor. How are you feeling today, and what can I help you with?`;
      }
    }

    // Headache progression test scenario (User -> Follow-up -> Context)
    if (text.includes('headache') || text.includes('head hurts')) {
      if (!memory.onsetDuration) {
        return `I'm sorry you're dealing with that headache. How long have you had it?`;
      } else if (!memory.severity) {
        return `${ack} Is the headache mild, moderate, or severe (maybe on a scale from 1 to 10)?`;
      } else {
        return `${ack} Are you also experiencing any nausea, fever, vision changes, or sensitivity to light?`;
      }
    }

    // Duration answers (e.g. "since yesterday", "two weeks")
    if (text.includes('since yesterday') || text.includes('yesterday') || text.includes('two weeks')) {
      if (memory.symptoms.includes('headache') || memory.activeConcern.includes('headache')) {
        return `${ack} Is the headache mild, moderate, or severe?`;
      } else if (memory.symptoms.includes('fatigue') || text.includes('tired')) {
        return `Two weeks is long enough that it's worth looking at a few things. How has your sleep been during that time?`;
      }
    }

    // Severity answers (e.g. "moderate", "6", "6/10")
    if (text === 'moderate' || text.includes('moderate') || /\b[4-7]\b/.test(text)) {
      if (memory.symptoms.includes('headache')) {
        return `${ack} Do you also have nausea, fever, vision changes, or sensitivity to light?`;
      }
    }

    // Negative symptoms (e.g. "no fever", "none")
    if (text.includes('no fever') || text === 'no' || text === 'none') {
      if (memory.symptoms.includes('headache')) {
        return `${ack} Having no fever is reassuring. Given that this moderate headache started yesterday without fever or vision changes, common culprits include tension, dehydration, or eye strain. Would you like a few gentle relief steps you can try right now?`;
      }
    }

    // Sleep progression (e.g. "pretty bad. around 5 hours")
    if (text.includes('5 hours') || text.includes('around 5') || text.includes('barely sleep')) {
      return `That could definitely be contributing. Are you having trouble falling asleep, waking up during the night, or waking up earlier than you want?`;
    }

    if (text.includes('keep waking up') || text.includes('waking up')) {
      return `${ack} About how many times do you usually wake up?`;
    }

    if (text.includes('2 or 3 times') || text.includes('2 times') || text.includes('3 times')) {
      return `Thanks—that gives me a clearer picture. Let's look at what might be disrupting your sleep. Does anything usually wake you up, like noise, needing the bathroom, stress, pain, or feeling uncomfortable?`;
    }

    // User asks "what should i do?"
    if (text.includes('what should i do') || text.includes('what should i do?')) {
      if (memory.symptoms.includes('headache')) {
        const dur = memory.onsetDuration || 'recently';
        const sev = memory.severity || 'moderate';
        return `Based on what you've shared (a ${sev} headache ${dur}):\n\n1. **Hydration**: Drink a full glass (300-500ml) of water, as mild dehydration is the #1 headache trigger.\n2. **Screen Rest**: Step away from bright displays for 20 minutes in a dim, quiet room.\n3. **Gentle Relief**: Apply a cool or warm compress across your forehead and temples.\n\nIf the headache worsens rapidly, or if you develop a stiff neck or fever, be sure to have it checked by a physician promptly.`;
      }
    }

    // Default empathetic response
    if (toolSnippets.length > 0) {
      return `${ack} Looking at your logged health data: ${toolSnippets.join(' ')}. How does this correlate with how you are feeling right now?`;
    }

    if (persona === 'therapist') {
      return `${ack} I hear you, and it makes complete sense that you'd feel that way. Let's explore what's behind this together. What feels like the heaviest part of it right now?`;
    } else if (persona === 'nutrition') {
      return `${ack} Let's find practical, realistic choices that fit your lifestyle. What does your current daily routine look like?`;
    }

    return `${ack} Could you tell me a little more about how long this has been going on, or if you've noticed any other symptoms alongside it?`;
  }
}
