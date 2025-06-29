import { RecadosUtils } from 'src/recados/recados.utils';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { RecadosService } from './recados.service';
import { PaginationDto } from '../common/dto/paginatio.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { REMOVE_SPACES_REGEX, SERVER_NAME } from './recados.constant';
import { RegexProtocol } from 'src/common/regex/regex.protocol';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { RoutePolicyGuard } from 'src/auth/guards/route-policy.guard';
import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
import { RoutePolicies } from 'src/auth/enum/route-policies.enum';

@UseGuards(RoutePolicyGuard)
@Controller('recados')
export class RecadosController {
  constructor(
    private readonly RecadosService: RecadosService,
    private readonly recadosUtils: RecadosUtils,

    @Inject(SERVER_NAME)
    private readonly serverName: string,

    @Inject('REMOVE_SPACES_REGEX')
    private readonly removeSpacesRegex: RegexProtocol,

    @Inject('ONLY_LOWERCASE_LETTERS_REGEX')
    private readonly onlyLowercaseLettersRegex: RegexProtocol,

    @Inject(REMOVE_SPACES_REGEX)
    private readonly RemoveSpacesRegex: RegexProtocol,
  ) {}

  @Get()
  @SetRoutePolicy(RoutePolicies.FIND_ALL_RECADOS)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.RecadosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.RecadosService.findOne(id);
  }

  @UseGuards(AuthTokenGuard)
  @SetRoutePolicy(RoutePolicies.CREATE_RECADOS)
  @Post()
  create(
    @Body() createRecadoDto: CreateRecadoDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.RecadosService.create(createRecadoDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecadoDto: UpdateRecadoDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.RecadosService.update(+id, updateRecadoDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  remove(
    @Param('id') id: number,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.RecadosService.remove(id, tokenPayload);
  }
}
