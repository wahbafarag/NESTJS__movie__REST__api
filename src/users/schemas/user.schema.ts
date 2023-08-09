import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, errorMessages: 'Name is required' })
  name: string;

  @Prop({ required: true, errorMessages: 'Age is required' })
  age: number;

  @Prop({ required: true, errorMessages: 'Email is required' })
  email: string;

  @Prop({
    required: true,
    errorMessages: 'Password is required',
    select: false,
  })
  password: string;

  @Prop({ default: Roles.USER })
  role?: Roles;
}

export const userSchema = SchemaFactory.createForClass(User);
