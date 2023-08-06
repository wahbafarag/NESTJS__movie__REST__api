import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectID implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): Types.ObjectId {
    const validID = Types.ObjectId.isValid(value);
    if (!validID) {
      throw new BadRequestException('Invalid Object ID');
    }
    return Types.ObjectId.createFromHexString(value);
  }
}
