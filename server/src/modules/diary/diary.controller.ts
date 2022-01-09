import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestUser } from '@src/decorators/request-user.decorator';
import { Diary } from '@src/entities';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user';
import { RequestUserDto } from '../user/dto';
import { DiaryService } from './diary.service';
import {
  DiariesStatisticsRequestDto,
  CreateDiaryDto,
  UpdateDiaryDto,
  DiariesExistsDatesDto,
  GetDiariesDto,
} from './dto';

@Controller('api/v1/diaries')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Diaries')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class DiaryController {
  constructor(
    private readonly diaryService: DiaryService,
    private readonly userService: UserService,
  ) {}

  @Get('')
  @ApiOperation({ summary: '자신의 다이어리 글 리스트 가져오기' })
  @ApiResponse({
    status: 200,
    description: '자신의 다이어리 글 리스트 가져오기 성공',
  })
  async findMyDiaries(
    @RequestUser() requestUserDto: RequestUserDto,
    @Query() getDiariesDto: GetDiariesDto,
  ) {
    const user = await this.userService.findUserById(requestUserDto.id);

    const diaries = await this.diaryService.findMyDiaries(user, getDiariesDto);

    const serializedDiaries = diaries.map((diary) => diary.serialize());

    return { diaries: serializedDiaries };
  }

  @Get('/statistics')
  @ApiOperation({
    summary: '해당 연도에 해당하는 다이어리 달성률 통계 가져오기',
  })
  @ApiResponse({
    status: 200,
    description: '해당 연도에 해당하는 다이어리 달성률 통계 가져오기 성공',
  })
  async getDiariesStatisticsByYear(
    @RequestUser() requestUserDto: RequestUserDto,
    @Query() { year }: DiariesStatisticsRequestDto,
  ) {
    const user = await this.userService.findUserById(requestUserDto.id);

    const diariesStatisticsByYear = await this.diaryService.getDiariesStatisticsByYear(
      user,
      year,
    );

    return diariesStatisticsByYear;
  }

  @Get('exists-dates')
  @ApiOperation({
    summary: '해당 년도 해당 월에 다이어리가 존재하는 날짜들 가져오기',
  })
  @ApiResponse({
    status: 200,
    description: '해당 년도 해당 월에 다이어리가 존재하는 날짜들 가져오기 성공',
  })
  async getDatesTheDiaryExists(
    @RequestUser() requestUserDto: RequestUserDto,
    @Query() diariesExistsDatesDto: DiariesExistsDatesDto,
  ) {
    const user = await this.userService.findUserById(requestUserDto.id);

    const dates = await this.diaryService.getDatesTheDiaryExists(
      user,
      diariesExistsDatesDto,
    );

    return { dates };
  }

  @Post()
  @ApiOperation({
    summary: '다이어리 글 등록',
  })
  @ApiResponse({ status: 201, description: '다이어리 글 등록 성공' })
  async createDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Body() createDiaryDto: CreateDiaryDto,
  ) {
    const diary = await this.diaryService.createDiary(
      requestUserDto,
      createDiaryDto,
    );

    return { diary: diary.serialize() };
  }

  @Get(':id')
  @ApiOperation({
    summary: '자신의 특정 다이어리 글 가져오기',
  })
  @ApiResponse({
    status: 200,
    description: '자신의 특정 다이어리 글 가져오기 성공',
  })
  async findMyDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Param('id') id: number,
  ) {
    const user = await this.userService.findUserById(requestUserDto.id);

    const diary = await this.diaryService.findMyDiary(user, id);

    return { diary: diary.serialize() };
  }

  @Patch(':id')
  @ApiOperation({
    summary: '자신의 특정 다이어리 글 수정',
  })
  @ApiResponse({
    status: 200,
    description: '자신의 특정 다이어리 글 수정 성공',
  })
  async updateMyDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Body() updateDiaryDto: UpdateDiaryDto,
    @Param('id') id: number,
  ): Promise<{ diary: Diary }> {
    const user = await this.userService.findUserById(requestUserDto.id);

    const diary = await this.diaryService.updateMyDiary(
      user,
      updateDiaryDto,
      id,
    );

    return { diary };
  }

  @Delete(':id')
  @ApiOperation({
    summary: '자신의 특정 다이어리 글 삭제',
  })
  @ApiResponse({
    status: 200,
    description: '자신의 특정 다이어리 글 삭제 성공',
  })
  async deleteMyDiary(
    @RequestUser() requestUserDto: RequestUserDto,
    @Param('id') id: number,
  ): Promise<{ msg: string }> {
    const user = await this.userService.findUserById(requestUserDto.id);

    await this.diaryService.deleteMyDiary(user, id);

    return { msg: 'Successfully deleted your diary' };
  }
}
