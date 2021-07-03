import {
  Body,
  Controller,
  Delete,
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
import { RequestUserDto } from '../user/dto';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto';
import { ResponseDiaryDto } from './dto/response-diary.dto';
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
  async findMyDiaries(
    @RequestUser() requestUserDto: RequestUserDto,
  ): Promise<ResponseDiaryDto[]> {
    return await this.diaryService.findMyDiaries(requestUserDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: '다이어리 글 등록 성공' })
  async createDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Body() createDiaryDto: CreateDiaryDto,
  ): Promise<any> {
    return await this.diaryService.createDiary(requestUserDto, createDiaryDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '자신의 특정 다이어리 글 가져오기 성공',
  })
  async findMyDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Param('id') id: number,
  ): Promise<ResponseDiaryDto> {
    return await this.diaryService.findConvertedMyDiary(requestUserDto, id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '자신의 특정 다이어리 글 수정 성공',
  })
  async updateMyDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Body() updateDiaryDto: UpdateDiaryDto,
    @Param('id') id: number,
  ): Promise<Diary> {
    return await this.diaryService.updateMyDiary(
      requestUserDto,
      updateDiaryDto,
      id,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '자신의 특정 다이어리 글 삭제 성공',
  })
  async deleteMyDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Param('id') id: number,
  ): Promise<any> {
    return await this.diaryService.deleteMyDiary(requestUserDto, id);
  }
}
