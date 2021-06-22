import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { RegisterDiaryDto } from './dto/register-diary.dto';

@Controller('api/diaries')
@ApiTags('Diaries')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get()
  async getDiaries(): Promise<any> {
    return await this.diaryService.getDiaries();
  }

  @Post()
  @ApiResponse({ status: 201, description: '다이어리 글 등록 성공' })
  async registerDiary(
    @Body() registerDiaryDto: RegisterDiaryDto,
  ): Promise<any> {
    return await this.diaryService.registerDiary(registerDiaryDto);
  }
}
