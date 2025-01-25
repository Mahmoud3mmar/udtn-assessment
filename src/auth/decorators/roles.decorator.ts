import { SetMetadata } from "@nestjs/common";
import { Role } from "src/users/common-utils/Role.enum";

export const Roles =(...Roles:Role[])=> SetMetadata('roles',Roles)