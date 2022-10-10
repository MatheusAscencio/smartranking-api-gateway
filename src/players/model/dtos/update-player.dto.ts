import { PartialType } from "@nestjs/mapped-types";
import { PlayerDTO } from "./player.dto";

export class UpdatePlayerDTO extends PartialType(PlayerDTO) {}