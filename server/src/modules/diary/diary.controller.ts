import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '@src/decorators/request-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestUserDto } from '../user/dto';
import { DiaryService } from './diary.service';
import { CreateDiaryDto, SerializeDiaryDto, UpdateDiaryDto } from './dto';

@Controller('api/diaries')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Diaries')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}
  private readonly logger = new Logger('DiaryController');

  @Get('')
  @ApiResponse({
    status: 200,
    description: '자신의 다이어리 글 리스트 가져오기 성공',
  })
  @ApiQuery({ name: 'page', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: true, example: 10 })
  async findMyDiaries(
    @RequestUser() requestUserDto: RequestUserDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ diaries: SerializeDiaryDto[] }> {
    const diaries = await this.diaryService.findMyDiaries(
      requestUserDto,
      page,
      limit,
    );

    const serializedDiaries = diaries.map((diary) => diary.serialize());

    return { diaries: serializedDiaries };
  }

  @Post()
  @ApiResponse({ status: 201, description: '다이어리 글 등록 성공' })
  async createDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Body() createDiaryDto: CreateDiaryDto,
  ): Promise<any> {
    const diary = await this.diaryService.createDiary(
      requestUserDto,
      createDiaryDto,
    );

    return { diary: diary.serialize() };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: '자신의 특정 다이어리 글 가져오기 성공',
  })
  async findMyDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Param('id') id: number,
  ): Promise<{ diary: SerializeDiaryDto }> {
    const diary = await this.diaryService.findMyDiary(requestUserDto, id);

    return { diary: diary.serialize() };
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: '자신의 특정 다이어리 글 수정 성공',
  })
  async updateMyDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Body() updateDiaryDto: UpdateDiaryDto,
    @Param('id') id: number,
  ): Promise<any> {
    const diary = await this.diaryService.updateMyDiary(
      requestUserDto,
      updateDiaryDto,
      id,
    );

    return { diary };
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: '자신의 특정 다이어리 글 삭제 성공',
  })
  async deleteMyDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Param('id') id: number,
  ): Promise<any> {
    await this.diaryService.deleteMyDiary(requestUserDto, id);
    return { msg: 'Successfully deleted your diary' };
  }
}
