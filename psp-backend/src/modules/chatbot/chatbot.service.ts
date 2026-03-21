import { Injectable } from '@nestjs/common';
import { GeminiService } from '../../integrations/gemini/gemini.service';
import { SendChatbotMessageDto } from './dto/send-chatbot-message.dto';

@Injectable()
export class ChatbotService {
  constructor(private readonly geminiService: GeminiService) {}

  async sendMessage(dto: SendChatbotMessageDto) {
    const history = dto.history ?? [];

    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [
      {
        role: 'user',
        content: `[SISTEMA] És um assistente virtual do site PSP de apoio ao ciberbullying. 
Responde apenas com base no que está disponível no site: informações sobre ciberbullying, 
como denunciar, como pedir ajuda, recursos disponíveis e como usar a plataforma. 
Sê claro, breve e útil. Fala em português europeu.`,
      },
      ...history,
      {
        role: 'user',
        content: dto.message,
      },
    ];

    const result = await this.geminiService.generateChatReply(messages);

    return {
      reply: result.reply,
      suggestedActions: result.suggestedActions,
      shouldSuggestPsp: result.shouldSuggestPsp,
    };
  }
}