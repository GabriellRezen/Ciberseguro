import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ChatService } from './chat.service';
import { CreateChatSessionDto } from './dto/create-chat-session.dto';
import { SendChatMessageDto } from './dto/send-chat-message.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('sessions')
  @ApiOperation({ summary: 'Create a new chat session' })
  createSession(
    @Body() dto: CreateChatSessionDto,
    @CurrentUser() user: { userId: string } | null,
  ) {
    return this.chatService.createSession(dto, user?.userId);
  }

  @Get('sessions/:sessionId')
  @ApiOperation({ summary: 'Get chat session and messages' })
  getSession(@Param('sessionId') sessionId: string) {
    return this.chatService.getSession(sessionId);
  }

  @Post('sessions/:sessionId/messages')
  @ApiOperation({ summary: 'Send a message and get AI reply' })
  sendMessage(
    @Param('sessionId') sessionId: string,
    @Body() dto: SendChatMessageDto,
  ) {
    return this.chatService.sendMessage(sessionId, dto);
  }

  @Get('quick-actions')
  @ApiOperation({ summary: 'Get predefined quick action buttons' })
  getQuickActions() {
    return this.chatService.getQuickActions();
  }
}
