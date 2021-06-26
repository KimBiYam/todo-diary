import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '@src/decorators/request-user.decorator';
import { Diary } from '@src/entities';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestUserDto } from '../user/dto/request-user.dto';
import { DiaryService } from './diary.service';
import { RegisterDiaryDto } from './dto/register-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary-dto';

@Controller('api/diaries')
@ApiTags('Diaries')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}
  private readonly logger = new Logger('DiaryController');

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '자신의 다이어리 전체 글 가져오기 성공',
  })
  async getDiaries(
    @RequestUser() requestUserDto: RequestUserDto,
  ): Promise<Diary[]> {
    this.logger.debug({ ...requestUserDto });
    return await this.diaryService.getOwnDiaries(requestUserDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: '다이어리 글 등록 성공' })
  async registerDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Body() registerDiaryDto: RegisterDiaryDto,
  ): Promise<any> {
    return await this.diaryService.registerDiary(
      requestUserDto,
      registerDiaryDto,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '자신의 특정 다이어리 글 가져오기 성공',
  })
  async getOwnDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Param('id') id: number,
  ): Promise<Diary> {
    return await this.diaryService.getOwnDiary(requestUserDto, id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '자신의 특정 다이어리 글 수정 성공',
  })
  async updateDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Body() updateDiaryDto: UpdateDiaryDto,
    @Param('id') id: number,
  ): Promise<Diary> {
    return await this.diaryService.updateDiary(
      requestUserDto,
      updateDiaryDto,
      id,
    );
  }
}
